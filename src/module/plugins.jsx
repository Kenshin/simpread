console.log( "===== simpread option labs load =====" )

import {storage} from 'storage';
import * as run  from 'runtime';

import Button    from 'button';

export default class PluginsOpt extends React.Component {
    render() {
        return (
            <div id="labs" style={{ width: '100%' }}>
                <div className="label">全局</div>
                <div className="lab">
                    
                </div>

                <div className="label">管理</div>
                <div style={{ 'padding-top': '10px' }} className="lab">
                    
                </div>

            </div>
        )
    }
}
