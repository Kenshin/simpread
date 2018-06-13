console.log( "===== simpread option common: Name =====" )

import { storage } from 'storage';

import TextField   from 'textfield';

//const names = [];

export default class Name extends React.Component {

    state = {
        error : ""
    };

    changeName( event ) {
        let   code = 0;
        const name = event.target.value.trim();
        //if ( names.includes( name ) && name != this.props.name ) {
        //    code = -1;
        //    this.setState({ error : "当前值重复，请重新录入。" });
        //} else 
        if( name == "" ) {
            code = -2;
            this.setState({ error : "当前输入不能为空。" });
        } else {
            this.setState({ error : "" });
        }
        this.props.changeName( name, code );
    }

    //componentWillMount() {
    //    storage.simpread.sites.forEach( site => names.push( site[1].name ) );
    //}

    render() {
        return (
            <TextField 
                multi={ false } 
                placeholder={ "必填，当前值具有唯一性。" }
                floatingtext="标识" 
                value={ this.props.name }
                errortext={ this.state.error }
                onChange={ evt=>this.changeName(evt) }
            />
        )
    }

}