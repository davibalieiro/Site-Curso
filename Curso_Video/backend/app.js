const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Rota para obter os cursos
app.get('/api/courses', (req, res) => {
    const query = 'SELECT * FROM courses';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar cursos:', err);
            res.status(500).send('Erro ao buscar cursos');
            return;
        }
        res.json(results);
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});