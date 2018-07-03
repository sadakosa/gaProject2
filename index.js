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

const SALT = 'yay';

const cookieParser = require('cookie-parser');

const reactEngine = require('express-react-views').createEngine();

const jsonfile = require('jsonfile');

const methodOverride = require('method-override');

const pg = require('pg');

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

const configs = {
    user: 'sabrinachow',
    host: '127.0.0.1',
    database: 'wireFrame',
    port: 5432
}

const pool = new pg.Pool(configs);

pool.on('error', function(err) {
    console.log('idle client error', err.message, err.stack);
});


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


app.get('/', (request, response) => {
    console.log('goes through');
    response.render('hello');
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