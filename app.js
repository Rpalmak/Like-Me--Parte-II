import cors from 'cors';

import express from 'express';
import pg from 'pg';


const app = express();
app.use(cors());

const pool = new pg.Pool({
    connectionString: 'postgres://postgres:password@localhost:5432/likeme'
});


//get
app.get('/registros', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM posts');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los registros.');
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

//post
app.post('/nuevo-post', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const newPost = await pool.query('INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *', [titulo, img, descripcion, likes]);
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al guardar el nuevo post.');
    }
});
