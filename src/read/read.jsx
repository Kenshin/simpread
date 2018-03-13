console.log( "=== simpread read load ===" )

import ProgressBar from 'schedule';
import * as spec   from 'special';
import ReadCtlbar  from 'readctlbar';
import * as toc    from 'toc';
import * as modals from 'modals';
import * as se     from 'siteeditor';
import * as kbd    from 'keyboard';

import { storage, Clone } from 'storage';
import th                 from 'theme';
import * as ss            from 'stylesheet';
import {browser}          from 'browser';
import * as msg           from 'message';
import * as highlight     from 'highlight';

import * as tooltip       from 'tooltip';
import * as waves         from 'waves';

const rdcls   = "simpread-read-root",
      bgtmpl  = `<div class="${rdcls}"></div>`,
      rdclsjq = "." + rdcls,
      $root   = $( "html" ),
      theme   = "simpread-theme-root";

const errorpage = `
        <sr-rd-content-error>
            <p>当前页面使用 <span style="color: #4183c4;">阅读模式</span> 解析后 <b style="color: #E57373;">无法正常显示</b>，暂时不支持 <b style="color: #E57373;">手动添加</b>，请换用 <span style="color: #4183c4;">聚焦模式</span> 或者 将当前页面加入到<a href="https://github.com/Kenshin/simpread/wiki/入门指南（-操作指引-）#排除列表" target="_blank">排除列表</a> 。</p>
            <p>报告<a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">此页面</a> 以便让 <a href="http://ksria.com/simpread" target="_blank">简悦 - SimpRead</a> 变得更加出色，谢谢。</p>
        </sr-rd-content-error>`;

const Footer = () => {
    return (
        <sr-rd-footer>
            <sr-rd-footer-text>全文完</sr-rd-footer-text>
            <sr-rd-footer-copywrite>本文由 简悦 <a href="http://ksria.com/simpread" target="_blank">SimpRead</a> 优化，用以提升阅读体验。</sr-rd-footer-copywrite>
        </sr-rd-footer>
    )
}

class Read extends React.Component {

    componentWillMount() {
        $( "body" ).addClass( "simpread-hidden" );
        th.Change( this.props.read.theme );
    }

    async componentDidMount() {
        if ( $root.find( "sr-rd-content-error" ).length > 0 ) {
            let msg = `当前页面结构改变导致不匹配阅读模式，请报告 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">此页面</a>`;
            this.props.read.highlight == true && ( msg += `，已启动 <a href='https://github.com/Kenshin/simpread/wiki/%E4%B8%B4%E6%97%B6%E9%98%85%E8%AF%BB%E6%A8%A1%E5%BC%8F' target='_blank' >临时阅读模式</a>。` )
            new Notify().Render( 2, msg );
            this.componentWillUnmount();
            this.props.read.highlight == true && Highlight().done( dom => {
                storage.pr.TempMode( "read", dom.outerHTML );
                storage.Statistics( "read" );
                Render();
            });
        } else {
            $root
            .addClass( "simpread-font" )
            .addClass( theme )
            .find( rdclsjq )
                .addClass( theme )
                .velocity( { opacity: 1 }, { delay: 100 })
                .addClass( "simpread-read-root-show" );

            this.props.read.fontfamily && ss.FontFamily( this.props.read.fontfamily );
            this.props.read.fontsize   && ss.FontSize( this.props.read.fontsize );
            this.props.read.layout     && ss.Layout( this.props.read.layout );
            ss.Preview( this.props.read.custom );

            this.props.wrapper.name.startsWith( "txtread::" ) && $( "sr-rd-content" ).css({ "word-wrap": "break-word", "white-space": "pre-wrap" });
            if ( $("sr-rd-content-error").length > 0 ) $("sr-rd-footer").remove();
            if ( $( "sr-rd-desc" ).html() == "" ) $( "sr-rd-desc" ).addClass( "simpread-hidden" );

            await excludes( $("sr-rd-content"), this.props.wrapper.exclude );
            storage.pr.Beautify( $( "sr-rd-content" ) );
            storage.pr.Format( rdcls );

            this.props.read.toc && toc.Render( "sr-read", $( "sr-rd-content" ), this.props.read.theme, this.props.read.toc_hide );
            this.props.read.site.css && this.props.read.site.css.length > 0 &&
                ss.SiteCSS( this.props.read.site.css );
            kbd.Render( $( "sr-rd-content" ));
            tooltip.Render( rdclsjq );
            waves.Render({ root: rdclsjq });
        }
    }

