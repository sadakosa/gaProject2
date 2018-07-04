module.exports = function (db) {

    //creating users
    let userCreate = function (username, email, password_hash, callback) {
        let queryText = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
        const values = [username, email, password_hash];

        db.query(queryText, values, callback);
    }

    //logging users in
    let userLogin = function (email, password_hash, callback) {
        let queryText = 'SELECT id, password_hash FROM users WHERE email = $1';
        const values = [email];

        db.query(queryText, values, callback);
    }

    let userLoginEmailCheck = function(callback) {
        let queryText = 'SELECT * FROM users';

        db.query(queryText, callback);
    }

    return {
        userCreate: userCreate,
        userLogin: userLogin,
        userLoginEmailCheck: userLoginEmailCheck
    }
}