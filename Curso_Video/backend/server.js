const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mysql = require('mysql2/promise');
const path = require('path');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = "Y@3Kp$7nVd!xGzR^mAqTjLwXf&C9*bD5";

// Configuração da conexão com o banco de dados
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Substitua pelo seu password do banco de dados
    database: 'authApp' // Substitua pelo nome do seu banco de dados
});

(async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            ) ENGINE=INNODB;
        `);
        console.log('Tabela "users" criada ou já existente.');

        await db.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255),
                price DECIMAL(10, 2),
                rating DECIMAL(3, 2),
                image_url VARCHAR(255),
                is_best_seller BOOLEAN,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=INNODB;
        `);
        console.log('Tabela "courses" criada ou já existente.');

        await db.query(`
            CREATE TABLE IF NOT EXISTS home (
                id INT AUTO_INCREMENT PRIMARY KEY,
                course_id INT NOT NULL,
                position INT NOT NULL,
                FOREIGN KEY (course_id) REFERENCES courses(id)
            ) ENGINE=INNODB;
        `);
        console.log('Tabela "home" criada ou já existente.');

        await db.query(`
            CREATE TABLE IF NOT EXISTS news (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                image_url VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=INNODB;
        `);
        console.log('Tabela "news" criada ou já existente.');
    } catch (error) {
        console.error('Erro ao criar tabelas:', error);
    }
})();

// Configurar morgan para logar todas as requisições
app.use(morgan('combined'));

// Habilitar CORS
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

app.use(bodyParser.json());

// Rota de Registro
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Verificação dos campos obrigatórios
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Rota protegida
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Esta é uma rota protegida', user: req.user });
});

// Rota para home
app.get('/api/home-courses', async (req, res) => {
    console.log('Requisição recebida para /api/home-courses');
    const query = `
        SELECT courses.* FROM home
        JOIN courses ON home.course_id = courses.id
        ORDER BY home.position
    `;
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar cursos da página inicial:', error);
        res.status(500).send('Erro ao buscar cursos da página inicial');
    }
});

// Rota para courses
app.get('/api/courses', async (req, res) => {
    console.log('Requisição recebida para /api/courses');
    const query = 'SELECT * FROM courses';
    try {
        const [results] = await db.query(query);
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar cursos:', error);
        res.status(500).send('Erro ao buscar cursos');
    }
});

// Rota para course-details
app.get('/course-details', async (req, res) => {
    const courseId = req.query.id;
    console.log(`Requisição recebida para /course-details com id: ${courseId}`);
    const query = 'SELECT * FROM courses WHERE id = ?';
    try {
        const [results] = await db.query(query, [courseId]);
        if (results.length === 0) {
            res.status(404).send('Curso não encontrado');
            return;
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Erro ao buscar detalhes do curso:', error);
        res.status(500).send('Erro ao buscar detalhes do curso');
    }
});

// Rota para criar notícia
app.post('/api/news', async (req, res) => {
    const { title, content, image_url } = req.body;

    try {
        await db.query('INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)', [title, content, image_url]);
        res.status(201).json({ message: 'Notícia criada com sucesso' });
    } catch (error) {
        console.error('Erro ao criar notícia:', error);
        res.status(500).json({ message: 'Erro ao criar notícia' });
    }
});

// Rota para obter todas as notícias
app.get('/api/news', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM news');
        res.json(results);
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        res.status(500).json({ message: 'Erro ao buscar notícias' });
    }
});

// Rota para obter uma notícia por ID
app.get('/api/news/:id', async (req, res) => {
    const newsId = req.params.id;

    try {
        const [results] = await db.query('SELECT * FROM news WHERE id = ?', [newsId]);
        if (results.length === 0) {
            res.status(404).json({ message: 'Notícia não encontrada' });
            return;
        }
        res.json(results[0]);
    } catch (error) {
        console.error('Erro ao buscar notícia:', error);
        res.status(500).json({ message: 'Erro ao buscar notícia' });
    }
});

// Rota para atualizar uma notícia
app.put('/api/news/:id', async (req, res) => {
    const newsId = req.params.id;
    const { title, content, image_url } = req.body;

    try {
        await db.query('UPDATE news SET title = ?, content = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, content, image_url, newsId]);
        res.json({ message: 'Notícia atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar notícia:', error);
        res.status(500).json({ message: 'Erro ao atualizar notícia' });
    }
});

// Rota para deletar uma notícia
app.delete('/api/news/:id', async (req, res) => {
    const newsId = req.params.id;

    try {
        await db.query('DELETE FROM news WHERE id = ?', [newsId]);
        res.json({ message: 'Notícia deletada com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar notícia:', error);
        res.status(500).json({ message: 'Erro ao deletar notícia' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});