import './style.css';
// import {todoItemsArray, projectItemsArray} from './arrayInitialize';
import { createItem }  from './todoFactory';
import * as DOMStuff from './DOMStuff';

import * as projectFactory from './projectFactory';
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";
import { projects } from '.';
import { adjustItemIndex } from './cardFunctionalitiesLogic';

const eventsListener = function (form, project, index) {
    form.addEventListener('submit', (event) => { 
        // console.log(projects);
        


        event.preventDefault();
    
        // push to-do items for a project to currentProjectArray,
        // a value of a project.
        // const currentProject = projectSelected[0];
        // console.log(`This is projectSelected: ${projectSelected.list}`);


    
        const todoItem = createItem(form);
        
    
        const contentToDo = document.querySelector(".content-todo");
        while(contentToDo.firstChild) {
            contentToDo.removeChild(contentToDo.firstChild);
        };

        // DOMStuff.appendToContentOnRemove(projects[index]);

        if (project.selected == 1) {
            // projects[index];
            // console.log(`This is projects.index: ${projects[index]}`);
            console.log(`This is index: ${index}`);
            console.log(projects);
            projects[index].push(todoItem);
            console.log(`How many times does this occur?`)
            projects[index].forEach(item => {
                let indexTemp = projects[index].indexOf(item, 0)
                let indexUse = indexTemp;
                const card = DOMStuff.appendToContent(item, index, projects[index]);
                cardFunctionalitiesDOM.assignCardID(card, item, indexUse);
                cardFunctionalitiesDOM.addRemoveFunctionality(card, item, indexUse, projects[index]);
            })
        }


        //loops through the current selected project's array and displays everything
        
    });
}

export {eventsListener};