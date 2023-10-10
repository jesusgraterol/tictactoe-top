import { Player } from "./player.js"

/**
 * Machine Factory
 * ...
 */
export function Machine(player_marker) {
    // Retrieve the machine's marker based on what the player selected
    const marker = player_marker == "X" ? "O": "X";

    // Inherit from Player
    const { get_marker } = Player(marker);








    /****************************
     * MACHINE INPUT EXTRACTION *
     ****************************/





    function extract_input(cell_states) {
        return _extract_random_input(cell_states);
    }





    /**
     * Extracts a completely random input based on the state of the cells.
     * @param {*} cell_states 
     * @returns 
     */
    function _extract_random_input(cell_states) {
        let input;
        while (input === undefined) {
            const random_value = Math.floor(Math.random() * (8 - 0 + 1) + 0);
            if (cell_states[random_value] === undefined) input = random_value;
        }
        return input;
    }









    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        get_marker,
        extract_input
    }
}