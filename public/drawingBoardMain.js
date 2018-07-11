const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
var objArr = [];

var mouseDownState = false;
var mouseX = false;
var mouseY = false;
var count = 0;
var originalPos = (0, 0);
var tempShape = false;
var tempObj = [];






/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Drawing Shapes Centralised

    *************************************************************
    *************************************************************
    *************************************************************
*/
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function onMouseMove (evt) {
    mouseX = getMousePos(c, evt).x;
    mouseY = getMousePos(c, evt).y;
}

function onMouseDown (event) {
    console.log('mouse down');
    // debugger;
    mouseDownState = true;
    originalPos = getMousePos(c, event);
    document.getElementsByTagName('body')[0].addEventListener('mouseup', onMouseUp, false);
}

function onMouseUp () {
    mouseDownState = false;

    if (mouseX) {
        objArr.push(tempObj[0]);
        tempObj.pop();
        changedObject();
    } else {
        tempObj.pop();
    }

    count = 0;
    originalPos = false;
    c.removeEventListener('mousedown', onMouseDown, false);
    document.getElementsByTagName('body')[0].removeEventListener('mouseup', onMouseUp, false);
    sideBarSetup();
}

c.addEventListener('mouseenter', function () {
    c.addEventListener('mousemove', onMouseMove, false);
})

c.addEventListener('mouseleave', function () {
    mouseX = false;
    mouseY = false;
    mouseDownState = false;
    c.removeEventListener('mousedown', onMouseDown, false);
    c.removeEventListener('mousemove', onMouseMove, false);
});

