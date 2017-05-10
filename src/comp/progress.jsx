/*!
 * React Material Design: Progress
 * 
 * @version : 0.0.1
 * @update  : 2017/05/09
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * @modules : https://kimmobrunfeldt.github.io/progressbar.js/
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Progress ====" )

import ProgressBar from 'progressbar';

let Shape, shape;

export default class Progress extends React.Component {

    static defaultProps = {
        type     : "line",
        options  : {},
        progress : 0,
        text     : undefined,
    }

    static propTypes = {
        type     : React.PropTypes.oneOf([ "line", "circle", "semicircle", "custom" ]),
        options  : React.PropTypes.object,
        progress : React.PropTypes.number,
        text     : React.PropTypes.string,
        onChanged: React.PropTypes.func,
    }

    componentDidMount() {

        shape = new Shape(
            $( "progress-gp" ).children()[0],
            this.props.options,
        );

        shape.animate( this.props.progress );

        this.props.text && shape.setText( this.props.text );
    }

    shouldComponentUpdate() {
        shape.animate( this.props.progress, () => {
            this.props.onChanged && this.props.onChanged( shape.value() );
        });
        return false;
    }

    componentWillUnmount() {
        shape.destroy();
    }

    render() {

        Shape = ( type => {
            switch ( type ) {
                case "line":
                    return ProgressBar.Line;
                case "circle":
                    return ProgressBar.Circle;
                case "semicircle":
                    return ProgressBar.SemiCircle;
                case "custom":
                    return ProgressBar.Path;
            }
        })( this.props.type );

        return (
            <progress-gp>
                { this.props.children ? this.props.children : <progress-bar></progress-bar> }
            </progress-gp>
        )
    }

}