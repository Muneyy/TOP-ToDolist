import { projectItemsArray } from "./arrayInitialize";
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";

const appendToContent = function(item, index, array) {
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

    //move this to index and just return thee card div?
    // cardFunctionalities.assignCardID(card, item, index);
    // cardFunctionalities.addRemoveFunctionality(card, item, index, array);
    

    //append card content
    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardDate);
    card.appendChild(cardPriority);
    

    //get main content div to append the card to it
    if (item.done == 1) {
        card.classList.add("done");
    }
    
    contentToDo.appendChild(card);
    return card;
};

const appendToContentOnRemove = function (array) {
    array.forEach(item => {
        let index = array.indexOf(item, 0)
        item.index = index;
        const card = appendToContent(item, index, array);
        cardFunctionalitiesDOM.assignCardID(card, item, index);
        cardFunctionalitiesDOM.addRemoveFunctionality(card, item, index, array);
        cardFunctionalitiesDOM.addDoneFunctionality(card, item, index, array);

    })
}

const appendToProject = function(item, isSelected) {
    // create card 
    const card = document.createElement("div");
    card.classList.add("card-project");

    // create content of card 
    const cardTitle = document.createElement("h1");
    cardTitle.textContent = item.title;

    if (item.selected == 1) {
        card.classList.add("selected-project")
    }


    // create remove button
    const contentProject = document.querySelector(".content-project");

    
    // cardFunctionalities.addSelectFunctionality(card, projectItemsArray, index);
    // cardFunctionalities.assignCardID(card, item, uniqueCardId);

    // NOTE: this also assigns the index as the id
    // NOT GOOD, better to separate functionality
    // Does logic outside of DOM such as setting index of objects
    // cardFunctionalities.addRemoveFunctionality(card, index, contentProject, projectItemsArray, uniqueCardId, item);
    

    //append card content
    // if (isSelected == 1) {
    //     card.classList.add("selected-project");
    // }
    card.appendChild(cardTitle);
    

    //get main content div to append the card to it
    
    contentProject.appendChild(card);
    return card;
}

const appendToProjectOnRemove = function (array) {
    array.forEach(item => {
        let index = array.indexOf(item, 0)
        item.index = index;
        const card = appendToProject(item, index, array);
        cardFunctionalitiesDOM.assignCardID(card, item, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, item, index, array);
        
    })
}

export {appendToContent, appendToProject, appendToContentOnRemove, appendToProjectOnRemove};