const addRemoveFunctionality = function(card, index, content, array, uniqueCardId, item) {
    //create button
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    // card.id = `${uniqueCardId}`;

    //logic to remove button for DOM elements only
    removeButton.addEventListener('click', () => {
        if (item.type == "card") {
            const cardToRemove = document.getElementById(`card${uniqueCardId}`);
            content.removeChild(cardToRemove);
        } else if (item.type == "project") {
            const cardToRemove = document.getElementById(`project${uniqueCardId}`);
            content.removeChild(cardToRemove);
        }
        array.splice(index, 1);
        let indexPlaceholder = 0;
        array.forEach(card => {
            card.index = indexPlaceholder;
            indexPlaceholder += 1;
        });
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

export {addRemoveFunctionality, assignCardID};