/*
    *************************************************************
    *************************************************************
    *************************************************************

                Make Rectangle Property Bar Forms

    *************************************************************
    *************************************************************
    *************************************************************
*/
function makeRectPros (object, id) {
    let div = document.createElement('div');

    //POSITIONS AND DIMENSIONS
    let startingXName = document.createElement('strong');
    let startingYName = document.createElement('strong');
    let lengthName = document.createElement('strong');
    let heightName = document.createElement('strong');
    let startingX = document.createElement('input');
    let startingY = document.createElement('input');
    let length = document.createElement('input');
    let height = document.createElement('input');

    startingXName.innerText = 'Starting X: ';
    startingX.setAttribute('type', 'text');
    startingX.setAttribute('id', 'startingX');
    startingX.setAttribute('value', object.specs[0]);

    startingYName.innerText = 'Starting Y: ';
    startingY.setAttribute('type', 'text');
    startingY.setAttribute('id', 'startingY');
    startingY.setAttribute('value', object.specs[1]);

    lengthName.innerText = 'Length: ';
    length.setAttribute('type', 'text');
    length.setAttribute('id', 'length');
    length.setAttribute('value', object.specs[2]);

    heightName.innerText = 'Height: ';
    height.setAttribute('type', 'text');
    height.setAttribute('id', 'height');
    height.setAttribute('value', object.specs[3]);

    //adding stuff to form
    div.appendChild(startingXName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingX);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingYName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingY);
    div.appendChild(document.createElement('br'));
    div.appendChild(lengthName);
    div.appendChild(document.createElement('br'));
    div.appendChild(length);
    div.appendChild(document.createElement('br'));
    div.appendChild(heightName);
    div.appendChild(document.createElement('br'));
    div.appendChild(height);
    div.appendChild(document.createElement('br'));



    //STROKE OR FILL
    let strokeOrFillName = document.createElement('strong');
    let strokeOrFill = document.createElement('select');
    let stroke = document.createElement('option');
    let fill = document.createElement('option');

    strokeOrFillName.innerText = 'Stroke or Fill?';
    stroke.innerText = 'stroke';
    fill.innerText = 'fill';
    strokeOrFill.setAttribute('id', 'strokeOrFill');
    stroke.setAttribute('value', 'stroke');
    fill.setAttribute('value', 'fill');

    if (object.draw == 'stroke') {
        strokeOrFill.value = stroke;
    } else {
        strokeOrFill.value = fill;
    }

    strokeOrFill.appendChild(stroke);
    strokeOrFill.appendChild(fill);
    
    div.appendChild(strokeOrFillName);
    div.appendChild(document.createElement('br'));
    div.appendChild(strokeOrFill);
    div.appendChild(document.createElement('br'));






    //STROKE OR FILL STYLE
    let styleName = document.createElement('strong');
    let style = document.createElement('select')
    let red = document.createElement('option');
    let black = document.createElement('option');
    let blue = document.createElement('option');
    let green = document.createElement('option');

    styleName.innerText = 'Color: '
    red.innerText = 'red';
    black.innerText = 'black';
    blue.innerText = 'blue';
    green.innerText = 'green';
    style.setAttribute('id', 'style');
    red.setAttribute('value', 'red');
    black.setAttribute('value', 'black');
    blue.setAttribute('value', 'blue');
    green.setAttribute('value', 'green');
    
    style.appendChild(red);
    style.appendChild(black);
    style.appendChild(blue);
    style.appendChild(green);

    switch (tempStyleClick) {
        case 'red':
            style.value = red;
            break;
        case 'black':
            style.value = black;
            break;
        case 'green':
            style.value = green;
            break;
        case 'blue':
            style.value = blue;
            break;
    }

    div.appendChild(styleName);
    div.appendChild(document.createElement('br'));
    div.appendChild(style);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));
    



    //SUBMIT BUTTON
    let submitButton = document.createElement('div');
    submitButton.classList.add('btn');
    submitButton.classList.add('btn-primary');
    submitButton.innerText = 'Update!';
    submitButton.addEventListener('click', () => {
        changeRectPros(id);
    });


    //DELETE BUTTON
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.innerText = 'Delete!';
    deleteButton.addEventListener('click', () => {
        deleteObject(id);
    });


    div.appendChild(submitButton);
    div.appendChild(deleteButton);
    return div;
}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                Make Circle Property Bar Forms

    *************************************************************
    *************************************************************
    *************************************************************
