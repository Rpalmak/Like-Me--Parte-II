import pool from '../../BD/connection.js'

const getPosts = async () => {
    const SQLquery = { text: 'SELECT * FROM posts ORDER BY id' }
    const { rows } = await pool.query(SQLquery)
    return rows
}

const createPost = async ({ titulo, url, descripcion }) => {
    const likes = 0
    const SQLquery = {
        text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [titulo, url, descripcion, likes]
    }
    const { rows } = await pool.query(SQLquery)
    return rows
}

const addLike = async id => {
    const SQLquery = {
        text: 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
        values: [id]
    }
    const { rowCount, rows } = await pool.query(SQLquery)
    if (rowCount === 0) {
        throw { code: 'invalidID' }
    }
    return rows
}

const deletePost = async id => {
    const SQLquery = {
        text: 'DELETE FROM posts WHERE id = $1',
        values: [id]
    }
    const response = await pool.query(SQLquery)
    if (response.rowCount === 0) {
        throw { code: 'invalidID' }
    }
}

export { getPosts, createPost, addLike, deletePost }