console.log( "=== simpread config load ===" )

const shortcuts = {
    "fontfamily": {
        key     : "F",
        value   : [ "1", "2", "3", "4", "5" ],
        name    : [ "default", "PingFang SC", "Hiragino Sans GB", "Microsoft Yahei", "Source Han Sans CN" ]
    },
    "fontsize"  : {
        key     : "S",
        value   : [ "1", "2", "3" ],
        name    : [ "58%", "62.5%", "70%" ],
    },
    "layout"    : {
        key     : "W",
        value   : [ "1", "2", "3" ],
        name    : [ "25%", "20%", "15%" ],
    }
};

export {
    shortcuts as Shortcuts,
}