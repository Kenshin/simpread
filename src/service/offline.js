console.log( "=== simpread offline load ===" )

import {browser}   from 'browser';
import * as msg    from 'message';

let currIdx = 0, maxCount = 0, urls = [], images, cb;

/**
 * Offline HTML
 * 
 * @param {string} title
 * @param {string} desc
 * @param {string} content
 * @param {object} styles, include: simpread(global), common, theme
 * 
 * @return {string} html
 */
function HTML( title, desc, content, styles ) {
    const   html = `
                <html lang="en" class="simpread-font simpread-theme-root">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="author" content="Kenshin"/>
                        <meta name="description" content="简悦 ( SimpRead ) - 让你瞬间进入沉浸式阅读的 Chrome extension" />
                        <meta name="keywords" content="Chrome extension, Chrome 扩展, 阅读模式, 沉浸式阅读, read mode, reading mode, reader view"/>
                        <meta name="thumbnail" content="https://simpread-1254315611.cos.ap-shanghai.myqcloud.com/static/introduce-2.png"/>
                        <style type="text/css">${ styles.common }</style>
                        <style type="text/css">${ styles.theme  }</style>
                        <style type="text/css">${ styles.global }</style>
                        <title>简悦 | ${title}</title>
                    </head>
                    <body>
                        <sr-read>
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
 * Get current page( readmode ) all images and convert to base64
 * 
 * @param {func} callback 
 */
function getImages( callback ) {
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
            cb && cb();
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
    img.src   = uri;
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

export {
    HTML,
    getImages,
    toBase64,
}