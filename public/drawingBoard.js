var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var objArr = [];


function drawRectangle () {
    c.addEventListener('onmousedown', function () {
        window.requestAnimationFrame()
        ctx.clearRect(0, 0, c.width, c.height);
    })
    ctx.rect(40,20,150,100);
    ctx.stroke();

    let rect = {};
    rect.type =  'rect';
    rect.specs = [40,20,150,100];
    rect.draw = 'stroke';
    rect.stokeStyle = 'red';

    objArr.push(rect);
}

function drawCircle () {
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, 3 * Math.PI);
    ctx.stroke();

    let circle = {};
    circle.type = 'circle';
    circle.specs = [100, 100, 100, 0, 3];
    circle.draw = 'stroke';

    objArr.push(circle);
}

function writeText () {
    console.log('text');
    ctx.font = "20px Arial";
    ctx.fillText("Hello World", 10, 50);
    // ctx.strokeText("Hello World", 10, 50);

    let text = {};
    text.type = 'text';
    text.specs = ['Hello World', 10, 50];
    text.draw = 'fill';
    text.font = '20px Arial';

    objArr.push(text);
}

function drawLine () {
    console.log('line');
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();

    let line = {};
    line.type = 'line';
    line.start = [0, 0];
    line.end = [200, 100];

    objArr.push(line);
}








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









//drawing the shapes based on database
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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
        //let strokeStyle = obj.strokeStyle;
        //ctx.strokeStyle(strokeStyle);
        ctx.stroke();
    } else if (obj.type !== 'text' && obj.type !== 'line'){
        ctx.fill();
    }
}

function redrawShapes () {
    let ajaxUrl = '/getObjects';

    let responseHandler = function () {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);

        objArr = JSON.parse(this.responseText)[0].details.drawings;
        // console.log(this.responseText[0]);

        for(let i=0; i  < objArr.length; i++) {
            checkAndDraw(objArr[i]);
        }
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


document.getElementById('rect').addEventListener('click', drawRectangle);
document.getElementById('cir').addEventListener('click', drawCircle);
document.getElementById('text').addEventListener('click', writeText);
document.getElementById('line').addEventListener('click', drawLine);
document.getElementById('save').addEventListener('click', save);


window.onload = redrawShapes;