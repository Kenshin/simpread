console.log( "=== simpread read toc load ===" )

let is_click = false;

class TOC extends React.Component {

    onClick( event ) {
        try {
            is_click    = true;
            let $target = $( event.target ).parent();

            while ( $target.is( "a" ) ) { $target = $target.parent(); }
            if ( $target.is( "toc" ) ){
                return;
            }

            $target.parent().find( "active" ).removeClass( "toc-outline-active" );
            $target.find( "active" ).addClass( "toc-outline-active" );

            const href      = $target.find( "a" ).attr( "href" ),
                  offsetTop = href === "#" ? 0 : $(href).offset().top - 5;
            $( "html" ).stop().animate({
                scrollTop: offsetTop
            }, 300, () => {
                setTimeout( ()=>is_click = false, 500 );
            });
            event.preventDefault();
        } catch ( error ) {
            console.error( "toc error ", error )
        }
    }

    componentDidMount() {
        let lastId;
        const topMenu       = $( "toc" ),
              topMenuHeight = topMenu.outerHeight(),
              menuItems     = topMenu.find( "a" ),
              scrollItems   = menuItems.map( function() {
                const item  = $( $(this).attr("href") );
                    if ( item.length ) { return item; }
              }),
              setActive = function() {
                if ( is_click ) return;
                const fromTop = $(window).scrollTop() + topMenuHeight;
                let cur = scrollItems.map( function() {
                if ($(this).offset().top < fromTop)
                    return this;
                });
                cur = cur[cur.length - 1];
                let id = cur && cur.length ? cur[0].id : "";
    
                if ( lastId !== id ) {
                    lastId = id;
                    id == "" && ( id = "sr-toc-0" );
                    menuItems.parent().find( "active" ).removeClass( "toc-outline-active" );
                    menuItems.filter("[href='#"+id+"']").parent().find( "active" ).addClass( "toc-outline-active" );
                }
            };

        $( window ).scroll( setActive );

        $( "outline" ).map( ( idx, item ) => {
            $(item).width( 180 - parseInt( $(item).css("padding-left") ) );
        })

        this.props.hidden == false && $( "toc" ).css({ "width" : "initial" });

        setActive();
    }

    render() {
        const outline = this.props.table.map( item => {
            return (
                <outline className={ item.level } onClick={ evt=>this.onClick(evt) }>
                    <active></active>
                    <a className={ "toc-outline-theme-" + this.props.theme } href={ "#" + item.id}><span>{ item.value }</span></a>
                </outline>
            )
        });
        return (
            <toc className="simpread-font simpread-theme-root">
                { outline }
            </toc>
        )
    }

}

/**
 * Render
 * 
 * @param {string} selector name
 * @param {jquery} jquery object
 * @param {string} theme
 * @param {boolen} hidden
 */
function Render( root, $target, theme, hidden ) {

    // hack code
    //if ( location.host.includes( "blog.csdn.net"  )) return;
    //if ( location.host.includes( "post.smzdm.com" )) return;

    const table = [],
          cls   = hidden ? "toc-bg-hidden" : "";
    $target.find( "h1, h2, h3, h4" ).map( ( idx, item) => {
        const $item = $( item ),
              tag   = $item[0].tagName.toLowerCase(),
              value = $item.text();
        let   id    = $item.attr( "id" );
        id          = id == undefined ? `sr-toc-${idx}` : `${id}-${idx}`
        $item.attr( "id", id );
        value && table.push({
            level: `toc-level-${tag}`,
            id,
            value,
        });
    });
    console.log( "current toc is ", table )
    $( root ).append( `<toc-bg class=${cls}></tocbg>` );
    table.length > 1 && ReactDOM.render( <TOC hidden={ hidden } table={ table } theme={ theme } />, $( "toc-bg" )[0] );
}

export {
    Render
}