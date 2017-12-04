console.log( "===== simpread option editor load =====" )

import { verifyHtml } from 'util';

import TextField      from 'textfield';

import Name           from 'name';
import URL            from 'url';
import Include        from 'include';
import Exclude        from 'exclude';

const getName = ( value, items ) => {
    for ( const item of items ) {
        if ( value == "" ) return item.name;
        else if ( item.value == value ) return item.name;
    }
};

export default class Editor extends React.Component {

    state = {
        errtitle    : "",
        errdesc     : "",
        avatar_name : "",
        avatar_url  : "",
        paging_prev : "",
        paging_next : "",
    };

    changeName( value, code ) {
        this.props.site.name = value;
        console.log( "this.props.site.name = ", this.props.site.name )
    }

    changeURL( value, code ) {
        this.props.site.url = value;
        console.log( "this.props.option.url = ",  this.props.site.url )
    }

    changeTitle() {
        const title = event.target.value.trim();
        if ( title == "" ) {
            this.setState({ errtitle : "当前输入不能为空。" });
        }
        else if ( verifyHtml( title )[0] != -1 ) {
            this.setState({ errtitle : "" });
            this.props.site.title = title;
            console.log( "this.props.site.title = ", this.props.site.title )
        } else {
            this.setState({ errtitle : "当前输入为非法。" });
        }
    }

    changeDesc() {
        const desc = event.target.value.trim();
        if ( verifyHtml( title )[0] != -1 ) {
            this.setState({ errdesc : "" });
            this.props.site.desc = desc;
            console.log( "this.props.site.desc = ", this.props.site.desc )
        } else {
            this.setState({ errdesc : "当前输入为非法。" });
        }
    }

    changeInclude( value, code ) {
        this.props.site.include = value;
        console.log( "this.props.site.include = ", this.props.site.include )
    }

    changeExclude( value, code ) {
        this.props.site.exclude = value;
        console.log( "this.props.site.exclude = ", this.props.site.exclude )
    }

    changeAvatar( idx, type, value ) {
        value = value.trim();
        if ( verifyHtml( value )[0] != -1 ) {
            this.setState({ [`avatar_${type}`] : "" });
            this.props.site.avatar[idx][type] = value;
            console.log( "this.props.site.avatar = ", this.props.site.avatar )
        } else {
            this.setState({ [`avatar_${type}`] : "当前输入为非法。" });
        }
    }

    changePaging( idx, type, value ) {
        value = value.trim();
        if ( verifyHtml( value )[0] != -1 ) {
            this.setState({ [`paging_${type}`] : "" });
            this.props.site.paging[idx][type] = value;
            console.log( "this.props.site.paging = ", this.props.site.paging )
        } else {
            this.setState({ [`paging_${type}`] : "当前输入为非法。" });
        }
    }

    render() {
        return (
            <sr-opt-read>
                <sr-opt-items>
                    <sr-opt-gp>
                        <Name name={ this.props.site.name } changeName={ (v,c)=>this.changeName(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <URL url={  this.props.site.url } changeURL={ (v,c)=>this.changeURL(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                            multi={ false }
                            floatingtext="标题"
                            placeholder="必填，不可为空。"
                            value={ this.props.site.title }
                            errortext={ this.state.errtitle }
                            onChange={ ()=>this.changeTitle() }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                                multi={ false }
                                placeholder="默认为空。"
                                floatingtext="描述"
                                value={ this.props.site.desc }
                                errortext={ this.state.errdesc }
                                onChange={ ()=>this.changeDesc() }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Include mode="read" include={ this.props.site.include } changeInclude={ (v,c)=>this.changeInclude(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <Exclude exclude={ this.props.site.exclude } changeExclude={ (v,c)=>this.changeExclude(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="头像的名称"
                                value={ this.props.site.avatar[0].name }
                                errortext={ this.state.avatar_name }
                                onChange={ event=>this.changeAvatar( 0, "name", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="头像的地址"
                                value={ this.props.site.avatar[1].url }
                                errortext={ this.state.avatar_url }
                                onChange={ event=>this.changeAvatar( 1, "url", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="前一页"
                                value={ this.props.site.paging[0].prev }
                                errortext={ this.state.paging_prev }
                                onChange={ event=>this.changePaging( 0, "prev", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="后一页"
                                value={ this.props.site.paging[1].next }
                                errortext={ this.state.paging_next }
                                onChange={ event=>this.changePaging( 1, "next", event.target.value ) }
                        />
                    </sr-opt-gp>
                </sr-opt-items>
            </sr-opt-read>
        )
    }
}
