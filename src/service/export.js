console.log( "=== simpread export load ===" )

import domtoimage from 'dom2image';
import FileSaver  from 'filesaver';
import Turndown   from 'markdown';
import mdgfm      from 'mdgfm';
import EpubPress  from 'epubpress';
import Instapaper from 'instapaper';

import * as msg   from 'message';
import {browser}  from 'browser';
import * as puplugin from 'puplugin';
import * as wiz   from 'wiz';

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
    }).catch( error => {
        console.error( "export png failed", error )
        callback( undefined );
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
        const turndownService = new Turndown(),
              gfm             = mdgfm.gfm,
              tables          = mdgfm.tables,
              strikethrough   = mdgfm.strikethrough,
              codeBlock       = mdgfm.highlightedCodeBlock;
        turndownService.use([ gfm, tables, strikethrough, codeBlock ]);
        turndownService.addRule( 'pre', {
            filter: [ 'pre' ],
            replacement: content => {
                return '\n\n```\n' + content + '\n```\n\n'
            }
        });
        const md     = turndownService.turndown( data ),
              base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( md );
        name ? download( base64, name ) : callback( md );
    } catch( error ) {
        callback( undefined, error );
    }
}

function epub( data, url, title, desc, callback ) {
    console.log( data )
    const ebook = new EpubPress({
        title,
        description: desc == "" ? title : desc,
        sections: [{
            url,
            html: `<html><body><div>${data}</div></body></html>`,
        }]
    });
    ebook.publish().then( () => {
        ebook.download();
    }).then(() => {
        console.log( "succcess" );
        callback( true );
    }).catch( error => {
        console.log( "publish epub error ", error );
        callback( false );
    });
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

/**
 * Downlaod
 * 
 * @param {string} origin data
 * @param {string} name
 */
function prueDownload( data, name ) {
    const blob = new Blob([data], {
        type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    browser.downloads.download({
        url     : url,
        filename: name,
    });
}

/**
 * Dis contented serice
 * 
 * @param {string} service id 
 */
function unlink( id ) {
    const content = {
        "dropbox" : "https://www.dropbox.com/account/connected_apps",
        "pocket"  : "https://getpocket.com/connected_applications",
        "instapaper":"https://www.instapaper.com/",
        "evernote": "https://www.evernote.com/AuthorizedServices.action",
        "yinxiang": "https://app.yinxiang.com/AuthorizedServices.action",
        "onenote" : "https://account.live.com/consent/Manage",
        "gdrive"  : "https://drive.google.com/drive/my-drive",
        "yuque"   : "https://www.yuque.com/yuque/developer/delete-oauth-apps",
        "notion"  : "http://ksria.com/simpread/docs/#/授权服务?id=取消授权",
        "youdao"  : "http://ksria.com/simpread/docs/#/授权服务?id=取消授权",
        "weizhi"  : "http://ksria.com/simpread/docs/#/授权服务?id=取消授权",
        "jianguo" : "http://help.jianguoyun.com/?p=2064",
        "linnk"   : "https://linnk.net/",
    }
    return content[id]
}

/**
 * Dropbox
 * 
 * @class
 */
class Dropbox {

    get id()   { return "dropbox"; }
    get name() { return name( this.id ); }

    get client_id() {
        return "4cyaw4wqpbg4751";
    }

    get redirect_uri() {
        return "https://kenshin.github.io/simpread/auth.html?id=dropbox";
    }

    get config_name() {
        return "simpread_config.json";
    }

    New() {
        this.dtd  = $.Deferred();
        this.access_token = "";
        return this;
    }

    Auth() {
        const url = `https://www.dropbox.com/oauth2/authorize?response_type=token&client_id=${this.client_id}&redirect_uri=${this.redirect_uri}`;
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Accesstoken( url ) {
        const arr = url.match( /access_token=\S+&token_type/i );
        arr && arr.length > 0 &&
            ( this.access_token = arr[0].replace( /(access_token=)|(&token_type)/ig, "" ));
        this.access_token != "" ? this.dtd.resolve() : this.dtd.reject();
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

    Write( name, data, callback, path = "" ) {
        const safename = data => data.replace( /\//ig, "" ),
              args     = { path: `/${path}${safename(name)}`, mode: "overwrite" },
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
        }).fail( ( xhr, textStatus, error ) => {
            console.error( xhr, status, error )
            callback( "write", undefined, error.toLowerCase().startsWith( "invalid_access_token" ) ? `${ this.name } 授权过期，请重新授权。` : "error" );
        });

    }
}

/**
 * Pocket
 * 
 * @class
 */
class Pocket {

    get id()   { return "pocket"; }
    get name() { return name( this.id ); }

    get consumer_key() {
        return "69741-d75561b7a9a96a511f36552e";
    }

    get redirect_uri() {
        return "https://kenshin.github.io/simpread/auth.html?id=pocket";
    }

    get header() {
        return {
            "content-type": "application/x-www-form-urlencoded",
            "X-Accept"    : "application/json"
        }
    }

    New() {
        this.dtd = $.Deferred();
        this.access_token = "";
        this.code         = "";
        this.tags         = "";
        return this;
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
            callback( undefined, textStatus );
        });
    }

    Login( code ) {
        this.code = code;
        const url = `https://getpocket.com/auth/authorize?request_token=${code}&redirect_uri=${this.redirect_uri}`;
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Accesstoken( url ) {
        url ? this.dtd.resolve() : this.reject();
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
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result && result.access_token ) {
                this.access_token = result.access_token;
                callback( result, undefined );    
            } else callback( undefined, "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Add( url, title, callback ) {
        const data = {
            consumer_key: this.consumer_key,
            access_token: this.access_token,
            url,
            title,
            tags: this.tags ? this.tags : "simpread"
        };

        $.ajax({
            url     : "https://getpocket.com/v3/add",
            type    : "POST",
            headers : this.header,
            data,
        }).done( ( data, textStatus, jqXHR ) => {
            callback( data, undefined );
        }).fail( ( xhr, status, error ) => {
            console.error( xhr, status, error )
            callback( undefined, error.toLowerCase() == "unauthorized" ? `${ this.name } 授权过期，请重新授权。` : "error" );
        });
    }

}

/**
 * Instapaper
 * 
 * @class
 */
class Ins {

        get id()   { return "instapaper"; }
        get name() { return name( this.id ); }
        constructor() {
            this.access_token = "";
            this.token_secret = "";
            this.ins          = new Instapaper();
        }

        get consumer_key() {
            return "23464e13c91c4cba86f0df8aa87ec15a";
        }
    
        get consumer_secret() {
            return "b71eb22c7def4d19a2d9e7b7208d31c9";
        }

        Login( username, password, callback ) {
            this.ins.consumer_key    = this.consumer_key;
            this.ins.consumer_secret = this.consumer_secret;
            this.ins.requestToken( username, password ).done( result => {
                this.access_token    = this.ins.token;
                this.token_secret    = this.ins.token_secret;
                callback( result, undefined );
            }).fail( ( jqXHR, textStatus, error ) => {
                console.error( jqXHR, textStatus, error )
                callback( undefined, textStatus );
            });
        }

        Add( url, title, description, callback ) {
            this.ins.token           = this.access_token;
            this.ins.token_secret    = this.token_secret;
            this.ins.consumer_key    = this.consumer_key;
            this.ins.consumer_secret = this.consumer_secret;
            const settings           = this.ins.add( url, title, description );
            browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings } ), result => {
                if ( result.done ) { callback( "success", undefined ); }
                else callback( undefined, result.fail );
            });
        }
}

