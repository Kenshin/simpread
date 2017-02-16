console.log( "===== simpread option read mode load =====" )

import Notify    from 'notify';
import th        from 'theme';

import ThemeSel  from 'themesel';
import Shortcuts from 'shortcuts';
import Include   from 'include';

export default class ReadOpt extends React.Component {

    changeBgColor( theme ) {
        this.props.option.theme = theme;
        th.Change( this.props.option.theme );
        console.log( "this.props.option.theme = ", this.props.option.theme )
    }

    changeShortcuts( shortcuts ) {
        this.props.option.shortcuts = shortcuts;
        console.log( "this.props.option.shortcuts = ", this.props.option.shortcuts )
    }

    changeInclude( value ) {
        //if ( verifyHtml( event.target.value.trim() ) != -1 ) this.props.option.site.include = event.target.value.trim();
        this.props.option.site.include = value;
        console.log( "this.props.option.site.include = ", this.props.option.site.include )
    }

    changExclude() {
        this.props.option.site.exclude = getExclude( event.target.value );
        console.log( "this.props.option.site.exclude = ", this.props.option.site.exclude )
    }

    componentDidMount() {
        this.refs.exclude.value   = this.props.option.site.exclude.join( "\n") ;
        //this.refs.include.value   = this.props.option.site.include;
    }

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <sr-opt-focus>
                <sr-opt-gp>
                    <sr-opt-label>主题色：</sr-opt-label>
                    <ThemeSel themes={ th.colors } names={ th.names } theme={ this.props.option.theme } changeBgColor={ val=>this.changeBgColor(val) } />
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>快捷键：</sr-opt-label>
                    <sr-opt-item sr-type="shortcuts">
                        <Shortcuts shortcuts={ this.props.option.shortcuts } changeShortcuts={ val=>this.changeShortcuts(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>隐藏列表：</sr-opt-label>
                    <sr-opt-item sr-type="exclude">
                        <textarea ref="exclude" placeholder="每行一个，例如：<div class='xxxx'></div>" onChange={ ()=> this.changExclude() }></textarea>
                    </sr-opt-item>
                </sr-opt-gp>
                <sr-opt-gp>
                    <sr-opt-label>高亮区域：</sr-opt-label>
                    <sr-opt-item sr-type="include">
                        <Include include={ this.props.option.site.include } changeInclude={ val=>this.changeInclude(val) } />
                    </sr-opt-item>
                </sr-opt-gp>
            </sr-opt-focus>
        )
    }
}

/**
 * Get exclude tags
 * 
 * @param  {string} input exclude html tag, e.g.:
    <div class="article fmt article__content">
    <h1>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    sdasdfas
    

    <div class="ks-simpread-bg">
 *
 * @return {array} verify success htmls
    <div class="article fmt article__content">
    <h3 id="articleHeader1">原著序</h3>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    <div class="ks-simpread-bg">
 * 
 */
function getExclude( htmls ) {
    let [ list, obj ]  = [[], null ];
    const arr = htmls.trim().split( "\n" );
    for( let value of arr ) {
        if ( verifyHtml( value.trim() ) > 0 ) {
            list.push( value.trim() );
        } else {
            //new Notify().Render( 2, `当前输入【 ${value} 】错误，请重新输入。` );
        }
    }
    return list;
}

/**
 * Verify html
 * 
 * @param  {string} input include html tag, e.g.:
    <div class="article fmt article__content">
 *
 * @return {int} -1: fail； 0: emputy html; 1:success
 * 
 */
function verifyHtml( html ) {
    if ( html == "" ) return 0;
    const item = html.match( / (class|id)=("|')[\w-_]+/ig );
    if ( item && item.length > 0 ) {
        //[tag, name] = item[0].trim().replace( /'|"/ig, "" ).split( "=" );
        //return { tag, name };
        return 1;
    } else {
        return -1;
    }
}
