console.log( "=== simpread message load ===" )

const action = {
    focus_mode     : "focus",
    read_mode      : "read",
    shortcuts      : "shortcuts",
    browser_action : "browser_action",
    tab_selected   : "tab_selected",
    new_tab        : "new_tab",
    menu           : "menu",
    updated        : "updated",
    save_verify    : "save_verify",
    redirect_uri   : "redirect_uri",
};

/**
 * Add message object
 * 
 * @param {string} @see action
 * @param {object} { code,url }
 */
function add( type, value = {} ) {
    return { type, value };
}

export {
    add    as Add,
    action as MESSAGE_ACTION
}