


/**
 * Player Factory
 * ...
 */
export function Player(marker) {




    /**
     * Retrieves the marker selected by the player when the app was first initialized.
     * @returns string
     */
    function get_marker() { return marker }




    /**************************************
     * PUBLIC PROPERTIES/METHODS EXPOSURE *
     **************************************/
    return {
        get_marker
    }
}