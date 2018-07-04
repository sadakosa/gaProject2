console.log('starting the server... :)');

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    require libraries

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

const db = require('./db.js');

const cookieParser = require('cookie-parser');

const reactEngine = require('express-react-views').createEngine();

const jsonfile = require('jsonfile');

const methodOverride = require('method-override');

// const pg = require('pg');

const sha256 = require('js-sha256');

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    DB setup

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

// const configs = {
//     user: 'sabrinachow',
//     host: '127.0.0.1',
//     database: 'wireFrame',
//     port: 5432
// }

// const pool = new pg.Pool(configs);

// pool.on('error', function(err) {
//     console.log('idle client error', err.message, err.stack);
// });


/*
    *************************************************************
    *************************************************************
    *************************************************************

                    express setup

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(cookieParser());

// look in the views directory for all the templates
app.set('views', __dirname + '/views');
// use the react engine in express
app.engine('jsx', reactEngine);
// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



/*
    *************************************************************
    *************************************************************
    *************************************************************

                    routes

    *************************************************************
    *************************************************************
    *************************************************************
    *************************************************************
*/

require('./routes')(app, db);


//login
app.get('/login', (request, response) => {
    response.render('loginForm');
    // response.send('signin');
});

app.post('/login', (request, response) => {
    let passwordHash = sha256(request.body.password);

    const queryString = 'SELECT id, password_hash FROM users WHERE username = $1';
    const values = [request.body.username];

    db.pool.query(queryString, values, (err, result)  => {
        if (err) {
            response.send('db error: '+ err.message);
        } else { 
            console.log(result.rows);
            if (result.rows[0].password_hash == passwordHash) {
                console.log('logged in!');
                response.cookie('login', 'true');
                response.cookie('user', result.rows[0].id);
                response.redirect('/userHome');
            } else {
                response.send('ur password is wrong');
            }
        }
    });
});


//sign up
app.get('/signup', (request, response) => {
    response.render('signupForm');
});

app.post('/signup', (request, response) => {
    let passwordHash = sha256(request.body.password);

    const queryString = 'INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5)';
    const values = [request.body.username, request.body.first_name, request.body.last_name, request.body.email, passwordHash];

    db.pool.query(queryString, values, (err, result) => {
        if (err) {
            response.send('db error: '+ err.message);
        } else {
            console.log('result');
            console.log(result.rows);
            response.send('argh');
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// Run clean up actions when server shuts down
server.on('close', () => {
  console.log('Closed express server');
  // close database connection pool
});