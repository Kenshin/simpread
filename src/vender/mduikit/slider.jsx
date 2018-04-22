/*!
 * React Material Design: Slider
 * 
 * @version : 0.0.1
 * @update  : 2018/04/21
 * @homepage: https://github.com/kenshin/mduikit
 * @license : MIT https://github.com/kenshin/mduikit/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Slider ====" )

let styles = new Map();

    const normal_color = 'rgba(0, 137, 123, 1)',
          hover_color  = 'rgb(0, 105, 92)',
        cssinjs = () => {

        const
            color       = 'rgba(51, 51, 51, .87)',
            focus_color = 'rgba(0, 137, 123, .8)',
            border_color= 'rgba(224, 224, 224, 1)',
            error_color = 'rgba(244, 67, 54, 1)',
            margin      = '8px 0 0 0',
            display     = 'block',
            medium      = '14px',
            large       = '16px',
            lineHeight  = 1.5,
            fontWeight  = 'bold',
            width       = '100%',
            styles      = {
            root: {
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
    
                width: '100%',
                height: '37px',
    
                margin: '8px 0 0 0',
                padding: 0,
            },

            group: {
                position: 'relative',
                width: '100%',
            },

            line: {
                position: 'absolute',
                width: '20px',

                left: 0,
                bottom: '6px',

                width: '20px',
                height: '3px',

                backgroundColor: 'rgba(0, 137, 123, 1)',
                pointerEvents: 'none',
            },

            text_field: {
                display,
                position: 'relative',
                margin: '0 0 0 30px',
                padding: 0,

                width: '50px',
                lineHeight: 1,
            },

            input: {
                color,
                backgroundColor: 'transparent',

                width,
                height: '20px',

                margin: 0,
                padding: 0,

                fontFamily: 'sans-serif',
                fontSize: medium,
                textAlign: 'center',

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

            state_error : {
                transform: 'scaleX(1)',
                borderTop: `none ${error_color}`,
                borderLeft: `none ${error_color}`,
                borderRight: `none ${error_color}`,
                borderBottom: `2px solid ${error_color}`,
            },

            error : {
                display,
                position: 'relative',

                margin,
                maxWidth: '428px',

                fontSize: medium,
                fontWeight,
                lineHeight,
                textAlign: 'initial',
                wordWrap: 'break-word',

                userSelect: 'none',

                color: error_color,
                transform: 'scale(0.75) translate( -73px, 0 )',
            },

        };

        return styles;
    },
    range_style = `
        slider input[type=range] {
            position: absolute;
            left: 0;
            bottom: 0;

            width: 100%;

            margin: 6px 0;
            padding: 0;

            border: none;
            background-color: transparent;
            -webkit-appearance: none;
        }

        slider input[type=range]:focus {
            outline: none;
        }

        slider input[type=range]::-webkit-slider-runnable-track {
            width: 100%;
            height: 3px;

            background-color: #c2c0c2;

            box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.5), 0px 0px 0px rgba(13, 13, 13, 0.5);
            border-radius: 1.3px;

            transition: all 0.3s;
            cursor: pointer;
        }

        slider input[type=range]::-webkit-slider-thumb {
            height: 14px;
            width: 14px;

            margin-top: -5px;

            background: rgba(0, 137, 123, 1);

            box-shadow: 1px 1px 1px rgba(0, 0, 0, 0), 0px 0px 1px rgba(13, 13, 13, 0);
            border: 1px solid rgba(0, 0, 0, 0);
            border-radius: 50px;

            cursor: pointer;
            -webkit-appearance: none;
            transition: all .5s ease-in-out .1s;
        }

        slider input[type=range]:focus::-webkit-slider-thumb {
            background: rgba(0, 137, 123, 1);
        }

        slider input[type=range]:focus::-webkit-slider-thumb:hover {
            background: rgb(0, 105, 92);
        }
    `;

/**
 * Custom component: Slider, component e.g.
 * 
    <slider>
        <group>
            <line></line>
            <input type="range" min=0 max=100 step=1 />
        </group>
    </slider>
 * 
 * Reference:
 * - https://material.io/guidelines/components/sliders.html#sliders-continuous-slider
 * - http://materializecss.com/range.html
 * 
 * @class
 */
