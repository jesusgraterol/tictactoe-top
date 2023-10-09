import { Player } from "./modules/player.js";
import { Machine } from "./modules/machine.js";
import { Board } from "./modules/board.js";


(function() {
    // Initialize the game menu elements
    const _menu_el = document.getElementById("game_menu");
    const _available_markers_el = document.getElementById("available_markers");
    _available_markers_el.addEventListener("click", _on_marker_selection);

    // Initialize the player variables
    let player;
    let machine;

    // Subscribe to the boards' click events
    Board.game_board_el.addEventListener("click", _on_game_board_click);

    // Initialize the game result elements
    const _game_result_container = document.getElementById("game_result_container");
    const _game_result_title = document.getElementById("game_result_title");
    const _play_again_button = document.getElementById("play_again_button");
    _play_again_button.addEventListener("click", _on_play_again_button_click);









    /**
     * Triggers when the player chooses a marker correctly and initializes the game.
     * @param e 
     */
    function _on_marker_selection(e) {
        // Extract the marker (if any)
        const player_marker = e.target.getAttribute("data-marker");

        // If a valid marker was picked, initialize the game
        if (player_marker) {
            // Initialize the instance of the players
            player = Player(player_marker);
            machine = Machine(player_marker);

            // Hide the menu
            _menu_el.style.display = "none";
            
            // Start the board
            Board.start();
        }
    }












    /**
     * Triggers whenever the game board is clicked. It manages the input flow as well as the game result.
     * @param {*} e 
     * @returns Promise<void>
     */
    async function _on_game_board_click(e) {
        if (!isNaN(e.target.id)) {
            console.log(`Digit: ${e.target.id}`);
        } else {
            console.log(`NaN: ${e.target.id}`);
        }
    }
















    /***********************
     * GAME END MANAGEMENT *
     ***********************/







    /**
     * Triggers whenever the game ends, no matter the results.
     * @param {*} final_board_state 
     */
    function _on_game_end(final_board_state) {
        // Set the game result title
        _game_result_title.innerText = _get_game_result_title(final_board_state);

        // Display the result overlay
        _game_result_container.style.display = "flex";
    }




    /**
     * Converts the final board state into an easy to read title.
     * @param {*} final_board_state 
     * @returns string
     */
    function _get_game_result_title(final_board_state) {
        switch(final_board_state) {
            case "VICTORY":
                return "YOU WIN!";
            case "DEFEAT":
                return "YOU LOSE!";
            default:
                return "IT'S A TIE!";
        }
    }




    /**
     * Triggers when the play again button is clicked. The board is cleared and the game is restarted.
     */
    function _on_play_again_button_click() {
        // Hide the result overlay
        _game_result_container.style.display = "none";
            
        // Start the board
        Board.start();
    }
})();