*/

function makeCirclePros (object, id) {
    let div = document.createElement('div');
    
    //POSITIONS AND DIMENSOPMS
    let startingXName = document.createElement('strong');
    let startingYName = document.createElement('strong');
    let diameterName = document.createElement('strong');
    let startingX = document.createElement('input');
    let startingY = document.createElement('input');
    let diameter = document.createElement('input');

    startingXName.innerText = 'Starting X: ';
    startingX.setAttribute('type', 'text');
    startingX.setAttribute('id', 'startingX');
    startingX.setAttribute('value', object.specs[0]);

    startingYName.innerText = 'Starting Y: ';
    startingY.setAttribute('type', 'text');
    startingY.setAttribute('id', 'startingY');
    startingY.setAttribute('value', object.specs[1]);

    diameterName.innerText = 'Diameter: ';
    diameter.setAttribute('type', 'text');
    diameter.setAttribute('id', 'diameter');
    diameter.setAttribute('value', object.specs[2]);

    //adding stuff to form
    div.appendChild(startingXName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingX);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingYName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingY);
    div.appendChild(document.createElement('br'));
    div.appendChild(diameterName);
    div.appendChild(document.createElement('br'));
    div.appendChild(diameter);
    div.appendChild(document.createElement('br'));



    //STROKE OR FILL
    let strokeOrFillName = document.createElement('strong');
    let strokeOrFill = document.createElement('select');
    let stroke = document.createElement('option');
    let fill = document.createElement('option');

    strokeOrFillName.innerText = 'Stroke or Fill?';
    stroke.innerText = 'stroke';
    fill.innerText = 'fill';
    strokeOrFill.setAttribute('id', 'strokeOrFill');
    stroke.setAttribute('value', 'stroke');
    fill.setAttribute('value', 'fill');

    if (object.draw == 'stroke') {
        strokeOrFill.value = stroke;
    } else {
        strokeOrFill.value = fill;
    }

    strokeOrFill.appendChild(stroke);
    strokeOrFill.appendChild(fill);
    
    div.appendChild(strokeOrFillName);
    div.appendChild(document.createElement('br'));
    div.appendChild(strokeOrFill);
    div.appendChild(document.createElement('br'));






    //STROKE OR FILL STYLE
    let styleName = document.createElement('strong');
    let style = document.createElement('select')
    let red = document.createElement('option');
    let black = document.createElement('option');
    let blue = document.createElement('option');
    let green = document.createElement('option');

    styleName.innerText = 'Color: '
    red.innerText = 'red';
    black.innerText = 'black';
    blue.innerText = 'blue';
    green.innerText = 'green';
    style.setAttribute('id', 'style');
    red.setAttribute('value', 'red');
    black.setAttribute('value', 'black');
    blue.setAttribute('value', 'blue');
    green.setAttribute('value', 'green');
    
    style.appendChild(red);
    style.appendChild(black);
    style.appendChild(blue);
    style.appendChild(green);

    switch (tempStyleClick) {
        case 'red':
            style.value = red;
            break;
        case 'black':
            style.value = black;
            break;
        case 'green':
            style.value = green;
            break;
        case 'blue':
            style.value = blue;
            break;
    }

    div.appendChild(styleName);
    div.appendChild(document.createElement('br'));
    div.appendChild(style);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));




    //SUBMIT BUTTON
    let submitButton = document.createElement('div');
    submitButton.classList.add('btn');
    submitButton.classList.add('btn-primary');
    submitButton.innerText = 'Update!';
    submitButton.addEventListener('click', () => {
        changeCirclePros(id);
    });


    div.appendChild(submitButton);





    //DELETE BUTTON
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.innerText = 'Delete!';
    deleteButton.addEventListener('click', () => {
        deleteObject(id);
    });


    div.appendChild(submitButton);
    div.appendChild(deleteButton)
    return div;
}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                Make Text Property Bar Forms

    *************************************************************
    *************************************************************
    *************************************************************
