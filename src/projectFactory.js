const createProject = function () {
    const form  = document.getElementById('add-project');
    const title = form.elements['project-title'].value;
    const projectItem = createProjectObject(title);
    projectItem.type = "project";
    return projectItem;
}

const createProjectObject = (title, index, type) => {
    return {title, index, type};
}

export {createProject};