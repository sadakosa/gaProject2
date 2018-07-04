function checkIfUserExists () {
    let email = document.getElementById('');

    let ajaxCall = 'localhost:3000/loginEmailCheck';

    let responseHandler = function () {
        console.log(this.responseText);
        console.log(this.statusText);
        console.log(this.status);
        if(email == dvwefwe) {
            //add a cannot move thing here
        } else {
            //go through with authentification
        }
    }

    //create a new request
    let request = new XMLHttpRequest();
    //listen for request response
    request.addEventListener('load', responseHandler);
    //ready the system by calling open and specifying the url
    request.open('GET', ajaxCall);
    //send the request
    request.send();
}
console.log('whee');


