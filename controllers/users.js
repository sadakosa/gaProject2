const sha256 = require('js-sha256');
const SALT = 'yay!';

module.exports = function (db) {
    const get = (request, response) => {
        response.render('hello');
    }

    const login = (request, response) => {
        response.render('loginForm');
    }

    const loginEmailCheck = (request, response) => {
        db.user.userLoginEmailCheck((err, queryResult) => {
            if (err) {
                response.send('db error: ' + err.message);
            } else {
                console.log(queryResult.rows);
                response.send(queryResult);
            }
        });
    }

    const loginCheck = (request, response) => {
        let passwordHash = sha256(request.body.password);

        db.user.userLogin(request.body.email, passwordHash, (err, queryResult)  => {
            if (err) {
                response.send('db error: '+ err.message);
            } else { 
                if (queryResult.rows[0].password_hash == passwordHash) {
                    let user_id = queryResult.rows[0].id;
                    let currentSessionCookie = sha256(user_id + 'logged_id' + SALT);

                    response.cookie('session', currentSessionCookie);
                    response.cookie('loggedin', 'true');
                    response.cookie('user_id', user_id);

                    response.send('logged user in with id: ' + user_id);
                } else {
                    response.send('ur password is wrong');
                }
            }
        });
    }

    const signup = (request, response) => {
        response.render('signupForm');
    }

    const createUser = (request, response) => {
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

    return {
        get: get,
        login: login,
        loginEmailCheck: loginEmailCheck,
        loginCheck: loginCheck,
        signup: signup,
        createUser: createUser
    }
}