/**
 * Linnk
 * 
 * @class
 */
class Linnk {

    get id()   { return "linnk"; }
    get name() { return name( this.id ); }
    constructor() {
        this.access_token = "";
        this.group_id     = "";
        this.group_name   = "";
    }

    get error_code() {
        return {
            "-1001": "密码不正确，请确认。",
            "-1002": "⽤户不存在，请确认。",
            "-1004": "验证错误，请重新登录。",
            "-1005": "登录失效，请重新登录。",
            "-1006": "验证失效，请重新登录。",
        }
    }

    get tags() {
        return "simpread";
    }

    Login( username, password, callback ) {
        const data = {
            userName: username,
            password: password,
        };

        $.ajax({
            url     : "https://linnk.net/a/api/login",
            type    : "POST",
            data,
        }).done( ( result, textStatus, jqXHR ) => {
            result && result.code == 200 && ( this.access_token = result.token );
            callback( result, undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Add( url, title, callback ) {
        const data = {
            groupId  : this.group_id,
            targetURL: url,
            title,
            tagsStr  : this.tags,
        },
        settings = {
            url     : "https://linnk.net/a/api/bookmark/new",
            type    : "POST",
            headers : { Authorization: this.access_token },
            data,
        };

        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings } ), result => {
            if ( result.done ) {
                const data = JSON.parse( result.done );
                if ( data && data.code == 200 ) callback( "success", undefined );
                else callback( undefined, "error" );
            } else callback( undefined, result.fail );
        });
    }

    Groups( callback ) {
        const settings = {
            url     : "https://linnk.net/a/api/group/my",
            type    : "GET",
            headers : { Authorization: this.access_token },
        };
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings } ), result => {
            if ( result.done ) {
                const data = JSON.parse( result.done );
                if ( data.code != 200 ) {
                    callback( undefined, this.error_code[ data.code ] );
                } else callback( data, undefined );
            } else callback( undefined, "error" );
        });
    }

    GetGroup( name, target ) {
        const group = target.find( obj => obj.groupName == name );
        group && ( this.group_name = group.groupName );
        return group;
    }

    NewGroup( name, callback ) {
        const settings = {
            url     : "https://linnk.net/a/api/group/new",
            type    : "POST",
            headers : { Authorization: this.access_token },
            data    : { groupName: name },
        };
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings } ), result => {
            if ( result.done ) {
                callback( JSON.parse( result.done ), undefined );
            } else callback( undefined, result.fail );
        });
    }

    GetSafeGroup( name, callback ) {
        this.Groups( ( result, error ) => {
            if ( result && result.code == 200 ) {
                const group = this.GetGroup( name, result.data );
                !group && this.NewGroup( name, callback );
                group  && callback({ data: group, code: 200 }, undefined );
            } else {
                callback( undefined, error == "error" ? "error" : error );
            }
        })
    }
}

/**
 * Evernote
 * 
 * @class
 */
class Evernote {

    get id()   { return this.env.toLowerCase(); }
    get name() { return name( this.env ); }

    constructor() {
        this.token          = "";
        this.token_secret   = ""
        this.oauth_verifier = "";
        this.access_token   = "";
        this.env            = ""; // include: "yinxiang" "evernote"
        this.sandbox        = true;
    }

    get host() {
        if ( this.sandbox ) {
            return "sandbox.evernote.com";
        } else {
            return this.env == "yinxiang" ? "app.yinxiang.com" : "www.evernote.com";
        }
    }

