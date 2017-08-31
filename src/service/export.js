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
              base64 = "data:text/plain;charset=utf-8," + encodeURIComponent( md );
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

/**
 * Dis contented serice
 * 
 * @param {string} service id 
 */
function unlink( id ) {
    const content = {
        "dropbox" : "https://www.dropbox.com/account/connected_apps",
        "pocket"  : "https://getpocket.com/connected_applications",
        "evernote": "https://www.evernote.com/AuthorizedServices.action",
        "yinxiang": "https://app.yinxiang.com/AuthorizedServices.action",
        "onenote" : "https://account.live.com/consent/Manage",
        "gdrive"  : "https://drive.google.com/drive/my-drive",
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
            callback( "write", undefined, error.toLowerCase().startsWith( "invalid_access_token" ) ? `${ name("dropbox") } 授权过期，请重新授权。` : "error" );
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
            callback( undefined, error.toLowerCase() == "unauthorized" ? `${ name("pocket") } 授权过期，请重新授权。` : "error" );
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
        };

        $.ajax({
            url     : "https://linnk.net/a/api/bookmark/new",
            type    : "POST",
            headers : { Authorization: this.access_token },
            data,
        }).done( ( result, textStatus, jqXHR ) => {
            const data = JSON.parse(result);
            if ( data && data.code == 200 ) callback( "success", undefined );
            else callback( undefined, "error" );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    Groups( callback ) {
        $.ajax({
            url     : "https://linnk.net/a/api/group/my",
            type    : "GET",
            headers : { Authorization: this.access_token },
        }).done( ( result, textStatus, jqXHR ) => {
            callback( JSON.parse(result), undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    GetGroup( name, target ) {
        const group = target.find( obj => obj.groupName == name );
        this.group_name = group.groupName;
        return group;
    }

    NewGroup( name, callback ) {
        $.ajax({
            url     : "https://linnk.net/a/api/group/new",
            type    : "POST",
            headers : { Authorization: this.access_token },
            data    : { groupName: name },
        }).done( ( result, textStatus, jqXHR ) => {
            callback( JSON.parse(result), undefined );
        }).fail( ( jqXHR, textStatus, error ) => {
            console.error( jqXHR, textStatus, error )
            callback( undefined, textStatus );
        });
    }

    GetSafeGroup( name, callback ) {
        this.Groups( result => {
            if ( result && result.code == 200 ) {
                const group = this.GetGroup( name, result.data );
                !group && this.NewGroup( name, callback );
                group  && callback({ data: group, code: 200 }, undefined );
            } else {
                callback( undefined, "error" );
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
            callback( undefined, error.toLowerCase() == "unauthorized" ? `${ name("onenote") } 授权过期，请重新授权。` : "error" );
        });
    }
}

/**
 * Onenote
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
            401: `${ name("gdrive") } 授权过期，请重新授权。`,
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
        return "http://fivefilters.org/kindle-it/send.php";
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
    if ( [ "dropbox", "pocket", "linnk" , "evernote", "onenote" ].includes( type ) ) {
        return type.replace( /\S/i, $0=>$0.toUpperCase() );
    } else if ( type == "yinxiang" ) {
        return "印象笔记";
    } else if ( type == "gdrive" ) {
        return "Google 云端硬盘";
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
 * Service callback wrapper
 * 
 * @param {string} result
 * @param {string} error
 * @param {string} name
 * @param {object} notify
 */
function serviceCallback( result, error, name, notify ) {
    !error && notify.Render( `已成功保存到 ${name}！` );
    error  && notify.Render( 2, error == "error" ? "保存失败，请稍后重新再试。" : error );
}

/**
 * Verify service wrapper
 * 
 * @param  {object} storage object
 * @param  {object} service object
 * @param  {string} service type
 * @param  {string} service name
 * @param  {object} notify
 * @return {promise} promise
 */
function verifyService( storage, service, type, name, notify ) {
    const dtd = $.Deferred();
    storage.Safe( ()=> {
        if ( storage.secret[type].access_token ) {
            Object.keys( storage.secret[type] ).forEach( item => service[item] = storage.secret[type][item] );
            notify.Render( `开始保存到 ${name}，请稍等...` );
            dtd.resolve( type );
        } else {
            notify.Render( `请先获取 ${name} 的授权，才能使用此功能！`, "授权", ()=>{
                browser.runtime.sendMessage( msg.Add( msg.MESSAGE_ACTION.new_tab, { url: browser.extension.getURL( "options/options.html#labs" ) } ));
            });
            dtd.reject( type );
        }
    });
    return dtd;
}

const dropbox  = new Dropbox(),
      pocket   = new Pocket(),
      linnk    = new Linnk(),
      evernote = new Evernote(),
      onenote  = new Onenote(),
      gdrive   = new GDrive(),
      kindle   = new Kindle();

export {
    png      as PNG,
    pdf      as PDF,
    markdown as Markdown,
    download as Download,
    unlink   as Unlink,
    name     as Name,
    dropbox, pocket, linnk, evernote, onenote, gdrive,
    kindle,
    mdWrapper       as MDWrapper,
    serviceCallback as svcCbWrapper,
    verifyService   as VerifySvcWrapper,
}