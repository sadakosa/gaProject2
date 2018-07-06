var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var objArr = [];










function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    console.log(evt);
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Create Rectangles

    *************************************************************
    *************************************************************
    *************************************************************
*/
var count;  
var originalPos;
function drawWhenMoveRect (rectButEvt) {
    ctx.clearRect(0, 0, c.width, c.height);
    let mousePos = getMousePos(c, rectButEvt);
    
    if (count === 0) {
        let rect = {};
        rect.type =  'rect';
        rect.specs = [originalPos.x, originalPos.y, mousePos.y-originalPos.y, mousePos.x-originalPos.x];
        rect.draw = 'stroke';
        rect.strokeStyle = 'black';

        objArr.push(rect);
    } else {
        objArr[objArr.length-1].specs = [originalPos.x, originalPos.y, mousePos.y-originalPos.y, mousePos.x-originalPos.x]
    }
    
    redrawShapes();
    count ++;
}

function drag2drawThingsRect (rectButEvt) {
    // window.requestAnimationFrame(drag2drawThings(thing, evt));
    console.log('mousedown');
    c.addEventListener('mouseup', newThingRect, false);

    originalPos = getMousePos(c, rectButEvt);
    count = 0;
    c.addEventListener('mousemove', drawWhenMoveRect, false);
}

function newThingRect() {
    c.removeEventListener('mousedown', drag2drawThingsRect, false);
    ctx.clearRect(0, 0, c.width, c.height);
    redrawShapes();
    sideBarSetup();
    c.removeEventListener('mousemove', drawWhenMoveRect, false);
    c.removeEventListener('mouseup', newThingRect, false);
    count = 0;
} 

function drawRectangle () {
    c.addEventListener('mousedown', drag2drawThingsRect, false);
}




/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Create Circles

    *************************************************************
    *************************************************************
    *************************************************************
*/

function drawCircle () {
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, 3 * Math.PI);
    ctx.stroke();

    let circle = {};
    circle.type = 'circle';
    circle.specs = [100, 100, 100, 0, 3];
    circle.draw = 'stroke';
    circle.strokeStyle = 'black';

    objArr.push(circle);
    sideBarSetup();
}






/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Create Text

    *************************************************************
    *************************************************************
    *************************************************************
*/
function drawThingsText (lineButEvt) {
    originalPos = getMousePos(c, lineButEvt);

    let text = {};
    text.type = 'text';
    text.specs = ['Hello World', originalPos.x, originalPos.y];
    text.draw = 'fill';
    text.font = '20px Arial';
    text.strokeStyle = 'black';

    objArr.push(text);

    ctx.clearRect(0, 0, c.width, c.height);
    redrawShapes();
    sideBarSetup();
    c.removeEventListener('click', drawThingsText, false);
}

function writeText () {
    c.addEventListener('click', drawThingsText, false);
}




/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Create Line

    *************************************************************
    *************************************************************
    *************************************************************
*/
function drawWhenMoveLine (lineButEvt) {
    ctx.clearRect(0, 0, c.width, c.height);
    let mousePos = getMousePos(c, lineButEvt);
    
    if (count === 0) {
        let line = {};
        line.type = 'line';
        line.start = [originalPos.x, originalPos.y];
        line.end = [mousePos.x, mousePos.y];
        line.strokeStyle = 'black';

        objArr.push(line);
    } else {
        objArr[objArr.length-1].end = [mousePos.x, mousePos.y];
    }
    
    redrawShapes();
    count ++;
}

function drag2drawThingsLine (lineButEvt) {
    // window.requestAnimationFrame(drag2drawThings(thing, evt));
    console.log('mousedown');
    c.addEventListener('mouseup', newThingLine, false);

    originalPos = getMousePos(c, lineButEvt);
    count = 0;
    c.addEventListener('mousemove', drawWhenMoveLine, false);
}

function newThingLine () {
    c.removeEventListener('mousedown', drag2drawThingsLine, false);
    ctx.clearRect(0, 0, c.width, c.height);
    redrawShapes();
    sideBarSetup();
    c.removeEventListener('mousemove', drawWhenMoveLine, false);
    c.removeEventListener('mouseup', newThingLine, false);
    count = 0;
} 

function drawLine () {
    console.log('line')
    c.addEventListener('mousedown', drag2drawThingsLine, false);
}







/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Save Objects to the DB

    *************************************************************
    *************************************************************
    *************************************************************
*/
function save () {
    let ajaxUrl = "/uploadDrawing";

    let responseHandler = function () {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    }

    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("PUT", ajaxUrl);
    // send the request
    request.setRequestHeader('Content-Type', 'application/json');
    let drawings = JSON.stringify({drawings: objArr});
    // request.send({drawings: objArr});
    request.send(drawings);
}








