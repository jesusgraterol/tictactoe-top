import { Player } from "./player.js";
import { Board } from "./board.js";

/**
 * Machine Factory
 * The machine factory handles the machine's role in the game.
 * The implementation of the minimax algorithm was inspired by:
 * https://gist.github.com/Pragalbha-Patil/8f09d11cf09ad249767da0df8649f459 
 */
export function Machine(player_marker) {
    // Retrieve the machine's marker based on what the player selected
    const marker = player_marker == "X" ? "O": "X";

    // Inherit from Player
    const { get_marker } = Player(marker);








    /****************************
     * MACHINE INPUT EXTRACTION *
     ****************************/






    /**
     * Extracts the machine's input (cell id) based on the minimax algorithm.
     * @returns number
     */
    function extract_input() { return _minimax(Board.get_cell_states(), marker).index }






    /**
     * Recursive function that implements the minimax algorithm in order to identify the best
     * possible move for the machine to make.
     * @param {*} cell_states 
     * @param {*} eval_marker 
     * @returns object { score: number, index: number }
     */
    function _minimax(cell_states, eval_marker) {
        // Retrieve the available cells 
        const available_cells = Board.get_available_cells(cell_states);

        // Check for terminal states and return values accordingly
        if      (Board.marker_wins(cell_states, player_marker)) { return { score: -10 } } 
        else if (Board.marker_wins(cell_states, marker))        { return { score: 10 } } 
        else if (available_cells.length == 0)                   { return { score: 0 } }


        // Initialize the list that will contain all possible moves
        let moves = [];

        // Iterate over each available cell
        for (let cell_id of available_cells) {
            // Create the move object and store the cell's id
            let move = { index: cell_id };

            // Set the empty spot to the current marker
            cell_states[cell_id] = eval_marker;

            // Collect the score based on the current marker's opponent
            if (eval_marker == marker){
                const result = _minimax(cell_states, player_marker);
                move.score = result.score;
            } else{
                const result = _minimax(cell_states, marker);
                move.score = result.score;
            }

            // Reset the spot to empty
            cell_states[cell_id] = undefined;

            // Push the move object to the array
            moves.push(move);
        }

        // If it is the machine's turn, loop over the moves and choose the one with the highest score
        let best_move;
        if(eval_marker === marker){
            var best_score = -10000;
            for(var i = 0; i < moves.length; i++) {
                if(moves[i].score > best_score){
                    best_score = moves[i].score;
                    best_move = i;
                }
            }
        } 
        
        // Otherwise, loop over the moves and choose the one with the lowest score
        else {
            let best_score = 10000;
            for(let i = 0; i < moves.length; i++) {
                if(moves[i].score < best_score){
                    best_score = moves[i].score;
                    best_move = i;
                }
            }
        }

        // Return the chosen move's object (best)
        return moves[best_move];
    }












    /****************
     * MISC HELPERS *
     ****************/




    /**
     * Extracts a completely random input based on the state of the cells.
     * @param {*} cell_states 
     * @returns 
     */
/*     function extract_input() {
        return _extract_random_input(Board.get_cell_states());
    } */
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