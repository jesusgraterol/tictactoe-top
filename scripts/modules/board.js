/**
 * Board Singleton
 * The board singleton handles the game board's events, actions and states.
 */
export const Board = (() => {

    /***************
     * CONSTRUCTOR *
     ***************/

    // Initialize the Board's State
    let _state = "READY"; // READY|PROCESSING|X_WINS|O_WINS|TIE
    let _cell_states = []; // MARKER_STRING|undefined

    // Initialize the game board element as well as the cells
    const _game_board_el = document.getElementById("game_board");

    // The default css classes for an available cell
    const _default_cell_css_class_names = "cell available";

    // Initialize the cell elements
    let _cell_els = [];
    for (let id = 0; id < 9; id++) {
        // Create the element
        const el = _create_cell_el(id);

        // Add it to the list
        _cell_els.push(el);

        // Add it to the board
        _game_board_el.appendChild(el);
    }

    // Initialize the input combinations that result in a win
    const _winning_combinations = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonal
        [0, 4, 8],
        [2, 4, 6],
    ];









    /***********
     * GETTERS *
     ***********/




    /**
     * Retrieves the state of the board
     * @returns string
     */
    function get_state() { return _state }



    /**
     * Retrieves the state for all the cells.
     * @returns Array<string|undefined>
     */
    function get_cell_states() { return _cell_states }



    /**
     * Retrieves the game board element instance
     * @returns HTMLElement
     */
    function get_game_board() { return _game_board_el }
















    /****************
     * GAME ACTIONS *
     ****************/



    /**
     * Starts the board so the game can begin from a pristine state.
     */
    function start() {
        // Set all the cells and their states to a pristine state
        _reset_cells();

        // Set the state of the board
        _state = "READY";

        // Display the game board
        _game_board_el.style.display = "grid";
    }







    /**
     * Triggers whenever input is extracted from the player or the machine. Once handled, it checks
     * for the state of the game and updates it.
     * @param {*} cell_id 
     * @param {*} marker 
     */
    function process_input(cell_id, marker) {
        // Set the input on the cell state and element
        _cell_states[cell_id] = marker;
        _cell_els[cell_id].classList.remove("available");
        _cell_els[cell_id].innerText = marker;
        
        // Check if the input won the game
        if (_marker_wins(marker)) { _state = `${marker}_WINS` }

        // Otherwise, check if it is a tie
        else if (_cell_states.every((cell_state) => typeof cell_state == "string")) {
            _state = "TIE";
        }
    }







    /**
     * Verifies if the current marker's inputs contain a winning combination.
     * @param {*} marker 
     * @returns boolean
     */
    function _marker_wins(marker) {
        // Firstly, retrieve the marker's inputs
        const marker_inputs = _get_marker_inputs(marker);

        // Before proceeding, ensure that at least 3 inputs have been made
        let marker_wins = false;
        if (marker_inputs.length >= 3) {
            for (let comb of _winning_combinations) {
                // Ensure the marker inputs contains all the values within a combination
                marker_wins = comb.every((comb_val) => marker_inputs.includes(comb_val));

                // If so, break the iteration
                if (marker_wins) break; 
            }
        }

        // Finally, return the winning state
        return marker_wins;
    }





    /**
     * Retrieves the cell indexes that have been selected by a given marker.
     * @param {*} marker 
     * @returns Array<number>
     */
    function _get_marker_inputs(marker) {
        return _cell_states.reduce((accum, current, index) => { 
            if (current == marker) accum.push(index);
            return accum;
        }, []);
    }


















    /****************
     * MISC HELPERS *
     ****************/


    



    /**
     * Creates a cell element when the board instance is first initialized so they can be added 
     * programatically while retaining their instance.
     * @param {*} id 
     * @returns HTMLElement
     */
    function _create_cell_el(id) {
        let el = document.createElement("div");
        el.className = _default_cell_css_class_names;
        el.id = id;
        el.role = "button";
        return el;
    }







    /**
     * Resets the cell elements as well as their states to a pristine state.
     */
    function _reset_cells() {
        for (let id = 0; id < 9; id++) {
            _cell_els[id].className = _default_cell_css_class_names;
            _cell_els[id].innerText = "";
            _cell_states[id] = undefined;
        }
    }


    



    /**
     * Simulates a thinking machine for a short period of time while disabling player's input
     * capabilities.
     * @returns Promise<void>
     */
    async function simulate_machine_thinking(machine_marker) {
        _state = "PROCESSING";
        const available_cells = _cell_els.filter((cell) => cell.innerText == "");
        available_cells.forEach((cell) => {
            cell.classList.add("processing");
            cell.innerText = machine_marker;
        });
        await sleep(1);
        available_cells.forEach((cell) => {
            cell.classList.remove("processing");
            cell.innerText = "";
        });
        _state = "READY";
    }




    /**
     * Creates a sleep function that is resolved in given seconds.
     * @param {*} seconds 
     * @returns Promise<void>
     */
    function sleep(seconds = 1) {
        return new Promise((resolve) => { setTimeout(() => { resolve() }, seconds * 1000) });
    }






    /**
     * Verifies if the game has ended based on the board's state.
     * @returns boolean
     */
    function has_game_ended() { return _state == "X_WINS" || _state == "O_WINS" || _state == "TIE" }

















    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        get_state,
        get_cell_states,
        get_game_board,
        start,
        process_input,
        simulate_machine_thinking,
        has_game_ended
    }
})();