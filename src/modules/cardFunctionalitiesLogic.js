const adjustItemIndex = function (array) {
    // adjusts each elements' indxe attribute of array
    let indexPlaceholder = 0;
    array.forEach(card => {
        card.index = indexPlaceholder;
        console.log(array);
        indexPlaceholder += 1;
    });
}

export {adjustItemIndex};