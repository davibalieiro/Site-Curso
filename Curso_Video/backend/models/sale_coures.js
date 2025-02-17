app.get('/courses/best-sellers', async (req, res) => {
    try {
        const [courses] = await db.query('SELECT * FROM courses WHERE is_best_seller = TRUE');
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cursos mais vendidos' });
    }
});
