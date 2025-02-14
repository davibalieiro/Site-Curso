const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'sua_chave_secreta_aqui'; // Adicione uma chave secreta padrão para desenvolvimento

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'authApp'
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
    console.log('Corpo da requisição:', req.body); // Adicione este log
    const { name, email, password } = req.body;

    // Verificação dos campos obrigatórios
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    // Restante do código...

    try {
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        console.log('Novo usuário registrado:', { name, email });

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

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
        console.error(error);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
});

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

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Esta é uma rota protegida', user: req.user });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});