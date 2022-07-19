import { projectItemsArray } from "./arrayInitialize";
import * as cardFunctionalities from "./removecard";

const appendToContent = function(todoItem, todoItemsIndex, todoItemsArray, uniqueCardId) {
    // create card 
    const card = document.createElement("div");
    card.classList.add("card-todo");

    // create content of card 
    const cardTitle = document.createElement("h3");
    const cardDesc = document.createElement("p");
    const cardDate = document.createElement("p");
    const cardPriority = document.createElement("p");
    cardTitle.textContent = todoItem.title;
    cardDesc.textContent = todoItem.description;
    cardDate.textContent = todoItem.date;
    cardPriority.textContent = todoItem.priority;

    // create remove button
    const contentToDo = document.querySelector(".content-todo");
    cardFunctionalities.assignCardID(card, todoItem, uniqueCardId);
    cardFunctionalities.addRemoveFunctionality(card, todoItemsIndex, contentToDo, todoItemsArray, uniqueCardId, todoItem);
    

    //append card content
    card.appendChild(cardTitle);
    card.appendChild(cardDesc);
    card.appendChild(cardDate);
    card.appendChild(cardPriority);
    

    //get main content div to append the card to it
    
    contentToDo.appendChild(card);
};

const appendToProject = function(item, index, projectItemsArray, uniqueCardId) {
    // create card 
    const card = document.createElement("div");
    card.classList.add("card-project");

    // create content of card 
    const cardTitle = document.createElement("h1");
    cardTitle.textContent = item.title;


    // create remove button
    const contentProject = document.querySelector(".content-project");

    // NOTE: this also assigns the index as the id
    // NOT GOOD, better to separate functionality
    cardFunctionalities.assignCardID(card, item, uniqueCardId);
    cardFunctionalities.addRemoveFunctionality(card, index, contentProject, projectItemsArray, uniqueCardId, item);
    

    //append card content
    card.appendChild(cardTitle);
    

    //get main content div to append the card to it
    
    contentProject.appendChild(card);
}

export {appendToContent, appendToProject};