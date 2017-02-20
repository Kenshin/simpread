console.log( "===== simpread option common: exclude =====" )

import { verifyHtml } from 'util';
import TextField      from 'textfield';

export default class Exclude extends React.Component {

    state = {
        error : ""
    };

    changeExclude() {
        this.props.changeExclude( getExclude( event.target.value ) );
    }

    /*componentDidMount() {
        this.refs.exclude.value   = this.props.exclude.join( "\n" );
    }*/

    render() {
        return (
            <TextField 
                multi={ true } 
                placeholder="每行一个，例如：<div class='xxxx'></div>" 
                floatingtext="隐藏列表" 
                value={ this.props.exclude.join( "\n" ) }
                errortext={ this.state.error }
                onChange={ ()=>this.changeExclude() }
            />
        )
    }

}

/**
 * Get exclude tags
 * 
 * @param  {string} input exclude html tag, e.g.:
    <div class="article fmt article__content">
    <h1>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    sdasdfas
    

    <div class="ks-simpread-bg">
 *
 * @return {array} verify success htmls
    <div class="article fmt article__content">
    <h3 id="articleHeader1">原著序</h3>
    <div class="col-xs-12 col-md-9 main ">
    <img id="icon4weChat" style="height: 0;width: 0;">
    <div class="wsx_fade" style="pointer-events: none;"></div>
    <div class="ks-simpread-bg">
 * 
 */
function getExclude( htmls ) {
    let [ list, obj ]  = [[], null ];
    const arr = htmls.trim().split( "\n" );
    for( let value of arr ) {
        if ( verifyHtml( value.trim() )[0] > 0 ) {
            list.push( value.trim() );
        } else {
            //new Notify().Render( 2, `当前输入【 ${value} 】错误，请重新输入。` );
        }
    }
    return list;
}
