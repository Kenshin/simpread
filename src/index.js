// import css
import 'hamburgers'
import 'main';

// main
$( document ).ready( function() {
    analyticsRender();
    reviewsRender();
});

function reviewsRender() {
    const swiper = new Swiper('.swiper-container', {
        pagination : { el: '.swiper-pagination', loop: true, clickable: true,dynamicBullets: true}
    });
}

// google analytics
function analyticsRender() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-405976-9');
}
