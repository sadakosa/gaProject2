//Make connection to socket
var socket = io('/drawingBoard/' + id);
socket.on('hi', function(data) {
    alert(data);
})

//Query DOM


//Emit Events
function changedObject () {
    console.log('client side changed object');
    socket.emit('changedObj', {drawings: objArr});
}

//receive events 
socket.on('changedObj', function (data) {
    sideBarSetup();
    objArr = data.drawings;
})

// let connect = function (ns) {
//     return io.connect(ns, {
//        query: 'ns=' + ns,
//        resource: "socket.io"
//     });
// }

// let socket = connect('/drawingBoard/2');



