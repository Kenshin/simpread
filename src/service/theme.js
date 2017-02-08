console.log( "=== simpread theme load ===" )

const names  = [ "github", "newsprint", "gothic", "engwrite", "octopress", "pixyii", "monospace", "night", "dark" ],
      flag   = "sr-rd-theme-",
      themes = {},
      colors = [
        "251, 251, 251, 1",
        "243, 242, 238, 1",
        "252, 252, 252, 1",
        "252, 245, 237, 1",
        "248, 248, 248, 1",
        "255, 255, 255, 1",
        "255, 255, 255, 1",
        "54,  59,  64,  1",
        "34,  34,  34,  1"
       ];

let curtheme = "";

/**
 * Theme class
 * 
 * @class
 */

class Theme {

    /**
     * Theme colors[read]
     * 
     * @return {array} theme colors
     */
    get colors() {
        return  colors;
    }

    /**
     * Theme names[read]
     * 
     * @return {array} theme name array
     */
    get names() {
        return names;
    }

    /**
     * Current theme name[read]
     * 
     * @return {string} theme name
     */
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
            if ( name == theme )  $target.html( themes[theme] );
            else                  $target.html( `${flag}${name}` + "{}" );
        });
    }

    constructor() {
        for ( const name of names ) { require( `../assets/css/theme_${name}.css` ); }
        findThemeStyle( function( name, content ) { themes[name] = content; });
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