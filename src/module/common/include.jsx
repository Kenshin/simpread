console.log( "===== simpread option common: Include =====" )

import { verifyHtml } from 'util';
import TextField      from 'textfield';

export default class Include extends React.Component {

    static defaultProps = {
        mode: "",
        flag: {},
    }

    static propType = {
        mode : React.PropTypes.oneOf([ "focus", "read" ]),
        flag : React.PropTypes.object,
    }

    state = {
        error : ""
    };

    changeInclude() {
        let code = 0;
        if ( this.props.mode == "read" && event.target.value.trim() == "" ) {
            code = -2;
            this.setState({ error : "当前输入不能为空。" });
        }
        else if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ error : "" });
        } else {
            code = -1;
            this.setState({ error : "当前输入为非法。" });
        }
        this.props.changeInclude( event.target.value.trim(), code );
    }

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder={ this.props.mode == "focus" ? "默认为空，自动选择高亮区域。" : "必填，不可为空。" }
                floatingtext="高亮区域" 
                value={ this.props.include }
                errortext={ this.state.error }
                onChange={ ()=>this.changeInclude() }
            />
        )
    }

} 