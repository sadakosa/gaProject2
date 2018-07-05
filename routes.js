module.exports = (app, db) => {
    const users = require('./controllers/users.js')(db);
    const apps = require('./controllers/apps.js')(db);

    app.get('/', users.get);
    
    //login
    app.get('/login', users.login);
    app.post('/loginCheck', users.loginCheck);
    
    //signup
    app.get('/signup', users.signup);
    app.post('/signup', users.createUser);

    //dashboard
    app.get('/dashboard', users.userDashboard);
    app.get('/getProjects', apps.getProjects);

    //drawingBoard
    app.get('/drawingBoard/:id', apps.drawingBoard);
    app.put('/uploadDrawing', apps.uploadDrawing);
    app.get('/getObjects', apps.getObjects)
}