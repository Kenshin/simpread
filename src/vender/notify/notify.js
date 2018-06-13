"use strict";

/*
* Options:
* - title   ( string, optional, if value is "" not show.)
*
* - content ( string, required)
*
* - type    ( int, NORMAL/SUCCESS/WARING/ERROR)
*           ( optional, default is NORMAL )
*
* - mode    ( string, toast/modal/snackbar)
*           ( optional, default is toast )
*
* - delay   ( boolean, optional )
*           ( default is 1000 * 5 )
*
* - icon    ( string,  optional )
*
* - action  ( string,  optional )
* - callback( func,    optional )
*           ( when action != "" must set callback )
*
* Param:
* - string：
*   - 1：content
*   - 2：type content or title content
*
* - object
*   - { type: xxx, title: xxx, content: xxx, mode: xxx, icon: xxx, delay: 500, action: xxx, callback:()=>{xxxx} }
*
* Example:
* new Notify().Render( "一个参数的 toast" );
* new Notify().Render( 0, "两个参数的 toast" );
* new Notify().Render( 1, "两个参数的 toast" );
* new Notify().Render( 2, "两个参数的 toast" );
* new Notify().Render( 3, "两个参数的 toast" );
* new Notify().Render( "snackbar", "两个参数的 snackbar" );
* new Notify().Render( "三个参数的 callback", "undo", ()=>{console.log("bbbbbb")} );
* new Notify().Render( "snackbar", "四个参数的 snackbar callback", "undo", ()=>{console.log("rrrrrr")} );
* new Notify().Render( "SimpTab 版本提示", `已更新到最新版本，详细请看 <a>CHANGELOG</a>` );
* new Notify().Render({ content: "带 icon 的 toast", icon: "<path>/weight_icon.png" } );
* new Notify().Render({ content: "带 delay 的 toast", delay: 10000 } );
* new Notify().Render({ content: "带 icon 的 snackbar", icon: "<path>/fontsize_icon.png" });
* new Notify().Render({ content: "带 callback 的 toast", icon: "<path>/icon.png", mode: "snackbar", action: "提交", callback: ()=>{console.log("dddddddd")}} );
* new Notify().Render( "错误的 callback", "undo", '()=>{console.log("eeeeeeee")}' );
* new Notify().Render({ content: "带确认的 toast", action: "提交", cancel: "取消", callback: type => {
     console.log( "current type is", type )
  }});
  new Notify().Render({ content: "一直存在带 close 的 toast", state: "holdon" });
*
  const notify = new Notify().Render({ content: "加载中，请稍等...", state: "loading" });
  setTimeout( ()=>{
    notify.complete();
    new Notify().Render("加载完成！");
  }, 2000);
* Notify.Position = rt( default ) | rb | lt | lb
*
*/
var Notify = ( function () {
    var VERSION = "2.0.1",
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
        STATE   = {
            loading  : "loading",
            holdon   : "holdon",
        },
        POSITION= {
            lefttop     : "lt",
            leftbottom  : "lb",
            rightbottom : "rb",
        },
        options = {
            version : VERSION,
            title   : "",
            content : "",
            type    : NORMAL,
            mode    : MODE.toast,
            state   : undefined,
            flat    : false,
            delay   : 1000 * 5,
            icon    : "",
            action  : "",
            cancel  : "",
            callback: undefined,
            complete: undefined,
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
            <notify-cancel></notify-cancel>\
        </notify>',
        loading    = '\
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling">\
                <circle stroke="#fff" stroke-width="10" cx="50" cy="50" fill="none" ng-attr-stroke="{{config.color}}" ng-attr-stroke-width="{{config.width}}" ng-attr-r="{{config.radius}}" ng-attr-stroke-dasharray="{{config.dasharray}}" r="30" stroke-dasharray="141.37166941154067 49.12388980384689" transform="rotate(102 50 50)">\
                    <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>\
                </circle>\
            </svg>',
        prefix     = function( value ) {
            return name + "-" + value;
        },
        registyElement = function( name, elements ) {
            elements.forEach( function( item ) {
                document.createElement( prefix( item ));
            });
        },
        closeHandle = function( event ) {
            $root.off( "click", "." + event.data + " notify-a", closeHandle );
            hidden( $(this).parent() );
        },
        delayHandler = function( item ) {
            clearTimeout( timer[item] );
            delete timer[item];
            hidden( this );
        },
        callbackHander = function( event ) {
            event.data[1] && event.data[1]( event.data[2] );
            $root.off( "click", "." + event.data[0] + " notify-action", callbackHander );
            hidden( $(this).parent() );
        },
        completeHandler = function() {
            hidden( this );
        },
        hidden = function( target ) {
            target.addClass( "notify-hide" ).slideUp( 500, function() {
                target.remove();
                if ($root.children().length === 0 ) $root.css( "z-index", 0 );
            });
        },
        render = function() {
            var $target  = $( TMPL ),
                $title   = $target.find(prefix( "title"   )),
                $content = $target.find(prefix( "content" )),
                $close   = $target.find(prefix( "a"       )),
                $icon    = $target.find(prefix( "i"       )),
                $action  = $target.find(prefix( "action"  )),
                $cancel  = $target.find(prefix( "cancel"  )),
                item     = "notify-item-" + num++,
                position = this.constructor.Position;

            this.title   ? $title.text( this.title )     : $title.hide();
            this.content ? $content.html( this.content ) : $content.hide();

            if ( this.mode === MODE.modal ) {
                $target.addClass( "notify-modal" );
                $content.addClass( "notify-modal-content" );
                $root.on( "click", "." + item + " notify-a", item, closeHandle );
            } else {
                $close.hide();
                this.mode == MODE.snackbar && $target.addClass( "notify-snackbar" );
            }

            this.mode !== MODE.modal && this.icon !== "" &&
                $icon.css({ "background-image": "url(" + this.icon + ")", "display": "block" });

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

            if ( this.action !== "" && this.callback && typeof this.callback == "function" ) {
                $content.css( "width", "100%" );
                $action.text( this.action ).css( "display", "block" );
                $root.on( "click", "." + item + " notify-action", [ item, this.callback, "action" ], callbackHander );
            }

            if ( this.cancel !== "" && this.callback && typeof this.callback == "function" ) {
                $content.css( "width", "100%" );
                $cancel.text( this.cancel ).css( "display", "block" );
                $root.on( "click", "." + item + " notify-cancel", [ item, this.callback, "cancel" ], callbackHander );
            }

            this.mode !== MODE.modal && this.state !== STATE.loading && this.state !== STATE.holdon && ( this.action == "" || !this.callback || typeof this.callback != "function" ) &&
                ( timer[item] = setTimeout( delayHandler.bind( $target, item ), this.delay ) );

            if ( this.state == STATE.loading ) {
                $icon.html( loading );
                $icon.css({ display: "block" });
                this.complete = completeHandler.bind( $target );
            }

            if ( this.state == STATE.holdon ) {
                $icon.css({ display: "block" }).addClass( "holdon" );
                $cancel.after( $icon[0].outerHTML );
                $target.find( "notify-i:first" ).remove();
                $root.on( "click", "." + item + " notify-i", [ item, this.callback, "holdon" ], callbackHander );
                if ( !this.action || !this.cancel ) $content.css({ width: "100%" });
            }

            if ( this.flat ) {
                $target.css({ "box-shadow": "none", "border-radius": "2px" });
            }

            if ( position == POSITION.rightbottom || position == POSITION.leftbottom ) {
                $target.css({ "transform-origin": "left bottom 0px" });
                $root.addClass( "notify-position-" + position + "-corner" );
            } else if ( position == POSITION.lefttop ) {
                $root.addClass( "notify-position-" + position + "-corner" );
            }

            $target.addClass( item );
            $root.append( $target ).css( "z-index", 2147483647 );
            this.mode == MODE.snackbar && $target.css( "margin-left", "-" + $target.width()/2 + "px" );
            setTimeout( function() { $target.addClass( "notify-show" ); }, 200 );
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
    Notify.prototype.state   = options.state;
    Notify.prototype.delay   = options.delay;
    Notify.prototype.icon    = options.icon;
    Notify.prototype.flat    = options.flat;
    Notify.prototype.action  = options.action;
    Notify.prototype.cancel  = options.cancel;
    Notify.prototype.callback= options.callback;
    Notify.prototype.complete= options.complete;
    Notify.Position          = undefined;

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
                    if ( arguments[0] == MODE.snackbar ) {
                        this.mode = arguments[0];
                    }
                    else if ( typeof arguments[0] == "number" ) {
                        this.type  = arguments[0];
                    } else {
                        this.mode  = MODE.modal,
                        this.title = arguments[0];
                    }
                    this.content   = arguments[1];
                    break;
                case 3:
                    this.content   = arguments[0];
                    this.action    = arguments[1];
                    this.callback  = arguments[2];
                    break;
                case 4:
                    if ( arguments[0] == MODE.snackbar ) {
                        this.mode      = arguments[0];
                        this.content   = arguments[1];
                        this.action    = arguments[2];
                        this.callback  = arguments[3];
                    }
                    break;
            }
            render.bind( self )();
        }
        else {
            console.error( "Arguments error", arguments );
        }
        return self;
    };

    Notify.prototype.Clone  = function () {
        return new Notify();
    };

    return Notify;

})();

module.exports = Notify;