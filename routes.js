module.exports = (app, db) => {
    const users = require('./controllers/users.js')(db);

    app.get('/', users.get);
    // app.get('/', users.get);
    // app.get('/', users.get);

}