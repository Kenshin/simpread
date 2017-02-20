console.log( "===== simpread option common: Include =====" )

import { verifyHtml } from 'util';

import TextField from 'textfield';

export default class Include extends React.Component {

    state = {
        error : ""
    };

    changeInclude() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ error : "" });
            this.props.changeInclude( event.target.value.trim() );
        } else {
            this.setState({ error : "当前输入为非法。" });
        }
    }

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder="默认为空，自动选择高亮区域。" 
                floatingtext="高亮区域" 
                value={ this.props.include }
                errortext={ this.state.error }
                onChange={ ()=>this.changeInclude() }
            />
        )
    }

} 