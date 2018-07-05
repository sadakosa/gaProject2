module.exports = function (db) {
    const drawingBoard = (request, response) => {
        response.cookie('drawingBoard', request.params.id);
        response.render('drawingBoard', {username: request.cookies.username});
    }

    const getObjects = (request, response) => {
        let id = request.cookies.drawingBoard;

        db.apple.getObjects(id, (err, queryResult) => {
            if (err) {
                console.log('db error: ' + err.message);
                response.send('db error: ' + err.message);
            } else {
                response.send(queryResult.rows);
            }
        });
    }        


    const uploadDrawing = (request, response) => {
        console.log(request.body);
        let json = request.body;
        db.apple.uploadDrawing(json, (err, result) => {
            if(err) {
                response.send('db error: ' +  err.message);
            } else {
                response.send(result);
            }
        });
    }

    const getProjects = (request, response) => {
        db.apple.getProjects(request.cookies.user_id, (err, result) => {
            if (err) {
                response.send('db error: ' + err.message);
            } else {
                response.send(result.rows);
            }
        });
    }
    

    return {
        drawingBoard: drawingBoard,
        getObjects: getObjects,
        uploadDrawing: uploadDrawing,
        getProjects: getProjects
    }
}