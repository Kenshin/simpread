console.log( "=== simpread action bar load ===" )

import * as ss     from 'stylesheet';

import Button      from 'button';
import * as ttips  from 'tooltip';

/**
 * Action bar
 * 
 * @class
 */
export default class Actionbar extends React.Component {

    static defaultProps = {
        items: [],
    }

    static propTypes = {
        items   : React.PropTypes.array,
        onAction: React.PropTypes.func,
    }

    constructor( props ) {
        super( props );
    }

    render() {
        const items       = Object.keys(this.props.items).map( key => {
            const action  = this.props.items[key];
            const items   = Object.keys( this.props.items[key].items ).map( item => {
                const obj = this.props.items[key].items[item];
                return (
                    <Button shape="circle"
                        icon={ obj.icon }
                        color="#fff" backgroundColor={ obj.color }
                        waves="md-waves-effect md-waves-button"
                        tooltip={{ text: obj.name }}
                        onClick={ ()=>this.props.onAction && this.props.onAction( item ) }
                    />
                )
            })
            return (
                <sr-opt-gp>
                    <sr-opt-label>{action.name}</sr-opt-label>
                    <actions style={{ display: "flex", margin: "10px 0", "flex-wrap": "wrap" }}>{ items }</actions>
                </sr-opt-gp>
            );
        });
        return (
            <action-bar>
                { items }
            </action-bar>
        )
    }
}
