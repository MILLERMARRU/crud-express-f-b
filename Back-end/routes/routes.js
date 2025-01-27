const express = require('express');

const router = express.Router();

// All Rutas-------------------------

router.get('/', (req, res) => {
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        }
        conn.query('SELECT * FROM books', (err, rows) => {
            if(err){
                return res.send(err);
            }
            res.json(rows);
        });
    });
}); 

router.post('/', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
        }
        conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
            if (err) {
                return res.status(500).json({ error: 'Error al insertar el libro' });
            }
            res.json({ message: 'Book added', data: rows });
        });
    });
});


router.delete('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        }
        conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
            if(err){
                return res.send(err);
            }
            res.send('Book deleted');
        });
    });
});

router.put('/:id', (req, res) => {
    req.getConnection((err, conn) => {
        if(err){
            return res.send(err);
        }
        conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
            if(err){
                return res.send(err);
            }
            res.send('Book updated');
        });
    }); 
});


/* router.get('/books', (req, res) => {
    res.send('Users');
}); */

module.exports = router;
