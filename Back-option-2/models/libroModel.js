const db = require('../config/bd');

const libroModel = {

    async getAll() {
        const query = 'SELECT * FROM libros';
        const [rows] = await db.query(query);
        return rows;
    },

    async getById(id) {
        const query = 'SELECT * FROM libros WHERE id = ?';
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    async create(libro) {
        const { titulo, autor, edicion } = libro;
        const query = 'INSERT INTO libros (titulo, autor, edicion) VALUES (?, ?, ?)';
        const result = await db.query(query, [titulo, autor, edicion]);
        return result[0].insertId;
    },

    async update(id, libro) {
        const { titulo, autor, edicion } = libro;
        const query = 'UPDATE libros SET titulo = ?, autor = ?, edicion = ? WHERE id = ?';
        const result = await db.query(query, [titulo, autor, edicion, id]);
        return result[0].affectedRows;
    },

    async delete(id) {
        const query = 'DELETE FROM libros WHERE id = ?';
        const result = await db.query(query, [id]);
        return result[0].affectedRows;
    }

};

module.exports = libroModel;