function everRecurringLoop() {
    ctx.clearRect(0, 0, c.width, c.height);
    redrawShapes();
    //drawing tempShapes
    // if(onMouseDown && mouseX) {}; --> drawing squiggly lines 
    if (mouseDownState && mouseX) {
        switch (tempShape) {
            case 'rect':
                ctx.beginPath();
                if (count === 0) {
                    let rect = {};
                    rect.type =  'rect';
                    rect.specs = [originalPos.x, originalPos.y, mouseY-originalPos.y, mouseX-originalPos.x];
                    rect.draw = 'stroke';
                    rect.strokeStyle = 'black';
            
                    tempObj.push(rect);
                    count++;
                } else {
                    count++;
                    tempObj[0].specs = [originalPos.x, originalPos.y, mouseY-originalPos.y, mouseX-originalPos.x]
                    ctx.rect(originalPos.x, originalPos.y, mouseY-originalPos.y, mouseX-originalPos.x);
                    ctx.stroke();
                }
                break;

            case 'circle':
                ctx.beginPath();
                if (count === 0) {
                    let circle = {};
                    circle.type = 'circle';
                    circle.specs = [originalPos.x, originalPos.y, 100, 0, 3];
                    circle.draw = 'stroke';
                    circle.strokeStyle = 'black';
                    count++;
                    tempObj.push(circle);
                } else {
                    count++;
                    tempObj[0].specs = [mouseX, mouseY, 100, 0, 3];
                    ctx.arc(mouseX, mouseY, 100, 0, 3 * Math.PI);
                    ctx.stroke();
                } 
                break;

            case 'text':
                ctx.beginPath();
                if (count === 0) {
                    let text = {};
                    text.type = 'text';
                    text.specs = ['Hello World', originalPos.x, originalPos.y];
                    text.draw = 'fill';
                    text.font = '20px arial';
                    text.strokeStyle = 'black';
                
                    tempObj.push(text);
                    count++;
                } else {
                    count++;
                    console.log('mouseX: ' + mouseX);
                    console.log('mouseY: ' + mouseY);
                    tempObj[0].specs = ['Hello World', mouseX, mouseY];
                    ctx.fillText(tempObj[0].specs[0], tempObj[0].specs[1], tempObj[0].specs[2]);
                }
                break;
            
            case 'line':
                ctx.beginPath();
                if (count === 0) {
                    let line = {};
                    line.type = 'line';
                    line.start = [originalPos.x, originalPos.y];
                    line.end = [mouseX, mouseY];
                    line.strokeStyle = 'black';
                    line.draw = 'stroke';
                    
                    tempObj.push(line);
                    count++;
                } else {
                    count++;
                    tempObj[0].end = [mouseX, mouseY];
                    ctx.moveTo(originalPos.x, originalPos.y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
                break;

            case 'img':
                break;

            default:
                break;
        }
    }
    window.requestAnimationFrame(everRecurringLoop);
}

window.requestAnimationFrame(everRecurringLoop);


/*
    *************************************************************

                    Create Rectangles

    *************************************************************
*/

function drawRectangle () {
    tempShape = 'rect';
    c.addEventListener('mousedown', onMouseDown, false);
    // c.addEventListener('mousedown', drag2drawThingsRect, false);
}


/*
    *************************************************************

                    Create Circles

    *************************************************************
*/

function drawCircle () {
    // ctx.beginPath();
    // ctx.arc(100, 100, 100, 0, 3 * Math.PI);
    // ctx.stroke();

    // let circle = {};
    // circle.type = 'circle';
    // circle.specs = [100, 100, 100, 0, 3];
    // circle.draw = 'stroke';
    // circle.strokeStyle = 'black';

    // objArr.push(circle);
    // sideBarSetup();
    tempShape = 'circle';
    c.addEventListener('mousedown', onMouseDown, false);
}


/*
    *************************************************************

                    Create Text

    *************************************************************
*/

function writeText () {
    tempShape = 'text';
    c.addEventListener('mousedown', onMouseDown, false);
}


/*
    *************************************************************

                    Create Line

    *************************************************************
*/

function drawLine () {
    tempShape = 'line';
    c.addEventListener('mousedown', onMouseDown, false);
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
    ctx.beginPath();
    let fromLeft;
    let fromTop;
    let size;
    let draw;
    let text;
    let font;
    let start;
    let end;

    switch (obj.type) {
        case 'line': 
            start = obj.start;
            end = obj.end;

            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            break;
            
        case 'circle': 
            fromLeft = obj.specs[0];
            fromTop = obj.specs[1];
            size = obj.specs[2];

            ctx.arc(fromLeft, fromTop, size, 0, 2 * Math.PI);
            break;
        case 'rect': 
            fromLeft = obj.specs[0];
            fromTop = obj.specs[1];
            length = obj.specs[2];
            height = obj.specs[3];
            
            ctx.rect(fromLeft, fromTop, length, height);
            break;
        case 'text': 
            text = obj.specs[0];
            fromLeft = obj.specs[1];
            fromTop = obj.specs[2];
            font = obj.font;

            ctx.font = obj.font;
            
            if (draw == 'stroke') {
                ctx.strokeStyle = obj.strokeStyle;
                ctx.strokeText(text, fromLeft, fromTop);
            } else {
                ctx.fillStyle = obj.fillStyle;
                ctx.fillText(text, fromLeft, fromTop);
            }
            break;
       
    }

    if (obj.draw == 'stroke' && obj.type !== 'text') {
        let strokeStyle = obj.strokeStyle;
        ctx.strokeStyle = strokeStyle;
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
        objArr = JSON.parse(this.responseText)[0].details.drawings;
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

function redrawShapes() {
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
    let num = itemsToRemove.length;
    for(let i=num-1; i >= 0; i--) {
        itemsToRemove[i].parentNode.removeChild(itemsToRemove[i]);
    }

    for(let i = objArr.length -1; i >= 0; i--) {
        let item = document.createElement('div');
        item.id = i;
        item.classList.add('items');
        item.innerText = objArr[i].type;
        item.addEventListener('mouseenter', makeRed, false);
        item.addEventListener('mouseleave', makeBlack, false);
        item.addEventListener('click', propertiesSetup, false);
        document.getElementById('objList').appendChild(item);        
    }
}

var tempStyleHover;
function makeRed (event) {
    let id = event.target.id;
    let object = objArr[id];

    if (object.draw == 'stroke') {
        tempStyleHover = object.strokeStyle;
        object.strokeStyle = 'red';
    } else {
        tempStyleHover = object.fillStyle;
        object.fillStyle = 'red';
    }
}

function makeBlack (event) {
    let id = event.target.id;
    let object = objArr[id];

    if (object.draw == 'stroke') {
        object.strokeStyle = tempStyleHover;
    } else {
        object.fillStyle = tempStyleHover;
    }
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