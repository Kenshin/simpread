// import css
import 'hamburgers'
import 'main';

// main
$( document ).ready( function() {
    var swiper = new Swiper('.swiper-container', {
      pagination : { el: '.swiper-pagination', loop: true, clickable: true,dynamicBullets: true}
    });
});

// google analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-405976-9');
