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

        const styles = {
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

    onChange( event ) {
        this.props.onChange && this.props.onChange( event );
        this.lineWidth( event.target.value );
    }

    componentWillMount() {
        $( "#mduikit-slider" ).length > 0 && $( "#mduikit-slider" ).remove();
        $( "head" ).append(`<style type="text/css" id="mduikit-slider">${range_style}</style>`);
    }

    componentDidMount() {
        this.refs.range.value = this.props.value;
        this.lineWidth( this.props.value );
    }

    render() {
        const style = { ...cssinjs() };
        styles.set( this.state.id, style );

        return (
            <slider style={ style.root }>
                <group style={ style.group }>
                    <input ref="range" type="range" min={this.props.min} max={this.props.max} step={this.props.step} onChange={ evt=> this.onChange(evt) }/>
                    <line ref="line" style={ style.line }></line>
                </group>
            </slider>
        )
    }

}