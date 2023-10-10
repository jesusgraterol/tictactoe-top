/**
 * Player Factory
 * The player factory implements the basic user functionality as well as input handling.
 */
export function Player(marker) {






    /***********
     * GETTERS *
     ***********/



    /**
     * Retrieves the marker selected by the player when the app was first initialized.
     * @returns string
     */
    function get_marker() { return marker }












    /***************************
     * PLAYER INPUT EXTRACTION *
     ***************************/

    


    /**
     * Given a player's input, it will ensure the board can currently take input and it also
     * verifies that the player's selection is legal. If the input is legal, it returns the 
     * cell's id in number format. Otherwise, it returns undefined.
     * @param {*} raw_cell_id 
     * @param {*} board_state 
     * @param {*} cell_states 
     * @returns number|undefined
     */
    function extract_input(raw_cell_id, board_state, cell_states) {
        if (
            board_state == "READY" && 
            /^[0-8]{1}$/.test(raw_cell_id) &&
            cell_states[raw_cell_id] === undefined
        ) {
            return Number(raw_cell_id);
        } else {
            return undefined;
        }
    }












    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        get_marker,
        extract_input
    }
}