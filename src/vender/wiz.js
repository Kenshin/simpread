/**
 * Soure from https://github.com/xcffl/WizWebClipperWE
 */

var Base64 = {
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    // public method for encoding
    encode : function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
    },
    // private method for UTF-8 encoding
    _utf8_encode : function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }
};

var wiz_base64Encode = function( str ) {
    var scriptFilter = function (html) {
        return html.replace(/<script[^<>]*\/>/ig, "").replace(/<script[^<>]*>(((?!<\/script>).)|(\r?\n))*<\/script>/ig, "");
    };
    if (!str || str.length < 1) {
        return "";
    }
    var base64str = Base64.encode(scriptFilter(str));
    return base64str;
}

var genGuid = function() {
    return (genGuidItem() + genGuidItem() + "-" + genGuidItem() + "-" + genGuidItem() + "-" + genGuidItem() + "-" + genGuidItem() + genGuidItem() + genGuidItem());
}

var genGuidItem = function() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function getParams( url, title, htmlStr ) {
    var params       = "";
    var docType      = document.doctype;
    var source_url   = wiz_base64Encode( url );
    var source_html  = "";
    var source_title = wiz_base64Encode( title );

    if (!!docType && !!docType.systemId && !!docType.publicId) {
        docType = '<!DOCTYPE HTML PUBLIC "' + docType.publicId + '" "' + docType.systemId + '" >';
    } else {
        docType = '<!DOCTYPE HTML>';
    }
    source_html = wiz_base64Encode( docType + htmlStr );

    params  = "param-location='" + source_url   + "' ";
    params += "param-title='"    + source_title + "' ";

    params += "0_FrameURL='"     + source_url   + "' ";
    params += "0_FrameHtml='"    + source_html  + "' ";

    params = "param-fcount='1' " + params;

    return params;
}

function getInfos( info, access_token ) {
    var docGuid = genGuid();

    info.params = info.params + ' save-command="' + info.cmd + '" userid="' + info.userid +
                  '" location="' + wiz_base64Encode(info.category) + '" comment="' + wiz_base64Encode('')  +
                  '" tag="' + wiz_base64Encode(info.tag) + '"';

    info.params = "myWiz='" + access_token + "@userguid' SaveResources='true' document_guid='" + docGuid + "' " + info.params;
    var params = {
        type    : 'clipper',
        data    : info.params,
        customId: docGuid
    };
    return params;
}

if ( typeof module !== 'undefined' ) {
    module.exports = {
        getParams: getParams,
        getInfos : getInfos,
    };
}