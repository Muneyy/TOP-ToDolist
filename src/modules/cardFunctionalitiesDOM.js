import { adjustItemIndex} from "./cardFunctionalitiesLogic";
import { appendToContentOnRemove, appendToProjectOnRemove, } from "./DOMStuff";
import {eventsListener} from "./eventsListener";
import { projects, projectArray } from "../index";

const addRemoveFunctionality = function(card, item, index, array, projArray) {
    //create button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    
    if (item.type == "project") {
        removeButton.addEventListener('click', () => {
            console.log(`Item.type`);
            console.log(item.type);
            const content = document.querySelector(".content-project");

            // remove the project from the array that contains projects
            // and the tasks it holds contained in an array that is pushed to
            // the array "projects"
            array.splice(index, 1);
            projects.splice(index, 1);

            // get the id of the project to remove using its div id that is matched to
            // its index in the array that contains projects (projectArray)
            const cardToRemove = document.getElementById(`project${index}`);
            content.removeChild(cardToRemove);

            // since a project was removed from the projectArray, we need to adjust indexes
            // of the elements in that array
            adjustItemIndex(array, index, item);

            // wipe the content of project tab
            while(content.firstChild) {
                content.removeChild(content.firstChild);
            };
            
            // bring back the contents of project tab but not including the removed project
            // loops through the array that contains projects (projectArray)
            appendToProjectOnRemove(array);

            // wipe tasks associated with that removed project
            const contenttodo = document.querySelector(".content-todo");
            while(contenttodo.firstChild) {
                contenttodo.removeChild(contenttodo.firstChild);
            };

            // update local storage with the updated projectArray
            localStorage.setItem('projectArray', JSON.stringify(array));
            localStorage.setItem('projects', JSON.stringify(projects));
        })
    }
    if (item.type == "card") {
        //logic to remove button for DOM elements only
        removeButton.addEventListener('click', () => {
    
            const content = document.querySelector(".content-todo");
    
            array.splice(index, 1);
            // console.log(doneItem[0]);
            // doneItem[0].done = 1;
            // array.push(doneItem[0]);
            const cardToRemove = document.getElementById(`card${index}`);
            content.removeChild(cardToRemove);
            adjustItemIndex(array, index, item);
            while(content.firstChild) {
                content.removeChild(content.firstChild);
            };
            appendToContentOnRemove(array, projArray);
            //bug exists here
            // if (array.length == 0) {
            //     let tempIndex = projects.indexOf(array);
            //     projects.splice(tempIndex, 1);
            // }
            localStorage.setItem('projectArray', JSON.stringify(projArray));
            localStorage.setItem('projects', JSON.stringify(projects));
        })
    }

    //append remove button to card
    removeButton.classList.add("remove-button");
    card.appendChild(removeButton);
}

const addDoneFunctionality = function (card, item, index, array) {
    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");

    doneButton.addEventListener('click', () => {

        // toggles if item is marked done or not
        // add class "done" and also toggle that item's attribute done as done (1 or 0)
        if (item.done == 1) {
            item.done = 0;
            card.classList.toggle("done");
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            localStorage.setItem('projects', JSON.stringify(projects));
        } else if (item.done == 0) {
            item.done = 1;
            card.classList.toggle("done");
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            localStorage.setItem('projects', JSON.stringify(projects));
        }
    })
    // add the button to the side of the task
    card.appendChild(doneButton);
}


const assignCardID = function(card, item, id) {
    // as the index attribute of each element in the array gets resorted
    // with each remove, the corresponding div id must also match that index
    // for each element
    if (item.type == "card") {
        card.id = `card${id}`;
    } else if (item.type == "project") {
        card.id = `project${id}`;
    };
};

const addSelectFunctionality = function(card, item, index, array) {
    // adds select functionality for the projects
    card.addEventListener('click', (event) => {
        event.preventDefault();

        // wipe DOM content of project tab
        const content = document.querySelector(".content-project");
        while(content.firstChild) {
            content.removeChild(content.firstChild);
        };

        // wipe DOM content of tasks tab
        const contentToDo = document.querySelector(".content-todo");
        while(contentToDo.firstChild) {
            contentToDo.removeChild(contentToDo.firstChild);
        };

        // add DOM content (tasks) of the selected project instead
        appendToContentOnRemove(projects[index]);
        
        // reset selected attribute of each project when changing selected project
        array.forEach(project => {
            project.selected = 0;
        })

        // mark selected project's attribute selected as selected (1)
        if (array[index]) {
            array[index].selected = 1;
        }

        // add updated DOM content (now including selected project) of projects tab
        appendToProjectOnRemove(array);

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
        eventsListener(addTask, array[index], array[index].index, array); 

        // update local storage so on reset, currently selected project will be the same
        window.localStorage.setItem('projectArray', JSON.stringify(array));
        window.localStorage.setItem('projects', JSON.stringify(projects));
    })

}

export {addRemoveFunctionality, assignCardID, addSelectFunctionality, addDoneFunctionality};