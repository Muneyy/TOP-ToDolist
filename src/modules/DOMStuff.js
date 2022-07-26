import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";
import { projectArray } from "..";

const appendToContent = function(item, index, array) {
    // append a single card to tasks tab

    // create card 
    const card = document.createElement("div");
    card.classList.add("card-todo");

    // create content of card 
    const cardTitle = document.createElement("h3");
    const cardDesc = document.createElement("p");
    const cardDate = document.createElement("p");
    const cardPriority = document.createElement("p");
    cardTitle.textContent = item.title;
    cardDesc.textContent = item.description;
    cardDate.textContent = item.date;
    cardPriority.textContent = item.priority;

    // create remove button
    const contentToDo = document.querySelector(".content-todo");

    //append card content
    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardDate);
    card.appendChild(cardPriority);
    
    // if card(task) is marked done, add class done 
    if (item.done == 1) {
        card.classList.add("done");
    }
    
    //get main content div to append the card to it
    contentToDo.appendChild(card);
    return card;
};


const appendToContentOnRemove = function (array, projArray) {
    // every submit or remove wipes the entire tasks tab to reset indexes
    // this function is responsible for displaying the correct tasks including removed and done tasks
    if (array) {
        array.forEach(item => {
            let index = array.indexOf(item, 0)
            item.index = index;
            const card = appendToContent(item, index, array);
            cardFunctionalitiesDOM.assignCardID(card, item, index);
            cardFunctionalitiesDOM.addRemoveFunctionality(card, item, index, array, projectArray);
            cardFunctionalitiesDOM.addDoneFunctionality(card, item, index, array, projectArray);
    
        })
    }
}

const appendToProject = function(item, isSelected) {
    // create card 
    const card = document.createElement("div");
    card.classList.add("card-project");

    // create content of card 
    const cardTitle = document.createElement("h1");
    cardTitle.textContent = item.title;

    // if project is selected, add class selected project to it
    if (item.selected == 1) {
        card.classList.add("selected-project")
    }

    // get the project tab
    const contentProject = document.querySelector(".content-project");

    // append card content
    card.appendChild(cardTitle);
    

    //get main content div to append the card to it
    contentProject.appendChild(card);

    // return the card div to add functionalities to it
    return card;
}

const appendToProjectOnRemove = function (array) {
    // every submit or remove wipes the entire projects tab to reset indexes
    // this function is responsible for displaying the correct projects including the selected project
    array.forEach(item => {
        let index = array.indexOf(item, 0)
        item.index = index;
        const card = appendToProject(item, index, array);
        cardFunctionalitiesDOM.assignCardID(card, item, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, item, index, projectArray);
        cardFunctionalitiesDOM.addRemoveFunctionality(card, item, index, projectArray, projectArray);
    })
}

export {appendToContent, appendToProject, appendToContentOnRemove, appendToProjectOnRemove};