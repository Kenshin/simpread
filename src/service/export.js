console.log( "=== simpread export load ===" )

import domtoimage from 'dom2image';
import FileSaver  from 'filesaver';
import toMarkdown from 'to-markdown';

import * as msg   from 'message';
import {browser}  from 'browser';

/**
 * Create PNG
 * 
 * @param {html}     html element
 * @param {string}   name
 * @param {function} callback
 */
function png( element, name, callback ) {
    domtoimage.toBlob( element )
    .then( blob => {
        blob && FileSaver.saveAs( blob, name );
        callback( !!blob );
    });
}

/**
 * Create PDF file
 */
function pdf() {
    window.print();
}

/**
 * Create Markdown file
 * 
 * @param {string} data
 * @param {string} name
 * @param {function} 0: base64; 1: error
 */
function markdown( data, name, callback ) {
    try {
        const md     = toMarkdown( data, { gfm: true }),
              base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( data );
        name ? download( base64, name ) : callback( md );
    } catch( error ) {
        callback( undefined, error );
    }
}

/**
 * Downlaod
 * 
 * @param {string} image base64 code
 * @param {string} name
 */
function download( data, name ) {
    const $a   = $( `<a style="display:none" href=${data} download="${name}"></a>` ).appendTo( "body" );
    $a[0].click();
    $a.remove();
}

let dbx_token, dbx_error, defer = $.Deferred();

/**
 * Dropbox
 * 
 * @class
 */
class Dropbox {

    get api_url() {
        return "https://cdn.bootcss.com/dropbox.js/2.5.7/Dropbox-sdk.min.js";
    }

    get client_id() {
        return "4cyaw4wqpbg4751";
    }

    get redirect_uri() {
        return "https://kenshin.github.io/simpread/";
    }

    get config_name() {
        return "simpread_config.json";
    }

    set access_token( uri ) {
        const arr = uri.match( /access_token=\S+&token_type/i );
        if ( arr && arr.length > 0 ) {
            dbx_token = arr[0].replace( /(access_token=)|(&token_type)/ig, "" );
        } else {
            dbx_token = uri;
        }
        defer.resolve( "token_success" );
    }

    get access_token() {
        return dbx_token;
    }

    Auth() {
        if ( !dbx_error ) {
            const url = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`;
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
        } else {
            defer.reject( "access_failed" );
        }
        return this;
    }

    Exist( name, callback ) {
        let idx     = -1;
        const data  = { path : "" },
              token = this.access_token;

        $.ajax({
            url     : "https://api.dropboxapi.com/2/files/list_folder",
            type    : "POST",
            data    : JSON.stringify( data ),
            headers : {
                "Authorization"   : `Bearer ${token}`,
                "Content-Type"    : "application/json"
            },
        }).done( ( data, textStatus, jqXHR ) => {
            idx = data.entries.findIndex( item => item.name == name && item[".tag"] == "file" );
            callback( idx, undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( idx, error );
        });
    }

    Read( name, callback ) {
        const data  = { path : `/${name}` },
              token = this.access_token;

        $.ajax({
            url     : "https://content.dropboxapi.com/2/files/download",
            type    : "POST",
            headers : {
                "Authorization"   : `Bearer ${token}`,
                "Dropbox-API-Arg" : JSON.stringify( data ),
            },
        }).done( ( data, textStatus, jqXHR ) => {
            callback( "read", data, undefined )
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( "read", undefined, error )
        });
    }

    Write( name, data, callback ) {
        const args     = { path: "/" + name, mode: "overwrite" },
              token    = this.access_token,
              safejson = args => {
                const charsToEncode = /[\u007f-\uffff]/g;
                return JSON.stringify(args).replace( charsToEncode, c => {
                    return '\\u' + ( '000' + c.charCodeAt(0).toString(16)).slice(-4);
                });
        };

        $.ajax({
            url     : "https://content.dropboxapi.com/2/files/upload",
            type    : "POST",
            data    : data,
            headers : {
                "Authorization"   : `Bearer ${token}`,
                "Dropbox-API-Arg" : safejson( args ),
                "Content-Type"    : "application/octet-stream"
            },
            processData : false,
            contentType : false
        }).done( ( data, textStatus, jqXHR ) => {
            callback( "write", data, undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( "write", undefined, error );
        });

    }
}

const dropbox = new Dropbox();
defer.promise( dropbox );

export {
    png      as PNG,
    pdf      as PDF,
    markdown as Markdown,
    download as Download,
    dropbox,
}