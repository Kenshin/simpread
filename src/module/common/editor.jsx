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
        errtitle : "",
        errdesc  : "",
    };

    changeName( value, code ) {
        this.props.site.name = value;
        console.log( "this.props.option.site.name = ", this.props.site.name )
    }

    changeURL( value, code ) {
         this.props.url = value;
        console.log( "this.props.option.url = ",  this.props.url )
    }

    changeTitle() {
        if ( event.target.value.trim() == "" ) {
            //this.props.flag.title = -2;
            this.setState({ errtitle : "当前输入不能为空。" });
        }
        else if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errtitle : "" });
            this.props.site.title = event.target.value.trim();
            //this.props.flag.title = 0;
            console.log( "this.props.option.site.title = ", this.props.site.title )
        } else {
            //this.props.flag.title = -1;
            this.setState({ errtitle : "当前输入为非法。" });
        }
    }

    changeDesc() {
        if ( verifyHtml( event.target.value.trim() )[0] != -1 ) {
            this.setState({ errdesc : "" });
            this.props.site.desc = event.target.value.trim();
            //this.props.flag.desc = 0;
            console.log( "this.props.option.site.desc = ", this.props.site.desc )
        } else {
            //this.props.flag.desc = -1;
            this.setState({ errdesc : "当前输入为非法。" });
        }
    }

    changeInclude( value, code ) {
        this.props.site.include = value;
        //this.props.flag.include        = code;
        console.log( "this.props.option.site.include = ", this.props.site.include )
    }

    changeExclude( value, code ) {
        this.props.site.exclude = value;
        //this.props.flag.exclude        = code;
        console.log( "this.props.option.site.exclude = ", this.props.site.exclude )
    }

    render() {
        !this.props.site.avatar && ( this.props.site.avatar = [
            { name: "" },
            { url: "" },
        ]);
        !this.props.site.paging && ( this.props.site.paging = [
            { prev: "" },
            { next: "" },
        ]);
        console.log( "current site ", this.props.url, this.props.site )
        return (
            <sr-opt-read>
                <sr-opt-items>
                    <sr-opt-gp>
                        <Name name={ this.props.site.name } changeName={ (v,c)=>this.changeName(v,c) } />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <URL url={  this.props.url } changeURL={ (v,c)=>this.changeURL(v,c) } />
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
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="头像的地址"
                                value={ this.props.site.avatar[1].url }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="前一页"
                                value={ this.props.site.paging[0].prev }
                        />
                    </sr-opt-gp>
                    <sr-opt-gp>
                        <TextField multi={ false }
                                placeholder="默认为空，只限论坛类页面使用。" floatingtext="后一页"
                                value={ this.props.site.paging[1].next }
                        />
                    </sr-opt-gp>
                </sr-opt-items>
            </sr-opt-read>
        )
    }
}
