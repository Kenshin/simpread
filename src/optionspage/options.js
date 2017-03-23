console.log( "==== simpread options page load ====" )

import '../assets/css/options.css';

/**
 * Add parallax scroll
 */
$( window ).scroll( (event) => {
    console.log( 0 - $(event.target).scrollTop(), document.body.scrollTop )
    const $target = $( event.target ),
          offset  = ( 0 - $target.scrollTop() ) / 2;
    $( ".top" ).css( "transform", `translate3d(0px, ${offset}px, 0px)` )
})