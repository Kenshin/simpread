console.log( "===== simpread option common load =====" )

import Button      from 'button'; 
import Notify      from 'notify';

import * as ss     from 'stylesheet';
import { storage, Now } from 'storage';

export default class CommonOpt extends React.Component {

    static propTypes = {
        sync : React.PropTypes.func,
    }

    state = {
        update: ( update => !update ? "从未同步过，建议同步一次！" : `上次同步时间： ${ update }` ) ( storage.option.update )
    };

    sync() {
        storage.Sync( "set", time => {
            new Notify().Render( 0, "数据同步成功。" );
            this.setState({ update: `上次同步时间： ${ time }` });
            this.props.sync && this.props.sync();
        });
    }

    import() {
        const input  = document.createElement( "input" ),
              $input = $(input),
              onload = event => {
                if ( event && event.target && event.target.result ) {
                    const json   = JSON.parse( event.target.result ),
                          result = storage.Verify( json );
                    if ( !result.focus || !result.read ) {
                        new Notify().Render( 2, "上传失败，配置项不匹配，请重新上传。" );
                    } else {
                        storage.Write( json, ()=> {
                            new Notify().Render( "snackbar", "上传成功，请刷新当前页面，以便新配置文件生效。", "刷新", () => {
                                window.location.reload();
                            });
                        });
                    }
                }
              };
        $input.attr({ type : "file", multiple : "false" })
              .one( "change", event => {
                    const reader  = new FileReader();
                    reader.onload = onload;
                    reader.readAsText( event.target.files[0] );
        });
        $input.trigger( "click" );
    }

    export() {
        const download = {
                focus: { ...storage.focus },
                read : { ...storage.read  },
            },
            data = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify( download ) ),
            $a   = $( `<a style="display:none" href=${data} download="simpread-config-${Now()}.json"></a>` ).appendTo( "body" );
        $a[0].click();
        $a.remove();
    }

    newsites() {
        storage.GetNewsites( "remote", ( { count, forced }, error ) => {
            if ( !error ) {
                count  > 0 && new Notify().Render( 0, `同步更新成功，新更新 ${ count } 个站点。` );
                forced > 0 && new Notify().Render( 0, `同步更新成功，强制更新 ${forced } 个站点。` );
                count == 0 && forced == 0 && new Notify().Render( 0, "暂无更新。" );
            }
        });
    }

    clear() {
        new Notify().Render( "snackbar", "是否清除掉包括本地与网络账户的全部配置文件？", "同意 ", ()=>{
            storage.Clear( "all", () => {
                new Notify().Render( "snackbar", "清除成功，此页面需刷新后才能生效！", "刷新 ", ()=>{
                    window.location.reload();
                });
            });
        });
    }

    render() {
        return(
            <div style={{ width: '100%' }}>
                <Button type="raised" text="与 Google 账户进行同步"
                        icon={ ss.IconPath( "sync_icon" ) }
                        color="#fff" backgroundColor="#1976D2"
                        waves="sr-button waves-effect waves-button" 
                        tooltip={{ text: this.state.update }}
                        onClick={ ()=>this.sync() } />
                <div style={{ display: 'inline-flex', width: '100%' }}>
                    <Button type="raised" text="从本地上传配置文件" width="100%" 
                            icon={ ss.IconPath( "import_icon" ) }
                            color="#fff" backgroundColor="#FF5252"
                            waves="sr-button waves-effect waves-button" 
                            tooltip={{ text: "上传后的配置将覆盖掉当前，请注意确认！" }}
                            onClick={ ()=>this.import() } />
                    <Button type="raised" text="保存配置文件到本地" width="100%" 
                            icon={ ss.IconPath( "export_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="sr-button waves-effect waves-button" 
                            onClick={ ()=>this.export() } />
                </div>
                <div style={{ display: 'inline-flex', width: '100%' }}>
                    <Button type="raised" text="手动同步适配列表" width="100%" 
                            icon={ ss.IconPath( "website_icon" ) }
                            color="#fff" backgroundColor="#2196F3"
                            waves="sr-button waves-effect waves-button" 
                            onClick={ ()=>this.newsites() } />
                    <Button type="raised" text="清除全部数据" width="100%" 
                            icon={ ss.IconPath( "clear_icon" ) }
                            tooltip={{ text: "清除掉包括本地与网络账户的全部配置文件，需谨慎！" }}
                            color="#fff" backgroundColor="#757575"
                            waves="sr-button waves-effect waves-button" 
                            onClick={ ()=>this.clear() } />
                </div>
            </div>
        )

    }

}