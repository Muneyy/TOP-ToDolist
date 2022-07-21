import { adjustItemIndex, projectArrayCallTwice } from "./cardFunctionalitiesLogic";
import { appendToContentOnRemove, appendToProjectOnRemove, } from "./DOMStuff";
import {eventsListener, removeEventsListener} from "./eventsListener";
import { projects } from ".";

const addRemoveFunctionality = function(card, item, index, array) {
    //create button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    // card.id = `${uniqueCardId}`;
    
    //logic to remove button for DOM elements only
    removeButton.addEventListener('click', () => {

        



        const content = document.querySelector(".content-todo");

        



        const doneItem = array.splice(index, 1);
        console.log(doneItem[0]);
        doneItem[0].done = 1;
        array.push(doneItem[0]);
        const cardToRemove = document.getElementById(`card${index}`);
        content.removeChild(cardToRemove);
        adjustItemIndex(array, index, item);
        while(content.firstChild) {
            content.removeChild(content.firstChild);
        };
        appendToContentOnRemove(array);

            
        



        // NOTE: move this part of the code to a separate module
        
        // let indexPlaceholder = 0;
        // array.forEach(card => {
        //     card.index = uniqueCardId;
        //     indexPlaceholder += 1;
        // });
        // console.log(array);
    })

    //append remove button to card
    removeButton.classList.add("remove-button");
    card.appendChild(removeButton);
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
        adjustItemIndex(array, index, item);
        array[index].selected = 1;


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
        array[index].selected = 1;
        console.log(`The array is below (check for selected):`)
        console.log(array);
        //might be what's causing errors (recursive call?)
        appendToProjectOnRemove(array);






        // remove event listeners from formCard
        const formCard  = document.getElementById('add-todo');
        formCard.replaceWith(formCard.cloneNode(true));


        array.forEach(project => {
            // console.log(`The array being for looped: ${array}`);
            // console.log(`project.selected? = ${project.selected}`);
            // console.log(`project.list = ${project.list}`);
            // console.log(`project.listo = ${project.list.listo[0]}`);
            if (project.selected == 1) {
                const formCard  = document.getElementById('add-todo');
                // removeEventsListener(formCard);
                const cardSelected = document.getElementById(`project${index}`);
                cardSelected.classList.add('selected-project');

                // console.log(`project that is inpuuted: ${project.triggered}`);
                eventsListener(formCard, project, project.index); 
            }
        })
        

        // while(content.firstChild) {
        //     content.removeChild(content.firstChild);
        // };
        // appendToProjectOnRemove(array);
        

    })

}

export {addRemoveFunctionality, assignCardID, addSelectFunctionality};