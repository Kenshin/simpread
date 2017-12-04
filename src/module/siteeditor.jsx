console.log( "=== simpread option siteeditor ===" )

import { storage }  from 'storage';

import Button       from 'button';
import * as tooltip from 'tooltip';
import * as waves   from 'waves';
import * as dia     from 'dialog';

const root   = "simpread-option-root",
      rootjq = `.${root}`;

/**
 * SiteEditor Rect component
 */
class SiteEditor extends React.Component {

    close() {
        dia.Close();
    }

    // save siteeditor focus option
    save() {
        console.log( "siteeditor click submit button.", storage.current )
    }

    componentDidMount() {
        waves.Render({ root: rootjq });
        tooltip.Render( rootjq );
    }

    render() {
        return (
            <dia.Dialog>
                <dia.Content>
                    Site Editor
                </dia.Content>
                <dia.Footer>
                    <Button text="取 消" mode="secondary" waves="md-waves-effect" onClick={ ()=>this.close() } />
                    <Button text="确 认" waves="md-waves-effect" onClick={ ()=>this.save() } />
                </dia.Footer>
            </dia.Dialog>
        )
    }
}

/**
 * Modals Render
 */
function Render() {
    !dia.Popup( rootjq ) && dia.Open( <SiteEditor/>, root );
}

/**
 * Exist
 * 
 * @return {boolean}
 */
function Exist() {
    return dia.Popup( rootjq );
}

/**
 * Exit
 */
function Exit() {
    dia.Close();
}

export{ Render, Exist, Exit }