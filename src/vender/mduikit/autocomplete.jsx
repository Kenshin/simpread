/*!
 * React Material Design: AutoComplete
 * 
 * @version : 0.0.1
 * @update  : 2018/04/23
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: AutoComplete ====" )

const cssinjs = () => {

    const focus_color = 'rgba(0, 137, 123, .8)',
          border_color= 'rgba(224, 224, 224, 1)',
          margin      = '8px 0 0 0',
          display     = 'block',
          medium      = '14px',
          large       = '16px',
          lineHeight  = 1.5,
          fontWeight  = 'bold',
          width       = '100%',
          styles      = {
            root: {
                display,
                position: 'relative',
                margin: 0,
                padding: 0,

                width,
                lineHeight: 1,
            },

            input: {
                backgroundColor: 'transparent',

                width,
                height: '20px',

                margin,
                padding: 0,

                fontFamily: 'sans-serif',
                fontSize: medium,

                border: 'none',
                outline: 'none',

                boxShadow: 'none',
                boxSizing: 'content-box',
                transition: 'all 0.3s',
            },

            border : {
                display,

                width,
                margin,

                borderTop: `none ${border_color}`,
                borderLeft: `none ${border_color}`,
                borderRight: `none ${border_color}`,
                borderBottom: `1px solid ${border_color}`,
                boxSizing: 'content-box',
            },

            float : {
                display,
                position: 'absolute',

                margin,

                color: 'rgb(117, 117, 117)',

                fontSize: medium,
                fontWeight: 'initial',

                userSelect: 'none',
                pointerEvents: 'none',

                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
                transform: 'scale(1) translate( 0px, 0px )',
                transformOrigin: 'left top 0px',
            },

            float_focus : {
                color: focus_color,

                margin: `-${margin}`,

                fontSize: medium,
                fontWeight,

                transform: 'scale(0.75) translate( 0px, -8px )',
            },

            state : {
                display,
                position: 'absolute',

                width,
                margin: '-1px 0 0 0',

                borderTop: `none ${focus_color}`,
                borderLeft: `none ${focus_color}`,
                borderRight: `none ${focus_color}`,
                borderBottom: `2px solid ${focus_color}`,
                boxSizing: 'content-box',

                transform: 'scaleX(0)',
                transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },

            state_focus : {
                transform: 'scaleX(1)',
            },

            icon: {
                display: 'block',
                position: 'absolute',

                width: '24px',
                height: '24px',

                top: '1px',
                right: 0,

                border: 'none',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundImage: 'url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAABqSURBVEiJ7dQxCsAgDIXhZ8ktgmetVw31GIF06lI0yeIWJyH4f4hgMzOcXNfRegEFFAAAoGA+ROR2A0STmftu7t5ARAYRTS+uqtt4CACAqvYVkomngBWSjQPxG/yR59tnz7X6rgso4DzwAnJQKlbAmFdgAAAAAElFTkSuQmCC)',

                cursor: 'pointer',
            },

        };

    return styles;
};

const cssinjs_list = () => {

    const styles = {
            root : {
                display: 'block',
                position: 'absolute',

                top: '40px',
                left: 0,

                margin: 0,
                padding: 0,

                width: '100%',
                maxHeight: '400px',

                color: 'rgba(51, 51, 51, .87)',
                backgroundColor: 'rgba(255, 255, 255, 1)',

                boxSizing: 'border-box',
                boxShadow: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
                borderRadius: '2px',

                zIndex: 2100,

                overflowY: 'auto',

                opacity: 0,
                transform: 'scaleY(0)',
                transformOrigin: 'left top 0px',
                transition : 'transform 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',

                overflowX: 'hidden',
            },

            open: {
                opacity: 1,
                transform: 'scaleY(1)',
            },

            list_filed: {
                display: 'flex',
                alignItems: 'center',

                padding: '8px 24px 8px 16px',

                height: '36px',
                width: '100%',

                textAlign: 'left',

                boxSizing: 'border-box',
                transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms',

                cursor: 'pointer',
            },

            list_filed_value: {
                display: 'inline',
                width: '100%',
                fontSize: 'inherit',
            },

    }

    return styles;
};

class ListView extends React.Component {

    static defaultProps = {
        waves           : "",
        items           : [],
        active          : "",
    };

    static propTypes = {
        waves           : React.PropTypes.string,
        items           : React.PropTypes.array,
        active          : React.PropTypes.string,
        onChange        : React.PropTypes.func,
    };

    style = cssinjs_list()

    onMouseOver( event ) {
        const $target = $( event.target );
        if ( $target.is( "list-field" ) ) {
            $( "list-field[active=true]" ).css( "background-color", "transparent" ).attr( "active", false );
            $target.attr( "active", true ).css( "background-color", this.props.hoverColor );
        }
    }

    onClick( event ) {
        this.props.onChange && this.props.onChange( $( event.target ).text(), $(event.target).attr("value") );
    }

    render() {
        const style = { ...this.style };
        style.root  = this.props.items.length > 0 ? { ...style.root, ...style.open } : { ...style.root };
        const list  = this.props.items.map( ( item, idx ) => {
            let name_style = { ...style.list_filed_value };
            item.value == this.props.active && ( name_style.color = this.props.activeColor );
            item.style && item.style.root   && ( style.list_filed = { ...style.list_filed, ...item.style.root });
            item.style && item.style.text   && ( name_style       = { ...name_style, ...item.style.text });
            return (
                <list-field class={ this.props.waves } style={ style.list_filed } value={ item.value } onMouseOver={ (e)=>this.onMouseOver(e) } onClick={ (e)=>this.onClick(e) }>
                    <list-field-name style={ name_style } value={ item.value }>{ item.name }</list-field-name>
                </list-field>
            )
        });

        return (
            <list-view style={ style.root }>
                { list }
            </list-view>
        )
    }
}

/**
 * Custom component: AutoComplete
 * 
    <auto-complete>
        <icon></icon>
        <text-field-float></text-field-float>
        <input/>
        <group>
            <text-field-border/>
            <text-field-state/>
        </group>
        <list-view>
            <list-field>
                <list-field-name></list-field-name>
            </list-field>
        </list-view>
    </auto-complete>
 * 
 * Reference:
 * - https://material.io/guidelines/components/text-fields.html#text-fields-layout
 * - http://materializecss.com/autocomplete.html
 * 
 * @class
 */
