console.log( "=== simpread site load ===" )

import * as prplugin from 'prplugin';

const minimatch = prplugin.Plugin( "minimatch" );

/**
 * Verify site
 * 
 * @param  {string} storage.current.site.name
 * @return {number} 0: success; -1: not exsit; -2: tieba.com;
 */
function verify( name ) {
    const [ hostname, pathname, href ] = [ window.location.hostname, window.location.pathname, window.location.href ];
    /*if ( hostname == "tieba.baidu.com" && !href.includes( "see_lz=1" ) ) {
        return -2;
    } else */
    if ( name === "" ) {
        return -1;
    } else {
        return 0;
    }
}

/**
 * Html convert to enml
 * 
 * @param  {string} convert string
 * @param  {string} url
 * 
 * @return {string} convert string
 */
function html2enml( html, url ) {
    let $target, str;
    const tags = [ "figure", "sup", "hr", "section", "applet", "base", "basefont", "bgsound", "blink", "body", "button", "dir", "embed", "fieldset", "form", "frame", "frameset", "head", "html", "iframe", "ilayer", "input", "isindex", "label", "layer", "legend", "link", "marquee", "menu", "meta", "noframes", "noscript", "object", "optgroup", "option", "param", "plaintext", "script", "select", "style", "textarea", "xml" ];
    
    $( "html" ).append( `<div id="simpread-en" style="display: none;">${html}</div>` );
    $target = $( "#simpread-en" );
    $target.find( "img:not(.sr-rd-content-nobeautify)" ).map( ( index, item ) => {
        $( "<div>" ).attr( "style", `width: ${item.naturalWidth}px; height:${item.naturalHeight}px; background: url(${item.src})` )
        .replaceAll( $(item) );
    });
    $target.find( tags.join( "," ) ).map( ( index, item ) => {
        $( "<div>" ).html( $(item).html() ).replaceAll( $(item) );
    });
    $target.find( tags.join( "," ) ).remove();
    str = $target.html();
    $target.remove();

    try {
        str = `<blockquote>本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码，原文地址 <a href="${url}" target="_blank">${url}</a></blockquote><hr></hr><br></br>` + str;
        str = str.replace( /(id|class|onclick|ondblclick|accesskey|data|dynsrc|tabindex)="[\w- ]+"/g, "" )
                //.replace( / style=[ \w="-:\/\/:#;]+/ig, "" )             // style="xxxx"
                .replace( /label=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // label="xxxx"
                .replace( / finallycleanhtml=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )  // finallycleanhtml="xxxx"
                .replace( /<img[ \w="-:\/\/?!]+>/ig, "" )                  // <img>
                .replace( /data[-\w]*=[ \w=\-.:\/\/?!;+"]+"[ ]?/ig, "" )   // data="xxx" || data-xxx="xxx"
                .replace( /href="javascript:[\w()"]+/ig, "" )              // href="javascript:xxx"
                .replace( /sr-blockquote/ig, "blockquote" )                // sr-blockquote to blockquote
                .replace( /<p[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" )          // <p> || <p > || <p xxx="xxx">
                .replace( /<figcaption[ -\w*= \w=\-.:\/\/?!;+"]*>/ig, "" ) // <figcaption >
                .replace( /<\/figcaption>/ig, "" )                         // </figcaption>
                .replace( /<\/br>/ig, "" )                                 // </br>
                .replace( /<br>/ig, "<br></br>" )
                .replace( /<\/p>/ig, "<br></br>" );

        return str;

    } catch( error ) {
        return `<div>转换失败，原文地址 <a href="${url}" target="_blank">${url}</a></div>`
    }
}

/**
 * Clear Html to MD, erorr <tag>
 * 
 * @param {string} convert string
 */
function clearMD( str ) {
    str = `> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 ${ window.location.href } \r\n\r\n ${str}`;
    str = str.replace( /<\/?(ins|font|span|div|canvas|noscript|fig\w+)[ -\w*= \w=\-.:&\/\/?!;,%+()#'"{}\u4e00-\u9fa5]*>/ig, "" )
             .replace( /sr-blockquote/ig, "blockquote" )
             .replace( /<\/?style[ -\w*= \w=\-.:&\/\/?!;,+()#"\S]*>/ig, "" )
             .replace( /(name|lable)=[\u4e00-\u9fa5 \w="-:\/\/:#;]+"/ig, "" )
             return str;
}

/**
 * Exclusion
 * 
 * @param  {object} simpread.read
 * @return {boolen} true: not exist; false: exist
 */
function exclusion( data ) {
    const url = window.location.origin + window.location.pathname;
    return data.exclusion.findIndex( item => {
        item = item.trim();
        return item.startsWith( "http" ) ? minimatch( url, item ) : item == data.site.name;
    }) == -1 ? true : false;
}

/**
 * Whitelist
 * 
 * @param  {object} simpread.read
 * @return {boolean} 
 */
function whitelist( data ) {
    const url = window.location.origin + window.location.pathname;
    return data.whitelist.findIndex( item => {
        item = item.trim();
        return item.startsWith( "http" ) ? minimatch( url, item ) : item == data.site.name;
    }) != -1 ? true : false;
}

export {
    verify         as Verify,
    html2enml      as HTML2ENML,
    clearMD        as ClearMD,
    exclusion      as Exclusion,
    whitelist      as Whitelist,
}