console.log( "===== simpread option account load =====" )

import {storage} from 'storage';
import * as ss   from 'stylesheet';

import TextField from 'textfield';
import Button    from 'button';

export default class AccountOpt extends React.Component {

    static defaultProps = {
        colors: ["rgb(255, 114, 129)", "rgb(64, 196, 255)", "rgb(255, 157, 68)", "rgb(140, 216, 66)", "rgb(251, 88, 74)", "rgb(255, 229, 95)", "rgb(0, 230, 118)", "rgb(0, 169, 240)", "rgb(128, 222, 234)", "rgb(247, 77, 95)", "rgb(255, 206, 73)", "rgb(250, 154, 63)", "rgb(255, 114, 129)", "rgb(57, 194, 241)", "rgb(141, 196, 72)", "rgb(128, 222, 234)", "rgb(83, 109, 254)", "rgb(255, 183, 77)", "rgb(197, 231, 99)", "rgb(239, 83, 80)", "rgb(0, 230, 118)", "rgb(57, 194, 241)", "rgb(100, 181, 246)", "rgb(119, 232, 86)", "rgb(239, 83, 80)", "rgb(0, 203, 232)", "rgb(0, 230, 118)", "rgb(255, 196, 0)", "rgb(255, 206, 73)", "rgb(167, 134, 116)", "rgb(86, 209, 216)", "rgb(253, 208, 174)", "rgb(197, 231, 99)", "rgb(239, 88, 74)", "rgb(249, 79, 40)", "rgb(255, 88, 100)", "rgb(197, 231, 99)", "rgb(0, 177, 251)", "rgb(255, 206, 73)", "rgb(251, 182, 75)", "rgb(197, 231, 99)", "rgb(35, 180, 210)", "rgb(255, 206, 73)", "rgb(255, 229, 95)", "rgb(64, 196, 255)", "rgb(255, 114, 129)", "rgb(119, 232, 86)", "rgb(139, 223, 231)", "rgb(0, 169, 240)"],
        idx   : "abcdefghijklmnopqrstuvwxyz0123456789",
    }

    save() {

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
                        { avatar && <span className="avatar" style={{ "background-color": color }}>{ avatar }</span> }
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="标识" 
                            placeholder="系统自动生成，不可更改" 
                            value={ this.props.user.uid } disable={true} />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="昵称" 
                            placeholder="只能包含中英文 + 数字 + 中间的空格" 
                            value={ this.props.user.name } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="邮箱" 
                            placeholder="请使用真是且有效的邮箱地址" 
                            value={ this.props.user.email }/>
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            floatingtext="联络方式" 
                            placeholder="微博 / 微信 等一切可以联络到你的方式" 
                            value={ this.props.user.contact }/>
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