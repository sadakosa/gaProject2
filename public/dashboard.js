function setup () {
    let ajaxCall = '/getProjects';

    let responseHandler = function () {
        let arr = JSON.parse(this.responseText);
        
        let projectBox = document.getElementById('projects');
        for(let i=0; i < arr.length; i++) {
            let project = document.createElement('a');
            let att = document.createAttribute("href");
            att.value = '/drawingBoard/' + arr[i].id;
            project.setAttributeNode(att); 
            project.style.display = 'block';
            project.innerText = arr[i].name;
            project.id = arr[i].id;
            project.classList.add('project');
            projectBox.appendChild(project);
        }
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', responseHandler);
    request.open('GET', ajaxCall);
    request.send();
}




window.onload = setup;