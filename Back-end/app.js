const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const route = require('./routes/routes');
const cors = require('cors');


const app = express();
app.set('port', process.env.PORT || 3000);

// Database-------------------------
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'node_mysql'
};

// Middlewares-------------------------
app.use(myconn(mysql, dbOptions, 'single')); 
app.use(express.json()); 
app.use(cors());



// Rutas-------------------------
/* app.get('/', (req, res) => {    
    res.send('Hello World');
}); */

app.use('/api', route);


// Server running -----------------------------
app.listen(app.get('port'), () => {
    console.log('Server is running on port ', app.get('port'));
});

