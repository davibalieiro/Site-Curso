app.post('/courses', async (req, res) => {
    const { name, category, price, rating, image_url, is_best_seller } = req.body;

    if (!name || !category || !price || !rating || !image_url) {
        return res.status(400).json({ message: 'Preencha todos os campos obrigatórios' });
    }

    try {
        await db.query(
            'INSERT INTO courses (name, category, price, rating, image_url, is_best_seller) VALUES (?, ?, ?, ?, ?, ?)',
            [name, category, price, rating, image_url, is_best_seller || false]
        );
        res.status(201).json({ message: 'Curso adicionado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao adicionar curso' });
    }
});