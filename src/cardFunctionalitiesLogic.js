import './style.css';
import * as DOMStuff from './DOMStuff';
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";

const adjustItemIndex = function (array, index, item) {
    // array.splice(index, 1);
    let indexPlaceholder = 0;
    array.forEach(card => {
        card.index = indexPlaceholder;
        indexPlaceholder += 1;
    });
    console.log(array);
}

const projectArrayCallTwice = function (projectArray) {
    projectArray.forEach(project => {
        let index = projectArray.indexOf(project, 0);
        project.index = index;
        const card = DOMStuff.appendToProject(project, project.selected);
        cardFunctionalitiesDOM.assignCardID(card, project, index);
        cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);

    })
}

export {adjustItemIndex, projectArrayCallTwice};