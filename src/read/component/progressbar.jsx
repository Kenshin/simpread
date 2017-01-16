console.log( "==== simpread read component: ProcessBar ====" )

import ProgressBar from 'progressbar';

let bar;

export default class ProcessBar extends React.Component {

    componentDidMount() {
        $(document).on( "scroll", scrollEventHandle );
        bar = new ProgressBar.Line( "read-process", {
            strokeWidth: 4,
            easing     : "easeInOut",
            duration   : 1000,
            trailColor : "#fff",
            trailWidth : 0,
            svgStyle   : {
                width  : "100%",
                height : "100%",
                display: "block",
                top    : "0",
            },
            from       : { color: "#64B5F6" },
            to         : { color: "#304FFE" },
            step: (state, bar) => {
                bar.path.setAttribute( "stroke", state.color );
            },
        });
        bar.animate( 0 );
    }

    componentWillUnmount() {
        $(document).off( "scroll", scrollEventHandle );
    }

    render() {
        return (
            <read-process></read-process>
        )
    }

}
/**
 * Scroll event handle
 */
function scrollEventHandle() {
    const offset = document.body.scrollTop / ( document.body.scrollHeight - document.documentElement.clientHeight );
    bar.animate( offset );
}