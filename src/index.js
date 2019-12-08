// import css
import 'hamburgers'
import 'main';

/**
 * mobile verify
 */
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    verify: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) == null ? false : true;
    }
};

// main
$( document ).ready( function() {
    downloadRender();
    navRender();
    menubarRender();
    headerRender();
    reviewsRender();
    footerRender();
    analyticsRender();
});

// global event
$(window).resize( () => headerRender() );

function downloadRender() {
    $( '.download .online' ).on( 'click', () => $( '.downloads' )[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }) );
}

function navRender() {
    const html = `<li class="nav-home"><a href="http://ksria.com/simpread/"><i class="fas fa-home"></i> 官网</a></li>
                  <li class="nav-ios"><a href="http://ksria.com/simpread/#jsbox"><i class="fab fa-apple"></i> iOS</a></li>
                  <li class="nav-lite"><a href="http://ksria.com/simpread/#lite"><i class="fas fa-lightbulb"></i> 轻阅版</a></li>
                  <li class="nav-plugin"><a href="https://simpread.ksria.cn/plugins"><i class="fas fa-plug"></i> 插件中心</a></li>
                  <li class="nav-sites"><a href="https://simpread.ksria.cn/sites"><i class="fas fa-sitemap"></i> 站点集市</a></li>
                  <li class="nav-docs"><a href="http://ksria.com/simpread/docs" target="_blank"><i class="fas fa-question-circle"></i> 文档中心</a></li>
                  <li class="nav-changelog"><a href="http://ksria.com/simpread/changelog.html" target="_blank"><i class="fas fa-bullhorn"></i> 更新日志</a></li>
                  <div class="hamburger hamburger--elastic"><div class="hamburger-box"><div class="hamburger-inner"></div></div></div>`;
    if ( [ '/', '/simpread/' ].includes( location.pathname ) ) {
        $( ".top .nav-ios     a" ).on( 'click', () => $( '.jsbox'   )[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }) );
        $( ".top .nav-lite    a" ).on( 'click', () => $( '.lite'    )[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }) );
        $( ".top .nav-feature a" ).on( 'click', () => $( '#feature' )[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' }) );
    } else $( 'ul.navigator' ).html( html );
    $( document ).scroll( ( )=> {
        if ( $( 'body' ).scrollTop() > 0 ) {
            !$( '.top' ).hasClass( 'scroll' ) && $( '.top' ).addClass( 'scroll' );
        } else {
            $( '.top' ).hasClass( 'scroll' ) && $( '.top' ).removeClass( 'scroll' );
        }
    });
}

function menubarRender() {
    const html = `<div class="menu-bg">
                    <div class="menu">
                        <div class="menuitem">
                            <div class="title"><a href="https://simpread.ksria.cn/plugins">插件中心 <i class="fas fa-external-link-square-alt"></i></a></div>
                            <div class="links">
                                <div class="link">
                                    <a href="https://github.com/Kenshin/simpread/issues/500" target="_blank">代码块增强 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>包括：高亮，去重；支持 CSDN 等特殊情况的代码段</span>
                                </div>
                                <div class="link">
                                    <a href="https://simpread.ksria.cn/plugins/details/3PHAZerSkb" target="_blank">页面信息统计 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>包括：英文单词，段落，汉字个数，阅读时间，阅读进度的统计</span>
                                </div>
                                <div class="link">
                                    <a href="https://simpread.ksria.cn/plugins/details/NupOHRQHZ2" target="_blank">划词搜索 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>内置多种搜索引擎</span>
                                </div>
                                <div class="link">
                                    <a href="https://simpread.ksria.cn/plugins/details/Y7JxbP7B4H" target="_blank">全文翻译 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>可将页面内的正文逐段翻译为英文</span>
                                </div>
                            </div>
                        </div>
                        <div class="menuitem">
                            <div class="title"><a href="http://ksria.com/simpread/docs" target="_blank">帮助中心 <i class="fas fa-external-link-square-alt"></i></a></div>
                            <div class="links">
                                <div class="link">
                                    <a href="http://ksria.com/simpread/guide/" target="_blank">新手入门 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>互动式新手入门</span>
                                </div>
                                <div class="link">
                                    <a href="http://ksria.com/simpread/docs/#/" target="_blank">文档中心 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>关于简悦的全部功能介绍</span>
                                </div>
                                <div class="link">
                                    <a href="https://github.com/Kenshin/simpread/issues/618" target="_blank">常见问题汇总 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>简悦已服务 60K+ 的用户，新手可以看看这里，或许能找到你的问题</span>
                                </div>
                                <div class="link">
                                    <a href="https://github.com/Kenshin/simpread/issues/618" target="_blank">新闻汇总页 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>简悦的新闻页，里面有关于简悦各种信息咨询的汇总</span>
                                </div>
                            </div>
                        </div>
                        <div class="menuitem">
                            <div class="title">媒体报道 <i class="fas fa-external-link-square-alt"></i></div>
                            <div class="links">
                                <div class="link">
                                    <a href="https://sspai.com/post/52492" target="_blank">少数派 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>不只是「完美」阅读模式，他想用这款阅读工具帮你更好获取知识：专访简悦</span>
                                </div>
                                <div class="link">
                                    <a href="https://www.ifanr.com/app/1240289" target="_blank">爱范儿 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>专访《简悦》：改善 318 类网站，只为做最好的「阅读模式」</span>
                                </div>
                                <div class="link">
                                    <a href="https://www.waerfa.com/simpread-review" target="_blank">玩儿法 <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>简悦：无干扰的沉浸式阅读体验</span>
                                </div>
                                <div class="link">
                                    <a href="https://zhuanlan.zhihu.com/p/60222691" target="_blank">GitHub Daily <i class="fas fa-long-arrow-alt-right"></i></a>
                                    <span>如何在开源的同时斩获 Chrome 商城 40000+ 用户</span>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>`;
    $( '.top' ).append( `<nav class="menubar"></nav>` );
    $( '.navigator .hamburger' ).on( 'click', event => {
        if ( !$(event.currentTarget).hasClass( 'is-active' ) ) {
            $( '.top .menubar' ).html( html );
            setTimeout( ()=> {
                $( '.menu-bg .menu' ).addClass( 'open' );
                $( '.main' ).css( 'opacity', 0 );
            }, 200 );
        } else {
            $( '.main' ).css( 'opacity', 1 );
            $( '.top .menubar' ).empty();
        }
        $( '.top .hamburger' ).toggleClass( 'active' );
        $( '.top .menubar' ).toggleClass( 'active' );
        $( event.currentTarget ).toggleClass( 'is-active' );
    });
}

