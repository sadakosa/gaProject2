const sha256 = require('js-sha256');

module.exports = function (db) {
    const get = (request, response) => {
        response.render('hello');
    }

    const create = (request, response) => {
        let password_hash = sha256(request.body.password);
        
        db.user.userCreate(request.body.username, request.body.email, password_hash, (err, queryResult) => {
            if(err) {
                response.send('db error: ' + err.message);
            } else {
                let user_id = queryResult.rows[0].id;
                let currentSessionCookie = sha256(user_id + 'logged_id' + SALT);

                response.cookie('session', currentSessionCookie);
                response.cookie('loggedin', 'true');
                response.cookie('user_id', user_id);

                response.send('created user with id: ' + user_id);
            }
        });
    }

    const login = (request, response) => {
        let password_hash = sha256(request.body.password);

        db.user.userLogin(request.body.email, password_hash, (err, queryResult) => {
            if (err) {
                response.send('db error: ' + err.message);
            } else {
                
            }
        })
    }

    return {
        get: get,
        create: create,
        login: login
    }
}