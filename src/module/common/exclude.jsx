console.log( "===== simpread option common: exclude =====" )

import { verifyHtml } from 'util';
import TextField      from 'textfield';

export default class Exclude extends React.Component {

    static defaultProps = {
        flag: {},
    }

    static propType = {
        flag : React.PropTypes.object,
    }

    state = {
        error : ""
    };

    changeExclude() {
        const { good, bad } = getExclude( event.target.value );
        this.props.changeExclude( good, bad.length > 0 ? -1 : 0 );
        if ( bad.length > 0 ) {
            this.setState({ error: `格式错误：${bad.join(", ")}` });
        } else {
            this.setState({ error: "" });
        }
    }

    render() {
        return (
            <TextField 
                multi={ true } 
                rows={ this.props.rows }
                placeholder="默认为空，每行一个，支持： Html标签, {}, '', //, [] 等，详细请看站点编辑器。" 
                floatingtext="隐藏列表" 
                value={ (this.props.exclude||[]).join( "\n" ) }
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
    h1
 *
 * @return {object}
 * good array: verify success htmls e.g.:
        <div class="article fmt article__content">
        <h1>
        <div class="col-xs-12 col-md-9 main ">
        <img id="icon4weChat" style="height: 0;width: 0;">
        <div class="wsx_fade" style="pointer-events: none;"></div>
    bad array: error htmls, e.g.:
        sdasdfas
        h1
 * 
 */
function getExclude( htmls ) {
    let [ good, bad, obj ]  = [[], [], null ];
    if ( htmls.trim() == "" ) return { good, bad };
    const arr = htmls.trim().split( "\n" );
    for( let value of arr ) {
        if ( verifyHtml( value.trim() )[0] > 0 ) {
            good.push( value.trim() );
        } else {
            bad.push( value.trim() );
        }
    }
    return { good, bad };
}
