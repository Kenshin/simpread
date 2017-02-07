console.log( "=== simpread theme load ===" )

import 'github';
import 'newsprint';
import 'gothic';

const flag   = "sr-rd-theme-",
      themes = {},
      color  = [
        "251, 251, 251,  1",
        "243, 242, 238, 1",
        "252, 252, 252, 1"
       ],
       names = [ "github", "newsprint", "gothic" ];

let curtheme = "";

/**
 * Theme class
 * 
 * @class
 */

class Theme {

    get colors() {
        return  color;
    }

    get names() {
        return names;
    }

    get theme() {
        return curtheme;
    }

    /**
     * Change theme
     * 
     * @param {string} theme name
     */
    Change( theme ) {
        curtheme = theme;
        findThemeStyle( function( name, css, $target ) {
            if ( name == theme ) {
                $target.html( themes[theme] );
            } else {
                $target.html( `sr-rd-theme-${name}` + "{}" );
            }
        });
    }

    constructor() {
        findThemeStyle( function( name, content ) {
            themes[name] = content;
        });
    }
}

/**
 * Find theme style tag
 * 
 * @return {function} param1: theme name; param2: theme css; param3: theme style tag jquery object
 */
function findThemeStyle( callback ) {
    $( "head" ).find( "style" ).map( (index, item) => {
        const $target = $(item),
              css     = $target.text();
        if ( css.startsWith( flag ) ) {
            const arr  = css.replace( flag, "" ).match( /\w+/ ),
                  name = arr[ arr.length - 1 ];
            callback( name, css, $target );
        }
    });
}

const theme = new Theme();

export default theme;