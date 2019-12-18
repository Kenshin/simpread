console.log( "=== simpread output load ===" )

import * as util   from 'util';
import * as exp    from 'export';
import { storage } from 'storage';
import {browser}   from 'browser';
import * as msg    from 'message';
import * as highlight from 'highlight';
import * as share  from 'sharecard';
import * as offline from 'offline';
import th           from 'theme';
import * as ss      from 'stylesheet';

/**
 * Controlbar common action, include:
 * 
 * - share_xxx
 * - save, markdown, png, pdf
 * - dropbox, pocket, linnk, evernote, onenote, gdrive
 * 
 * @param {string} type, include above ↑ type 
 * @param {string} current page: title 
 * @param {string} current page: desc 
 * @param {string} current page: content 
 */
function action( type, title, desc, content ) {

    console.log( "output: Action is ", type )

    if ( type.indexOf( "_" ) > 0 && type.startsWith( "share" ) ) {
        let url = "";
        switch ( type.split("_")[1] ) {
            case "facebook":
                url = `https://www.facebook.com/dialog/feed?app_id=1528743474024441&link=${ window.location.href }`;
                break;
            case "twitter":
                url = `https://twitter.com/intent/tweet?text=${ title } （ 分享自 简悦 ）&url=${ window.location.href }`;
                break;
            case "gplus":
                url = `https://plus.google.com/share?url=${ window.location.href }`;
                break;
            case "weibo":
                url = `http://service.weibo.com/share/share.php?url=${ window.location.href }&title=${ title } （ 分享自 简悦-SimpRead ）`;
                break;
            case "telegram":
                url = `https://t.me/share/url?url=${ window.location.href }`;
                break;
            case "card":
                new Notify().Render( "已启动分享卡标注功能，请在页面标注，生成分享卡。" );
                $("sr-rd-crlbar").find("panel-bg").length > 0 && $("sr-rd-crlbar").find("panel-bg")[0].click();
                highlight.Annotate().done( txt => {
                    txt != "" && share.Render( storage.current.mode == "focus" ? "html" : "sr-read", title, txt );
                });
                break;
        }
        type.split("_")[1] != "card" && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
    } else if ( [ "save", "markdown", "png", "kindle", "pdf", "epub", "temp", "html", "offlinehtml" ].includes( type ) ) {
        storage.Statistics( "service", type );
        switch ( type ) {
            case "save":
                const url = window.location.href.replace( /(\?|&)simpread_mode=read/, "" );
                storage.UnRead( "add", { url, title, desc }, success => {
                    success  && new Notify().Render( 0, "成功加入未读列表。" );
                    !success && new Notify().Render( 0, "已加入未读列表，请勿重新加入。" );
                });
                break;
            case "markdown":
                const md = "simpread-" + title + ".md";
                storage.pr.current.site.avatar[0].name != "" && ( content = util.MULTI2ENML( content ) );
                exp.MDWrapper( util.ClearMD( content ), md, new Notify() );
                break;
            case "png":
                try {
                    new Notify().Render( "下载已开始，请稍等..." );
                    const $target = storage.current.mode == "read" ? $( ".simpread-read-root" ) : $( ".simpread-focus-highlight" );
                    $( "sr-rd-crlbar" ).css({ "opacity": 0 });
                    setTimeout( () => {
                        exp.PNG( $target[0] , `simpread-${ title }.png`, result => {
                            $( "sr-rd-crlbar" ).removeAttr( "style" );
                            !result && new Notify().Render( 2, "转换 PNG 格式失败，这是一个实验性功能，不一定能导出成功。" );
                        });
                    }, 1000 );
                } catch ( e ) {
                    new Notify().Render( 1, "转换 PNG 格式失败，请注意，这是一个实验性功能，不一定能导出成功。" );
                }
                break;
            case "epub":
                new Notify().Render( `当前使用了第三方 <a href="http://ksria.com/simpread/docs/#/发送到-Epub" target="_blank">epub.press</a> 服务，开始转码生成 epub 请稍等...` );
                exp.Epub( content, window.location.href, title, desc, success => {
                    success  && new Notify().Render( 0, "转换成功，马上开始下载，请稍等。" );
                    !success && new Notify().Render( 2, `转换失败，这是一个实验性功能，不一定能导出成功，详细请看 <a href="http://ksria.com/simpread/docs/#/发送到-Epub" target="_blank">epub.press</a>` );
                });
                break;
            case "offlinehtml":
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.permission ), result => {
                    if ( !result.done ) {
                        new Notify().Render( 2, `离线下载的文件体积较大，所以需要使用 Chrome 下载方案，请授权。` );
                        return;
                    } else {
                        const notify2 = new Notify().Render({ content: "图片转换中吗，请稍等...", state: "loading" });
                        offline.getImages( () => {
                            notify2.complete();
                            new Notify().Render( 0, "全部图片已经转换完毕，马上开始下载，请稍等。" );
                            const theme  = th.Get( storage.read.theme ),
                                  global = th.Get( "global" ),
                                  common = th.Get( "common" ),
                                  css    = ss.GetCustomCSS(),
                                  html   = offline.HTML( title, desc, $( "sr-rd-content" ).html(), { global, common, theme, css } );
                            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.download, { data: html, name: `simpread-${title}.html` }), result => {
                                console.log( "Current download result: ", result )
                            });
                        });
                    }
                });
                break;
            case "html":
                const theme  = th.Get( storage.read.theme ),
                      global = th.Get( "global" ),
                      common = th.Get( "common" ),
                      css    = ss.GetCustomCSS(),
                      html   = offline.HTML( title, desc, content, { global, common, theme, css } );
                exp.Download( "data:text/plain;charset=utf-8," + encodeURIComponent(html), `simpread-${title}.html` );
                break;
            case "temp":
            case "kindle":
                const notify = new Notify().Render({ state: "loading", content: "开始转码阅读模式并上传到服务器，请稍后。" });
                const style = {
                    theme     : storage.read.theme,
                    fontsize  : storage.read.fontsize,
                    fontfamily: storage.read.fontfamily,
                    layout    : storage.read.layout,
                    custom    : storage.read.custom,
                }
                exp.kindle.Read( window.location.href, title, desc, content, style, ( result, error ) => {
                    notify.complete();
                    if ( error ) {
                        new Notify().Render( 2, "保存失败，请稍候再试！" );
                    } else {
                        switch ( type ) {
                            case "kindle":
                                new Notify().Render( "保存成功，3 秒钟后将跳转到发送页面。" );
                                setTimeout( ()=>{ exp.kindle.Send(); }, 3000 );
                                break;
                            case "temp":
                                new Notify().Render( "保存成功，3 秒钟后将跳转到临时页面。" );
                                setTimeout( ()=>{ exp.kindle.Temp(); }, 3000 );
                                break;
                        }
                    }
                });
                break;
            case "pdf":
                if ( storage.current.mode == "read" ) {
                    $( "sr-rd-crlbar" ).css({ "opacity": 0 });
                    setTimeout( () => {
                        exp.PDF();
                        $( "sr-rd-crlbar" ).removeAttr( "style" );
                    }, 500 );
                } else {
                    new Notify().Render( 2, "当前模式不支持导出到 PDF，请使用阅读模式。" );
                }
                break;
        }
    } else if ( [ "dropbox", "pocket", "instapaper", "linnk", "yinxiang","evernote", "onenote", "gdrive", "jianguo", "yuque", "notion", "youdao" ].includes( type ) ) {
        const { dropbox, pocket, instapaper, linnk, evernote, onenote, gdrive, jianguo, yuque, notion, youdao } = exp,
              id      = type == "yinxiang" ? "evernote" : type;
        storage.Statistics( "service", type );
        const service = type => {
            switch( type ) {
                case "dropbox":
                    storage.pr.current.site.avatar[0].name != "" && ( content = util.MULTI2ENML( content ) );
                    exp.MDWrapper( util.ClearMD( content ), undefined, new Notify() ).done( result => {
                        dropbox.Write( `${ title }.md`, result, ( _, result, error ) => exp.svcCbWrapper( result, error, dropbox.name, type, new Notify() ), "md/" );
                    });
                    break;
                case "pocket":
                    pocket.Add( window.location.href, title, ( result, error ) => exp.svcCbWrapper( result, error, pocket.name, type, new Notify() ));
                    break;
                case "instapaper":
                    instapaper.Add( window.location.href, title, desc, ( result, error ) => exp.svcCbWrapper( result, error, instapaper.name, type, new Notify() ));
                    break;
                case "linnk":
                    const notify = new Notify().Render({ content: `开始保存到 Linnk，请稍等...`, state: "loading" });
                    linnk.GetSafeGroup( linnk.group_name, ( result, error ) => {
                        notify.complete();
                        if ( !error ) {
                            linnk.group_id = result.data.groupId;
                            linnk.Add( window.location.href, title, ( result, error ) => exp.svcCbWrapper( result, error, linnk.name, type, new Notify() ));
                        } else new Notify().Render( 2, `${ linnk.name } 保存失败，请稍后重新再试。` );
                    });
                    break;
                case "evernote":
                case "yinxiang":
                    evernote.env     = type;
                    evernote.sandbox = false;
                    storage.pr.current.site.avatar[0].name != "" && ( content = util.MULTI2ENML( content ) );
                    evernote.Add( title, util.HTML2ENML( content, window.location.href ), ( result, error ) => {
                        exp.svcCbWrapper( result, error, evernote.name, type, new Notify() );
                        if ( error == "error" ) {
                            new Notify().Render( "保存失败，正在尝试优化结构再次保存，请稍等..." );
                            exp.MDWrapper( util.ClearMD( content, false ), undefined, new Notify() ).done( result => {
                                const md   = util.MD2ENML( result ),
                                      tmpl = util.ClearHTML( exp.MD2HTML( result ));
                                evernote.Add( title, tmpl, ( result, error ) => {
                                    exp.svcCbWrapper( result, error, evernote.name, type, new Notify() );
                                    if ( error == "error" ) {
                                        new Notify().Render({ content: "导出失败，是否以 Markdown 格式保存？", action: "是的", cancel: "取消", callback: action => {
                                            if ( action == "cancel" ) return;
                                            new Notify().Render({ content: "转换为 Markdown 并保存中，请稍等...", delay: 2000 } );
                                            evernote.Add( title, util.HTML2ENML( md, window.location.href ), ( result, error ) => {
                                                exp.svcCbWrapper( result, error, evernote.name, type, new Notify() );
                                                if ( error == "error" ) {
                                                    new Notify().Render({ content: `转换后保存失败，是否提交当前站点？`, action: "是的", cancel: "取消", callback: type => {
                                                        if ( type == "cancel" ) return;
                                                        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_site, { url: location.href, site: {}, uid: storage.user.uid, type: "evernote" }));
                                                    }});
                                                }
                                            });
                                        }});
                                    }
                                });
                            });
                        }
                    });
                    break;
                case "onenote":
                    onenote.Add( onenote.Wrapper( window.location.href, title, content ), ( result, error ) => exp.svcCbWrapper( result, error, onenote.name, type, new Notify() ));
                    break;
                case "gdrive":
                    storage.pr.current.site.avatar[0].name != "" && ( content = util.MULTI2ENML( content ) );
                    exp.MDWrapper( util.ClearMD( content ), undefined, new Notify() ).done( result => {
                        gdrive.Add( "file",( result, error ) => exp.svcCbWrapper( result, error, gdrive.name, type, new Notify() ), gdrive.CreateFile( `${title}.md`, result ));
                    });
                    break;
                case "jianguo":
                    exp.MDWrapper( util.ClearMD( content ) , undefined, new Notify() ).done( markdown => {
                        title = title.replace( /[|@!#$%^&*()<>/,.+=\\]/ig, "-" );
                        jianguo.Add( storage.secret.jianguo.username, storage.secret.jianguo.password, `${jianguo.root}/${jianguo.folder}/${title}.md`, markdown, result => {
                            let error = undefined;
                            if ( result && ( result.status != 201 && result.status != 204 )) {
                                error = "导出到坚果云失败，请稍后再试。";
                            }
                            exp.svcCbWrapper( result, error, jianguo.name, type, new Notify() );
                        });
                    });
                    break;
                case "yuque":
                    exp.MDWrapper( util.ClearMD( content ), undefined, new Notify() ).done( result => {
                        yuque.Add( title, result,( result, error ) => exp.svcCbWrapper( result, error, yuque.name, type, new Notify() ));
                    });
                    break;
                case "notion":
                    exp.MDWrapper( util.ClearMD( content ), undefined, new Notify() ).done( result => {
                        corbLoader( "load", () => {
                            notion.access_token = storage.secret.notion.access_token;
                            notion.folder_id    = storage.secret.notion.folder_id;
                            notion.Add( title, result.replace( /.jpeg!720/ig, '.jpeg' ), ( result, error ) => {
                                exp.svcCbWrapper( result, error, notion.name, type, new Notify() )
                            });
                        }, 500 );
                    });
                    break;
                case "youdao":
                    exp.MDWrapper( util.ClearMD( content ), undefined, new Notify() ).done( result => {
                        corbLoader( "load", () => {
                            youdao.access_token = storage.secret.youdao.access_token;
                            youdao.folder_id    = storage.secret.youdao.folder_id;
                            youdao.Add( title, result, ( result, error ) => {
                                exp.svcCbWrapper( result, error, youdao.name, type, new Notify() )
                            });
                        });
                    });
                    break;
            }
        };

        exp.VerifySvcWrapper( storage, exp[id], type, exp.Name( type ), new Notify() )
        .done( result => service( result ));

    } else if ( type.startsWith( "dyslexia" ) ) {
        if ( type.endsWith( "speak" ) ) {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.speak, { content: `标题 ${title} 正文 ${content}` } ));
        } else {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.speak_stop ));
        }
    } else if ( type.startsWith( "fullscreen" ) ) {
        document.documentElement.requestFullscreen();
    } else if ( type.startsWith( "webdav_" ) ) {
        const id = type.replace( "webdav_", "" );
        storage.Safe( () => {
            storage.secret.webdav.forEach( item => {
                item = JSON.parse( item );
                if ( item.name == id ) {
                    exp.MDWrapper( util.ClearMD( content ) , undefined, new Notify() ).done( markdown => {
                        title = title.replace( /[|@!#$%^&*()<>/,.+=\\]/ig, "-" );
                        new Notify().Render( `开始保存到 ${ item.name}，请稍等...` );
                        exp.webdav.Add( item.url, item.user, item.password, `${title}.md`, markdown, result => {
                            let error = undefined;
                            if ( result && ( result.status != 201 && result.status != 204 )) {
                                error = `导出到 ${item.name} 失败，请稍后再试。`;
                            }
                            exp.svcCbWrapper( result, error, item.name, type, new Notify() );
                        });
                    });
                }
            });
        })
    }
    else {
        new Notify().Render( 2, "当前模式下，不支持此功能。" );
    }
}

/**
 * Open and Remove CORB iframe
 * 
 * @param {string} include: load & remove
 */
function corbLoader( state, callback ) {
    if ( state == "load" ) {
        if ( $( '#sr-corb' ).length == 0 ) {
            $( 'html' ).append( `<iframe id="sr-corb" src="${browser.runtime.getURL('options/corb.html')}" width="0" height="0" frameborder="0"></iframe>` );
            $( '#sr-corb' ).on( "load", event => callback());
        } else callback();
    } else $( '#sr-corb' ).remove();
}

export {
    action as Action,
}