export default class AC extends React.Component {

    static defaultProps = {
        // input
        color       : "rgba(51, 51, 51, .87)",
        value       : "",
        placeholder : "",
        floating    : undefined,
        // dropdown
        items       : [],
        activeColor : "rgba(255, 64, 129, 1)",
        hoverColor  : "rgba(238, 238, 238, 1)",
        borderColor : undefined,
        focusColor  : undefined,

        tooltip     : {},
    };

    static propTypes = {
        // input
        color       : React.PropTypes.string,
        value       : React.PropTypes.string,
        placeholder : React.PropTypes.string,
        floating    : React.PropTypes.string,
        items       : React.PropTypes.array,
        // dropdown
        activeColor : React.PropTypes.string,
        hoverColor  : React.PropTypes.string,
        borderColor : undefined,
        focusColor  : undefined,

        tooltip     : React.PropTypes.object,
        // event
        onChange    : React.PropTypes.func,
    }

    style = cssinjs()

    state = {
        name  : "",
        items : [],
    }

    // usage hack code, not usage react
    onTextKeyDown( event ) {
        const $target = $( "list-view" );
        if ( $target.children().length == 0 && event.keyCode == 40 ) {
            this.setState({ name : this.refs.input.value, items: this.props.items });
            this.refs.dropdown.dataset.state = "open";
            return;
        }
        const $sub = $target.find( "list-field[active=true]" );
        if ( event.keyCode == 9 || event.keyCode == 27 ) {
            this.refs.dropdown.dataset.state = "close";
            this.setState({ name : "", items: [] });
        }
        else if ( event.keyCode == 40 ) {
            if ( $sub.length == 0 ) {
                $target.children().first().attr( "active", true ).css( "background-color", this.props.hoverColor );
            } else {
                $sub.css( "background-color", "transparent" ).attr( "active", false );
                $sub.next().attr( "active", true ).css( "background-color", this.props.hoverColor );
            }
        } else if ( event.keyCode == 38 ) {
            if ( $sub.length == 0 ) {
                $target.children().last().attr( "active", true ).css( "background-color", this.props.hoverColor );
            } else {
                $sub.css( "background-color", "transparent" ).attr( "active", false );
                $sub.prev().attr( "active", true ).css( "background-color", this.props.hoverColor );
            }
        } else if ( event.keyCode == 13 ) {
            this.onDropdownChange( $sub.text(), $sub.attr("value") );
        }
    }

