console.log( "=== simpread plugin bar load ===" )

import {storage} from 'storage';

import Button    from 'button';

export default class Pluginbar extends React.Component {

    state = {
        category: []
    };

    category = {};

    getCategory() {
        Object.values( storage.plugins ).forEach( ( item, idx ) => {
            if ( this.category[item.category] ) {
                this.category[item.category].push( item );
            } else {
                this.category[item.category] = [];
                this.category[item.category].push( item );
            }
        });
        this.setState({ category: Object.keys( this.category ) });
    }

    enable( id ) {
        const plugin  = storage.plugins[id];
        plugin.enable = !plugin.enable;
        storage.Plugins( () => {
            new Notify().Render( "当前插件已" + ( plugin.enable ? "启用" : "禁用" ) + "，请重新进入阅读模式以便生效。" );
            // hack code
            const bgColor = ( plugin.enable == undefined || plugin.enable == true ) ? plugin.icon.bgColor : "#c3c6c7";
            $( this.refs[id].refs.mask ).parent().css( "background-color", bgColor );
        }, storage.plugins );
    }

    componentWillMount() {
        storage.Plugins( () => {
            this.category = {};
            this.getCategory();
        });
    }

    render() {
        const child = this.state.category.map( item => {

            const actions = this.category[item].map( plugin => {
                const bgColor = ( plugin.enable == undefined || plugin.enable == true ) ? plugin.icon.bgColor : "#c3c6c7";
                return (
                    <Button ref={plugin.id}
                            shape="circle" type="flat"
                            color={ plugin.icon.color } backgroundColor={ bgColor }
                            tooltip={{ text: plugin.name }}
                            fontIcon={ plugin.icon.type }
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.enable(plugin.id) } />
                )
            });

            return (
                <sr-opt-gp>
                    <sr-opt-label>{ item }</sr-opt-label>
                    <actions style={{ display: "flex", margin: "10px 0" }}>{ actions }</actions>
                </sr-opt-gp>
            )
        });

        return (
            <plugin-bar>{child}</plugin-bar>
        )
    }
}