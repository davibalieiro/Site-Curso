app.get('/courses', async (req, res) => {
    try {
        const [courses] = await db.query('SELECT * FROM courses');
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cursos' });
    }
});