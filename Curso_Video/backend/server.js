const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const connection = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar morgan para logar todas as requisições
app.use(morgan('combined'));

// Habilitar CORS
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para home
app.get('/api/home-courses', (req, res) => {
  console.log('Requisição recebida para /api/home-courses');
  const query = `
    SELECT courses.* FROM home
    JOIN courses ON home.course_id = courses.id
    ORDER BY home.position
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar cursos da página inicial:', err);
      res.status(500).send('Erro ao buscar cursos da página inicial');
      return;
    }
    res.json(results);
  });
});

// Rota para courses
app.get('/api/courses', (req, res) => {
  console.log('Requisição recebida para /api/courses');
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

// Rota para course-details
app.get('/course-details', (req, res) => {
  const courseId = req.query.id;
  console.log(`Requisição recebida para /course-details com id: ${courseId}`);
  const query = 'SELECT * FROM courses WHERE id = ?';
  connection.query(query, [courseId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar detalhes do curso:', err);
      res.status(500).send('Erro ao buscar detalhes do curso');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Curso não encontrado');
      return;
    }
    res.json(results[0]);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});