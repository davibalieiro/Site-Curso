const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Certifique-se de definir uma chave secreta

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
    } catch (error) {
        console.error('Erro ao criar tabela:', error);
    }
})();

app.use(cors());
app.use(bodyParser.json());

// Rota de Registro
app.post('/register', async (req, res) => {
    console.log('Corpo da requisição:', req.body); // Log do corpo da requisição
    const { name, email, password } = req.body;

    // Verificação dos campos obrigatórios
    if (!name || !email || !password) {
        console.log('Campos obrigatórios faltando'); // Log para depuração
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            console.log('Usuário já existe'); // Log para depuração
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        console.log('Novo usuário registrado:', { name, email });

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Tentativa de login:', { email, password }); // Log para depuração

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            console.log('Usuário não encontrado'); // Log para depuração
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const user = users[0];
        console.log('Usuário encontrado:', user); // Log para depuração

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Senha corresponde:', passwordMatch); // Log para depuração

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

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});