*/

function makeTextPros (object, id) {
    let div = document.createElement('div');
    
    //POSITIONS AND DIMENSOPMS
    let startingXName = document.createElement('strong');
    let startingYName = document.createElement('strong');
    let startingX = document.createElement('input');
    let startingY = document.createElement('input');


    startingXName.innerText = 'Starting X: ';
    startingX.setAttribute('type', 'text');
    startingX.setAttribute('id', 'startingX');
    startingX.setAttribute('value', object.specs[1]);

    startingYName.innerText = 'Starting Y: ';
    startingY.setAttribute('type', 'text');
    startingY.setAttribute('id', 'startingY');
    startingY.setAttribute('value', object.specs[2]);

    //adding stuff to form
    div.appendChild(startingXName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingX);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingYName);
    div.appendChild(document.createElement('br'));
    div.appendChild(startingY);
    div.appendChild(document.createElement('br'));






    //TEXT OPTIONS
    let textName = document.createElement('strong');
    let text = document.createElement('input');
    
    textName.innerText = 'Text: ';
    text.setAttribute('type', 'text');
    text.setAttribute('id', 'text');
    text.setAttribute('value', object.specs[0]);

    div.appendChild(textName);
    div.appendChild(document.createElement('br'));
    div.appendChild(text);
    div.appendChild(document.createElement('br'));



    //FONTSIZE OPTIONS
    let fontsizeName = document.createElement('strong');
    let fontsize = document.createElement('select');
    fontsizeName.innerText = 'Font Size: ';
    fontsize.setAttribute('id', 'fontsize');
    let fontsize12 = document.createElement('option');
    let fontsize14 = document.createElement('option');
    let fontsize16 = document.createElement('option');
    let fontsize18 = document.createElement('option');
    let fontsize20 = document.createElement('option');
    let fontsize24 = document.createElement('option');
    let fontsize36 = document.createElement('option');
    let fontsize48 = document.createElement('option');
    let fontsize60 = document.createElement('option');
    let fontsize72 = document.createElement('option');

    fontsize12.innerText = '12';
    fontsize12.setAttribute('value', '12');
    fontsize14.innerText = '14';
    fontsize14.setAttribute('value', '14');
    fontsize16.innerText = '16';
    fontsize16.setAttribute('value', '16');
    fontsize18.innerText = '18';
    fontsize18.setAttribute('value', '18');
    fontsize20.innerText = '20';
    fontsize20.setAttribute('value', '20');
    fontsize24.innerText = '24';
    fontsize24.setAttribute('value', '24');
    fontsize36.innerText = '36';
    fontsize36.setAttribute('value', '36');
    fontsize48.innerText = '48';
    fontsize48.setAttribute('value', '48');
    fontsize60.innerText = '60';
    fontsize60.setAttribute('value', '60');
    fontsize72.innerText = '72';
    fontsize72.setAttribute('value', '72');

    fontsize.appendChild(fontsize12);
    fontsize.appendChild(fontsize14);
    fontsize.appendChild(fontsize16);
    fontsize.appendChild(fontsize18);
    fontsize.appendChild(fontsize20);
    fontsize.appendChild(fontsize24);
    fontsize.appendChild(fontsize36);
    fontsize.appendChild(fontsize48);
    fontsize.appendChild(fontsize60);
    fontsize.appendChild(fontsize72);

    div.appendChild(fontsizeName);
    div.appendChild(document.createElement('br'));
    div.appendChild(fontsize);
    div.appendChild(document.createElement('br'));


    

    //FONT TYPE OPTIONS
    let fontName = document.createElement('strong');
    let font = document.createElement('select');
    fontName.innerText = 'Font Style: ';

    font.setAttribute('id', 'font');
    let fontArial = document.createElement('option');
    let fontTNR = document.createElement('option');
    let fontSans = document.createElement('option');

    fontArial.innerText = 'Arial';
    fontArial.setAttribute('value', 'Arial');
    fontTNR.innerText = 'Times New Roman';
    fontTNR.setAttribute('value', 'Times New Roman');
    fontSans.innerText = 'Sans Serif';
    fontSans.setAttribute('value', 'Sans Serif');

    font.appendChild(fontArial);
    font.appendChild(fontTNR);
    font.appendChild(fontSans);

    let tempValue = object.font;
    switch (tempValue.split('').splice(0,5).join('')) {
        case 'Arial':
            font.value = fontArial;
            break;
        case 'Times New Roman':
            font.value = fontTNR;
            break;
        case 'Sans Serif':
            font.value = fontSans;
            break;
    }

    div.appendChild(fontName);
    div.appendChild(document.createElement('br'));
    div.appendChild(font);
    div.appendChild(document.createElement('br'));




    //STROKE OR FILL
    let strokeOrFillName = document.createElement('strong');
    let strokeOrFill = document.createElement('select');
    let stroke = document.createElement('option');
    let fill = document.createElement('option');

    strokeOrFillName.innerText = 'Stroke or Fill?';
    stroke.innerText = 'stroke';
    fill.innerText = 'fill';
    strokeOrFill.setAttribute('id', 'strokeOrFill');
    stroke.setAttribute('value', 'stroke');
    fill.setAttribute('value', 'fill');

    if (object.draw == 'stroke') {
        strokeOrFill.value = stroke;
    } else {
        strokeOrFill.value = fill;
    }

    strokeOrFill.appendChild(stroke);
    strokeOrFill.appendChild(fill);
    
    div.appendChild(strokeOrFillName);
    div.appendChild(document.createElement('br'));
    div.appendChild(strokeOrFill);
    div.appendChild(document.createElement('br'));






    //STROKE OR FILL STYLE
    let styleName = document.createElement('strong');
    let style = document.createElement('select')
    let red = document.createElement('option');
    let black = document.createElement('option');
    let blue = document.createElement('option');
    let green = document.createElement('option');

    styleName.innerText = 'Color: '
    red.innerText = 'red';
    black.innerText = 'black';
    blue.innerText = 'blue';
    green.innerText = 'green';
    style.setAttribute('id', 'style');
    red.setAttribute('value', 'red');
    black.setAttribute('value', 'black');
    blue.setAttribute('value', 'blue');
    green.setAttribute('value', 'green');
    
    style.appendChild(red);
    style.appendChild(black);
    style.appendChild(blue);
    style.appendChild(green);

    switch (tempStyleClick) {
        case 'red':
            style.value = red;
            break;
        case 'black':
            style.value = black;
            break;
        case 'green':
            style.value = green;
            break;
        case 'blue':
            style.value = blue;
            break;
    }

    div.appendChild(styleName);
    div.appendChild(document.createElement('br'));
    div.appendChild(style);
    div.appendChild(document.createElement('br'));
    div.appendChild(document.createElement('br'));




    //SUBMIT BUTTON
    let submitButton = document.createElement('div');
    submitButton.classList.add('btn');
    submitButton.classList.add('btn-primary');
    submitButton.innerText = 'Update!';
    submitButton.addEventListener('click', () => {
        changeTextPros(id);
    });


    //DELETE BUTTON
    let deleteButton = document.createElement('div');
    deleteButton.classList.add('btn');
    deleteButton.classList.add('btn-danger');
    deleteButton.innerText = 'Delete!';
    deleteButton.addEventListener('click', () => {
        deleteObject(id);
    });


    div.appendChild(submitButton);
    div.appendChild(deleteButton)
    return div;
}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                Make Line Property Bar Forms

    *************************************************************
    *************************************************************
    *************************************************************