export default class Slider extends React.Component {

    static defaultProps = {
        min  : 0,
        max  : 100,
        step : 0,
        value: 0,
    };

    static propTypes = {
        min     : React.PropTypes.number,
        max     : React.PropTypes.number,
        step    : React.PropTypes.number,
        value   : React.PropTypes.number,
        onChange: React.PropTypes.func,
    }

    state = {
        id   : Math.round(+new Date()),
    }

    lineWidth( value ) {
        const maxWidth = $( this.refs.range ).width(),
              perc     = ( this.props.max - value ) / ( this.props.max - this.props.min );
        $( this.refs.line ).width( maxWidth - ( maxWidth * perc ));
    }

    onTextChangeFocus( event ) {
        const style   = styles.get( this.state.id ),
              $target = $( event.target ),
              $state  = $target.next().find( "text-field-state" );
        $state.css({ ...style.state, ...style.state_focus });
    }

    onTextChangeBlur( event ) {
        const style   = styles.get( this.state.id ),
              $target = $( event.target ),
              $state  = $target.next().find( "text-field-state" );
        $state.css({ ...style.state });
    }

    onTextChange( event ) {
        let   istrue  = true;
        const style   = styles.get( this.state.id ),
              $target = $( event.target ),
              $state  = $target.next().find( "text-field-state" ),
              min     = Number.parseInt( this.props.min ),
              max     = Number.parseInt( this.props.max ),
              value   = Number.parseInt( event.target.value );
         if ( !Number.isInteger( value )) {
            istrue = false;
        } else if ( value < min ) {
            istrue = false;
        } else if ( value > max ) {
            istrue = false;
        }
        if ( !istrue ) {
            $state.css({ ...style.state, ...style.state_error });
        } else {
            $state.css({ ...style.state, ...style.state_focus });
            this.refs.range.value = event.target.value;
            this.refs.input.value = event.target.value;
            this.lineWidth( event.target.value );
            this.props.onChange && this.props.onChange( event.target.value, event );
        }
    }

    onMouseUp( event ) {
        const style  = styles.get( this.state.id ),
              $state = $( event.target ).parent().next().find( "text-field-state" );
        $state.css({ ...style.state });
    }

    onChange( event ) {
        const style  = styles.get( this.state.id ),
              $state = $( event.target ).parent().next().find( "text-field-state" );
        $state.css({ ...style.state, ...style.state_focus });
        this.refs.input.value = event.target.value;
        this.lineWidth( event.target.value );
        this.props.onChange && this.props.onChange( event.target.value, event );
    }

    componentWillMount() {
        $( "#mduikit-slider" ).length > 0 && $( "#mduikit-slider" ).remove();
        $( "head" ).append(`<style type="text/css" id="mduikit-slider">${range_style}</style>`);
    }

    componentDidMount() {
        this.refs.range.value = this.props.value;
        this.refs.input.value = this.props.value;
        this.lineWidth( this.props.value );
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        const events = {
            onFocus  : (e)=>this.onTextChangeFocus(e),
            onBlur   : (e)=>this.onTextChangeBlur(e),
            onChange : (e)=>this.onTextChange(e),
        };

        return (
            <slider style={ style.root }>
                <group style={ style.group }>
                    <input ref="range" type="range" min={this.props.min} max={this.props.max} step={this.props.step} onChange={ evt=> this.onChange(evt) } onMouseUp={ evt=>this.onMouseUp(evt)}/>
                    <line ref="line" style={ style.line }></line>
                </group>
                <text-field style={ style.text_field }>
                    <input ref="input" style={ style.input } { ...events } />
                    <div>
                        <text-field-border style={ style.border }/>
                        <text-field-state style={ style.state }/>
                    </div>
                    <text-field-error style={ style.error }>{ this.props.errortext }</text-field-error>
                </text-field>
            </slider>
        )
    }

}