import * as projectFactory from './projectFactory';
import { projects, projectArray } from '..';
import * as DOMStuff from './DOMStuff';
import * as cardFunctionalitiesDOM from "./cardFunctionalitiesDOM";

const initializeAddProject = function(formProject) {
    formProject.addEventListener('submit', (event) => {
        event.preventDefault();
        //create a project object
        const projectObject = projectFactory.createProject(formProject);
    
        //clear DOM elements of project tab
        const contentProject = document.querySelector(".content-project");
        while(contentProject.firstChild) {
            contentProject.removeChild(contentProject.firstChild);
        };
    
        // DOMStuff.appendToProjectOnRemove(projectArray);
        // for testing, only the first project object is selected.
        if (window.localStorage.getItem('toggle') == 1) {
            projectArray = JSON.parse(localStorage.getItem('projectArray'));
            projects = JSON.parse(localStorage.getItem('projects'));
        }
        projectObject.selected = 0;
        projectArray.push(projectObject);
        projects.push([]);
        
        // assign individual projects' index attribute to their array index in projectArray
        projectArray.forEach(project => {
            let index = projectArray.indexOf(project, 0);
            project.index = index;
            const card = DOMStuff.appendToProject(project, project.selected);
            cardFunctionalitiesDOM.assignCardID(card, project, index);
            cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);
            cardFunctionalitiesDOM.addRemoveFunctionality(card, project, index, projectArray);
    
        })
        localStorage.setItem('projectArray', JSON.stringify(projectArray));
        localStorage.setItem('projects', JSON.stringify(projects));
    })

}

// const initializeFirstProject = function() { 
//         //create a project object
//         const projectObject = projectFactory.createProject(formProject);
    
//         //clear DOM elements of project tab
//         const contentProject = document.querySelector(".content-project");
//         while(contentProject.firstChild) {
//             contentProject.removeChild(contentProject.firstChild);
//         };
    
//         projectObject.selected = 1;
//         projectArray.push(projectObject);
//         projects.push([]);
        
//         // assign individual projects' index attribute to their array index in projectArray
//         projectArray.forEach(project => {
//             let index = projectArray.indexOf(project, 0);
//             project.index = index;
//             const card = DOMStuff.appendToProject(project, project.selected);
//             cardFunctionalitiesDOM.assignCardID(card, project, index);
//             cardFunctionalitiesDOM.addSelectFunctionality(card, project, index, projectArray);
//             cardFunctionalitiesDOM.addRemoveFunctionality(card, project, index, projectArray);
    
//         })
//         localStorage.setItem('projectArray', JSON.stringify(projectArray));
//         localStorage.setItem('projects', JSON.stringify(projects));
// }



export {initializeAddProject}; 