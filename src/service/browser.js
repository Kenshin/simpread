console.log( "=== simpread browser load ===" )

const mode = {
    chrome : "chrome",
    sogou  : "sogouExplorer",
}

/**
 * Chromium browser api adapter
 * 
 * @class
 */
class Browser {

    /**
     * adapter[read]
     * 
     * @return {object} current chromium
     */
    get adapter() {
        switch ( this.type ) {
            case mode.chrome:
                return chrome;
            case mode.sogou:
                return sogouExplorer;
        }
    }

    constructor( type ) {
        this.type = type;
    }

}

const br      = new Browser( mode.chrome ),
      adapter = br.adapter;

export {
    br,
    adapter as browser
};