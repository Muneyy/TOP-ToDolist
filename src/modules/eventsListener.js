import { createItem }  from './todoFactory';
import * as DOMStuff from './DOMStuff';
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";
import { projects } from '../index';


function onSubmitForm(form, project, index, array) {
    // add task to corresponding project

    const todoItem = createItem(form);
    const contentToDo = document.querySelector(".content-todo");
    while(contentToDo.firstChild) {
        contentToDo.removeChild(contentToDo.firstChild);
    };
    if (project.selected == 1) {
        projects[index].push(todoItem);

        // SORTING
        // let tempArray = [];
        // // console.log(`How many times does this occur?`)
        // projects[index].forEach(item => {
        //     let indexTemp = projects[index].indexOf(item, 0)
        //     let indexUse = indexTemp;
        //     if (item.done == 0) {
        //         // const moveToBottom = projects[index].splice(indexUse, 1);
        //         tempArray.push(item);
        //     }
        // })
        // projects[index].forEach(item => {
        //     let indexTemp = projects[index].indexOf(item, 0)
        //     let indexUse = indexTemp;
        //     if (item.done == 1) {
        //         // const moveToBottom = projects[index].splice(indexUse, 1);
        //         tempArray.push(item);
        //     }
        // })
        projects[index].forEach(item => {
            let indexTemp = projects[index].indexOf(item, 0)
            let indexUse = indexTemp;
            const card = DOMStuff.appendToContent(item, index, projects[index]);
            cardFunctionalitiesDOM.assignCardID(card, item, indexUse);
            cardFunctionalitiesDOM.addRemoveFunctionality(card, item, indexUse, projects[index], array);
            cardFunctionalitiesDOM.addDoneFunctionality(card, item, indexUse, projects[index], array);
        })
        // updates local storage with added task
        localStorage.setItem('projectArray', JSON.stringify(array));
        localStorage.setItem('projects', JSON.stringify(projects));
    }
}


const eventsListener = function (form, project, index, array) {
    // sets add task button to only associate with the currently selected project

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        onSubmitForm(form, project, index, array)
    });
}

export {eventsListener};