    componentWillUnmount() {
        ss.FontSize( "" );
        $root.removeClass( theme )
             .removeClass( "simpread-font" );
        $root.attr("style") && $root.attr( "style", $root.attr("style").replace( "font-size: 62.5%!important", "" ));
        ss.SiteCSS();
        $( "body" ).removeClass( "simpread-hidden" );
        $( rdclsjq ).remove();
        tooltip.Exit( rdclsjq );
    }

    /**
     * Controlbar action event
     * @param {string} type, include: exit, setting, save, scroll, option
     * @param {string} value 
     */
    onAction( type, value ) {
        switch ( type ) {
            case "exit":
                this.exit();
                break;
            case "setting":
                modals.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
                break;
            case "siteeditor":
                se.Render();
                break;
            case "fontfamily":
            case "fontsize":
            case "layout":
            case "theme":
                storage.current[type]=value;
                storage.Setcur( storage.current.mode );
                break;
            /*
            case "scroll":
                $( "sr-read" ).velocity( "scroll", { offset: $( "body" ).scrollTop() + value });
                break;
            */
        }
    }

   // exit read mode
   exit() {
        Exit();
    }

    render() {
        const Article = this.props.wrapper.avatar ? 
                        <spec.Multiple include={ this.props.wrapper.include } avatar={ this.props.wrapper.avatar } /> :
                        <sr-rd-content dangerouslySetInnerHTML={{__html: this.props.wrapper.include }} ></sr-rd-content>;

        const Page    = this.props.wrapper.paging && 
                        <spec.Paging paging={ this.props.wrapper.paging } />;
        return (
            <sr-read>
                <ProgressBar show={ this.props.read.progress } />
                <sr-rd-title>{ this.props.wrapper.title }</sr-rd-title>
                <sr-rd-desc>{ this.props.wrapper.desc }</sr-rd-desc>
                { Article }
                { Page    }
                <Footer />
                <ReadCtlbar show={ this.props.read.controlbar } 
                            multi={ this.props.wrapper.avatar ? true : false }
                            type={ this.props.wrapper.name }
                            site={{ title: this.props.wrapper.title, url: window.location.href }} 
                            custom={ this.props.read.custom } onAction={ (t,v)=>this.onAction( t,v ) }/>
            </sr-read>
        )
    }

}

/**
 * Render entry
 * 
 */
function Render() {
    storage.pr.ReadMode();
    console.log( "current pureread object is   ", storage.pr )
    ReactDOM.render( <Read read={ storage.current } wrapper={ storage.pr.html } />, getReadRoot() );
}

/**
 * High light current page to read mode( read only )
 */
function Highlight() {
    const dtd = $.Deferred();
    highlight.Start().done( dom => {
        dtd.resolve( dom );
    });
    return dtd;
}

/**
 * Verify simpread-read-root tag exit
 * 
 * @param  {boolean}
 * @return {boolean}
 */
function Exist( action ) {
    if ( $root.find( rdclsjq ).length > 0 ) {
        action && modals.Render( ()=>setTimeout( ()=>se.Render(), 500 ));
        return true;
    } else {
        return false;
    }
}

/**
 * Exit
 */
function Exit() {
    $( rdclsjq ).velocity( { opacity: 0 }, {
        delay: 100,
        complete: ( elements ) => {
            ReactDOM.unmountComponentAtNode( getReadRoot() );
        }
    }).addClass( "simpread-read-root-hide" );
}

/**
 * Get read root
 * 
 * @return {jquery} read root jquery object
 */
function getReadRoot() {
    if ( $root.find( rdclsjq ).length == 0 ) {
        $root.append( bgtmpl );
    }
    return $( rdclsjq )[0];
}

/**
 * Set exclude style
 * 
 * @param {jquery} jquery object
 * @param {array}  hidden html
 */
async function excludes( $target, exclude ) {
    const tags = storage.pr.Exclude( $target );
    $target.find( tags ).remove();
}

export { Render, Exist, Exit, Highlight };
