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
    Board.get_game_board().addEventListener("click", _on_game_board_click);

    // Initialize the game result elements
    const _game_result_container = document.getElementById("game_result_container");
    const _game_result_title = document.getElementById("game_result_title");
    const _play_again_button = document.getElementById("play_again_button");
    _play_again_button.addEventListener("click", _on_play_again_button_click);










    /************************
     * GAME MENU MANAGEMENT *
     ************************/





    /**
     * Triggers when the player chooses a marker correctly and initializes the game.
     * @param {*} e 
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

            // Check if the machine goes first
            if (player_marker == "O") _process_machine_input();
        }
    }












    /**************************************
     * GAME BOARD INTERACTIONS MANAGEMENT *
     **************************************/






    /**
     * Triggers whenever the game board is clicked. It manages the input flow as well as the game result.
     * @param {*} e 
     * @returns Promise<void>
     */
    async function _on_game_board_click(e) {
        // Extract the player's input
        const player_input = player.extract_input(
            e.target.id, 
            Board.get_state(), 
            Board.get_cell_states()
        );

        // Only proceed if a number was received
        if (typeof player_input == "number") {
            // Process the input
            Board.process_input(player_input, player.get_marker());

            // Check if the game ended
            if (Board.has_game_ended()) { _on_game_end(Board.get_state() ) } 
            
            // Otherwise, handle the machine's input
            else {
                // Process the machine's input
                await _process_machine_input();

                // Check if the game ended
                if (Board.has_game_ended()) { _on_game_end(Board.get_state() ) } 
            }
        }
    }







    /**
     * After activating the machine thinking simulation for UX purposes, it actually extracts the
     * input (cell id) and processes it.
     * @returns Promise<void>
     */
    async function _process_machine_input() {
        // Firstly, make it look like the machine is thinking
        await Board.simulate_machine_thinking(machine.get_marker());

        // Process it
        Board.process_input(machine.extract_input(Board.get_cell_states()), machine.get_marker());
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
        if (final_board_state == "TIE") {
            return "IT'S A TIE!";
        } else if (final_board_state == "X_WINS" && player.get_marker() == "X") {
            return "YOU WIN!";
        } else if (final_board_state == "O_WINS" && player.get_marker() == "O") {
            return "YOU WIN!";
        }  else {
            return "YOU LOSE!";
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