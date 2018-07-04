module.exports = (app, db) => {
    const users = require('./controllers/users.js')(db);

    app.get('/', users.get);
    
    //login
    app.get('/login', users.login);
    app.get('/loginEmailCheck', users.loginEmailCheck);
    app.post('/login', users.loginCheck);
    
    //signup
    app.get('/signup', users.signup);
    app.post('/signup', users.createUser);

}