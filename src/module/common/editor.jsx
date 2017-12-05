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
        err_title   : "",
        err_desc    : "",
        err_avatar_name : "",
        err_avatar_url  : "",
        err_paging_prev : "",
        err_paging_next : "",
    };

    changeName( value, code ) {
        this.props.site.name  = value;
        this.props.state.name = value;
        console.log( "this.props.site.name = ", this.props.site.name, code )
    }

    changeURL( value, code ) {
        this.props.site.url  = value;
        this.props.state.url = value;
        console.log( "this.props.option.url = ",  this.props.site.url, code )
    }

    changeTitle() {
        const title = event.target.value.trim();
        if ( title == "" ) {
            this.setState({ err_title : "当前输入不能为空。" });
            this.props.state.title = -2;
        }
        else if ( verifyHtml( title )[0] != -1 ) {
            this.setState({ err_title : "" });
            this.props.site.title  = title;
            this.props.state.title = 0;
            console.log( "this.props.site.title = ", this.props.site.title )
        } else {
            this.setState({ err_title : "当前输入为非法。" });
            this.props.state.title = -1;
        }
    }

    changeDesc() {
        const desc = event.target.value.trim();
        if ( verifyHtml( desc )[0] != -1 ) {
            this.setState({ err_desc : "" });
            this.props.site.desc  = desc;
            this.props.state.desc = 0;
            console.log( "this.props.site.desc = ", this.props.site.desc )
        } else {
            this.setState({ err_desc : "当前输入为非法。" });
            this.props.state.desc = -1;
        }
    }

    changeInclude( value, code ) {
        this.props.site.include  = value;
        this.props.state.include = value;
        console.log( "this.props.site.include = ", this.props.site.include, code )
    }

    changeExclude( value, code ) {
        this.props.site.exclude  = value;
        this.props.state.exclude = value;
        console.log( "this.props.site.exclude = ", this.props.site.exclude, code )
    }

    changeAvatar( idx, type, value ) {
        value = value.trim();
        if ( verifyHtml( value )[0] != -1 ) {
            this.setState({ [`err_avatar_${type}`] : "" });
            this.props.site.avatar[idx][type] = value;
            this.props.state.avatar[type]     = 0;
            console.log( "this.props.site.avatar = ", this.props.site.avatar )
        } else {
            this.setState({ [`err_avatar_${type}`] : "当前输入为非法。" });
            this.props.state.avatar[type] = -1;
        }
    }

    changePaging( idx, type, value ) {
        value = value.trim();
        if ( verifyHtml( value )[0] != -1 ) {
            this.setState({ [`err_paging_${type}`] : "" });
            this.props.site.paging[idx][type] = value;
            this.props.state.paging[type]     = 0;
            console.log( "this.props.site.paging = ", this.props.site.paging )
        } else {
            this.setState({ [`err_paging_${type}`] : "当前输入为非法。" });
            this.props.state.paging[type] = -1;
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
                            errortext={ this.state.err_title }
                            onChange={ ()=>this.changeTitle() }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField 
                                multi={ false }
                                placeholder="默认为空。"
                                floatingtext="描述"
                                value={ this.props.site.desc }
                                errortext={ this.state.err_desc }
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
                                errortext={ this.state.err_avatar_name }
                                onChange={ event=>this.changeAvatar( 0, "name", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="头像的地址"
                                value={ this.props.site.avatar[1].url }
                                errortext={ this.state.err_avatar_url }
                                onChange={ event=>this.changeAvatar( 1, "url", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="前一页"
                                value={ this.props.site.paging[0].prev }
                                errortext={ this.state.err_paging_prev }
                                onChange={ event=>this.changePaging( 0, "prev", event.target.value ) }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="后一页"
                                value={ this.props.site.paging[1].next }
                                errortext={ this.state.err_paging_next }
                                onChange={ event=>this.changePaging( 1, "next", event.target.value ) }
                        />
                    </sr-opt-gp>
                </sr-opt-items>
            </sr-opt-read>
        )
    }
}
