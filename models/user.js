module.exports = function (db) {

    //creating users
    let userCreate = function (username, email, password_hash, callback) {
        let queryText = 'SELECT * FROM users WHERE email = $1';
        let values = [email];

        //query 1 to check email 
        db.query(queryText, values, (err, result) =>{
            if (err) {
                response.send('db error: ' + err.message);
            } else {
                //query 2 to insert data
                console.log('results: ' + result.rows.length)
                if(result.rows.length !== 0){ // already has email
                    callback(false, 'user with same email exists. Please try another email :)');
                } else if (password_hash === 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') {
                    callback(false, 'please enter a password');
                } else if (username === null) {
                    callback(false, 'please enter a username');
                } else {
                    queryText = 'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
                    values = [username, email, password_hash];
                    db.query(queryText, values, (err2, result2) => {
                        if (err) {
                            response.send('db error 2: ' + err.message);
                        } else {
                            // everything is fine
                            callback(true);
                        }
                    })
                }
            }

        });
    }

    //logging users in
    let userLogin = function (email, password_hash, callback) {
        let queryText = 'SELECT id, password_hash FROM users WHERE email = $1';
        const values = [email];

        db.query(queryText, values, callback);
    }

    return {
        userCreate: userCreate,
        userLogin: userLogin,
    }
}