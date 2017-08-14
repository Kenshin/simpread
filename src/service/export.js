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

    get client_id() {
        return "4cyaw4wqpbg4751";
    }

    get redirect_uri() {
        return "https://kenshin.github.io/simpread/auth.html?id=dropbox";
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

let defer_pocket = $.Deferred();

/**
 * Pocket
 * 
 * @class
 */
class Pocket {

        constructor( access_token, username, code, tags ) {
            this.access_token = access_token;
            this.username     = username;
            this.code         = code;
            this.tags         = tags;
        }
    
        get consumer_key() {
            return "69741-d75561b7a9a96a511f36552e";
        }

        get redirect_uri() {
            return "http://ksria.com/simpread/auth.html?id=pocket";
        }

        get header() {
            return {
                "content-type": "application/x-www-form-urlencoded",
                "X-Accept"    : "application/json"
            }
        }

        Settags( value ) {
            this.tags = value ? value : "simpread";
        }

        Accesstoken() {
            defer_pocket.resolve( "token_success" );
        }

        Request( callback ) {
            const data = {
                consumer_key: this.consumer_key,
                redirect_uri: this.redirect_uri,
            };

            $.ajax({
                url     : "https://getpocket.com/v3/oauth/request",
                type    : "POST",
                headers : this.header,
                data,
            }).done( ( data, textStatus, jqXHR ) => {
                callback( data, textStatus == "success" ? "" : textStatus );
            }).fail( ( jqXHR, textStatus, error ) => {
                console.error( jqXHR, textStatus, error )
                callback( undefined, error );
            });
        }

        Redirect( code ) {
            this.code = code;
            const url = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${this.redirect_uri}`;
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
            return this;
        }

        Auth( callback ) {
            const data = {
                consumer_key: this.consumer_key,
                code        : this.code,
                redirect_uri: this.redirect_uri,
            };

            $.ajax({
                url     : "https://getpocket.com/v3/oauth/authorize",
                type    : "POST",
                headers : this.header,
                data,
            }).done( ( data, textStatus, jqXHR ) => {
                callback( data, undefined );
            }).fail( ( jqXHR, textStatus, error ) => {
                console.error( jqXHR, textStatus, error )
                callback( undefined, error );
            });
        }

        Add( url, title, callback ) {
            const data = {
                consumer_key: this.consumer_key,
                access_token: this.access_token,
                url,
                title,
                tags: this.tags
            };

            $.ajax({
                url     : "https://getpocket.com/v3/add",
                type    : "POST",
                headers : this.header,
                data,
            }).done( ( data, textStatus, jqXHR ) => {
                callback( data, undefined );
            }).fail( ( jqXHR, textStatus, error ) => {
                console.error( jqXHR, textStatus, error )
                callback( undefined, error );
            });
        }

    }

const dropbox = new Dropbox();
defer.promise( dropbox );

const pocket = new Pocket();
defer_pocket.promise( pocket );

export {
    png      as PNG,
    pdf      as PDF,
    markdown as Markdown,
    download as Download,
    dropbox,
    pocket,
}