    onTextChangeFocus( event ) {
        const style   = { ...this.style },
              $target = $( this.refs.input ),
              $state  = $target.next().find( "text-field-state" ),
              $float  = $target.prev();
        $state.css({ ...style.state, ...style.state_focus });
        this.props.floating != "" && $float.css({ ...style.float, ...style.float_focus });
    }

    onTextChangeBlur( event ) {
        const style   = { ...this.style },
              $target = $( event.target ),
              $state  = $target.next().find( "text-field-state" ),
              $float  = $target.prev();
        $state.css({ ...style.state });
        if ( this.props.floating != "" && event.target.value == "" ) $float.css({ ...style.float });
    }

    onTextChange( event ) {
        if ( event.target.value == "" ) {
            this.setState({ name : "", items: [] });
            this.refs.dropdown.dataset.state = "close";
        } else {
            this.setState({name : event.target.value, items: this.filter( event.target.value ) });
            this.refs.dropdown.dataset.state = "open";
        }
        this.props.onChange && this.props.onChange( name, event.target.value );
    }

    onDropdownClick( event ) {
        if ( event.target.dataset.state == "close" ) {
            this.setState({ name : this.refs.input.value, items: this.props.items });
            event.target.dataset.state = "open";
        } else {
            this.setState({ name : "", items: [] });
            event.target.dataset.state = "close";
        }
    }

    onDropdownChange( name, value ) {
        this.refs.input.value = value == undefined ? "" : value;
        this.refs.dropdown.dataset.state = "close";
        this.setState({ name : "", items: [] });
        this.props.onChange && this.props.onChange( name, value );
    }

    filter( value ) {
        return this.props.items.filter( obj => {
            return obj.name.includes( value );
        });
    }

    componentDidMount() {
        this.refs.input.value = this.props.value;
    }

    render() {
        const style       = { ...this.style };
        style.input.color = this.props.color;
        style.float       = this.props.placeholder == "" && this.props.value == "" ? style.float : { ...style.float, ...style.float_focus };
        if ( this.props.borderColor ) {
            style.border.borderTop    = `none ${this.props.borderColor}`;
            style.border.borderLeft   = `none ${this.props.borderColor}`;
            style.border.borderRight  = `none ${this.props.borderColor}`;
            style.border.borderBottom = `1px solid ${this.props.borderColor}`;
        }
        if ( this.props.focusColor ) {
            style.float_focus.color  = this.props.focusColor;
            style.state.borderTop    = `none ${this.props.focusColor}`;
            style.state.borderLeft   = `none ${this.props.focusColor}`;
            style.state.borderRight  = `none ${this.props.focusColor}`;
            style.state.borderBottom = `2px solid ${this.props.focusColor}`;
        }

        const props = {
            placeholder :this.props.placeholder,
            onFocus  : (e)=>this.onTextChangeFocus(e),
            onBlur   : (e)=>this.onTextChangeBlur(e),
            onChange : (e)=>this.onTextChange(e),
            onKeyDown: (e)=>this.onTextKeyDown(e),
        },
        tooltip = this.props.tooltip;

        return (
            <auto-complete style={ style.root }
                data-tooltip={ tooltip.text ? tooltip.text : this.props[ tooltip.target ] } data-tooltip-position={ tooltip.position } data-tooltip-delay={ tooltip.delay }>
                <icon ref="dropdown" style={ style.icon } data-state="close" onClick={evt=>this.onDropdownClick(evt)}></icon>
                <text-field-float style={ style.float }>{this.props.floating}</text-field-float>
                <input ref="input" style={ style.input } { ...props }/>
                <ac-group>
                    <text-field-border style={ style.border }/>
                    <text-field-state style={ style.state }/>
                </ac-group>
                <ListView waves={ this.props.waves } onChange={ (n,v)=>this.onDropdownChange(n,v) }
                    activeColor={ this.props.activeColor } hoverColor={ this.props.hoverColor }
                    active={ this.state.name } items={ this.state.items } />
            </auto-complete>
        )
    }

}
