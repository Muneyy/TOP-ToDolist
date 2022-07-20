const createProject = function (form) {
    const title = form.elements['project-title'].value;
    const projectItem = createProjectObject(title);
    projectItem.type = "project";
    projectItem.triggered = 0;
    // projectItem.list = new Object();
    return projectItem;
}

const createProjectObject = (title, triggered, index, type, selected) => {
    return {title, triggered, index, type, selected};
}

export {createProject};