console.log( "===== simpread option account load =====" )

import {storage} from 'storage';
import * as ss   from 'stylesheet';
import * as watch from 'watch';
import * as run   from 'runtime';

import TextField from 'textfield';
import Button    from 'button';

export default class AccountOpt extends React.Component {

    static defaultProps = {
        colors: ["rgb(255, 114, 129)", "rgb(64, 196, 255)", "rgb(255, 157, 68)", "rgb(140, 216, 66)", "rgb(251, 88, 74)", "rgb(255, 229, 95)", "rgb(0, 230, 118)", "rgb(0, 169, 240)", "rgb(128, 222, 234)", "rgb(247, 77, 95)", "rgb(255, 206, 73)", "rgb(250, 154, 63)", "rgb(255, 114, 129)", "rgb(57, 194, 241)", "rgb(141, 196, 72)", "rgb(128, 222, 234)", "rgb(83, 109, 254)", "rgb(255, 183, 77)", "rgb(197, 231, 99)", "rgb(239, 83, 80)", "rgb(0, 230, 118)", "rgb(57, 194, 241)", "rgb(100, 181, 246)", "rgb(119, 232, 86)", "rgb(239, 83, 80)", "rgb(0, 203, 232)", "rgb(0, 230, 118)", "rgb(255, 196, 0)", "rgb(255, 206, 73)", "rgb(167, 134, 116)", "rgb(86, 209, 216)", "rgb(253, 208, 174)", "rgb(197, 231, 99)", "rgb(239, 88, 74)", "rgb(249, 79, 40)", "rgb(255, 88, 100)", "rgb(197, 231, 99)", "rgb(0, 177, 251)", "rgb(255, 206, 73)", "rgb(251, 182, 75)", "rgb(197, 231, 99)", "rgb(35, 180, 210)", "rgb(255, 206, 73)", "rgb(255, 229, 95)", "rgb(64, 196, 255)", "rgb(255, 114, 129)", "rgb(119, 232, 86)", "rgb(139, 223, 231)", "rgb(0, 169, 240)"],
        idx   : "abcdefghijklmnopqrstuvwxyz0123456789",
    }

    state = {
        uid_err  : "",
        name_err : "",
        email_err: "",
    };

    onChangeName( event ) {
        const value = event.target.value;
        if ( /^([\u2E80-\u9FFFA-Za-z0-9]+)([ ]?)([\u2E80-\u9FFFA-Za-z0-9]*)$/ig.test( value ) ) {
            this.setState({ name_err : "" });
        } else this.setState({ name_err : "只能包含中英文 + 数字 + 中间的空格" });
        storage.user.name = value;
    }

    onChangeEmail( event ) {
        const value = event.target.value;
        if ( /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test( value ) ) {
            this.setState({ email_err : "" });
        } else this.setState({ email_err : "请确保输入正确的 Email 地址" });
        storage.user.email = value;
    }

    onChangeContact( event ) {
        storage.user.contact = event.target.value.trim();
    }

    componentWillMount() {
        if ( storage.user.uid == "" ) {
            storage.user.uid = run.ID( "user" );
            storage.Write( () => {
                console.log( "current user info is ", storage.user )
                this.setState({ uid_err : "" });
                watch.SendMessage( "option", true );
            }, storage.simpread );
        }
        this.props.load.first && this.stat();
    }

    stat() {
        $.ajax({
            url   : storage.service + "/stats/service/count/",
            method: "POST",
            data  : {type: this.props.load.update ? "update" : "first" }
        }).done( ( result, textStatus, jqXHR ) => {
            console.log( "count success " )
        }).fail( error => {
            console.log( "count failed ", error )
        });
    }

    save() {
        if ( storage.user.name.trim() == "" ) {
            this.setState({ name_err : "昵称不能为空" });
            return;
        } else if ( storage.user.email.trim() == "" ) {
            this.setState({ email_err : "昵称不能为空" });
            return;
        }
        $.ajax({
            url   : storage.service + "/users/service/update/" + storage.user.uid,
            method: "POST",
            data  : storage.user
        }).done( ( result, textStatus, jqXHR ) => {
            result.code == 201 ? 
                storage.Write( ()=> {
                    watch.SendMessage( "option", true );
                    new Notify().Render( "更新成功，请刷新本页！" );
                }) :
                new Notify().Render( 2, "更新出现错误，请稍后再试！" );
        }).fail( error => {
            new Notify().Render( 2, "更新出现错误，请稍后再试！" );
        });
    }

    render() {
        let avatar = this.props.user.avatar;
        if ( avatar == "" ) {
            avatar = this.props.user.name.substr( 0, 1 );
        }
        let idx = this.props.idx.indexOf( avatar.toLowerCase() );
        idx == -1 && ( idx = 0 );
        const color = this.props.colors[idx];
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">用户信息</div>
                <div className="lab" style={{'padding-top': '25px'}}>
                    <sr-opt-gp style={{'justify-content': 'center'}}>
                        { avatar && <span className="avatar" style={{ "background-color": color }}>{ avatar.toUpperCase() }</span> }
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="标识" 
                            placeholder="系统自动生成，不可更改" 
                            errortext={ this.state.uid_err }
                            value={ this.props.user.uid } disable={true} />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="昵称" 
                            placeholder="只能包含中英文 + 数字 + 中间的空格" 
                            errortext={ this.state.name_err }
                            value={ this.props.user.name } onChange={ e=>this.onChangeName(e) } disable={false} />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="邮箱" 
                            placeholder="请使用真实且有效的邮箱地址" 
                            errortext={ this.state.email_err }
                            value={ this.props.user.email } onChange={ e=>this.onChangeEmail(e) } disable={false} />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="联络方式" 
                            placeholder="微博 / 微信 等一切可以联络到你的方式" 
                            value={ this.props.user.contact } onChange={ e=>this.onChangeContact(e) } disable={false} />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Button text="保 存" 
                            waves="md-waves-effect" color="#fff" backgroundColor="rgb(111, 122, 155)" 
                            width="100%" icon={ ss.IconPath( "save_icon" ) }
                            onClick={ ()=>this.save() } />
                    </sr-opt-gp>
                </div>
            </div>
        )
    }
}