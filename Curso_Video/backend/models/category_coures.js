app.get('/courses/category/:category', async (req, res) => {
    const { category } = req.params;

    try {
        const [courses] = await db.query('SELECT * FROM courses WHERE category = ?', [category]);
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar cursos por categoria' });
    }
});