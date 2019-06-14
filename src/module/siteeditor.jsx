console.log( "=== simpread option siteeditor ===" )

import { storage }  from 'storage';
import * as watch   from 'watch';
import {browser}    from 'browser';
import * as msg     from 'message';

import Editor       from 'editor';

import Button       from 'button';
import * as tooltip from 'tooltip';
import * as waves   from 'waves';
import * as dia     from 'dialog';

const root   = "simpread-option-root",
      rootjq = `.${root}`;
let site,
    state    = { name: 0, url: 0, title: 0, desc: 0, include: 0, exclude: 0, avatar:{ name: 0, url: 0 }, paging: { prev:0, next: 0} }; // 0: success -1: faield -2: not empty

/**
 * SiteEditor Rect component
 */
class SiteEditor extends React.Component {

    close() {
        dia.Close();
    }

    action( type ) {
        watch.Verify( ( state, result ) => {
            if ( state ) {
                console.log( "watch.Lock()", result );
                new Notify().Render( "配置文件已更新，刷新当前页面后才能生效。", "刷新", ()=>window.location.reload() );
            } else {
                type == "save" ? this.save() : this.delete();
            }
        });
    }

    delete() {
        console.log( "siteeditor click delete button.", storage.current.site )
        /*
        if ( site.target != "local" ) {
            new Notify().Render( 2, `只能删除 <a href='http://ksria.com/simpread/docs/#/FAQ#%E6%97%A0%E6%B3%95%E5%88%A0%E9%99%A4%E5%BD%93%E5%89%8D%E7%AB%99%E7%82%B9' target='_blank'>本地站点</a> ，如需要请使用 站点管理器 删除。` );
            return;
        }
        */
        new Notify().Render( "是否删除当前适配站点？", "删除", () => {
            //site.target != "local" ? new Notify().Render( 3, `<a href='http://ksria.com/simpread/docs/#/FAQ#%E6%97%A0%E6%B3%95%E5%88%A0%E9%99%A4%E5%BD%93%E5%89%8D%E7%AB%99%E7%82%B9' target='_blank'>无法删除</a> 当前站点，如不想显示请加入黑名单。` ) :
            site.name.startsWith( "tempread::" ) ? new Notify().Render( 2, `当前站点为自动识别，无误删除。` ) :
                storage.pr.Deletesite( storage.current.site.target, site.url, result => {
                    if ( result == -1 ) new Notify().Render( 2, `此站已被删除，请勿重复操作。` );
                    else {
                        storage.Writesite(storage.pr.sites, () => {
                            new Notify().Render( "删除成功，如需生效，请刷新本页。" );
                            watch.SendMessage( "site", true );
                        });
                    }
                });
        });
    }

    // save siteeditor focus option
    save() {
        console.log( "siteeditor click save button.", storage.current.site, site, state )
        if ( [ "url", "name", "title", "include" ].findIndex( key => site[key] == "" ) != -1 ) {
            new Notify().Render( 3, "【标识、域名、标题、高亮】不能为空。" );
        }
        else if ( Object.values( state ).findIndex( key => typeof key == "number" && key != 0 ) != -1 ||
           ( state.avatar.name != 0 || state.avatar.url  != 0 ) ||
           ( state.paging.prev != 0 || state.paging.next != 0 )
        ) {
            new Notify().Render( 3, "请正确填写【标识、域名、标题、高亮】后再提交。" );
        } else if (( site.avatar[0].name != "" && site.avatar[1].url == "" ) || ( site.avatar[0].name == "" && site.avatar[1].url != "" )) {
            new Notify().Render( 3, "【头像的名称与地址】必须同时设定。" );
        } else if (( site.paging[0].prev != "" && site.paging[1].next == "" ) || ( site.paging[0].prev == "" && site.paging[1].next != "" )) {
            new Notify().Render( 3, "【前一页与后一页】必须同时设定。" );
        } else if ( site.name.startsWith( "tempread::" ) ) {
            new Notify().Render( 2, "标识不能包含 tempread:: 请删除。" );
        } else if ( site.include.trim() == "" ) {
            new Notify().Render( 2, "高亮区域不能为空。" );
        } else {
            // changed storage.current.site.target to 'local'
            storage.pr.Updatesite( 'local', storage.current.url, [ site.url, storage.pr.Cleansite(site) ]);
            storage.Writesite( storage.pr.sites, () => {
                new Notify().Render( 0, "更新成功，页面刷新后生效！" );
                watch.SendMessage( "site", true );
            });
        }
    }

    submit() {
        const news = { ...site };
        delete news.html;
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.temp_site, { url: location.href, site: news, uid: storage.user.uid, type: "temp" }));
    }

    componentDidMount() {
        waves.Render({ root: rootjq });
        tooltip.Render( rootjq );
    }

    render() {
        site = { ...storage.pr.current.site };
        if ( storage.pr.state == "temp" && storage.pr.dom ) {
            site.name   = site.name.replace( "tempread::", "" );
            let include = storage.pr.Utils().dom2Xpath( storage.pr.dom );
            if ( include != "" ) {
                site.include    = `[[\`${include}\`]]`;
            } else site.include = storage.pr.dom.outerHTML.replace( storage.pr.dom.innerHTML, "" ).replace( /<\/\S+>$/i, "" )
        }
        return (
            <dia.Dialog>
                <dia.Content>
                    <Editor site={ site } state={ state } />
                </dia.Content>
                <dia.Footer>
                    <Button text="删 除" waves="md-waves-effect" color="#fff" backgroundColor="#F44336" onClick={ ()=>this.action( "delete" ) } />
                    { storage.pr.state == "temp" ?
                        <Button text="提交临时阅读模式" waves="md-waves-effect" color="#fff" backgroundColor="#4CAF50" width="100%" onClick={ ()=>this.submit() } /> :
                        <div style={{ width: "100%" }}></div> }
                    <Button text="退 出" mode="secondary" waves="md-waves-effect" onClick={ ()=>this.close() } />
                    <Button text="保 存" waves="md-waves-effect" onClick={ ()=>this.action( "save" ) } />
                </dia.Footer>
            </dia.Dialog>
        )
    }
}

/**
 * Modals Render
 */
function Render() {
    switch ( true ) {
        case storage.pr.state == "meta":
            new Notify().Render( "当前为 <a href='http://ksria.com/simpread/docs/#/主动适配阅读模式' target='_blank'>主动适配阅读模式</a>，并不能使用设定功能。" )
            break;
        case storage.pr.state == "txt":
            new Notify().Render( "当前为 <a href='http://ksria.com/simpread/docs/#/TXT-阅读器' target='_blank'>TXT 阅读器模式</a>，并不能使用设定功能。" )
            break;
        default:
            !dia.Popup( rootjq ) && dia.Open( <SiteEditor/>, root );
    }
}

/**
 * Exist
 * 
 * @return {boolean}
 */
function Exist() {
    return dia.Popup( rootjq );
}

/**
 * Exit
 */
function Exit() {
    dia.Close();
}

export{ Render, Exist, Exit }