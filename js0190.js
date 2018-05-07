(function () {
    'use strict';

    var script = document.createElement("script"),
        script_src = "https://cdn.bootcss.com/script.js/2.5.8/script.min.js",
        jq_src = "https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js",
        puread_src = "https://greasyfork.org/scripts/39995-pureread/code/PureRead.js",
        notify_src = "https://greasyfork.org/scripts/40236-notify/code/Notify.js",
        puplugin_src = "https://greasyfork.org/scripts/39997-puplugin/code/PuPlugin.js",
        mduikit_src = "https://greasyfork.org/scripts/40244-mduikit/code/MDUIKit.js",
        json = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/website_list_v3.json";

    var notif_style = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/notify.css",
        main_style = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/simpread.css",
        user_style = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/simpread_user.css",
        option_style = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/option.css",
        theme_common = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/theme_common.css",
        theme_gothic = "https://raw.githubusercontent.com/kenshin/simpread-little/develop/src/jsbox/res/theme_gothic.css";

    script.type = "text/javascript";
    script.src = script_src;
    script.onload = function () {
        $script(jq_src, function () {
            $.get(notif_style, function (result) {
                $("head").append("<style type=\"text/css\">" + result + "</style>");
            });
            $.get(main_style, function (result) {
                $("head").append("<style type=\"text/css\">" + result + "</style>");
            });
            $.get(option_style, function (result) {
                $("head").append("<style type=\"text/css\">" + result + "</style>");
            });
            $.get(user_style, function (result) {
                $("head").append("<style type=\"text/css\">" + result + "</style>");
            });
            $.get(theme_common, function (result) {
                $("head").append("<style type=\"text/css\">" + result + "</style>");
            });
            $script([puread_src, notify_src, puplugin_src, mduikit_src], "bundle");
            $script.ready("bundle", function () {
                $.getJSON(json, function (result) {
                    var pr = new PureRead();
                    pr.Addsites(result);
                    pr.AddPlugin(puplugin.Plugin());
                    pr.Getsites();
                    readMode(pr, puplugin, $);
                });
            });
        });
    };
    document.body.appendChild(script);

    /**
     * Read mode
     */
    function readMode(pr, puplugin, $) {
        var $root = $("html"),
            bgtmpl = "<div class=\"simpread-read-root\">\n                        <sr-read style=\"padding: 0 50px;\">\n                            <sr-rd-title></sr-rd-title>\n                            <sr-rd-desc></sr-rd-desc>\n                            <sr-rd-content></sr-rd-content>\n                            <sr-page></sr-page>\n                            <sr-rd-footer>\n                                <sr-rd-footer-text style=\"display:none;\">\u5168\u6587\u5B8C</sr-rd-footer-text>\n                                <sr-rd-footer-copywrite>\n                                    <span>\u672C\u6587\u7531 \u7B80\u60A6 </span><a href=\"http://ksria.com/simpread\" target=\"_blank\">SimpRead</a><span> \u4F18\u5316\uFF0C\u7528\u4EE5\u63D0\u5347\u9605\u8BFB\u4F53\u9A8C\u3002</span>\n                                </sr-rd-footer-copywrite>\n                                </sr-rd-footer>\n                            <sr-rd-crlbar>\n                                <fab class=\"crlbar-close\"></fab>\n                            </sr-rd-crlbar>\n                        </sr-read>\n                    </div>",
            multiple = function multiple(include, avatar) {
            var contents = [],
                names = avatar[0].name,
                urls = avatar[1].url;
            include.each(function (idx, item) {
                var art = {};
                art.name = $(names[idx]).text();
                art.url = $(urls[idx]).attr("src");
                art.content = $(item).html();
                !art.url && (art.url = default_src);
                contents.push(art);
            });
            var child = contents.map(function (item) {
                return "<sr-rd-mult>\n                            <sr-rd-mult-avatar>\n                                <div class=\"sr-rd-content-nobeautify\"><img src=" + item.url + " /></div>\n                                <span>" + item.name + "</span>\n                            </sr-rd-mult-avatar>\n                            <sr-rd-mult-content>" + item.content + "</sr-rd-mult-content>\n                    </sr-rd-mult>";
            });
            $("sr-rd-content").html(child);
        },
            paging = function paging(page) {
            var prev = page[0].prev,
                next = page[1].next,
                btn_next = mduikit.Button("btn-next", "后一页 →", { href: next == undefined ? "javascript:;" : next, disable: next == undefined ? true : false, color: "#fff", bgColor: "#1976D2" }),
                btn_prev = mduikit.Button("btn-prev", "← 前一页", { href: prev == undefined ? "javascript:;" : prev, disable: prev == undefined ? true : false, color: "#fff", bgColor: "#1976D2" });
            if (!prev && !next) $("sr-page").remove();else $("sr-page").html(btn_prev + btn_next);
        },
            special = function special() {
            if (pr.html.include.includes && pr.html.include.includes("sr-rd-content-error")) {
                new Notify().Render("\u5F53\u524D\u9875\u9762\u7ED3\u6784\u6539\u53D8\u5BFC\u81F4\u4E0D\u5339\u914D\u9605\u8BFB\u6A21\u5F0F\uFF0C\u8BF7\u62A5\u544A <a href=\"https://github.com/Kenshin/simpread/issues/new\" target=\"_blank\">\u6B64\u9875\u9762</a>");
                return true;
            }
        };

        pr.ReadMode();

        if (special()) return;

        $("body").addClass("simpread-hidden");
        $root.addClass("simpread-font").addClass("simpread-theme-root").append(bgtmpl);

        $(".simpread-read-root").addClass("simpread-theme-root").animate({ opacity: 1 }, { delay: 100 }).addClass("simpread-read-root-show");

        $("sr-rd-title").html(pr.html.title);
        if (pr.html.desc != "") $("sr-rd-desc").html(pr.html.desc);else $("sr-rd-desc").remove();
        if (pr.html.avatar) multiple(pr.html.include, pr.html.avatar);else $("sr-rd-content").html(pr.html.include);
        if (pr.html.paging) paging(pr.html.paging);else $("sr-page").remove();

        $("sr-rd-content").find(pr.Exclude($("sr-rd-content"))).remove();
        pr.Beautify($("sr-rd-content"));
        pr.Format("simpread-read-root");

        $.get(theme_gothic, function (result) {
            $("head").append("<style type=\"text/css\">" + result + "</style>");
        });
        //style.FontFamily( simpread.read.fontfamily );
        //style.FontSize(   simpread.read.fontsize   );
        //style.Layout(     simpread.read.layout     );
        puplugin.Plugin("style").FontSize("62.5%");

        // exit
        $(".simpread-read-root sr-rd-crlbar fab").one("click", function (event) {
            $(".simpread-read-root").addClass("simpread-read-root-hide");
            $root.removeClass("simpread-theme-root").removeClass("simpread-font");
            if ($root.attr("style")) $root.attr("style", $root.attr("style").replace("font-size: 62.5%!important", ""));
            $("body").removeClass("simpread-hidden");
            $(".simpread-read-root").remove();
        });
    }

}());
