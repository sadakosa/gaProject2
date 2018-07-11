function getOwnProjects () {
    let ajaxCall = '/getOwnProjects';

    let responseHandler = function () {
        let arr = JSON.parse(this.responseText);
        
        let projectBox = document.getElementById('ownProjects');
        for(let i=0; i < arr.length; i++) {
            let box = document.createElement('div');
            box.style.height = '50px';
            box.style.width = '200px';
            box.style.border = '1px solid black';
            
            //link to drawing board
            let project = document.createElement('a');
            let att = document.createAttribute("href");
            att.value = '/drawingBoard/' + arr[i].id;
            project.setAttributeNode(att); 
            project.innerText = arr[i].name;
            project.id = arr[i].id;
            project.classList.add('project');

            //sharing link
            let shareLink = document.createElement('div');
            shareLink.addEventListener('click', function () {
                shareProject(arr[i].id);
            });
            shareLink.innerText = "Add Collaborators";
            shareLink.style.color = 'green';

            box.appendChild(project);
            box.appendChild(shareLink);
            projectBox.appendChild(box);
        }
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', responseHandler);
    request.open('GET', ajaxCall);
    request.send();
}







function shareProject (projectId) {
    let id = prompt('please type the id of the person you want to share this with:');

    let ajaxCall = '/shareProject' + '?user_id=' + id + '&id=' + projectId;
    let responseHandler = function () {

    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', responseHandler);
    request.open('POST', ajaxCall);
    request.send();
}










function getSharedProjects () {
    let ajaxCall = '/getSharedProjects';

    let responseHandler = function () {
        let arr = JSON.parse(this.responseText);
        console.log(arr);
        
        let projectBox = document.getElementById('sharedProjects');
        for(let i=0; i < arr.length; i++) {
            let box = document.createElement('div');
            box.style.height = '50px';
            box.style.width = '200px';
            box.style.border = '1px solid black';

            let project = document.createElement('a');
            let att = document.createAttribute("href");
            att.value = '/drawingBoard/' + arr[i].projects_id;
            project.setAttributeNode(att); 
            project.style.display = 'block';
            project.innerText = arr[i].name;
            project.id = arr[i].projects_id;
            project.classList.add('project');
            projectBox.appendChild(project);

            box.appendChild(project);
            projectBox.appendChild(box);
        }
    }

    let request = new XMLHttpRequest();
    request.addEventListener('load', responseHandler);
    request.open('GET', ajaxCall);
    request.send();
}






function setup () {
    getOwnProjects();
    getSharedProjects();
}

window.onload = setup;