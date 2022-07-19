import './style.css';
import {todoItemsArray, projectItemsArray} from './arrayInitialize';
import { createToDoItem }  from './todoFactory';
import * as DOMStuff from './DOMStuff'

import {createProject} from './projectFactory'


// let todoItemsArray = [];

//GOAL: only create todoItemsArray when a project is created
//Treat a project as a folder which will contain its own array
// such that that array will contain the to-do items for that specific
// project/flder



const formCard  = document.getElementById('add-todo');
let index = 0;

formCard.addEventListener('submit', (event) => {   
    event.preventDefault();

    const todoItem = createToDoItem(formCard);
    todoItemsArray.push(todoItem);
    const contentToDo = document.querySelector(".content-todo");
    while(contentToDo.firstChild) {
        contentToDo.removeChild(contentToDo.firstChild);
    };


    let uniqueCardId = 0;
    for (const item of todoItemsArray) {
        // item.index = uniqueCardId;
        DOMStuff.appendToContent(item, item.index, todoItemsArray, uniqueCardId);
        uniqueCardId += 1;
    }
    // console.log(todoItemsArray);
});

const formProject = document.getElementById('add-project');

formProject.addEventListener('submit', (event) => {
    event.preventDefault();

    const projectObject = createProject(formProject);
    projectItemsArray.push(projectObject);

    const contentProject = document.querySelector(".content-project");
    while(contentProject.firstChild) {
        contentProject.removeChild(contentProject.firstChild);
    };

    let uniqueCardId = 0;
    for (const item of projectItemsArray) {
        // item.index = uniqueCardId;
        DOMStuff.appendToProject(item, item.index, projectItemsArray, uniqueCardId);
        uniqueCardId += 1;
    }

})

