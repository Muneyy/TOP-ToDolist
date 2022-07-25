import './style.css';
// import {todoItemsArray, projectItemsArray} from './arrayInitialize';
import { createItem }  from './modules/todoFactory';
import * as DOMStuff from './modules/DOMStuff';

import * as projectFactory from './modules/projectFactory';
import * as cardFunctionalitiesDOM from "./modules/cardFunctionalitiesDOM";
import {eventsListener} from "./modules/eventsListener";


let projectArray = [];
let projects = [];

const clearWindow = document.querySelector(".clear-window");
clearWindow.addEventListener('click', () => {
    window.localStorage.clear();
})

// window.localStorage.clear();



if (window.localStorage.getItem('toggle') == 1) {
    let temp = localStorage.getItem('projectArray');
    let projectArray = JSON.parse(temp);
    console.log(`works?`)
    console.log(projectArray);//     console.log(temp1);
    console.log("BUT WHY IS THIS AN ARRAY?");
    console.log(typeof projectArray);   
    projects = JSON.parse(localStorage.getItem('projects'));
    console.log(projects);
    projectArray.forEach(project => {
        console.log(`THE PROJECT >>>>>>>>`);
        console.log(project);
        let index = projectArray.indexOf(project, 0);
        project.index = index;
        const card = DOMStuff.appendToProject(project, project.selected);
        cardFunctionalitiesDOM.assignCardID(card, project, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);
        cardFunctionalitiesDOM.addRemoveFunctionality(card, project, index, projectArray, projectArray);
        // localStorage.setItem('projectArray', JSON.stringify(temp));
        // localStorage.setItem('projects', JSON.stringify(projects));
        // localStorage.setItem('toggle', 1);
    })
    window.localStorage.setItem('toggle', 2);
}


//MAIN PROBLEM concers eventsListener and cardFuncDom
// because key-value pairs or objects in javascirpt
// ddo not support arrays as values.

const formProject = document.getElementById('add-project');

formProject.addEventListener('submit', (event) => {
    event.preventDefault();
    //create a project object
    const projectObject = projectFactory.createProject(formProject);

    //clear DOM elements of project tab
    const contentProject = document.querySelector(".content-project");
    while(contentProject.firstChild) {
        contentProject.removeChild(contentProject.firstChild);
    };

    // DOMStuff.appendToProjectOnRemove(projectArray);
    // for testing, only the first project object is selected.
    if (window.localStorage.getItem('toggle') == 1) {
        let temp = localStorage.getItem('projectArray');
        projectArray = JSON.parse(temp);
        projects = JSON.parse(localStorage.getItem('projects'));
    }
    projectObject.selected = 0;
    projectArray.push(projectObject);
    projects.push([]);
    

    // console.log(`This is projects consisting of arrays: ${projects}`);

    //push current project to projects array

    
    // assign individual projects' index attribute to their array index in projectArray
    projectArray.forEach(project => {
        let index = projectArray.indexOf(project, 0);
        let arrayProjects = projects;
        project.index = index;
        const card = DOMStuff.appendToProject(project, project.selected);
        cardFunctionalitiesDOM.assignCardID(card, project, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);
        cardFunctionalitiesDOM.addRemoveFunctionality(card, project, index, projectArray, projectArray);

    })
    localStorage.setItem('projectArray', JSON.stringify(projectArray));
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('toggle', 1);
})

// window.localStorage.clear()


// const formCard  = document.getElementById('add-todo');
// eventsListener(formCard);



// NOTE: Tried putting this in a separate module
// formCard.addEventListener('submit', (event) => {   
//     event.preventDefault();

//     // push to-do items for a project to currentProjectArray,
//     // a value of a project.
//     const currentProject = projectSelected[0];
//     const currentProjectArray = currentProject.list;

//     const todoItem = createItem(formCard);
//     currentProjectArray.push(todoItem);

//     const contentToDo = document.querySelector(".content-todo");
//     while(contentToDo.firstChild) {
//         contentToDo.removeChild(contentToDo.firstChild);
//     };

//     //loops through the current selected project's array and displays everything
//     currentProjectArray.forEach(item => {
//         let index = currentProjectArray.indexOf(item, 0)
//         item.index = index;
//         const card = DOMStuff.appendToContent(item, index, currentProjectArray);
//         cardFunctionalitiesDOM.assignCardID(card, item, index);
//         cardFunctionalitiesDOM.addRemoveFunctionality(card, item, index, currentProjectArray);


//     })



//     // const contentToDo = document.querySelector(".content-todo");
//     // // while(contentToDo.firstChild) {
//     // //     contentToDo.removeChild(contentToDo.firstChild);
//     // // };


//     // for (const item of todoItemsArray) {
//     //     // item.index = uniqueCardId;

//     //     if (item.display != 1) {
//     //         DOMStuff.appendToContent(item, item.index, todoItemsArray, uniqueCardId);
//     //     }
//     //     item.display = 1;
//     // }
//     // uniqueCardId += 1;
//     // // console.log(todoItemsArray);
// });

export {projects, projectArray}

