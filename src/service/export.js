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
 * @param {function} when catch callback
 */
function markdown( data, name, callback ) {
    try {
        const md     = toMarkdown( data, { gfm: true }),
              base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( data );
        download( base64, name );
    } catch( error ) {
        callback( error );
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

class DropboxClient {

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
            defer.resolve( "token_success" );
        } else {
            defer.reject( "token_failed" );
        }
    }

    get access_token() {
        return dbx_token;
    }

    constructor() {
        location.protocol == "chrome-extension:" && $.ajax({
            url     : this.api_url,
            dataType: "script",
        }).done( () => {
            console.log( "dropbox api load complete." )
        }).fail( ( jqXHR, textStatus ) => {
            console.error( "droboxp api load failed: ", textStatus, jqXHR )
            dbx_error = jqXHR.status;
        });
    }

    Auth() {
        if ( !dbx_error ) {
            const dbx = new Dropbox({ clientId: this.client_id });
            const url = dbx.getAuthenticationUrl( this.redirect_uri );
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
        } else {
            defer.reject( "access_failed" );
        }
        return this;
    }

    Exist( name, callback ) {
        let idx = -1;
        const dbx = new Dropbox({ accessToken: this.access_token });
        dbx.filesListFolder( { path: "" })
        .then( response => {
            idx = response.entries.findIndex( item => item.name == name && item[".tag"] == "file" );
            callback( idx, undefined );
        })
        .catch( error => {
            console.error(error);
            callback( idx, error );
        });
    }

    Read( name, callback ) {
        const dbx = new Dropbox({ accessToken: this.access_token });
        dbx.filesDownload( { path: `/${name}` })
        .then( response => {
            const reader = new FileReader()
            reader.addEventListener( "loadend", () => {
                callback( "read", reader.result, undefined )
            })
            reader.readAsText( response.fileBlob );
        })
        .catch( error => {
            callback( "read", undefined, error )
        });
    }

    Write( name, data, callback ) {
        const parts = [
          new Blob([data], {type: 'text/json'})
        ];

        const file = new File( parts, name, {
            type: "application/json"
        });

        const dbx = new Dropbox({ accessToken: this.access_token });
        dbx.filesUpload({path: '/' + file.name, contents: file, mode:{ ".tag": "overwrite" } })
        .then( response => {
            callback( "write", response, undefined );
        })
        .catch( error => {
            callback( "write", undefined, error );
        });
    }
}

const dropbox = new DropboxClient();
defer.promise( dropbox );

export {
    png      as PNG,
    pdf      as PDF,
    markdown as Markdown,
    download as Download,
    dropbox,
}