console.log( "===== simpread option sites load =====" )

import {storage} from 'storage';

import TextField from 'textfield';
import Button    from 'button';

export default class SitesOpts extends React.Component {

    onClick( state ) {
        state == "sitemgr" && ( location.href = location.origin + "/options/sitemgr.html" );
    }

    changeOrigins() {
        this.props.option.origins = event.target.value.split("\n");
        storage.pr.origins        = this.props.option.origins;
        this.props.onChange && this.props.onChange( false );
    }

    origins( type ) {
        if ( type == "origins" ) {
            storage.GetRemote( "origins", ( result, error ) => {
                if ( error ) new Notify().Render( 2, "获取失败，请稍后重新加载。" );
                else {
                    this.props.option.origins = storage.pr.Origins( result );
                    this.props.onChange && this.props.onChange( false );
                    $( this.refs.origins ).find( "textarea" ).val( this.props.option.origins.join( "\n" ) );
                    new Notify().Render( "官方源加载成功。" );
                }
            });
        } else if ( type == "import" ) {
            new Notify().Render( "snackbar", "导入后会覆盖掉原来的第三方适配列表，请问是否覆盖？", "确认", () => {
                const urls = this.props.option.origins.filter( item => {
                    return item.trim() != "" && item.trim().startsWith( "http" ) && item.trim().endsWith( ".json" )
                });
                const max  = urls.length;
                let   idx  = 0, arr = [], count = 0;
                if ( urls.length != this.props.option.origins.length ) {
                    this.props.option.origins = [ ...urls ];
                    this.props.onChange && this.props.onChange( false );
                    $( this.refs.origins ).find( "textarea" ).val( this.props.option.origins.join( "\n" ) );
                    new Notify().Render( "已剔除掉不符合规范的第三方源。" );
                }
                this.props.option.origins.forEach( item => {
                    storage.GetRemote( item, ( result, error ) => {
                        idx++;
                        if ( result && result.sites.length > 0 ) {
                            count++;
                            arr = arr.concat( storage.pr.Formatsites( result ) );
                        } else new Notify().Render( `导入失败 ${ item }` );
                        if ( idx == max ) {
                            arr.length > 0 && ( storage.websites.custom = storage.pr.Addorigins( arr ) );
                            console.log( "current storage websites.custom is ", arr );
                            new Notify().Render( `已完成导入，本次共计：${ count } 个站点， ${ arr.length } 条数据。` );
                            this.props.onChange && this.props.onChange( false );
                        }
                    });
                });
            });
        } else if ( type == "clear" ) {
            new Notify().Render( "snackbar", "只能清除第三方源的适配站点，请问是否清除？", "确认", () => {
                new Notify().Render( `已完成清除，共计：${ storage.pr.Clearorigins() } 条数据。` );
                storage.websites.custom = storage.pr.sites.custom;
                this.props.onChange && this.props.onChange( false );
            });
        }
    }

    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">第三方适配源</div>
                <div ref="origins" style={{ 'padding-top': '10px', 'margin-bottom': '8px;' }} className="lab">
                    <TextField 
                        multi={ true } rows={8}
                        placeholder="仅支持 URL 地址，每行一个。" 
                        value={ ( this.props.option.origins||[] ).join( "\n" ) }
                        onChange={ ()=>this.changeOrigins() }
                    />
                    <div style={{ "display": "flex" }}>
                        <Button type="raised" text="加载第三方适配列表"
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#4CAF50"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "origins" ) } />
                        <Button type="raised" text="导入到第三方适配列表"
                            width="100%" style={{ "margin": "0 10px" }}
                            color="#fff" backgroundColor="rgb(103, 58, 183)"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "import" ) } />
                        <Button type="raised" text="清除第三方适配列表" 
                            width="100%" style={{ "margin": "0" }}
                            color="#fff" backgroundColor="#FF5252"
                            waves="md-waves-effect md-waves-button"
                            onClick={ ()=>this.origins( "clear" ) } />
                    </div>
                    <div style={{ 'padding-top': '10px', 'position': 'relative' }} onClick={ ()=>this.onClick('sitemgr') }>
                        <div className="more">
                            <div>站点管理器</div>
                            <span className="desc">可以编辑全部的适配站点，包括：全局、站点集市、第三方适配源、本地适配源。</span>
                            <span className="arrow" style={{ 'bottom': '13px' }}></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}