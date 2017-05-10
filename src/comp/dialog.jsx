/*!
 * React Material Design: Dialog
 * 
 * @version : 0.0.1
 * @update  : 2017/05/10
 * @homepage: https://github.com/kenshin/react-md-ui
 * @license : MIT https://github.com/kenshin/react-md/blob/master/LICENSE
 * @author  : Kenshin Wang <kenshin@ksria.com>
 * 
 * @copyright 2017
 */

console.log( "==== simpread component: Dialog ====" )

const style = {

    root: {
        display: '-webkit-flex',
        flexDirection: 'column',

        minWidth: '480px',
        minHeight: '300px',

        margin: 0,
        padding: 0,

        color: 'rgba(0, 0, 0, 0.870588)',
        backgroundColor: 'rgb(255, 255, 255)',

        borderRadius: '3px',

        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px',
    },

    content: {
        display: 'block',

        width: '100%',
        height: '100%',

        minHeight: '244px',

        padding: '39px 24px 0',

        overflowY: 'auto',
        boxSizing: 'border-box',
    },

    footer: {
        display: '-webkit-flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-end',

        width: '100%',

        boxSizing: 'border-box',
    },

};

/**
 * Custom component: Dialog
 * 
 * Reference: 
 * - https://material.io/guidelines/components/dialogs.html
 * - http://www.material-ui.com/#/components/dialog
 * 
 * @class
 */
class Dialog extends React.Component {

    componentDidMount() {
        $( "dialog-content" ).height() < 585 && $( "dialog-footer" ).css( "border-top", "none" );
    }

    render() {

        let content, footer;

        if ( this.props.children && !$.isArray( this.props.children )) {
            content = this.props.children;
        } else if ( this.props.children && $.isArray( this.props.children )) {
            content = this.props.children[0];
            footer  = this.props.children[1];
        }

        return (
            <dialog-gp style={ style.root }>
                { content }
                { footer }
            </dialog-gp>
        )
    }

}

/**
 * React stateless component
 * 
 * @param {object} props, include: children
 */
const Content = props => <dialog-content style={ style.content }>{ props.children }</dialog-content>,
      Footer  = props => <dialog-footer  style={ style.footer  }>{ props.children }</dialog-footer>;

export {
    Dialog,
    Content,
    Footer,
}