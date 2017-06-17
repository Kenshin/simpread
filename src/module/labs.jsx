console.log( "===== simpread option labs load =====" )

import Switch from 'switch';

export default class LabsOpt extends React.Component {
    render() {
        return (
            <div id="labs" style={{ width: '80%' }}>
                <div>
                    <div className="label">阅读模式</div>
                    <Switch width="100%"
                            thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                            label="是否隐藏阅读进度？" />
                    <Switch width="100%" checked="true" 
                            thumbedColor="#3F51B5" trackedColor="#7986CB"  waves="md-waves-effect"
                            label="是否一直显示右下角的控制栏？"/>
                    <Switch width="100%" 
                            thumbedColor="#3F51B5" trackedColor="#7986CB" 
                            label="如果当前页面适配阅读模式，是否自动进入阅读模式？" />
                </div>

                <div style={{ padding: '21px 0;' }}>
                    <div className="label">聚焦模式</div>
                    <Switch width="100%" 
                            thumbedColor="#3F51B5" trackedColor="#7986CB"  waves="md-waves-effect"
                            label="聚焦模式是否启用点击遮罩退出功能？" />
                </div>

                <div>
                    <div className="label">杂项</div>
                    <Switch width="100%" 
                            thumbedColor="#3F51B5" trackedColor="#7986CB"  waves="md-waves-effect"
                            label="是否启用 「ESC」 退出方式？" />
                </div>
            </div>
        )
    }
}