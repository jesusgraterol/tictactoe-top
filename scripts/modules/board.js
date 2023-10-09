


/**
 * Board Singleton
 * ...
 */
export const Board = (() => {
    // The Cells' CSS Classes based on their state 
    const _available_cell_class_names = "cell available"

    // Initialize the game board element as well as the cells
    const game_board_el = document.getElementById("game_board");

    // Initialize the cell elements
    const _cell_els = [];
    for (let id = 0; id < 9; id++) {
        // Create the element
        const el = _create_cell_el(id);

        // Add it to the list
        _cell_els.push(el);

        // Add it to the board
        game_board_el.appendChild(el);
    }









    /**
     * Starts the board so the game can begin from a pristine state.
     */
    function start() {
        // Set all the cells to a pristine state
        for (let cell of _cell_els) {
            cell.className = _available_cell_class_names;
            cell.innerText = "";
        }

        // Display the game board
        game_board_el.style.display = "grid";
    }
















    /**
     * Creates a cell element when the board instance is first initialized so they can be added 
     * programatically while retaining their instance.
     * @param id 
     * @returns HTMLElement
     */
    function _create_cell_el(id) {
        let el = document.createElement("div");
        el.className = _available_cell_class_names;
        el.id = id;
        el.role = "button";
        return el;
    }















    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        game_board_el,
        start
    }
})();