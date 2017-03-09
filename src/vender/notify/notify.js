"use strict";
/*
* Options:
* - title   ( string, optional, if value is "" not show.)
* - content ( string, required)
* - type    ( int, MESSAGE/WARING/ERROR)
*           ( optional, default is MESSAGE )
*
* Param:
* - string：
*   - 1：content
*   - 2：type content
*   - 3：type title content
*   - 4：type title content closed
* - object
*   - { type: xxx, title: xxx, content: xxx, close: true/false   }
*
* Example:
* new Notify().Render( "Test" );
* new Notify().Render( 0, "Test 2" );
* new Notify().Render( 0, "Test title", "Test 3" );
* new Notify().Render( 0, "SimpTab has update.", "New version changlog here.", true );
* new Notify().Render( { title: "SimpTab has update.", content: "New version changlog here.", type: 0, closed: true } );
*
*/
var Notify = ( function () {
    var VERSION = "2.0.0",
        name    = "notify",
        root    = "notify-gp",
        roottmpl= "<" + root + ">",
        num     = 0,
        MESSAGE = 0,
        WARNING = 1,
        ERROR   = 2,
        options = {
            title   : "",
            content : "",
            type    : MESSAGE,
            version : VERSION
        },
        timer      = {},
        $container,
        TMPL       = '\
        <notify>\
            <notify-a href="javascript:;"><notify-span></notify-span></notify-a>\
            <notify-i></notify-i>\
            <notify-title></notify-title>\
            <notify-content></notify-content>\
            <notify-action></notify-action>\
        </notify>',
        prefix      = function( value ) {
            return name + "-" + value;
        },
        registyElement = function( name, elements ) {
            elements.forEach( function( item ) {
                document.createElement( prefix( item ));
            });
        },
        closeHandle = function( event ) {
            $container.undelegate( "." + event.data + " notify-a", "click", closeHandle );
            hidden( $(this).parent() );
        },
        delay = function( item ) {
            clearTimeout( timer[item] );
            delete timer[item];
            hidden( this );
        },
        hidden = function( target ) {
            target.addClass( "notify-hide" );
            target.slideUp( 500, function() {
                target.remove();
                if ($container.children().length === 0 ) $container.css( "z-index", 0 );
            });
        },
        render = function() {
            var $tmpl    = $( TMPL ),
                $title   = $tmpl.find(prefix( "title"   )),
                $content = $tmpl.find(prefix( "content" )),
                $close   = $tmpl.find(prefix( "a"       )),
                item     = "notify-item-" + num++;

            this.title   ? $title.text( this.title )     : $title.hide();
            this.content ? $content.html( this.content ) : $content.hide();
            /*if ( this.closed ) {
                $container.delegate( "." + item + " notify-a", "click", item, closeHandle );
            }
            else {
                $close.hide();
                timer[item] = setTimeout( delay.bind( $tmpl, item ), 1000 * 5 );
            }*/
            $close.hide();
            timer[item] = setTimeout( delay.bind( $tmpl, item ), 1000 * 5 );

            $tmpl.addClass( item );
            $container.append( $tmpl ).css( "z-index", 2147483647 );
            setTimeout( function() { $tmpl.addClass( "notify-show" );}, 200 );
        };

    function Notify() {
        registyElement( name, [ "gp", "div", "a", "span", "title", "content", "i" ] );
        if ( $( "html" ).find ( root ).length == 0 ) {
            $( "html" ).append( roottmpl );
            $container = $( root );
        }
    }

    Notify.prototype.title   = options.title;
    Notify.prototype.content = options.content;
    Notify.prototype.type    = options.type;

    Notify.prototype.Render  = function () {

        var self = this;

        if ( arguments.length === 1 && typeof arguments[0] === "object" ) {
            options = arguments[0];

            Object.keys( options ).forEach( function( item ) {
                self[item] = options[item];
            });

            render.bind( self )();
        }
        else if ( typeof arguments[0] !== "object" && arguments.length > 0 && arguments.length < 5 ) {
            switch ( arguments.length ) {
                case 1:
                    this.content = arguments[0];
                    break;
                case 2:
                    if ( typeof arguments[0] == "number" ) {
                        this.type  = arguments[0];
                    } else {
                        this.title = arguments[0];
                    }
                    this.content = arguments[1];
                    break;
            }
            render.bind( self )();
        }
        else {
            console.error( "Arguments error", arguments );
        }
    };

    return Notify;

})();

module.exports = Notify;