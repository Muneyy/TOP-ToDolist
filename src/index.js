import './style.css';
import * as DOMStuff from './modules/DOMStuff';
import * as projectFactory from './modules/projectFactory';
import * as cardFunctionalitiesDOM from "./modules/cardFunctionalitiesDOM";
import * as initialize from "./modules/initialize";
import {eventsListener} from "./modules/eventsListener"


let projectArray = [];
let projects = [];

// reset button to clear local storage
const clearWindow = document.querySelector(".clear-window");
clearWindow.addEventListener('click', () => {
    window.localStorage.clear();
});

// loads up all javascript arrays
if (window.localStorage.getItem('projectArray')) {
    projectArray = JSON.parse(localStorage.getItem('projectArray')); 
    projects = JSON.parse(localStorage.getItem('projects'));
    projectArray.forEach(project => {
        let index = projectArray.indexOf(project, 0);
        project.index = index;
        const card = DOMStuff.appendToProject(project, project.selected);
        cardFunctionalitiesDOM.assignCardID(card, project, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);
        cardFunctionalitiesDOM.addRemoveFunctionality(card, project, index, projectArray, projectArray);

        // TEST if on-load we can display previously selected project
        if (project.selected == 1) {
            // wipe DOM content of project tab
            // const content = document.querySelector(".content-project");
            // while(content.firstChild) {
            //     content.removeChild(content.firstChild);
            // };

            // wipe DOM content of tasks tab
            const contentToDo = document.querySelector(".content-todo");
            while(contentToDo.firstChild) {
                contentToDo.removeChild(contentToDo.firstChild);
            };

            // add DOM content (tasks) of the selected project instead
            DOMStuff.appendToContentOnRemove(projects[index]);
            

            // add updated DOM content (now including selected project) of projects tab
            // DOMStuff.appendToProjectOnRemove(projectArray);

            // resets the add tasks button to only add tasks to the currently selected
            // project
            const formCard  = document.getElementById('add-todo');
            formCard.replaceWith(formCard.cloneNode(true));

            // finds the currently selected project 
            // and binds the add task button to only interact with
            // this currently selected project using eventsListener function
            const addTask  = document.getElementById('add-todo');
            const cardSelected = document.getElementById(`project${index}`);
            cardSelected.classList.add('selected-project');
            eventsListener(addTask, project, index, projectArray);
        }
    })
}

// initialize
const formProject = document.getElementById('add-project');
if (localStorage.getItem("toggle") != 1) {
    initialize.initializeAddProject(formProject);
    
}


export {projects, projectArray}

