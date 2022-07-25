import { adjustItemIndex, projectArrayCallTwice } from "./cardFunctionalitiesLogic";
import { appendToContentOnRemove, appendToProjectOnRemove, } from "./DOMStuff";
import {eventsListener, removeEventsListener} from "./eventsListener";
import { projects, projectArray } from "../index";

const addRemoveFunctionality = function(card, item, index, array, projArray) {
    //create button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    // card.id = `${uniqueCardId}`;
    
    if (item.type == "project") {
        removeButton.addEventListener('click', () => {
            console.log(`Item.type`);
            console.log(item.type);
            const content = document.querySelector(".content-project");
    
            array.splice(index, 1);

            projects.splice(index, 1);



            console.log("AFTER REMOVING ?????????????>>>>>>>>>")
            console.log(projects[index]);
            console.log(projects);
            // console.log(doneItem[0]);
            // doneItem[0].done = 1;
            // array.push(doneItem[0]);
            const cardToRemove = document.getElementById(`project${index}`);
            content.removeChild(cardToRemove);
            adjustItemIndex(array, index, item);
            while(content.firstChild) {
                content.removeChild(content.firstChild);
            };
            
            appendToProjectOnRemove(array);

            const contenttodo = document.querySelector(".content-todo");
            while(contenttodo.firstChild) {
                contenttodo.removeChild(contenttodo.firstChild);
            };
            // appendToContentOnRemove(array);
            localStorage.setItem('projectArray', JSON.stringify(array));
            localStorage.setItem('projects', JSON.stringify(projects));
            console.log("This is the saved project ARray >>>")
            console.log(array);
            // localStorage.setItem('toggle', 1);
    
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

const addDoneFunctionality = function (card, item, index, array, projArray) {
    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");

    doneButton.addEventListener('click', () => {
        const cardDone = document.getElementById(`card${index}`);
        
        if (item.done == 1) {
            item.done = 0;
            card.classList.toggle("done");
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            localStorage.setItem('projects', JSON.stringify(projects));
            console.log("might be the bug >>>>")
            console.log(projectArray);
            console.log(projects);
        } else if (item.done == 0) {
            item.done = 1;
            card.classList.toggle("done");
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            localStorage.setItem('projects', JSON.stringify(projects));
            console.log("might be the bug >>>>")
            console.log(projectArray);
            console.log(projects);
        }
        console.log(array);
        console.log(projects);
        // console.log(projArray);
        
    })
    card.appendChild(doneButton);
}


const assignCardID = function(card, item, id) {
    if (item.type == "card") {
        card.id = `card${id}`;
    } else if (item.type == "project") {
        card.id = `project${id}`;
    };
};

const addSelectFunctionality = function(card, item, index, array) {
    card.addEventListener('click', (event) => {
        // projectArrayCallTwice(array);
        event.preventDefault();

        // const cardToSelect = document.getElementById(`project${index}`);
        // content.removeChild(cardToRemove);

        console.log(array);
        console.log(typeof array);
        // projects = JSON.parse(localStorage.getItem('projects'));

        adjustItemIndex(array, index, item);

        if (array[index]){
            array[index].selected = 1;
        }



        const content = document.querySelector(".content-project");
        while(content.firstChild) {
            content.removeChild(content.firstChild);
        };

        const contentToDo = document.querySelector(".content-todo");
        while(contentToDo.firstChild) {
            contentToDo.removeChild(contentToDo.firstChild);
        };
        appendToContentOnRemove(projects[index]);
        
        array.forEach(project => {
            project.selected = 0;
            // console.log(`Does this run?`)
        })
        if (array[index]) {
            array[index].selected = 1;
        }
        // console.log(`The array is below (check for selected):`)
        // console.log(array);
        //might be what's causing errors (recursive call?)
        appendToProjectOnRemove(array);

        // remove event listeners from formCard
        const formCard  = document.getElementById('add-todo');
        formCard.replaceWith(formCard.cloneNode(true));


        array.forEach(project => {
            if (project.selected == 1) {
                const formCard  = document.getElementById('add-todo');
                const cardSelected = document.getElementById(`project${index}`);
                cardSelected.classList.add('selected-project');
                eventsListener(formCard, project, project.index, array); 
            }
        })

        console.log("This is array");
        console.log(array);
        console.log(`This is projects`);
        console.log(projects);
        // window.localStorage.setItem('projectArray', JSON.stringify(array));
        // window.localStorage.setItem('projects', JSON.stringify(projects));
    })

}

export {addRemoveFunctionality, assignCardID, addSelectFunctionality, addDoneFunctionality};