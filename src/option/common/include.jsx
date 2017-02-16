console.log( "===== simpread option common: Include =====" )

import { verifyHtml } from 'util';

export default class Include extends React.Component {

    changeInclude() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.props.changeInclude( event.target.value.trim() );
        }
    }

    componentDidMount() {
        this.refs.include.value = this.props.include;
    }

    render() {
        return (
            <input ref="include" type="text" placeholder="默认为空，自动选择高亮区域。" onChange={ ()=>this.changeInclude() } />
        )
    }

}