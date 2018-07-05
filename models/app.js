module.exports = function (db) {
    let uploadDrawing = function (json, callback) {
        console.log('json', json)
        let queryText= 'UPDATE projects SET details = $1 WHERE id = $2';
        const values = [json, 1];

        db.query(queryText, values, callback);
    }

    let getProjects = function (user_id, callback) { //will have to  take collaborators into consideration later
        let queryText = 'SELECT * FROM projects WHERE creator_id = $1';
        const values = [user_id];

        db.query(queryText, values, callback);
    }

    let getObjects = function (project_id, callback) {
        let queryText = 'SELECT * FROM projects WHERE id = $1';
        const values = [project_id];

        db.query(queryText, values, callback);
    }

    return {
        uploadDrawing: uploadDrawing,
        getProjects: getProjects,
        getObjects: getObjects
    };
}