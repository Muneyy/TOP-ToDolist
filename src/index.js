import './style.css';
// import {todoItemsArray, projectItemsArray} from './arrayInitialize';
import { createItem }  from './todoFactory';
import * as DOMStuff from './DOMStuff';

import * as projectFactory from './projectFactory';
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";
import {eventsListener} from "./eventsListener";

// let todoItemsArray = [];

//GOAL: only create todoItemsArray when a project is created
//Treat a project as a folder which will contain its own array
// such that that array will contain the to-do items for that specific
// project/flder

//if content elements are not wiped, then the id does not get renamed
//conflict with selected attribute, and .display attribute

// let currentProject = [];



// const formCard  = document.getElementById('add-todo');
// let index = 0;
// let uniqueCardId = 0;
// let uniqueProjectId = 0;



// formCard.addEventListener('submit', (event) => {   
//     event.preventDefault();

//     const todoItem = createToDoItem(formCard);
//     todoItemsArray.push(todoItem);
//     const contentToDo = document.querySelector(".content-todo");
//     // while(contentToDo.firstChild) {
//     //     contentToDo.removeChild(contentToDo.firstChild);
//     // };


//     for (const item of todoItemsArray) {
//         // item.index = uniqueCardId;

//         if (item.display != 1) {
//             DOMStuff.appendToContent(item, item.index, todoItemsArray, uniqueCardId);
//         }
//         item.display = 1;
//     }
//     uniqueCardId += 1;
//     // console.log(todoItemsArray);
// });

// const formProject = document.getElementById('add-project');

// formProject.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const projectObject = createProject(formProject);

//     projectItemsArray.push(projectObject);

//     const contentProject = document.querySelector(".content-project");
//     // while(contentProject.firstChild) {
//     //     contentProject.removeChild(contentProject.firstChild);
//     // };

//     for (const item of projectItemsArray) {
//         // item.index = uniqueCardId;
//         if (item.display != 1) {
//             DOMStuff.appendToProject(item, item.index, projectItemsArray, uniqueProjectId);
//         }
//         item.display = 1;
//         // console.log(item.list);
//     }
//     uniqueProjectId += 1;




// })

let projectArray = [];
// let projectSelected = [];

let projects = [];
let stabilizer = 0;


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

    // for testing, only the first project object is selected.
    if (projectArray.length == 0) {
        projectObject.selected = 1;
        projectArray.push(projectObject);
        console.log(`This is project array: ${projectArray}`)
        projects.push([]);
    } else if (projectArray.length != 0) {
        projectObject.selected = 0;
        projectArray.push(projectObject);
        projects.push([]);
    }

    console.log(`This is projects consisting of arrays: ${projects}`);

    //push current project to projects array

    
    // assign individual projects' index attribute to their array index in projectArray
    projectArray.forEach(project => {
        let index = projectArray.indexOf(project, 0);
        let arrayProjects = projects;
        project.index = index;
        const card = DOMStuff.appendToProject(project, project.selected);
        cardFunctionalitiesDOM.assignCardID(card, project, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray, arrayProjects);

    })
    // console.log(`projectSelected = ${projectSelected[0].index}`)
    // console.table(projectArray);
    // console.log(projectSelected);

})


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

export {projects}

