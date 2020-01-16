console.log( "=== simpread offline load ===" )

import {browser}   from 'browser';
import * as msg    from 'message';

let currIdx = 0, maxCount = 0, urls = [], images, cb, type = "html", markdown;

/**
 * Offline HTML
 * 
 * @param {string} title
 * @param {string} desc
 * @param {string} content
 * @param {object} styles, include: simpread(global), common, theme, css
 * 
 * @return {string} html
 */
function HTML( title, desc, content, styles ) {
    const hightlight = () => {
            if ( content.search( 'pre class="hljs' ) > -1 || content.search( 'code class="hljs' ) > -1 ) {
                return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.6/styles/default.min.css">`
            } else return '';
        },
        html = `
                <html lang="en" class="simpread-font simpread-theme-root" style='${ $( "html" ).attr( "style" ) }'>
                    <head>
                        <meta charset="utf-8">
                        <meta http-equiv="content-type" content="text/html; charset=UTF-8;charset=utf-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=1">
                        <meta name="author" content="Kenshin"/>
                        <meta name="description" content="简悦 SimpRead - 如杂志般沉浸式阅读体验的扩展" />
                        <meta name="keywords" content="Chrome extension, Chrome 扩展, 阅读模式, 沉浸式阅读, 简悦, 简阅, read mode, reading mode, reader view, firefox, firefox addon, userscript, safari, opera, tampermonkey"/>
                        <meta name="thumbnail" content="https://simpread-1254315611.cos.ap-shanghai.myqcloud.com/static/introduce-2.png"/>
                        <meta property="og:title" content="简悦 SimpRead - 如杂志般沉浸式阅读体验的扩展"/>
                        <meta property="og:type" content="website">
                        <meta property="og:local" content="zh_CN"/>
                        <meta property="og:url" content="http://ksria.com/simpread"/>
                        <meta property="og:image" content="https://simpread-1254315611.cos.ap-shanghai.myqcloud.com/static/introduce-2.png"/>
                        <meta property="og:image:type" content="image/png"/>
                        <meta property="og:image:width" content="960"/>
                        <meta property="og:image:height" content="355"/>
                        <meta property="og:site_name" content="http://ksria.com/simpread"/>
                        <meta property="og:description" content="简悦 SimpRead - 如杂志般沉浸式阅读体验的扩展"/>
                        <style type="text/css">${ styles.common }</style>
                        <style type="text/css">${ styles.theme  }</style>
                        <style type="text/css">${ styles.global }</style>
                        <style type="text/css">${ styles.mobile }</style>
                        <style type="text/css">${ styles.css    }</style>
                        <style type="text/css">${ styles.special}</style>
                        ${hightlight()}
                        <title>简悦 | ${title}</title>
                    </head>
                    <body>
                        <sr-read style='${ $( "sr-read" ).attr( "style" ) }'>
                            <sr-rd-title>${title}</sr-rd-title>
                            <sr-rd-desc ${desc == "" ? 'style="display: none;"' : "" }>${desc}</sr-rd-desc>
                            <sr-rd-content>${content}</sr-rd-content>
                            <sr-rd-footer>
                                <sr-rd-footer-group>
                                    <sr-rd-footer-line></sr-rd-footer-line>
                                    <sr-rd-footer-text>全文完</sr-rd-footer-text>
                                    <sr-rd-footer-line></sr-rd-footer-line>
                                </sr-rd-footer-group>
                                <sr-rd-footer-copywrite>
                                    <div>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码，用以提升阅读体验，<a href="${ location.href }" target="_blank">原文地址 </a></div>
                                </sr-rd-footer-copywrite>
                            </sr-rd-footer>
                        </sr-read>
                    </body>
                </html>`;
    return html;
}

/**
 * Markdown offline e.g. ![img](http://xxx.png) → ![img][id] ... [id]:base54
 * 
 * @param {string} markdown str
 * @param {func} callback
 */
function Markdown( content, callback ) {
    type         = "markdown";
    cb           = callback;
    markdown     = content;
    images       = new Map();
    const arr    = markdown.match( /!\[\]\(http\S+\)/ig );
    if ( arr && arr.length > 0 ) {
        arr.forEach( ( item, idx ) => {
            markdown = markdown.replace( item, `![][img-${idx}]` );
            item     = item.replace( /[!\[\]\(]|[\)]/ig, "" );
            markdown = markdown + `\r\n\r\n` + `[img-${idx}]:${item}`;
            images.set( item, `[img-${idx}]:${item}` );
        });
        urls     = [...images.keys()];
        maxCount = urls.length;
        currIdx  = 0;
        serialConvert( urls[0] );
    } else cb( markdown );
}

/**
 * Get current page( readmode ) all images and convert to base64
 * 
 * @param {func} callback 
 */
function getImages( callback ) {
    type   = "html";
    cb     = callback;
    images = new Map();
    $( "sr-rd-content" ).find( "img" ).map( ( idx, img ) => {
        if ( !images.has( img.src ) ) {
            images.set( img.src, img );
        } else {
            //TO-DO
        }
    });
    urls     = [...images.keys()];
    maxCount = urls.length;
    currIdx  = 0;
    serialConvert( urls[0] );
}

/**
 * Convert url to base64
 * 
 * @param {string} url
 */
function serialConvert( url ) {
    // call contentscriptsa
    //toBase64( url, result => {
    // call background
    browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.base64, { url }), result => {
        currIdx++;
        if ( result && result.done ) {
            setBase64( result.done.url, result.done.uri );
        } else {
            // TO-DO
        }
        if ( currIdx < maxCount ) {
            serialConvert( urls[currIdx] );
        } else {
            console.log( "All images convert done" )
            cb && cb( markdown );
        }
    });
}

/**
 * Change img.src to base64
 * 
 * @param {string} url
 * @param {string} uri
 */
function setBase64( url, uri ) {
    const img = images.get( url );
    if ( type == "html" ) {
        $(img).attr( "src", uri ).attr( "sr-org-src", url );
    } else {
        const str = img.replace( url, uri )
        markdown = markdown.replace( img, str );
    }
}

/**
 * toBase64 usage FileReader
 * 
 * @param {string} url
 * @param {func} callback
 */
function toBase64( url, callback ) {
    fetch( url )
        .then( response => response.blob() )
        .then( blob     => new Promise(( resolve, reject ) => {
            const reader = new FileReader()
            reader.onloadend = event => {
                callback({ done: { url, uri: event.target.result }});
            };
            reader.onerror = error => {
                callback({ fail: { error, url } });
            };
            reader.readAsDataURL( blob );
        }))
        .catch( error => {
            callback({ fail: { error, url } });
        });
}

/**
 * Restore base64 to url
 */
function restoreImg() {
    $( "sr-rd-content" ).find( "img" ).map( ( idx, img ) => {
        const src = $(img).attr( "sr-org-src" );
        $(img).attr( "src", src ).removeAttr( "sr-org-src" );
    });
}

export {
    HTML,
    Markdown,
    getImages,
    toBase64,
    restoreImg,
}