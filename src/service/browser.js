console.log( "=== simpread browser load ===" )

const mode = {
    chrome : "chrome",
    sogou  : "sogouExplorer",
    firefox: "firefox",
}, userAgent = () => {
    if ( window.navigator.userAgent.toLowerCase().includes( "firefox" ) ) {
        return "firefox";
    } else {
        return "chrome"
    }
};
let browser_type;

/**
 * Chromium browser api adapter
 * 
 * @class
 */
class Browser {

    /**
     * Browser adapter[read]
     * 
     * @return {object} current chromium
     */
    get adapter() {
        switch ( browser_type ) {
            case mode.chrome:
                return chrome;
            case mode.sogou:
                return sogouExplorer;
            case mode.firefox:
                return browser;
        }
    }

    /**
     * Browser type[read]
     * 
     * @return {string} browser type @see mode
     */
    get type() {
        return browser_type;
    }

    constructor( type ) {
        browser_type = type;
    }

}

const br      = new Browser( userAgent() ),
      adapter = br.adapter;

export {
    br,
    adapter as browser
};