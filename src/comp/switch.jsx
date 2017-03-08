console.log( "==== simpread component: Switch ====" )

let style, styles = new Map();

const color           = "rgba(51, 51, 51, .87)",
      secondary_color = "rgba(204, 204, 204, 1)",

      thumb_color     = "rgba(245, 245, 245, 1)",
      thumbed_color   = "rgba(0, 137, 123, .8)",

      track_color     = "rgba(189, 189, 189, 1)",
      tracked_color   = "rgba(0, 137, 123, .5)";

const cssinjs = () => {

    const styles = {
        hidden: 'none',
        root: {
            display: 'flex',
            alignItems: 'center',
            position: 'relative',

            width: '100%',
            height: '45px',

            margin: 0,
            padding: 0,

            overflow: 'visible',
        },

        enable: {
            color: color,
            cursor: 'pointer',
        },

        disable: {
            color: secondary_color,
            cursor: 'not-allowed',
        },

        label: {
            display: 'block',
            width: '100%',

            fontSize: '14px',
            fontWeight: 400,

            userSelect: 'none',
            pointerEvents: 'none',
        },

        label_after: {
            textAlign: 'right',
            order: 2,
        },

        label_before: {
            textAlign: 'left',
            order: -1,
        },

        range: {
            display: 'block',
            position: 'relative',
            float: 'left',
            flexShrink: 0,

            width: '36px',

            margin: '0 0 0 8px',
            padding: '4px 0px 6px 2px',

            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        thumb: {},

        thumb_normal: {
            position: 'absolute',
            top: '1px',
            left: '0px',

            width: '20px',
            height: '20px',
            color: color,
            backgroundColor: thumb_color,

            boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
            boxSizing: 'border-box',
            borderRadius: '50%',

            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        thumbed: {
            left: '100%',
            marginLeft: '-20px',
            backgroundColor: thumbed_color,
        },

        thumb_disable: {
            left: 0,
            marginLeft: 0,
            backgroundColor: secondary_color,
        },

        track: {},

        track_normal: {
            display: 'block',
            width: '100%',
            height: '14px',

            borderRadius: '30px',
            backgroundColor: track_color,

            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        },

        tracked: {
            backgroundColor: tracked_color,
        },

    };

    return styles;
}

export default class Switch extends React.Component {

    static defaultProps = {
        checked      : false,
        disable      : false,
        width        : undefined,
        label        : "",
        order        : "before",
        thumbColor   : "",
        trackColor   : "",
        trackedColor : "",
        waves        : "",
        tooltip      : "",
    };

    static propTypes = {
        checked      : React.PropTypes.bool,
        disable      : React.PropTypes.bool,
        width        : React.PropTypes.string,
        label        : React.PropTypes.string,
        order        : React.PropTypes.string,
        thumbColor   : React.PropTypes.string,
        trackColor   : React.PropTypes.string,
        trackedColor : React.PropTypes.string,
        waves        : React.PropTypes.string,
        tooltip      : React.PropTypes.string,
        onChange     : React.PropTypes.func,
    };

    state = {
        id      : Math.round(+new Date()),
        checked : this.props.checked,
    };

    onClick() {
        !this.props.disable && this.setState({
            checked: !this.state.checked,
        });
        !this.props.disable && this.props.onChange && this.props.onChange( !this.state.checked );
    }

    render() {
        styles.set( this.state.id, cssinjs() );
        style = styles.get( this.state.id );

        if ( this.state.checked ) {
            style.thumb = { ...style.thumb_normal, ...style.thumbed };
            style.track = { ...style.track_normal, ...style.tracked };
        } else {
            style.thumb = { ...style.thumb_normal };
            style.track = { ...style.track_normal };
        }

        if ( this.props.disable ) {
            style.root  = { ...style.root, ...style.disable };
            style.thumb = { ...style.thumb, ...style.thumb_disable };
            style.track = { ...style.track_normal };
        } else {
            style.root  = { ...style.root, ...style.enable };
        }

        style.label = this.props.order == "before" ? { ...style.label, ...style.label_before } : { ...style.label, ...style.label_after };

        this.props.label == "" && ( style.label.display = style.hidden );
        this.props.width && ( style.root.width = this.props.width );

        return (
            <switch style={ style.root } onClick={ ()=>this.onClick() }>
                <span style={ style.label }>{ this.props.label }</span>
                <switch-rang style={ style.range }>
                    <thumb style={ style.thumb }></thumb>
                    <track style={ style.track }></track>
                </switch-rang>
            </switch>
        )
    }
}