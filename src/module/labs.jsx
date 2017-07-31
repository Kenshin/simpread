console.log( "===== simpread option labs load =====" )

import {browser} from 'browser';
import * as menu from 'menu';

import Switch    from 'switch';
import TextField from 'textfield';

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
        this.props.onChange && this.props.onChange( true );
        model == "read" && state == "auto" && this.exclusionState( value );
    }

    changeExclusion() {
        this.props.read.exclusion = event.target.value.split("\n");
        this.props.onChange && this.props.onChange( false );
    }

    exclusionState( value ) {
        $( this.refs.exclusion ).velocity( value ? "slideDown" : "slideUp" );
    }

    componentDidMount() {
        this.exclusionState( this.props.read.auto );
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    <Switch width="100%" checked={ this.props.option.esc }
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            tooltip={{ text: "包括：聚焦模式与阅读模式。" }}
                            label="是否启用 「ESC」 退出方式？"
                            onChange={ (s)=>this.onChange(s, "option", "esc") } />
                </div>

                <div className="label">右键菜单</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
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

                <div className="label">聚焦模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
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

                <div className="label">阅读模式</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
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
                            tooltip={{ text: "此项为实验性功能，建议不启动。" }}
                            label="如果当前页面适配阅读模式，是否自动进入阅读模式？"
                            onChange={ (s)=>this.onChange(s, "read", "auto") } />

                    <div ref="exclusion" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }}>
                        <div className="label">排除列表</div>
                        <TextField 
                            multi={ true } rows={8}
                            placeholder="每行一个，支持： URL, minimatch 等。" 
                            value={ ( this.props.read.exclusion||[] ).join( "\n" ) }
                            onChange={ ()=>this.changeExclusion() }
                        />
                    </div>
                </div>

                <div className="label">中文阅读</div>
                <div style={{ 'padding-top': '10px' }} className="lab" onClick={ ()=>this.onClick('custom') }>
                    <div className="more">
                        <div>增强中文阅读体验设定</div>
                        <span className="desc">包括：字间距、行间距、首行缩进以及自定义样式等。</span>
                        <span className="arrow"></span>
                    </div>
                </div>

            </div>
        )
    }
}