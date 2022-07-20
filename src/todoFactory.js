const createItem = function () {
    const form  = document.getElementById('add-todo');
    const title = form.elements['title'].value;
    const description = form.elements['description'].value;
    const date = form.elements['date'].value;
    const priority = form.elements['priority'].value;
    const todoItem = createToDoObject(title, description, date, priority);
    todoItem.type = "card";
    return todoItem;
}

const createToDoObject = (title, description, date, priority, index, type) => {
    return {title, description, date, priority, index, type}
}

export {createItem};