*/
function makeLinePros (object,  id) {


}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Update Object Properties

    *************************************************************
    *************************************************************
    *************************************************************
*/
function changeRectPros (id) {
    //change object array properties
    let startingX = document.getElementById('startingX').value;
    let startingY = document.getElementById('startingY').value;
    let length = document.getElementById('length').value;
    let height = document.getElementById('height').value;
    let strokeOrFill = document.getElementById('strokeOrFill').value;
    let style = document.getElementById('style').value;

    objArr[id].specs = [startingX, startingY, length, height];
    objArr[id].draw = strokeOrFill;
    if (strokeOrFill == 'stroke') {
        objArr[id].strokeStyle = style;
    } else {
        objArr[id].fillStyle = style;
    }
    

    //adding event listener
    let sidebarItem = document.getElementById(id);
    sidebarItem.addEventListener('mouseleave', makeBlack, false);
    clearProperties();
}

function changeCirclePros (id) {
    //change object array properties
    let startingX = document.getElementById('startingX').value;
    let startingY = document.getElementById('startingY').value;
    let diameter = document.getElementById('diameter').value;
    let strokeOrFill = document.getElementById('strokeOrFill').value;
    let style = document.getElementById('style').value;

    objArr[id].specs = [startingX, startingY, diameter, 0, 3];
    objArr[id].draw = strokeOrFill;
    if (strokeOrFill == 'stroke') {
        objArr[id].strokeStyle = style;
    } else {
        objArr[id].fillStyle = style;
    }
    

    //adding event listener
    let sidebarItem = document.getElementById(id);
    sidebarItem.addEventListener('mouseleave', makeBlack, false);
    clearProperties();
}