/*
    *************************************************************
    *************************************************************
    *************************************************************

                Drawing the shapes based on database

    *************************************************************
    *************************************************************
    *************************************************************
*/

function checkAndDraw (obj) {
    let fromLeft;
    let fromTop;
    let size;
    let draw;
    let text;
    let font;
    let start;
    let end;

    switch (obj.type) {
        case 'circle': 
            fromLeft = obj.specs[0];
            fromTop = obj.specs[1];
            size = obj.specs[2];
            draw = obj.draw;

            ctx.beginPath();
            ctx.arc(fromLeft, fromTop, size, 0, 2 * Math.PI);
            break;
        case 'rect': 
            fromLeft = obj.specs[0];
            fromTop = obj.specs[1];
            length = obj.specs[2];
            height = obj.specs[3];
            draw = obj.draw;
            
            ctx.rect(fromLeft, fromTop, length, height);
            break;
        case 'text': 
            console.log('whee')
            text = obj.specs[0];
            fromLeft = obj.specs[1];
            fromTop = obj.specs[2];
            font = obj.font;
            draw = obj.draw;

            ctx.font = obj.font;
            
            if (draw == 'stroke') {
                ctx.strokeText(text, fromLeft, fromTop);
            } else {
                ctx.fillText(text, fromLeft, fromTop);
            }
            break;
        case 'line': 
            start = obj.start;
            end = obj.end;

            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
            break;
    }

    if (draw == 'stroke' && obj.type !== 'text') {
        let strokeStyle = obj.strokeStyle;
        ctx.strokeStyle = strokeStyle;
        console.log(obj.type, obj.strokeStyle)
        ctx.stroke();
    } else if (obj.type !== 'text' && obj.type !== 'line'){
        let fillStyle = obj.fillStyle;
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
}

function getObjFromDb () {
    let ajaxUrl = '/getObjects';

    let responseHandler = function () {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
        
        const response = JSON.parse(this.responseText)[0];
        if (response.details) {objArr = response.details.drawings;}

        redrawShapes();
        sideBarSetup();
    }
    
    // make a new request
    let request = new XMLHttpRequest();
    // listen for the request response
    request.addEventListener("load", responseHandler);
    // ready the system by calling open, and specifying the url
    request.open("GET", ajaxUrl);
    // send the request
    request.send();
}

function redrawShapes () {
    for(let i=0; i  < objArr.length; i++) {
        checkAndDraw(objArr[i]);
    }
}



/*
    *************************************************************
    *************************************************************
    *************************************************************

                    SideBar Setup

    *************************************************************
    *************************************************************
    *************************************************************
*/
function sideBarSetup () {
    let itemsToRemove = document.getElementsByClassName('items');
    console.log(itemsToRemove);
    let num = itemsToRemove.length;
    for(let i=num-1; i >= 0; i--) {
        console.log(i)
        itemsToRemove[i].parentNode.removeChild(itemsToRemove[i]);
    }

    for(let i = objArr.length -1; i >= 0; i--) {
        let item = document.createElement('div');
        item.id = i;
        item.classList.add('items');
        item.innerText = objArr[i].type;
        // item.addEventListener('mouseover', makeRed, false);
        // item.addEventListener('mouseout', makeBlack, false);
        item.addEventListener('click', propertiesSetup, false);
        document.getElementById('objList').appendChild(item);        
    }
}


function propertiesSetup (event) {
    console.log('yay');
    let id = event.target.id;
    let object = objArr[id];
    console.log(id);
    console.log(objArr[id]);

    if (object.draw == 'stroke') {
        object.strokeStyle = 'red';
    } else {
        object.fillStyle = 'red';
    }

    redrawShapes();
}

function makeRed (event) {
    let id = event.target.id;
    let object = objArr[id];

    if (object.draw == 'stroke') {
        object.strokeStyle = 'red';
    } else {
        object.fillStyle = 'red';
    }

    redrawShapes();
}

function makeBlack (event) {
    let id = event.target.id;
    let object = objArr[id];

    if (object.draw == 'stroke') {
        object.strokeStyle = 'black';
    } else {
        object.fillStyle = 'black';
    }

    redrawShapes();
}




/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Page Setup

    *************************************************************
    *************************************************************
    *************************************************************
*/
document.getElementById('rect').addEventListener('click', drawRectangle);
document.getElementById('cir').addEventListener('click', drawCircle);
document.getElementById('text').addEventListener('click', writeText);
document.getElementById('line').addEventListener('click', drawLine);
document.getElementById('save').addEventListener('click', save);


window.onload = getObjFromDb;