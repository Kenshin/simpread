console.log( "=== simpread tips load ===" )

import Notify      from 'notify';
import * as msg    from 'message';
import {browser}   from 'browser';

/**
 * Verify current page and some plugin exist
 * 
 * @param {array} plugins ids
 */
function Render( plugins ) {
    const notify = code => {
        new Notify().Render( messages[code], "不再提示", () => {
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.tips_norepeat, { code }));
        });
    },
    pushMessage = code => {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.tips, { code }), result => {
            if ( result ) {
                notify( code );
            }
        });
    },
    messages = {
        "klGUASLasg": '检测到当前环境有代码段，请使用      <a target="blank" href="https://simpread.ksria.cn/plugins/details/klGUASLasg">代码增强插件</a> 辅助阅读',
        "VQOZdNET2d": '检测到当前环境有大量的图片，可以使用 <a target="blank" href="https://simpread.ksria.cn/plugins/details/VQOZdNET2d">点击查看大图</a> 辅助阅读',
        "DxlFcL52iy": '如果你想换个论坛类页面风格，可以使用 <a target="blank" href="https://simpread.ksria.cn/plugins/details/DxlFcL52iy">Materail Design 风格</a> 辅助阅读',
    }
    // verify klGUASLasg
    if ( $( "sr-read" ).find( "pre" ).length > 0 && plugins.findIndex( item => item == "klGUASLasg" ) == -1 ) {
        pushMessage( "klGUASLasg" );
    }
    // verify VQOZdNET2d
    if ( $( "sr-read" ).find( "img" ).length > 5 && plugins.findIndex( item => item == "VQOZdNET2d" ) == -1 ) {
        pushMessage( "VQOZdNET2d" );
    }
    // verify DxlFcL52iy
    if ( ( location.hostname == "www.zhihu.com" && location.pathname.startsWith( "/question/" ) ) && plugins.findIndex( item => item == "DxlFcL52iy" ) == -1 ) {
        pushMessage( "DxlFcL52iy" );
    }
}

/**
 * Help
 * 
 * @param {object} storage.statistics
 */
function Help( statistics ) {
    if ( statistics.read == 0 ) {
        new Notify().Render({ content: "嗨，很高兴第一次使用简悦的阅读模式，是否看看新手帮助？", action: "我要看", cancel: "老司机", callback: type => {
            type == "action" && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: "http://ksria.com/simpread/guide/#readmode" }));
            type == "cancel" && browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.tips_norepeat, { code: "readmode" }));
        }});
    }
}

/**
 * Background call
 * 
 * @param {string} plugin id
 * @param {func} callback true: tips; false: not tip
 */
function Verify( id, callback ) {
    const tips = JSON.parse( localStorage[ "simpread-tips" ] || "{}" );
    if ( !tips[id] ) {
        callback( true );
    } else callback( false );
}

/**
 * Not repeat tips
 * 
 * @param {string} tips id
 */
function Done( id ) {
    const tips = JSON.parse( localStorage[ "simpread-tips" ] || "{}" );
    tips[id]   = true;
    localStorage.setItem( "simpread-tips", JSON.stringify( tips ));
}

export {
    Render,
    Verify,
    Done,
    Help,
}