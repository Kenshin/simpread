console.log( "===== simpread option common: Name =====" )

import { storage } from 'storage';

import TextField   from 'textfield';

const names = [];

export default class Name extends React.Component {

    state = {
        error : ""
    };

    changeName() {
        const name = event.target.value.trim();
        if ( names.includes( name ) ) {
            this.setState({ error : "当前值重复，请重新录入。" });
        } else {
            this.setState({ error : "" });
            this.props.changeName( name );
        }
    }

    componentWillMount() {
        storage.simpread.sites.forEach( site => names.push( site[1].name ) );
    }

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder={ "默认为空，当填入值时意味着【阅读模式】也可使用当前配置。" }
                floatingtext="标识" 
                value={ this.props.name }
                errortext={ this.state.error }
                onChange={ ()=>this.changeName() }
            />
        )
    }

}