// text.specs = ['Hello World', originalPos.x, originalPos.y];
// text.font = '20px Arial';
function changeTextPros (id) {
    //change object array properties
    let startingX = document.getElementById('startingX').value;
    let startingY = document.getElementById('startingY').value;
    let text = document.getElementById('text').value;
    let fontsize = document.getElementById('fontsize').value;
    let font = document.getElementById('font').value;
    let strokeOrFill = document.getElementById('strokeOrFill').value;
    let style = document.getElementById('style').value;

    console.log([text, startingX, startingY]);
    console.log(fontsize + 'px ' + font);
    objArr[id].specs = [text, startingX, startingY];
    objArr[id].font = fontsize + 'px ' + font;
    objArr[id].draw = strokeOrFill;
    if (strokeOrFill == 'stroke') {
        objArr[id].strokeStyle = style;
    } else {
        objArr[id].fillStyle = style;
    }
    
    debugger;

    //adding event listener
    let sidebarItem = document.getElementById(id);
    sidebarItem.addEventListener('mouseleave', makeBlack, false);
    clearProperties();
}

function changeLinePros () {
    clearProperties();
}

/*
    *************************************************************
    *************************************************************
    *************************************************************

                            Delete Object

    *************************************************************
    *************************************************************
    *************************************************************
*/

function deleteObject (id) {
    objArr.splice(id, 1);
    sideBarSetup();
    clearProperties();
}


/*
    *************************************************************
    *************************************************************
    *************************************************************

                    Property Bar Centralised

    *************************************************************
    *************************************************************
    *************************************************************
*/
var tempStyleClick;
function propertiesSetup (event) {
    if (objArr[event.target.id].draw === 'fill') {
        tempStyleClick = objArr[event.target.id].fillStyle;
    } else {
        tempStyleClick = objArr[event.target.id].strokeStyle;
    }
    
    makeRed(event);
    event.target.removeEventListener('mouseleave', makeBlack, false);

    clearProperties();

    //create the form
    let object = objArr[event.target.id];
    let form = document.createElement('form');
    let shape = document.createElement('h3');
    shape.innerText = object.type;
    form.appendChild(shape);

    switch (object.type) {
        case 'rect':
            form.appendChild(makeRectPros(object, event.target.id));
            break;
        case 'circle':
            form.appendChild(makeCirclePros(object, event.target.id));
            break;
        case 'text':
            form.appendChild(makeTextPros(object, event.target.id));
            break;
        case 'line':
            form.appendChild(makeLinePros(object, event.target.id));
            break;
    }
    proList.appendChild(form);
}


function clearProperties () {
    let proList = document.getElementById('proList');
    //delete the previous stuff from the properties list
    let num = proList.childNodes.length;
    for (let i=num-1; i>=0; i--) {
        proList.childNodes[i].parentNode.removeChild(proList.childNodes[i]);
    }
}