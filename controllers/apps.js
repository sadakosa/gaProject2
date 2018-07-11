module.exports = function (db, io) {
    let socketRooms = {};

    const drawingBoard = (request, response) => {
        let id = request.params.id;
        
        //Socket Setup
        socketRooms[id] = io.of('/drawingBoard/' + id);

        socketRooms[id].on('connection', function (socket) {
            console.log('made socket connection', socket.id);
            socketRooms[id].emit('hi', 'Hello!');
        });

        socketRooms[id].on('changedObj', function (data) {
            console.log('changed object');
            io.socketRooms[id].emit('changedObj', data);
        })

        //cookies and rendering jsx template
        response.cookie('drawingBoard', id);
        response.render('drawingBoard', {username: request.cookies.username, id: id});
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
        db.apple.uploadDrawing(json, request.cookies.drawingBoard, (err, result) => {
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