    get server() {
        //return this.sandbox ? "http://localhost:3000/evernote" : "https://simpread.herokuapp.com/evernote";
        return "https://simpread.herokuapp.com/evernote";
    }

    get china() {
        return this.env != "evernote" ? true : false;
    }

    get headers() {
        return {
            sandbox: this.sandbox,
            china  : this.china,
            type   : this.env,
        }
    }

    New() {
        this.dtd            = $.Deferred();
        this.token          = "";
        this.token_secret   = "";
        this.access_token   = ""
        this.oauth_verifier = "";
        return this;
    }

    RequestToken( callback ) {
        $.ajax({
            url     : `${this.server}/oauth`,
            type    : "POST",
            headers : this.headers,
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result && result.code == 200 ) {
                this.token        = result.data.token;
                this.token_secret = result.data.token_secret;
                const url = `https://${this.host}/OAuth.action?oauth_token=${this.token}`;
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
                callback( result, undefined );
            } else {
                callback( undefined, "error" );
            }
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Accesstoken( url ) {
        url.split( "&" ).forEach( item => {
            item.startsWith( "oauth_token="    ) && ( this.token = item.replace( "oauth_token=", "" ));
            item.startsWith( "oauth_verifier=" ) && ( this.oauth_verifier = item.replace( "oauth_verifier=", "" ));
        });
        this.oauth_verifier ? this.dtd.resolve() : this.dtd.reject( "oauth_verifier is null" );
    }

    Auth( callback ) {
        $.ajax({
            url     : `${this.server}/token`,
            type    : "POST",
            headers : this.headers,
            data    : {
                token  : this.token,
                token_secret  : this.token_secret,
                oauth_verifier: this.oauth_verifier,
            }
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result && result.code == 200 ) {
                this.access_token = result.data.token;
                callback( result, undefined );
            } else if ( result && result.code == 401 ) {
                console.log( "result.code == 401" )
            } else {
                callback( undefined, "error" );
            }
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
        return this;
    }

    Add( title, content, callback ) {
        $.ajax({
            url     : `${this.server}/add`,
            type    : "POST",
            headers : this.headers,
            data    : {
                token  : this.access_token,
                title,
                content,
            }
        }).done( ( result, textStatus, jqXHR ) => {
            console.assert( result.code != -1, result )
            result && result.code == 200 && callback( result, undefined );
            result && result.code == -1  &&
                callback( undefined, result.data.message == "authenticationToken" ? `${ name(this.env) } 授权错误，请重新授权。` : "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

}

/**
 * Onenote
 * 
 * @class
 */
class Onenote {

    get id()   { return "onenote"; }
    get name() { return name( this.id ); }

    get client_id() {
        return "b21d6e4a-30d5-4c39-9ef2-0ac14a01822b";
    }

    get client_secret() {
        return "q0ewrhaVHidjZragQ0hi1MV";
    }

    get redirect_uri() {
        //return "https://simpread.herokuapp.com";
        return "https://kenshin.github.io/simpread/auth.html";
    }

    get scopes() {
        return [ "office.onenote_create" ];
    }

    New() {
        this.dtd  = $.Deferred();
        this.code = "";
        this.access_token = "";
        return this;
    }

    Wrapper( url, title, content ) {
        return `
        <html xmlns='http://www.w3.org/1999/xhtml' lang='en-us'>
            <head>
                <title>${title}</title>
                <meta name='created' content='${new Date()}'
            </head>
            <body>
                <blockquote>
                    本文由 <a href="http://ksria.com/simpread" target="_blank">简悦 SimpRead</a> 转码，原文地址 <a href="${url}" target="_blank">${url}</a>
                </blockquote>
                <br></br>
                ${content}
            </body>
        </html>
        `;
    }

    Login() {
        let url = "https://login.live.com/oauth20_authorize.srf?";
        const params = {
            client_id    : this.client_id,
            redirect_uri : this.redirect_uri,
            scope        : this.scopes.join( " " ),
            response_type: "code",
        };
        Object.keys( params ).forEach( key => {
            url += `${key}=${params[key]}&`;
        });
        url = url.substr( 0, url.length )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Accesstoken( url ) {
        url = url.replace( "http://ksria.com/simpread/auth.html?", "" );
        if ( url.startsWith( "code" ) ) {
            this.code = url.replace( "code=", "" );
            this.dtd.resolve();
        } else {
            this.dtd.reject();
        }
    }

    Auth( callback ) {
        $.ajax({
            url     : "https://login.live.com/oauth20_token.srf",
            type    : "POST",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data    : {
                client_id     : this.client_id,
                client_secret : this.client_secret,
                code          : this.code,
                grant_type    : "authorization_code",
                redirect_uri  : this.redirect_uri,
            }
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result ) {
                this.access_token = result.access_token;
                callback( result, undefined );
            } else {
                callback( undefined, "error" );
            }
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Add( html, callback ) {
        $.ajax({
            url     : "https://www.onenote.com/api/v1.0/me/notes/pages",
            type    : "POST",
            headers : {
                "Content-Type": "application/xhtml+xml",
                "Authorization": `Bearer ${this.access_token}`
            },
            data    : html,
        }).done( ( result, status, xhr ) => {
            console.log( result, status, xhr )
            status == "success" && callback( result, undefined );
            status != "success" && callback( undefined, "error" );
        }).fail( ( xhr, status, error ) => {
            console.error( xhr, status, error )
            callback( undefined, xhr.status == 401 ? `${ this.name } 授权过期，请重新授权。` : "error" );
        });
    }
}

/**
 * GDrive
 * 
 * @class
 */
class GDrive {

    get id()   { return "gdrive"; }
    get name() { return name( this.id ); }

    get client_id() {
        return "920476054505-fd4192mqtfodackl1vip1c3c0hp6298n.apps.googleusercontent.com";
    }

     get redirect_uri() {
         return "https://kenshin.github.io/simpread/auth.html?id=gdrive";
     }

     get scope() {
         return "https://www.googleapis.com/auth/drive.file";
     }

     get folder() {
         return {
             name : "简悦",
             mimeType: "application/vnd.google-apps.folder",
         }
     }
     
     get header() {
         return {
            "Content-type" : "application/json",
            "Authorization": `Bearer ${this.access_token}`
         }
     }

    get errors() {
        return {
            401: `${ this.name } 授权过期，请重新授权。`,
            403: "调用达到最大值，请重新授权后再使用。",
            500: "Google 服务出现问题，请稍后再使用。",
        }
    }

    get boundary() {
        return "-------314159265358979323846";
    }

    New() {
        this.dtd = $.Deferred();
        this.folder_id    = "";
        this.access_token = "";
        return this;
    }

    Login() {
        let url = "https://accounts.google.com/o/oauth2/v2/auth?";
        const params = {
            client_id    : this.client_id,
            redirect_uri : this.redirect_uri,
            scope        : this.scope,
            response_type: "token",
            include_granted_scopes: true,
            state        : "state_parameter_passthrough_value"
        };
        Object.keys( params ).forEach( key => {
            url += `${key}=${params[key]}&`;
        });
        url = url.substr( 0, url.length )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Accesstoken( url ) {
        url.split( "&" ).forEach( item => {
            item.startsWith( "access_token=" ) && ( this.access_token = item.replace( "access_token=", "" ));
        })
        this.access_token != "" ? this.dtd.resolve() : this.dtd.reject();
    }

    Auth( callback ) {
        $.ajax({
            url     : `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${ this.access_token }`,
            type    : "GET",
        }).done( ( result, textStatus, jqXHR ) => {
            textStatus == "success" && result && result.aud == this.client_id ?
                this.CreateFolder( callback ) :
                callback( undefined, "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    CreateFolder( callback ) {
        $.ajax({
            url     : "https://www.googleapis.com/drive/v3/files",
            type    : "GET",
            headers : this.header,
        }).done( ( result, textStatus, jqXHR ) => {
            if ( textStatus == "success" ) {
                const folder = result.files.find( file => file.name = this.folder.name && file.mimeType == this.folder.mimeType )
                if ( folder ) {
                    this.folder_id = folder.id;
                    callback( result, undefined );
                } else this.Add( "folder", callback );
            } else callback( undefined, "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    CreateFile( name, content ) {
        const type  = "application/json; charset=UTF-8",
              meta  = {
                name,
                parents: [ this.folder_id ],
                mimeType: type,
        },
        delimiter   = `\r\n--${this.boundary}\r\n`,
        close_delim = `\r\n--${this.boundary}--`,
        body        =
            delimiter +
            "Content-Type: application/json\r\n\r\n" +
            JSON.stringify( meta ) +
            delimiter +
            `Content-Type: ${type}\r\n\r\n` +
            content +
            close_delim;
        return body;
    }

    /**
     * Add folder / file
     * @param {string} include: folder file
     * @param {func} callback
     * @param {string} content, only type == "folder"
     */
    Add( type, callback, content ) {
        $.ajax({
            url     : type == "folder" ? 
                        "https://www.googleapis.com/drive/v3/files" : 
                        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            type    : "POST",
            headers : type == "folder" ? 
                        this.header : 
                        { ...this.header, ...{ "Content-Type": `multipart/form-data; boundary="${this.boundary}"` }},
            data    : type == "folder" ? 
                        JSON.stringify( this.folder ) : 
                        content
        }).done( ( result, textStatus, jqXHR ) => {
            type == "folder" && textStatus == "success" && ( this.folder_id = result.id );
            textStatus == "success" && callback( result, undefined );
            textStatus != "success" && callback( undefined, "error" );
        }).fail( ( xhr, status, error ) => {
            console.error( xhr, status, error )
            const msg = xhr && xhr.responseJSON && this.errors[xhr.responseJSON.error.code] ? this.errors[xhr.responseJSON.error.code] : "error";
            callback( undefined, msg );
        });
    }
}

/**
 * Jianguo
 * 
 * @class
 */
class Jianguo {

    get id()   { return "jianguo"; }
    get name() { return name( this.id ); }

    get url() {
        return "https://dav.jianguoyun.com/dav/";
    }

    get root() {
        return "SimpRead";
    }

    get folder() {
        return "md";
    }

    get config_name() {
        return "simpread_config.json";
    }

    Auth( user, password, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.jianguo, {
            url: this.url,
            user,
            password,
            method: {
                type: "folder",
                root: this.root,
                folder: this.folder,
            },
        }), callback );
    }

    Add( user, password, path, content, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.jianguo, {
            url: this.url,
            user,
            password,
            method: {
                type: "file",
                path,
                content
            },
        }), callback );
    }

    Read( user, password, name, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.jianguo, {
            url: this.url,
            user,
            password,
            method: {
                type : "read",
                path: this.root + "/" + name,
                name,
            },
        }), callback );
    }
}

/**
 * WebDAV
 * 
 * @class
 */
class WebDAV {

    get id()   { return "webdav"; }
    get name() { return name( this.id ); }

    get root() {
        return "/SimpRead";
    }

    Auth( url, user, password, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.WebDAV, {
            url,
            user,
            password,
            method: {
                type: "folder",
                root: this.root,
            },
        }), callback );
    }

    Add( url, user, password, name, content, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.WebDAV, {
            url,
            user,
            password,
            method: {
                type: "file",
                root: this.root,
                name,
                content
            },
        }), callback );
    }
}

/**
 * Yuque
 * 
 * @class
 */
class Yuque {

    get id()   { return "yuque"; }
    get name() { return name( this.id ); }

    get client_id() {
        return "8p4PvTuP02UN7WhLlQrY";
    }

    get client_secret() {
        return "kl0LpKR7Tu3EDEJJOjAPEwEAkxeVYrcY5cEEOPeG";
    }

    get redirect_uri() {
        //return "https://simpread.herokuapp.com";
        return "https://kenshin.github.io/simpread/auth.html";
    }

    get scopes() {
        return "repo, doc";
    }

    New() {
        this.dtd  = $.Deferred();
        this.code = "";
        this.access_token = "";
        this.token_type = "";
        this.user_id = "";
        this.repos_id = "";
        return this;
    }

    Login() {
        let url = "https://www.yuque.com/oauth2/authorize?";
        const params = {
            client_id    : this.client_id,
            redirect_uri : this.redirect_uri,
            scope        : this.scopes,
            state        : "yuque_authorize",
            response_type: "code",
        };
        Object.keys( params ).forEach( key => {
            url += `${key}=${params[key]}&`;
        });
        url = url.substr( 0, url.length )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Accesstoken( url ) {
        url = url.replace( "http://ksria.com/simpread/auth.html?", "" );
        if ( url.startsWith( "code" ) ) {
            this.code = url.replace( "code=", "" ).replace( "&state=yuque_authorize", "" );
            this.dtd.resolve();
        } else {
            this.dtd.reject();
        }
    }

    Auth( callback ) {
        $.ajax({
            url     : " https://www.yuque.com/oauth2/token",
            type    : "POST",
            data    : {
                client_id     : this.client_id,
                client_secret : this.client_secret,
                code          : this.code,
                grant_type    : "authorization_code",
                redirect_uri  : this.redirect_uri,
            }
        }).done( ( result, textStatus, jqXHR ) => {
            if ( result ) {
                this.access_token = result.access_token;
                this.token_type   = result.token_type;
                callback( result, undefined );
            } else {
                callback( undefined, "error" );
            }
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    GetUser( callback ) {
        $.ajax({
            url     : "https://www.yuque.com/api/v2/user",
            type    : "GET",
            headers : {
                "Content-Type": "application/json",
                "X-Auth-Token": this.access_token
            },
        }).done( ( result, status, xhr ) => {
            if ( status == "success" ) {
                this.user_id = result.data.id;
                callback( result, undefined );
            } else callback( result, "error" );
        }).fail( ( xhr, status, error ) => {
            callback( undefined, error );
        });
    }

    GetRepos( callback ) {
        $.ajax({
            url     : `https://www.yuque.com/api/v2/users/${this.user_id}/repos`,
            type    : "GET",
            headers : {
                "Content-Type": "application/json",
                "X-Auth-Token": this.access_token
            },
        }).done( ( result, status, xhr ) => {
            if ( status == "success" ) {
                result.data.forEach( item => {
                    if ( item.slug == "simpread" ) {
                        this.repos_id = item.id;
                    }
                });
                callback( result, undefined );
            } else callback( result, "error" );
        }).fail( ( xhr, status, error ) => {
            callback( undefined, xhr );
        });
    }

    CreateRepo( callback ) {
        const data = {
            name: "SimpRead",
            slug: "simpread",
            description: "来自简悦的收藏",
            public: 0,
            type: "Book",
        };
        $.ajax({
            url     : `https://www.yuque.com/api/v2/users/${this.user_id}/repos`,
            type    : "POST",
            headers : {
                "Content-Type": "application/json",
                "X-Auth-Token": this.access_token
            },
            data : JSON.stringify( data )
        }).done( ( result, status, xhr ) => {
            if ( status == "success" ) {
                this.repos_id = result.data.id;
                callback( result, undefined );
            } else callback( result, "error" );
        }).fail( ( xhr, status, error ) => {
            callback( undefined, xhr );
        });
    }

    Add( title, body, callback ) {
        const data = {
            title,
            slug: Math.round(+new Date()),
            public: 0,
            body,
        };
        $.ajax({
            url     : `https://www.yuque.com/api/v2/repos/${this.repos_id}/docs`,
            type    : "POST",
            headers : {
                "Content-Type": "application/json",
                "X-Auth-Token": `${this.access_token}`
            },
            data : JSON.stringify( data )
        }).done( ( result, status, xhr ) => {
            status == "success" && callback( result, undefined );
            status != "success" && callback( undefined, "error" );
        }).fail( ( xhr, status, error ) => {
            console.error( xhr, status, error )
            callback( undefined, error.toLowerCase() == "unauthorized" ? `${ this.name } 授权过期，请重新授权。` : "error" );
        });
    }
}

/**
 * Notion
 * 
 * @class
 */
class Notion {

    get id()   { return "notion"; }
    get name() { return name( this.id ); }

    get url() {
        return "https://www.notion.so/";
    }

    UUID() {
        var __extends=void 0&&(void 0).__extends||function(){var _extendStatics=function extendStatics(d,b){_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return _extendStatics(d,b)};return function(d,b){_extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __())}}();var ValueUUID=function(){function ValueUUID(_value){this._value=_value;this._value=_value}ValueUUID.prototype.asHex=function(){return this._value};return ValueUUID}();var V4UUID=function(_super){__extends(V4UUID,_super);function V4UUID(){return _super.call(this,[V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-','4',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._oneOf(V4UUID._timeHighBits),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex()].join(''))||this}V4UUID._oneOf=function(array){return array[Math.floor(array.length*Math.random())]};V4UUID._randomHex=function(){return V4UUID._oneOf(V4UUID._chars)};V4UUID._chars=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];V4UUID._timeHighBits=['8','9','a','b'];return V4UUID}(ValueUUID);function generateUuid(){return new V4UUID().asHex()}
        return generateUuid();
    }

    Auth( callback ) {
        $.ajax({
            url     : this.url + "api/v3/loadUserContent",
            type    : "POST",
        }).done( ( result, status, xhr ) => {
            if ( result && status == "success" ) {
                this.access_token = Object.values( result.recordMap.notion_user )[0].value.id;
                this.folder_id    = Object.values( result.recordMap.block )[0].value.id;
                this.blocks       = Object.values( result.recordMap.block ).map( item => {
                    return { name: item.value.properties ? item.value.properties.title[0][0] : "Undefined", value: item.value.id }
                });
                callback( result, undefined );
            }
        }).fail( ( xhr, status, error ) => {
            console.error( error, status, xhr )
            callback( undefined, xhr.status == 401 ? `请先 <a target="_blank" href="https://www.notion.so/">登录 Notion</a> ` : "请稍后再试" );
        });
    }

    Add( title, content, callback ) {
        this.TempFile( this.folder_id, title, ( documentId, error ) => {
            console.log( 'TempFile: ', documentId )
            if ( error ) {
                callback( undefined, error );
            } else this.GetFileUrl( `${title}.md`, urls => {
                console.log( 'GetFileUrl: ', urls )
                this.WriteFile( urls.signedPutUrl, content, result => {
                    console.log( 'WriteFile: ', result )
                    this.ImportFile( urls.url, `${title}.md`, documentId, result => {
                        console.log( 'ImportFile: ', result )
                        result.done && callback( result, undefined );
                        result.fail && callback( undefined, "error" );
                    });
                });
            });
        });
    }

    TempFile( parentId, title, callback ) {
        const documentId = this.UUID(),
              userId     = this.access_token,
              time       = new Date().getDate(),
              operations = {
                operations: [
                    {
                        id: documentId,
                        table: 'block',
                        path: [],
                        command: 'set',
                        args: {
                            type: 'page',
                            id: documentId,
                            version: 1,
                        },
                    },
                    {
                        id: documentId,
                        table: 'block',
                        path: [],
                        command: 'update',
                        args: {
                            parent_id: parentId,
                            parent_table: 'block',
                            alive: true,
                        },
                    },
                    {
                        table: 'block',
                        id: parentId,
                        path: ['content'],
                        command: 'listAfter',
                        args: { id: documentId },
                    },
                    {
                        id: documentId,
                        table: 'block',
                        path: [],
                        command: 'update',
                        args: {
                            created_by: userId,
                            created_time: time,
                            last_edited_time: time,
                            last_edited_by: userId,
                        },
                    },
                    {
                        id: parentId,
                        table: 'block',
                        path: [],
                        command: 'update',
                        args: { last_edited_time: time },
                    },
                    {
                        id: documentId,
                        table: 'block',
                        path: ['properties', 'title'],
                        command: 'set',
                        args: [[title]],
                    },
                    {
                        id: documentId,
                        table: 'block',
                        path: [],
                        command: 'update',
                        args: { last_edited_time: time },
                    },
                ],
            };
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.AXIOS, {
            type: "post",
            url: this.url + "api/v3/submitTransaction",
            data: operations
        }), result => {
            result.done && callback( documentId, undefined );
            result.fail && callback( undefined, result.fail.message.includes( '401' ) ? `授权已过期，请重新授权。` : "请稍后再试" );
        });
    }

    GetFileUrl( name, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.AXIOS, {
            type: "post",
            url: this.url + "api/v3/getUploadFileUrl",
            data:{
                bucket: 'temporary',
                name: name,
                contentType: 'text/markdown',
            }
        }), result => {
            if ( result && result.done ) {
                callback( result.done.data );
            }
        });
    }

    WriteFile( url, content, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.AXIOS, {
            type: "put",
            url,
            content,
            data: {
                headers: {
                    'Content-Type': 'text/markdown'
                }
            }
        }), result => {
            if ( result && result.done ) {
                callback( result.done );
            }
        });
    }

    ImportFile( url, name, documentId, callback ) {
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.AXIOS, {
            type: "post",
            url: this.url + "api/v3/enqueueTask",
            data: {
                task: {
                    eventName: 'importFile',
                    request: {
                        fileURL: url,
                        fileName: name,
                        importType: 'ReplaceBlock',
                        pageId: documentId,
                    },
                }
            }
        }), result => callback( result ));
    }

}

/**
 * Youdao
 * 
 * @class
 */
class Youdao {

    get id()   { return "youdao"; }
    get name() { return name( this.id ); }

    get url() {
        return "https://note.youdao.com";
    }

    get permissions() {
        return {
            permissions: [ 'cookies' ],
            origins: [ 'https://*.youdao.com/' ]
        };
    }

    UUID() {
        var __extends=void 0&&(void 0).__extends||function(){var _extendStatics=function extendStatics(d,b){_extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)if(b.hasOwnProperty(p))d[p]=b[p]};return _extendStatics(d,b)};return function(d,b){_extendStatics(d,b);function __(){this.constructor=d}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __())}}();var ValueUUID=function(){function ValueUUID(_value){this._value=_value;this._value=_value}ValueUUID.prototype.asHex=function(){return this._value};return ValueUUID}();var V4UUID=function(_super){__extends(V4UUID,_super);function V4UUID(){return _super.call(this,[V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-','4',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._oneOf(V4UUID._timeHighBits),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),'-',V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex(),V4UUID._randomHex()].join(''))||this}V4UUID._oneOf=function(array){return array[Math.floor(array.length*Math.random())]};V4UUID._randomHex=function(){return V4UUID._oneOf(V4UUID._chars)};V4UUID._chars=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];V4UUID._timeHighBits=['8','9','a','b'];return V4UUID}(ValueUUID);function generateUuid(){return new V4UUID().asHex()}
        return generateUuid();
    }

    Cookies( callback ) {
        browser.cookies.get({
            url: this.url,
            name: 'YNOTE_CSTK',
        }, cookie => {
            callback( cookie );
        })
    }

    Auth( callback ) {
        this.Cookies( token => {
            if ( !token ) {
                callback( undefined, `请先 <a target="_blank" href="https://note.youdao.com/web">登录有道云笔记</a> ` );
                return;
            }
            this.access_token = token.value;
            const formData = new FormData();
            formData.append( 'path', '/' );
            formData.append( 'dirOnly', 'true' );
            formData.append( 'f', 'true');
            formData.append( 'cstk', this.access_token );
            $.ajax({
                url     : this.url + `/yws/api/personal/file?method=listEntireByParentPath&keyfrom=web&cstk=${this.access_token}`,
                type    : "POST",
                contentType: false,
                processData: false,
                data    : formData
            }).done( ( result, status, xhr ) => {
                if ( result && result.length > 0 ) {
                    this.folder_id = result[0].fileEntry.id;
                    this.folders   = result.map( item => {
                        return { name: item.fileEntry.name, value: item.fileEntry.id };
                    });
                    callback( result, undefined );
                }
            }).fail( ( xhr, status, error ) => {
                console.error( error, status, xhr )
                callback( undefined, xhr.status == 500 ? `请先 <a target="_blank" href="https://note.youdao.com/web">登录有道云笔记</a> ` : "请稍后再试" );
            });
        });
    }

    Add( title, content, callback ) {
        const timestamp = String( Math.floor( Date.now() / 1000 )),
              uuid      = this.UUID().replace( /-/g, '' ),
              fileId    = `WEB${uuid}`;
        let formData    = {};
        formData[ 'fileId'        ] = fileId;
        formData[ 'parentId'      ] = this.folder_id;
        formData[ 'name'          ] = `${title}.md`;
        formData[ 'domain'        ] = `1`;
        formData[ 'rootVersion'   ] = `-1`;
        formData[ 'dir'           ] = `false`;
        formData[ 'sessionId'     ] = '';
        formData[ 'createTime'    ] = timestamp;
        formData[ 'modifyTime'    ] = timestamp;
        formData[ 'transactionId' ] = fileId;
        formData[ 'bodyString'    ] = content;
        formData[ 'transactionTime' ] = timestamp;
        formData[ 'cstk'          ] = this.access_token;

        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.AXIOS, {
            type: "post",
            url : this.url + `/yws/api/personal/sync?method=push&keyfrom=web&cstk=${this.access_token}`,
            form: formData,
        }), result => {
            if ( result.fail ) callback( undefined, result.fail.message.includes( '500' ) ? `授权已过期，请重新授权。` : "请稍后再试" );
            else callback( result, undefined );
        });
    }

}

/**
 * Wiz
 * 
 * @class
 */
class Wiz {

    get id()   { return "weizhi"; }
    get name() { return name( this.id ); }

    get tag() {
        return "SimpRead";
    }

    get category() {
        return "/My Notes/";
    }

    Auth( user, password, callback ) {
        const data = {
            userId   : user,
            password : password,
            autoLogin: true,
        };

        $.ajax({
            url     : "https://note.wiz.cn/as/user/login?clientType=webclip_chrome&clientVersion=4.0.10&apiVersion=10&lang=zh-CN",
            type    : "POST",
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            data    : JSON.stringify(data),
        }).done( ( result, textStatus, jqXHR ) => {
            result && result.returnCode == 200 && ( this.access_token = result.result.userGuid );
            callback( result, undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Add( url, title, content, callback ) {
        const info = {
            title,
            url,
            category: this.category,
            cmd     : "save_content",
            comment : "",
            tag     : this.tag,
            userid  : this.username,
            params  : wiz.getParams( url, title, content ),
        };
        let data = wiz.getInfos( info, this.access_token );
        data     = JSON.stringify( data );
        const options = {
            url     : "https://kshttps0.wiz.cn/ks/gather?clientType=webclip_chrome&clientVersion=4.0.10&apiVersion=10&lang=zh-CN",
            type    : "POST",
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            async: true,
            cache: false,
            data,
        };
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.CORB, { settings: options }), result => {
            if ( result && result.done && result.done.return_code == 200 ) callback( result, undefined );
            else if ( result && result.done ) callback( undefined, result.done.return_code == 301 ? `授权已过期，请重新授权。` : "请稍后再试" );
            else callback( undefined, result.fail );
        });
    }

}

/**
 * Kindle
 * 
 * @class
 */
class Kindle {

    constructor() {
        this.id = "";
    }

    get host() {
        //return "http://localhost:3000/view";
        return "https://simpread.herokuapp.com/view";
    }

    get server() {
        return "https://pushtokindle.fivefilters.org/send.php";
    }

    Read( url, title, desc, content, style, callback ) {
        $.ajax({
            url     : `${this.host}/read`,
            type    : "POST",
            data    : {
                url,
                title,
                desc,
                content,
                style,
            }
        }).done( ( result, textStatus, jqXHR ) => {
            if ( textStatus == "success" && result && result.id ) {
                this.id = result.id;
                callback( result );
            } else callback( undefined, "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Temp() {
        const url = `${this.host}/${this.id}.html`;
        console.log( url )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }

    Send() {
        const url = `${this.server}?url=${this.host}/${this.id}.html`;
        console.log( url )
        browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url } ));
    }
}

/**
 * Get name
 * 
 * @param  {string} service type
 * @return {string} service name
 */
function name( type ) {
    type = type.toLowerCase();
    if ( [ "dropbox", "pocket", "instapaper", "linnk" , "evernote", "onenote", "notion" ].includes( type ) ) {
        return type.replace( /\S/i, $0=>$0.toUpperCase() );
    } else if ( type == "yinxiang" ) {
        return "印象笔记";
    } else if ( type == "gdrive" ) {
        return "Google 云端硬盘";
    } else if ( type == "jianguo" ) {
        return "坚果云";
    } else if ( type == "yuque" ) {
        return "语雀";
    } else if ( type == "youdao" ) {
        return "有道云笔记";
    } else if ( type == "weizhi" ) {
        return "为知笔记";
    }
return type;
}

/**
 * markdown wrapper
 * 
 * @param  {string} content
 * @param  {string} download file name
 * @param  {object} new Notify()
 * @return {promise} promise
 */
function mdWrapper( content, name, notify ) {
    const dtd  = $.Deferred();
    markdown( content, name, ( result, error ) => {
        error  && notify.Render( 2, "转换 Markdown 格式失败，这是一个实验性功能，不一定能导出成功。" );
        !error && dtd.resolve( result );
    });
    return dtd;
}

/**
 * Markdown to HTML
 * 
 * @param {string} content
 */
function md2HTML( content ) {
    const markdown  = puplugin.Plugin( "markdown" ),
          converter = new markdown.default.Converter();
    converter.setOption( 'noHeaderId', true );
    return converter.makeHtml( content );
}

let noti; // notify variable

/**
 * Service callback wrapper
 * 
 * @param {string} result
 * @param {string} error
 * @param {string} service name, e.g. Google 云端硬盘
 * @param {string} service id, e.g. gdrive
 * @param {object} notify
 */
function serviceCallback( result, error, name, type, notify ) {
    noti && noti.complete();
    !error && notify.Render( `已成功保存到 ${name}！` );
    ![ "evernote", "yinxiang" ].includes( type ) && error && notify.Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
    if ( error && error.includes( "重新授权" )) {
        notify.Clone().Render( "3 秒钟后将会自动重新授权，请勿关闭此页面..." );
        setTimeout( ()=>browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.auth, { name: type } )), 3000 );
    }
}

/**
 * Verify service wrapper
 * 
 * @param  {object} storage object
 * @param  {object} service object
 * @param  {string} service type
 * @param  {string} service name
 * @param  {object} notify
 * @param  {object} default auto re-auth
 * @return {promise} promise
 */
function verifyService( storage, service, type, name, notify, auto = true ) {
    const dtd = $.Deferred();
    storage.Safe( ()=> {
        if ( storage.secret[type].access_token ) {
            Object.keys( storage.secret[type] ).forEach( item => service[item] = storage.secret[type][item] );
            type != "linnk" && ( noti = notify.Render({ content: `开始保存到 ${name}，请稍等...`, state: "loading" }));
            dtd.resolve( type );
        } else {
            auto ? notify.Render( `请先获取 ${name} 的授权，才能使用此功能！`, "授权", ()=>{
                notify.Clone().Render( [ "linnk", "jianguo", "youdao", "weizhi" ].includes( type ) ? `${name} 无法自动授权 3 秒后请自行授权。` : "3 秒钟后将会自动重新授权，请勿关闭此页面..." );
                setTimeout( ()=>browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.auth, { name: type } )), 3000 );
            }) : notify.Render( `请先获取 ${name} 的授权，才能使用此功能！` );
            dtd.reject( type );
        }
    });
    return dtd;
}

const dropbox  = new Dropbox(),
      pocket   = new Pocket(),
      instapaper = new Ins(),
      linnk    = new Linnk(),
      evernote = new Evernote(),
      onenote  = new Onenote(),
      gdrive   = new GDrive(),
      yuque    = new Yuque(),
      jianguo  = new Jianguo(),
      notion   = new Notion(),
      youdao   = new Youdao(),
      webdav   = new WebDAV(),
      weizhi   = new Wiz(),
      kindle   = new Kindle();

export {
    png      as PNG,
    pdf      as PDF,
    epub     as Epub,
    markdown as Markdown,
    download as Download,
    prueDownload as PrDownload,
    md2HTML  as MD2HTML,
    unlink   as Unlink,
    name     as Name,
    dropbox, pocket, instapaper, linnk, evernote, onenote, gdrive,yuque, jianguo, webdav, notion, youdao, weizhi,
    kindle,
    mdWrapper       as MDWrapper,
    serviceCallback as svcCbWrapper,
    verifyService   as VerifySvcWrapper,
} 