// Instapaper xAuth API for client side JS. Depends on cross-domain requests.
// Reference: <http://www.instapaper.com/api/full>
// xAuth documentation from Twitter: <https://dev.twitter.com/docs/oauth/xauth>
// With help from <https://gist.github.com/447636>

var jsSHA = require("./sha1");
var Instapaper, fixedEncodeURIComponent, qline2object;

Instapaper = (function() {
  class Instapaper {
    // ## Class Methods
    // ### Creates Nonce
    // > "The oauth_nonce parameter is a unique token your application should
    // generate for each unique request. Twitter will use this value to determine
    // whether a request has been submitted multiple times."
    // > <https://dev.twitter.com/docs/auth/authorizing-request>
    generateNonce() {
      var length, nonce;
      nonce = [];
      length = 5; // arbitrary - looks like a good length
      while (length > 0) {
        nonce.push((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
        length--;
      }
      return nonce.join("");
    }

    // UTC timestamp.
    getUTCtimestamp() {
      return (new Date((new Date).toUTCString())).getTime() / 1000;
    }

    // ### Creates 'header string' for 'Authorization' in HTTP header
    // cf. <https://dev.twitter.com/docs/auth/authorizing-request>
    authTemplate(req) {
      var auth;
      auth = `OAuth oauth_consumer_key="${fixedEncodeURIComponent(req.consumer_key)}", `;
      if (req.token != null) {
        auth += `oauth_token="${fixedEncodeURIComponent(req.token)}", `;
      }
      auth += `oauth_signature_method="HMAC-SHA1", oauth_signature="${fixedEncodeURIComponent(req.signature)}", oauth_timestamp="${fixedEncodeURIComponent(req.timestamp)}", oauth_nonce="${fixedEncodeURIComponent(req.nonce)}", oauth_version="1.0"`.trim();
      return auth;
    }

    // ### Creates 'Signature base string'
    // cf. <https://dev.twitter.com/docs/auth/creating-signature>
    sigBaseTemplate(req) {
      var i, j, len, param_helper, param_string, params, ref, sig;
      params = {
        oauth_consumer_key: req.consumer_key,
        oauth_nonce: req.nonce,
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: req.timestamp,
        oauth_version: '1.0'
      };
      if (req.token != null) {
        params.oauth_token = req.token;
      }
      if (req.data != null) {
        params = $.extend(params, req.data);
      }
      // Params string: sort object by key, then make querystring
      param_helper = [];
      ref = Object.keys(params).sort();
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        param_helper.push(`${fixedEncodeURIComponent(i)}=${fixedEncodeURIComponent(params[i])}`);
      }
      param_string = param_helper.join('&');
      sig = `POST&${fixedEncodeURIComponent(this.baseUrl + req.url)}&${fixedEncodeURIComponent(param_string)}`;
      return sig;
    }

    // ## General Methods
    makeSigningKey() {
      var key;
      key = this.consumer_secret + '&';
      if (this.token_secret != null) {
        key += this.token_secret;
      }
      return key;
    }

    // ### Create Signature for `authTemplate()`
    // Depends on HMAC-SHA1 from <http://caligatio.github.com/jsSHA/>
    makeSignature(req) {
      var hmacGen;
      hmacGen = new jsSHA(this.sigBaseTemplate(req), "TEXT");
      var hmac = hmacGen.getHMAC(this.makeSigningKey(), "TEXT", "SHA-1", "B64")
      return hmac;
    }

    // ### Creates `req`, an object with data specific for each request
    makeRequestObject(options) {
      var req;
      req = $.extend({
        consumer_key: this.consumer_key,
        consumer_secret: this.consumer_secret,
        nonce: this.generateNonce(),
        timestamp: this.getUTCtimestamp(),
        token: this.token,
        token_secret: this.token_secret,
        method: 'POST'
      }, options);
      // Add signature, depends on req data so far
      req.signature = this.makeSignature(req);
      return req;
    }

    // Creates new Ajax request
    // Always uses POST
    request(options) {
      var auth, req, settings;
      req = options.req || (options.req = this.makeRequestObject({
        url: options.url,
        data: options.data
      }));
      auth = this.authTemplate(options.req);
      settings = {
        url: `${this.baseUrl}${options.url}`,
        dataType: (function() {
          return options.dataType || "json";
        })(),
        type: 'POST',
        data: options.data,
        headers: {
          Authorization: auth
        }
      };
      if ( options.url == "bookmarks/add" ) {
        return settings;
      }
      return $.ajax(settings);
    }

    // ## Specific API Methods
    // ### Gets an OAuth access token for a user.
    // * Requires username and password
    // * Also needs HTTPS
    requestToken(user, password) {
      var data, tokening, url;
      if (!((user != null) && (password != null))) {
        throw 'Please provide username and password.';
      }
      this.user = user;
      url = "oauth/access_token";
      data = {
        x_auth_username: user,
        x_auth_password: password,
        x_auth_mode: "client_auth"
      };
      // Make Ajax request
      tokening = this.request({
        url: url,
        req: this.makeRequestObject({
          url: url,
          data: data
        }),
        data: data,
        dataType: 'text'
      });
      // Sucessful response looks like:
      // `oauth_token=aabbccdd&oauth_token_secret=efgh1234`
      tokening.done((response) => {
        // Uses `jline2object` (see below) to retrieve data from query string
        data = qline2object(response);
        // Save oauth tokens to instance variables
        this.token = data.oauth_token;
        return this.token_secret = data.oauth_token_secret;
      });
      // Please can for a failure case yourself!
      // `tokening.fail (jqXHR, textStatus, errorThrown) => ...`
      return tokening;
    }

    // ### Returns the currently logged in user.
    // `[{"type":"user","user_id":54321,"username":"TestUserOMGLOL"}]`
    verifyCredentials() {
      return this.request({
        url: "account/verify_credentials"
      });
    }

    // Example method
    // I won't add all the API stuff here, just do something like:
    //     insta = new Instapaper()
    //     insta.requestToken(username, password)
    //     insta.request(url: "bookmarks/list")
    bookmarkList() {
      return this.request({
        url: "bookmarks/list"
      });
    }

    add( url, title, description ) {
      return this.request({
        url: "bookmarks/add",
        data: {
          url,
          title,
          description
        }
      });
    }

  };

  // Always uses HTTPS
  Instapaper.prototype.baseUrl = "https://www.instapaper.com/api/1/";

  // Application keys for this application
  Instapaper.prototype.consumer_key = 'SECRET';

  Instapaper.prototype.consumer_secret = 'TOPSECRET';

  return Instapaper;

})();

if (typeof module !== "undefined" && module !== null) {
  module.exports = Instapaper;
}

// Helper function to transform querystring/qline to JS object
// Insanely fast: <http://jsperf.com/query-str-parsing-regex-vs-split/5>
qline2object = function(query = "") {
  var item, j, len, parts, result;
  result = {};
  parts = query.split("&");
  for (j = 0, len = parts.length; j < len; j++) {
    item = parts[j];
    item = item.split("=");
    result[item[0]] = item[1];
  }
  return result;
};

// native encodeURIComponent isn't sufficient here
// from <https://gist.github.com/447636>
fixedEncodeURIComponent = function(str) {
  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');
};
