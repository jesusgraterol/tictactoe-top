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











    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        get_marker
    }
}