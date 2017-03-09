"use strict";
/*
* Options:
* - title   ( string, optional, if value is "" not show.)
* - content ( string, required)
* - type    ( int, NORMAL/SUCCESS/WARING/ERROR)
*           ( optional, default is NORMAL )
* - mode    ( string, toast/modal/snackbar)
*           ( optional, default is toast )
* - delay   ( boolean, optional )
*
* Param:
* - string：
*   - 1：content
*   - 2：type content or title content
*
* - object
*   - { type: xxx, title: xxx, content: xxx }
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
        NORMAL  = 0,
        SUCCESS = 1,
        WARNING = 2,
        ERROR   = 3,
        MODE    = {
            toast    : "toast",
            modal    : "modal",
            snackbar : "snackbar",
        },
        options = {
            version : VERSION,
            title   : "",
            content : "",
            type    : NORMAL,
            mode    : MODE.toast,
            delay   : 1000 * 5,
        },
        timer      = {},
        $root,
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
            $root.undelegate( "." + event.data + " notify-a", "click", closeHandle );
            hidden( $(this).parent() );
        },
        delayHandler = function( item ) {
            clearTimeout( timer[item] );
            delete timer[item];
            hidden( this );
        },
        hidden = function( target ) {
            target.addClass( "notify-hide" );
            target.slideUp( 500, function() {
                target.remove();
                if ($root.children().length === 0 ) $root.css( "z-index", 0 );
            });
        },
        render = function() {
            var $target  = $( TMPL ),
                $title   = $target.find(prefix( "title"   )),
                $content = $target.find(prefix( "content" )),
                $close   = $target.find(prefix( "a"       )),
                item     = "notify-item-" + num++;

            this.title   ? $title.text( this.title )     : $title.hide();
            this.content ? $content.html( this.content ) : $content.hide();

            if ( this.mode === MODE.modal ) {
                $target.addClass( "notify-modal" );
                $content.addClass( "notify-modal-content" );
                $root.delegate( "." + item + " notify-a", "click", item, closeHandle );
            } else {
                $close.hide();
                timer[item] = setTimeout( delayHandler.bind( $target, item ), this.delay );
                this.mode == MODE.snackbar && $target.addClass( "notify-snackbar" );
            }

            switch( this.type ) {
                case 1:
                    $content.addClass( "notify-success" );
                    break;
                case 2:
                    $content.addClass( "notify-warning" );
                    break;
                case 3:
                    $content.addClass( "notify-error" );
                    break;
            }

            $target.addClass( item );
            $root.append( $target ).css( "z-index", 2147483647 );
            setTimeout( function() { $target.addClass( "notify-show" );}, 200 );
        };

    function Notify() {
        registyElement( name, [ "gp", "div", "a", "span", "title", "content", "i" ] );
        if ( $( "html" ).find ( root ).length == 0 ) {
            $( "html" ).append( roottmpl );
            $root = $( root );
        }
    }

    Notify.prototype.title   = options.title;
    Notify.prototype.content = options.content;
    Notify.prototype.type    = options.type;
    Notify.prototype.mode    = options.mode;
    Notify.prototype.delay   = options.delay;

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
                        this.mode  = MODE.modal,
                        this.title = arguments[0];
                    }
                    this.content   = arguments[1];
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