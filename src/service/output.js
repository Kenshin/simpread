console.log( "=== simpread control:action load ===" )

import * as util   from 'util';
import * as exp    from 'export';
import { storage } from 'storage';
import {browser}   from 'browser';
import * as msg    from 'message';
import * as highlight from 'highlight';
import * as share  from 'sharecard';

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
                $("sr-rd-crlbar").find("panel-bg")[0].click();
                highlight.Annotate().done( txt => {
                    console.log(txt);
                    txt != "" && share.Render( "sr-read", title, txt );
                });
                break;
        }
        type.split("_")[1] != "card" && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
    } else if ( [ "save", "markdown", "png", "kindle", "pdf", "epub", "temp", "html" ].includes( type ) ) {
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
            case "html":
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
                            case "html":
                                new Notify().Render( "保存成功，开始下载..." );
                                $.get( `${exp.kindle.host}/${exp.kindle.id}.html`, result => {
                                    result = result.replace( /<link rel=\"stylesheet\" href=\"\.\/css\//ig, '<link rel="stylesheet" href="http://sr.ksria.cn/puread/' )
                                    exp.Download( "data:text/plain;charset=utf-8," + encodeURIComponent(result), `simpread-${title}.html` );
                                });
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
    } else if ( [ "dropbox", "pocket", "instapaper", "linnk", "yinxiang","evernote", "onenote", "gdrive" ].includes( type ) ) {
        const { dropbox, pocket, instapaper, linnk, evernote, onenote, gdrive } = exp,
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
                            new Notify().Render({ content: "导出失败，是否以 Markdown 格式保存？", action: "是的", cancel: "取消", callback: action => {
                                if ( action == "cancel" ) return;
                                new Notify().Render({ content: "转换为 Markdown 并保存中，请稍等...", delay: 2000 } );
                                exp.MDWrapper( util.ClearMD( content, false ), undefined, new Notify() ).done( result => {
                                    content = util.MD2ENML( result );
                                    service( type );
                                });
                            }});
                            new Notify().Render({ content: `此功能为实验性功能，是否提交当前站点？`, action: "是的", cancel: "取消", callback: type => {
                                if ( type == "cancel" ) return;
                                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.save_site, { url: location.href, site: storage.pr.current.site, uid: storage.user.uid, type: "evernote" }));
                            }});
                        }
                    });
                    break;
                case "onenote":
                    onenote.Add( onenote.Wrapper( window.location.href, title, content ), ( result, error ) => exp.svcCbWrapper( result, error, onenote.name, type, new Notify() ));
                    break;
                case "gdrive":
                    storage.pr.current.site.avatar[0].name != "" && ( content = util.MULTI2ENML( content ) );
                    exp.MDWrapper( util.ClearMD( content), undefined, new Notify() ).done( result => {
                        gdrive.Add( "file",( result, error ) => exp.svcCbWrapper( result, error, gdrive.name, type, new Notify() ), gdrive.CreateFile( `${title}.md`, result ));
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
    }
    else {
        new Notify().Render( 2, "当前模式下，不支持此功能。" );
    }
}

export {
    action as Action,
}