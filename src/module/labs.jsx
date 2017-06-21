console.log( "===== simpread option labs load =====" )

import {browser} from 'browser';
import * as menu from 'menu';

import Switch    from 'switch';

export default class LabsOpt extends React.Component {

    static defaultProps = {
        option : {},
        read   : {},
        focus  : {},
    }

    static propTypes = {
        option : React.PropTypes.object,
        read   : React.PropTypes.object,
        focus  : React.PropTypes.object,
        onChange : React.PropTypes.func,
    }

    onChange( value, model, state, child ) {
        !child && ( this.props[model][state]=value );
        child  && ( this.props[model][state][child]=value );
        child  && menu.Refresh( this.props[model][state] );
        this.props.onChange && this.props.onChange();
    }

    render() {
        return (
            <div id="labs" style={{ width: '80%' }}>
                <div>
                    <div className="label">全局</div>
                    <Switch width="100%" checked={ this.props.option.esc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            tooltip={{ text: "包括：聚焦模式与阅读模式。" }}
                            label="是否启用 「ESC」 退出方式？"
                            onChange={ (s)=>this.onChange(s, "option", "esc") } />
                </div>

                <div style={{ 'padding-top': '21px;' }}>
                    <div className="label">聚焦模式</div>
                    <Switch width="100%" checked={ this.props.focus.mask }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否启用点击空白（遮罩）退出功能？"
                            onChange={ (s)=>this.onChange(s, "focus", "mask") } />
                    <Switch width="100%" checked={ this.props.focus.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            tooltip={{ text: "选择隐藏意味着鼠标移上时才显示。" }}
                            label="是否一直显示右下角的控制栏？"
                            onChange={ (s)=>this.onChange(s, "focus", "controlbar") } />
                </div>

                <div style={{ 'padding-top': '21px;' }}>
                    <div className="label">阅读模式</div>
                    <Switch width="100%" checked={ this.props.read.progress }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示阅读进度？"
                            onChange={ (s)=>this.onChange(s, "read", "progress") } />
                    <Switch width="100%" checked={ this.props.read.controlbar }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            tooltip={{ text: "选择隐藏意味着鼠标移上时才显示。" }}
                            label="是否一直显示右下角的控制栏？"
                            onChange={ (s)=>this.onChange(s, "read", "controlbar") } />
                    <Switch width="100%" checked={ this.props.read.auto }
                            thumbedColor="#3F51B5" trackedColor="#7986CB"
                            label="如果当前页面适配阅读模式，是否自动进入阅读模式？"
                            onChange={ (s)=>this.onChange(s, "read", "auto") } />
                </div>

                <div style={{ 'padding-top': '21px;' }}>
                    <div className="label">右键菜单</div>
                    <Switch width="100%" checked={ this.props.option.menu.focus }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示聚焦模式？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "focus" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.read }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示阅读模式？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "read" ) } />
                    <Switch width="100%" checked={ this.props.option.menu.link }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否显示使用阅读模式打开此链接？"
                            onChange={ (s)=>this.onChange(s, "option", "menu", "link" ) } />
                </div>
            </div>
        )
    }
}