console.log( "=== simpread control:action load ===" )

import * as st     from 'site';
import * as exp    from 'export';
import { storage } from 'storage';
import {browser}   from 'browser';
import * as msg    from 'message';

/**
 * Controlbar common action, include:
 * 
 * - share_xxx
 * - save, markdown
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
        }
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url }));
    } else if ( [ "save", "markdown", "kindle" ].includes( type ) ) {
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
                exp.MDWrapper( st.ClearMD( content ), md, new Notify() );
                break;
            case "kindle":
                new Notify().Render( "开始转码阅读模式并上传到服务器，请稍等..." );
                const style = {
                    theme     : storage.read.theme,
                    fontsize  : storage.read.fontsize,
                    fontfamily: storage.read.fontfamily,
                    layout    : storage.read.layout,
                    custom    : storage.read.custom,
                }
                exp.kindle.Read( window.location.href, title, desc, content, style, ( result, error ) => {
                    error  && new Notify().Render( 2, "保存到 Kindle 失败，请稍候再试！" );
                    !error && new Notify().Render( "保存成功，3 秒钟后将跳转到发送页面。" );
                    !error && setTimeout( ()=>{ exp.kindle.Send(); }, 3000 );
                });
                break;
        }
    } else if ( [ "dropbox", "pocket", "linnk", "yinxiang","evernote", "onenote", "gdrive" ].includes( type ) ) {
        const { dropbox, pocket, linnk, evernote, onenote, gdrive } = exp,
        id    = type == "yinxiang" ? "evernote" : type;

        exp.VerifySvcWrapper( storage, exp[id], type, exp.Name( type ), new Notify() )
        .done( result => service( type ));

        const service = type => {
            switch( type ) {
                case "dropbox":
                    exp.MDWrapper( st.ClearMD( content ), undefined, new Notify() ).done( result => {
                        dropbox.Write( `${ title }.md`, result, ( _, result, error ) => exp.svcCbWrapper( result, error, dropbox.name, new Notify() ), "md/" );
                    });
                    break;
                case "pocket":
                    pocket.Add( window.location.href, title, ( result, error ) => exp.svcCbWrapper( result, error, pocket.name, new Notify() ));
                    break;
                case "linnk":
                    linnk.GetSafeGroup( linnk.group_name, ( result, error ) => {
                        if ( !error ) {
                            linnk.group_id = result.data.groupId;
                            linnk.Add( window.location.href, title, ( result, error ) => exp.svcCbWrapper( result, error, linnk.name, new Notify() ));
                        } else new Notify().Render( 2, `${ linnk.name } 保存失败，请稍后重新再试。` );
                    });
                    break;
                case "evernote":
                case "yinxiang":
                    evernote.env     = type;
                    evernote.sandbox = false;
                    evernote.Add( title, st.HTML2ENML( content, window.location.href ), ( result, error ) => {
                        exp.svcCbWrapper( result, error, evernote.name, new Notify() );
                        error == "error" && new Notify().Render( `此功能为实验性功能，报告 <a href="https://github.com/Kenshin/simpread/issues/new" target="_blank">此页面</a>，建议使用 Onenote 更完美的保存页面。` );
                    });
                    break;
                case "onenote":
                    onenote.Add( onenote.Wrapper( window.location.href, title, content ), ( result, error ) => exp.svcCbWrapper( result, error, onenote.name, new Notify() ));
                    break;
                case "gdrive":
                    exp.MDWrapper( st.ClearMD( content), undefined, new Notify() ).done( result => {
                        gdrive.Add( "file",( result, error ) => exp.svcCbWrapper( result, error, gdrive.name, new Notify() ), gdrive.CreateFile( `${title}.md`, result ));
                    });
                    break;
            }
        };
    } else {
        new Notify().Render( 2, "当前模式下，不支持此功能。" );
    }
}

export {
    action as Action,
}