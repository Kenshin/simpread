!function(a){function n(i){if(s[i])return s[i].exports;var t=s[i]={exports:{},id:i,loaded:!1};return a[i].call(t.exports,t,t.exports,n),t.loaded=!0,t.exports}var s={};return n.m=a,n.c=s,n.p="",n(0)}([function(a,n,s){a.exports=s(1)},function(a,n,s){"use strict";function i(){$("body").on("click",".download .online, .install .now, .account .update",function(){location.pathname.endsWith("pro.html")?location.href="https://simpread.pro/price.html":$(".downloads")[0].scrollIntoView({behavior:"smooth",block:"start",inline:"start"})})}function t(){$(".main .feature.puread .mode .label").on("click",function(a){$(".main .feature.puread .mode .label").removeClass("active").find(".sub").removeClass("active"),$(a.currentTarget).addClass("active").find(".sub").addClass("active"),$(".main .feature.puread .videos img").removeClass("active"),$(".main .feature.puread .videos img[data-type="+$(a.currentTarget).attr("data-type")+"]").addClass("active")}),["/","/simpread/"].includes(location.pathname)&&setTimeout(function(){return $(".main .group.jsbox img").attr("src",$(".main .group.jsbox img").attr("data-src"))},400),location.pathname.endsWith("pro.html")&&$(".pro.install").css({display:"none"})}function e(){var a='<li class="nav-pro"><a href="https://simpread.pro/pro.html"><i class="fas fa-highlighter"></i> 简悦 2.0</a></li>\n                  <li class="nav-ios"><a href="https://simpread.pro/#jsbox"><i class="fab fa-apple"></i> iOS</a></li>\n                  <li class="nav-lite"><a href="https://simpread.pro/#synchelper"><i class="fas fa-desktop"></i> 同步助手</a></li>\n                  <li class="nav-plugin"><a href="https://simpread.ksria.cn/plugins"><i class="fas fa-plug"></i> 插件中心</a></li>\n                  <li class="nav-docs"><a href="https://simpread.pro/subscribe" target="_blank"><i class="fas fa-rss"></i> 订阅中心</a></li>\n                  <li class="nav-docs"><a href="https://simpread.pro/help" target="_blank"><i class="fas fa-question-circle"></i> 帮助中心</a></li>\n                  <li class="nav-changelog"><a href="https://n.simp.red/" target="_blank"><i class="fas fa-bullhorn"></i> 更新日志</a></li>\n                  <div class="hamburger hamburger--elastic"><div class="hamburger-box"><div class="hamburger-inner"></div></div></div>';["/","/simpread/"].includes(location.pathname)?($(".top .nav-ios     a").on("click",function(){return $(".jsbox")[0].scrollIntoView({behavior:"smooth",block:"start",inline:"start"})}),$(".top .nav-lite    a").on("click",function(){return $(".lite")[0].scrollIntoView({behavior:"smooth",block:"start",inline:"start"})}),$(".top .nav-feature a").on("click",function(){return $("#feature")[0].scrollIntoView({behavior:"smooth",block:"start",inline:"start"})})):$("ul.navigator").html(a),location.pathname.endsWith("pro.html")&&$(".navigator .nav-pro").html('<a href="https://simpread.pro/price.html"><i class="fas fa-user-alt"></i> 高级账户</a>'),$(document).scroll(function(){$("body").scrollTop()>0?!$(".top").hasClass("scroll")&&$(".top").addClass("scroll"):$(".top").hasClass("scroll")&&$(".top").removeClass("scroll")})}function r(){if(location.pathname.endsWith("price.html")||b.verify())return void $(".navigator .hamburger").remove();var a='<div class="menu-bg">\n                    <div class="menu">\n                        <div class="menuitem">\n                            <div class="title"><a href="https://simpread.ksria.cn/plugins">插件中心 <i class="fas fa-external-link-square-alt"></i></a></div>\n                            <div class="links">\n                                <div class="link">\n                                    <a href="https://github.com/Kenshin/simpread/issues/500" target="_blank">代码块增强 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>包括：高亮，去重；支持 CSDN 等特殊情况的代码段</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://simpread.ksria.cn/plugins/details/3PHAZerSkb" target="_blank">页面信息统计 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>包括：英文单词，段落，汉字个数，阅读时间，阅读进度的统计</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://simpread.ksria.cn/plugins/details/NupOHRQHZ2" target="_blank">划词搜索 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>内置多种搜索引擎</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://simpread.ksria.cn/plugins/details/Y7JxbP7B4H" target="_blank">全文翻译 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>可将页面内的正文逐段翻译为英文</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="menuitem">\n                            <div class="title"><a href="https://simpread.pro/help" target="_blank">帮助中心 <i class="fas fa-external-link-square-alt"></i></a></div>\n                            <div class="links">\n                                <div class="link">\n                                    <a href="http://ksria.com/simpread/guide/" target="_blank">新手入门 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>互动式新手入门</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://simpread.pro/docs/#/" target="_blank">文档中心 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>关于简悦的全部功能介绍</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://github.com/Kenshin/simpread/discussions/categories/使用技巧" target="_blank">使用技巧 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>关于简悦的一些使用技巧汇总</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://github.com/Kenshin/simpread/discussions/categories/高级账户" target="_blank">高级账户相关问题 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>绑定 · 授权当前设备 · 如何登录其它设备等问题</span>\n                                </div>\n                            </div>\n                        </div>\n                        <div class="menuitem">\n                            <div class="title">媒体报道 <i class="fas fa-external-link-square-alt"></i></div>\n                            <div class="links">\n                                <div class="link">\n                                    <a href="https://sspai.com/post/52492" target="_blank">少数派 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>不只是「完美」阅读模式，他想用这款阅读工具帮你更好获取知识：专访简悦</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://www.ifanr.com/app/1240289" target="_blank">爱范儿 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>专访《简悦》：改善 318 类网站，只为做最好的「阅读模式」</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://www.waerfa.com/simpread-review" target="_blank">玩儿法 <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>简悦：无干扰的沉浸式阅读体验</span>\n                                </div>\n                                <div class="link">\n                                    <a href="https://zhuanlan.zhihu.com/p/60222691" target="_blank">GitHub Daily <i class="fas fa-long-arrow-alt-right"></i></a>\n                                    <span>如何在开源的同时斩获 Chrome 商城 40000+ 用户</span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                  </div>';$(".top").append('<nav class="menubar"></nav>'),$(".navigator .hamburger").on("click",function(n){$(n.currentTarget).hasClass("is-active")?($(".main, .header .download").css({opacity:1,"pointer-events":"initial"}),$(".top .menubar").empty()):($(".top .menubar").html(a),$(".header .title, .header .desc, .header .download, .header .introduce img").css({"animation-fill-mode":"none"}),$(".header .download").css({opacity:0,"pointer-events":"none"}),setTimeout(function(){$(".menu-bg .menu").addClass("open"),$(".main").css("opacity",0)},200)),$(".top .hamburger").toggleClass("active"),$(".top .menubar").toggleClass("active"),$(n.currentTarget).toggleClass("is-active")})}function o(){if(["/","/simpread/","/simpread/pro.html","/pro.html"].includes(location.pathname)){var a='<div class="title">简于型 · 悦于心</div>\n                    <div class="desc">简悦 - 为你提供「如杂志般沉浸式阅读体验」的扩展</div>\n                    <div class="download">\n                        <a class="online"><span>免费使用</span></a>\n                        <div class="stars">\n                            <span><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>\n                            <span>based on 500K+ users</span>\n                        </div>\n                    </div>\n                    <div class="introduce">\n                        <img style="height: 500px;"></img>\n                  </div>',n=function(){var a=$(".top").height(),n=754,s=$(".introduce img").height(),i=$(".header .title")[0].offsetHeight,t=$(".header .desc")[0].offsetHeight,e=$(".header .download")[0].offsetHeight,r=document.body.clientHeight,o=document.body.clientWidth,l=location.pathname.endsWith("pro.html")?"-pro":"";$(".introduce img").attr("src","./assets/images/introduce"+l+".png").on("load",function(){if($(".introduce img").addClass("active"),setTimeout(function(){return f()},2e3),r>a+n){var i=r-a-n;$(".header").height(r-a+(location.pathname.endsWith("pro.html")?10:0)),location.pathname.endsWith("pro.html")?$(".introduce img").height(s+i<=630?s+i:630):$(".introduce img").height(s+i<=650?s+i:650)}else $(".header").height(n)}),setTimeout(function(){$(".introduce img").width()>o&&($(".introduce img").css({height:"auto","max-width":"80%"}),setTimeout(function(){$(".header").height(i+t+e+$(".introduce").height())},200))},200)};if(b.verify()){$(".header").css({transition:"none",height:754}),$(".header .loading").length>0&&$(".header").html(a);var s=location.pathname.endsWith("pro.html")?"-pro":"";return $(".introduce img").addClass("active").attr("src","./assets/images/introduce"+s+".png"),void f()}location.pathname.endsWith("pro.html")?setTimeout(function(){$(".header").css("position","initial"),n()},100):setTimeout(function(){$(".header").html(a).css("position","initial"),setTimeout(function(){return n()},100)},2e3)}}function l(){if(location.pathname.endsWith("changelog.html")){var a="";$(".version .num a").map(function(n,s){var i=$(s),t=i.attr("name"),e=i.html();a+='<div class="outline" data-id="'+t+'">'+e+"</div>"}),$(".toc").append(a),$(".toc-header .collapse").on("click",function(a){$(".toc").slideToggle()}),$(".toc .outline").on("click",function(a){$(".num").find('a[name="'+a.currentTarget.dataset.id+'"]')[0].scrollIntoView({block:"end"})}),$(".version .num").map(function(a,n){0==a&&$(n).append('<span class="collapse"><i class="fas fa-angle-up"></i></span>'),a>0&&$(n).append('<span class="collapse active"><i class="fas fa-angle-up"></i></span>')}),$(".versions .collapse").on("click",function(a){$(a.currentTarget).toggleClass("active").parent().next().slideToggle()})}}function c(){["/","/simpread/"].includes(location.pathname)&&new Swiper(".swiper-container",{pagination:{el:".swiper-pagination",loop:!0,clickable:!0,dynamicBullets:!0}})}function p(){location.pathname.endsWith("privacy.html")&&$(".languages ul.nav a").on("click",function(a){var n=$(a.currentTarget),s=n.attr("aria-controls");$(".languages ul.nav a").attr("aria-expanded",!1),n.attr("aria-expanded",!0),n.parent().parent().find("li").removeClass("active"),n.parent().addClass("active"),$(".tab-pane").removeClass("active"),$(".tab-content").find("#"+s).addClass("active")})}function d(){if(location.pathname.endsWith("/price.html")){var a=function(a){return'<span class="sales">\n                    <span class="desc"><del>¥ '+a.price+'</del></span>\n                    <span class="price">¥ '+parseInt(a.price*a.discountRate)+'</span>\n                    <span class="countdown"><span class="message">'+a.countDown+"</span></span>\n                </span>"},n=function(a){return'<div class="floating">\n                    <span class="billing">\n                        <span>马上升级</span>\n                        <span class="sales"><span class="rate">'+("立省 "+(100-100*a.discountRate)+"%")+"</span><del>¥ "+a.price+'</del><span class="price">¥ '+parseInt(a.price*a.discountRate)+"</span></span>\n                    </span>\n                </div>"},s=function(a){return'<span class="discountrate"><span class="rate">'+("立省 "+(100-100*a)+"%")+"</span></span>"},i=function(a){var n="";return a.map(function(a){var s=a.tips?'<span class="tips">'+a.tips+"</span>":"";n+='<a class="store md-waves-effect" href='+a.link+' target="_blank">\n                            <img class="icon" src='+a.icon+'></img>\n                            <span class="names">\n                                <span class="name">'+a.site+'</span>\n                                <span class="des">'+a.desc+'</span>\n                            </span>\n                            <span class="num">'+(a.price+" 起")+" "+s+'</span>\n                            <i class="fas fa-sort-down"></i>\n                        </a>'}),'<div class="dropdown-price">\n                    '+n+"\n                </div>"},t=function(a){var n="";return a.map(function(a){var s="";a.items&&a.items.map(function(a){if(""==a)s+='<div class="function empty"></div>';else{var n=a.endsWith("::feature")?'<span class="remark">即刻推出</span>':a.endsWith("::roadmap")?'<span class="remark roadmap">马上到来</span>':"";a=a.replace(/::\w+/gi,""),s+='<div class="function sub">\n                                <span class="icon"></span>\n                                <span class="label">'+a+n+"</span>\n                            </div>"}}),n+='<div>\n                        <div class="function">\n                            <span class="icon"><i class="fas fa-'+a.icon+'"></i></span>\n                            <span class="label"><a class='+(a.link?"active":"")+" href="+(a.link?a.link:"#")+' target="_blank">'+a.name+"</a></span>\n                        </div>\n                        "+s+"\n                    </div>"}),'<div class="functions diff">\n                    '+n+"\n                </div>"},e=function(){var a='<svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">\n                            <path fill="#333" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" transform="rotate(56.1481 50 50)">\n                                <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform>\n                            </path>\n                      </svg>';$(".upgrade .loading").html(a)};$(document).on("scroll",function(){$(document).scrollTop()>230?$(".pricepage .floating .billing").addClass("open"):$(".pricepage .floating .billing").removeClass("open")}),e(),$.ajax({url:"https://simpread.ksria.cn/sales/service/get/",method:"POST"}).done(function(e,r,o){if(e&&201==e.code){$(".upgrade").find(".loading").remove();var l=t(e.data.base),c=t(e.data.pro),p=i(e.data.stores),d=a(e.data),h=s(e.data.discountRate),m=n(e.data);$(".base .functions").replaceWith(l),$(".pro .functions").replaceWith(c),$(".pro .pricecard .sales").replaceWith(d),$(".pro .pricecard .discountrate").replaceWith(h),$(".pro .pricecard .billing").append(p),$(".pricepage").append(m),$(".floating .billing").on("click",function(){$(".pro .pricecard")[0].scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}),Waves.init(),Waves.attach($(".floating .billing")[0],[]),Waves.attach($(".base .billing")[0],[])}else $(".upgrade .loading").addClass("error").html('<img src="https://simpread-1254315611.file.myqcloud.com/static/503.png"/>价格获取出现了些问题，稍后再试。')}).fail(function(a){$(".upgrade .loading").addClass("error").html('<img src="https://simpread-1254315611.file.myqcloud.com/static/503.png"/>价格获取出现了些问题，稍后再试。')})}}function h(){var a='<div class="groups">\n                    <div class="links">\n                        <a href="https://simpread.pro" class="logo"><span></span></a>\n                        <ul>\n                            <li><a class="social" target="_blank" href="http://service.weibo.com/share/share.php?url=https://simpread.pro&title=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&pic=https://simpread.pro/assets/image/introduce.png"><i class="fab fa-weibo"></i></a></li>\n                            <li><a class="social" target="_blank" href="https://twitter.com/intent/tweet?via=wanglei001&amp;text=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&amp;url=https://simpread.pro"><i class="fab fa-twitter"></i></a></li>\n                            <li><a class="social" target="_blank" href="https://www.facebook.com/dialog/feed?app_id=1528743474024441&link=https://simpread.pro&picture=http://simpread.qiniudn.com/introduce.png&name=simpread&description=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&redirect_uri=https://simpread.pro"><i class="fab fa-facebook-f"></i></a></li>\n                            <li><a class="social" target="_blank" href="https://t.me/simpread"><i class="fab fa-telegram-plane"></i></a></li>\n                        </ul>\n                    </div>\n                    <div class="links">\n                        <h1>支持</h1>\n                        <a href="https://n.simp.red/">更新日志</a>\n                        <a href="https://simpread.pro/docs/#/" target="_blank">帮助</a>\n                        <a href="https://simpread.pro/docs/#/入门指南（-操作指引-）" target="_blank">新手入门</a>\n                        <a href="https://github.com/kenshin/simpread/issues" target="_blank">反馈</a>\n                    </div>\n                    <div class="links">\n                        <h1>关于</h1>\n                        <a href="http://kenshin.wang" target="_blank">关于作者</a>\n                        <a href="http://weibo.com/23784148" target="_blank">微博</a>\n                    </div>\n                    <div class="links">\n                        <h1>产品</h1>\n                        <a href="http://ksria.com/simptab" target="_blank">简 Tab - 极简的 Chrome 新标签页扩展</a>\n                        <a href="http://ksria.com/gnvm" target="_blank">GNVM - 使用 Go 语言编写的 Node.js 多版本管理器</a>\n                        <a href="http://ksria.com/emoji" target="_blank">+Emoji - 简单、可靠、纯粹的中文语义化 Emoji 扩展</a>\n                        <a href="http://ksria.com/sov2ex" target="_blank">sov2ex - 一个便捷的 v2ex 站内搜索引擎</a>\n                    </div>\n                </div>\n                <div class="copywrite">\n                    <span>简悦 SimpRead - 如杂志般沉浸式阅读体验的扩展</span> <span>&nbsp;©&nbsp;2017 ~ 2020 <a href="https://simpread.pro">simpread.pro</a> by <a href="http://kenshin.wang" target="_blank">Kenshin Wang</a></span>\n                    <div class="beian"><a href="http://www.beian.miit.gov.cn/" target="_blank">黑ICP备20004299号</a></div>\n                </div>';$(".footer").html(a),!["/","/simpread/"].includes(location.pathname)&&0==$(".undefined.auth").length&&$(".undefined").length>0&&document.body.clientHeight>$(".top").height()+$(".undefined").height()+$(".footer").height()&$(".footer").addClass("fixed")}function m(){["/","/simpread/","/simpread/pro.html","/pro.html"].includes(location.pathname)&&(Waves.init(),$(".feature .snapshot img.image").map(function(a,n){return Waves.attach($(n)[0],["waves-image"])}),$(".profeature img").map(function(a,n){return Waves.attach($(n)[0],["waves-image"])}),$(".group.productive .icons .icon, .group.plugins .icons .icon").map(function(a,n){return Waves.attach($(n)[0],["waves-circle","waves-float","waves-light"])}),Waves.attach($(".download .online")[0],["waves-button"]),Waves.attach($("a.userscript")[0],["waves-button"]),Waves.attach($(".install .now")[0],[]),Waves.attach($(".account .update")[0],["waves-block"]),$(".jsbox-platform a").map(function(a,n){return Waves.attach($(n)[0],["waves-button"])}),$(".group.browser .platform a").map(function(a,n){return Waves.attach($(n)[0],["waves-block"])}),$(".group.feature.all .only").map(function(a,n){return Waves.attach($(n)[0],["waves-block"])}),$(".media .company a").map(function(a,n){return Waves.attach($(n)[0],["waves-block"])}))}function u(){["/","/simpread/","/simpread/pro.html","/pro.html"].includes(location.pathname)&&AOS.init()}function f(){if(["/","/simpread/"].includes(location.pathname)){var a=function(){var a=10;$("body").append('<div class="welcome-gp">\n                                <div class="welcome">\n                                    <span class="close"><i class="fas fa-times"></i></span>\n                                    <div class="countdown">\n                                        <a class="open" href="pro.html">点击马上查看，倒计时 <count>'+a+"</count> 秒后自动跳转...</a>\n                                    </div>\n                                </div>\n                            </div>"),$(".welcome .close").on("click",function(){$(".welcome").addClass("exit").on("animationend",function(){$(".welcome-gp").remove()})});var n=new Image;n.onload=function(){$(".welcome").prepend(n),setInterval(function(){$(".welcome count").text(--a),0==a&&$(".welcome .countdown .open")[0].click()},1e3)},n.src="./assets/images/welcome-pro.png?2342323"},n=localStorage.getItem("simpread-version");n?n!=g&&(a(),localStorage.setItem("simpread-version",g)):(a(),localStorage.setItem("simpread-version",g))}}function v(){"ksria.com"==location.hostname&&!function(){var a=location.href.replace("http://ksria.com/simpread","https://simpread.pro");$(".top").addClass("bottom"),$("body").append('<div class="simpreadpro">嗨 👋 请访问&nbsp;👉&nbsp;<a target="_blank" href="'+a+'"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M-664.554667 249.408" fill="#195bf7" p-id="4256"></path><path d="M-664.554667 249.408" p-id="4257" fill="#195bf7"></path><path d="M829.781333 960l-211.861333 0c-12.074667 0-21.866667-9.770667-21.866667-21.866667L596.053333 642.218667l-168.128 0 0 295.936c0 12.074667-9.770667 21.866667-21.866667 21.866667L194.218667 960.021333c-55.168 0-74.816-38.656-74.816-74.816L119.402667 589.248 52.693333 589.248c-21.482667 0-35.285333-6.933333-41.088-20.629333-8.64-20.394667 7.317333-40.661333 22.208-56.064L459.050667 86.912C472.448 73.024 491.029333 64.789333 511.146667 64c21.866667 0.789333 40.469333 9.024 54.122667 23.210667L989.866667 512.277333c15.146667 15.68 31.168 35.968 22.549333 56.362667-5.802667 13.674667-19.648 20.629333-41.109333 20.629333l-66.688 0 0 295.936C904.618667 921.344 884.949333 960 829.781333 960z" fill="#195bf7"></path></svg>&nbsp;速度更快的官网</a> <span class="countdown">5</span> 秒中后自动跳转</div>'),setInterval(function(){var n=$(".simpreadpro").find(".countdown").text();"1"==n?location.href=a:$(".simpreadpro").find(".countdown").text(parseInt(n)-1)},1e3)}()}s(2);var g="2.0.0",b={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},verify:function(){return null!=(b.Android()||b.BlackBerry()||b.iOS()||b.Opera()||b.Windows())}};b.verify()&&$("link#aos").remove(),$(document).ready(function(){u(),i(),t(),e(),r(),o(),c(),d(),l(),p(),h(),m(),v()}),$(window).resize(function(){return o()})},function(a,n){}]);