function headerRender() {
    if ( ![ '/', '/simpread/' ].includes( location.pathname ) ) return;
    if ( isMobile.verify() ) return;
    const top    = $( '.top' ).height(),
          header = $( '.header' ).height(),
          img    = $( '.introduce img' ).height(),
          title  = $( '.header .title' )[0].offsetHeight,
          desc   = $( '.header .desc'  )[0].offsetHeight,
          down   = $( '.header .download' )[0].offsetHeight,
          screen = document.body.clientHeight,
          width  = document.body.clientWidth;
    if ( screen > top + header ) {
        const fixed = screen - top - header;
        $( '.header' ).height( screen - top );
        $( '.introduce img' ).height( img + fixed <= 650 ? img + fixed : 650 );
    }
    if ( $( '.introduce img' ).width() > width ) {
        $( '.introduce img' ).css({ height: 'auto', 'max-width': '80%' });
        setTimeout( () => {
            $( '.header' ).height( title + desc + down + $( '.introduce' ).height() );
        }, 200 );
    }
}

function reviewsRender() {
    if ( ![ '/', '/simpread/' ].includes( location.pathname ) ) return;
    const swiper = new Swiper('.swiper-container', {
        pagination : { el: '.swiper-pagination', loop: true, clickable: true,dynamicBullets: true}
    });
}

function footerRender() {
    const html = `<div class="groups"> <div class="links"> <a href="http://ksria.com/simpread" class="logo"><span></span></a> <ul> <li><a target="_blank" href="http://service.weibo.com/share/share.php?url=http://ksria.com/simpread&title=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&pic=http://ksria.com/simpread/assets/image/introduce.png"><span class="icon weibo"></span></a></li><li><a target="_blank" href="https://www.douban.com/share/service?href=http://ksria.com/simpread&name=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95"><span class="icon douban"></span></a></li><li><a target="_blank" href="https://twitter.com/intent/tweet?via=wanglei001&amp;text=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&amp;url=http://ksria.com/simpread"><span class="icon twitter"></span></a></li><li><a target="_blank" href="https://www.facebook.com/dialog/feed?app_id=1528743474024441&link=http://ksria.com/simpread&picture=http://simpread.qiniudn.com/introduce.png&name=simpread&description=%E7%AE%80%E6%82%A6%EF%BC%88SimpRead%EF%BC%89-%20%E8%AE%A9%E4%BD%A0%E7%9E%AC%E9%97%B4%E8%BF%9B%E5%85%A5%E6%B2%89%E6%B5%B8%E5%BC%8F%E9%98%85%E8%AF%BB%E7%9A%84%20Chrome%20%E6%89%A9%E5%B1%95&redirect_uri=http://ksria.com/simpread"><span class="icon facebook"></span></a></li><li><a target="_blank" href="https://plus.google.com/share?url=http://ksria.com/simpread"><span class="icon gplus"></span></a></li><li><a target="_blank" href="https://t.me/simpread"><span class="icon telegram"></span></a></li></ul> </div><div class="links"> <h1>支持</h1> <a href="http://ksria.com/simpread/changelog.html">更新日志</a> <a href="http://ksria.com/simpread/docs/#/" target="_blank">帮助</a> <a href="http://ksria.com/simpread/docs/#/入门指南（-操作指引-）" target="_blank">新手入门</a> <a href="https://github.com/kenshin/simpread/issues" target="_blank">反馈</a> </div><div class="links"> <h1>关于</h1> <a href="http://kenshin.wang" target="_blank">关于作者</a> <a href="http://weibo.com/23784148" target="_blank">微博</a> </div><div class="links"> <h1>产品</h1> <a href="http://ksria.com/simptab" target="_blank">简 Tab - 极简的 Chrome 新标签页扩展</a> <a href="http://ksria.com/gnvm" target="_blank">GNVM - 使用 Go 语言编写的 Node.js 多版本管理器</a> <a href="http://ksria.com/emoji" target="_blank">+Emoji - 简单、可靠、纯粹的中文语义化 Emoji 扩展</a> <a href="http://ksria.com/sov2ex" target="_blank">sov2ex - 一个便捷的 v2ex 站内搜索引擎</a> </div></div><div class="copywrite"> <span>简悦 SimpRead - 如杂志般沉浸式阅读体验的扩展</span> <span>&nbsp;©&nbsp;2017 ~ 2019 <a href="http://ksria.com/simpread">ksria.com</a> by <a href="http://kenshin.wang" target="_blank">Kenshin Wang</a></span> </div>`;
    $( '.footer' ).html( html );
    ![ '/', '/simpread/' ].includes( location.pathname ) && $( '.undefined' ).length > 0 && document.body.clientHeight > $( '.top' ).height() + $( '.undefined' ).height() + $( '.footer' ).height() &
        $( '.footer' ).addClass( 'fixed' );
}

// google analytics
function analyticsRender() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-405976-9');
}
