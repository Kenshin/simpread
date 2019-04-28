console.log( "=== simpread message load ===" )

const action = {
    focus_mode     : "focus",
    read_mode      : "read",
    shortcuts      : "shortcuts",
    browser_action : "browser_action",
    browser_click  : "browser_click",
    tab_selected   : "tab_selected",
    new_tab        : "new_tab",
    close_tab      : "close_tab",
    menu           : "menu",
    menu_whitelist : "menu_whitelist",
    updated        : "updated",
    save_verify    : "save_verify",
    storage        : "storage",         // only firefox
    // about export and auth
    auth           : "auth",
    auth_success   : "auth_success",
    export         : "export",
    redirect_uri   : "redirect_uri",
    // dyslexia
    speak          : "speak",
    speak_stop     : "speak_stop",
    // track
    track          : "track",
    // site
    update_site    : "update_site",
    pending_site   : "pending_site",
    save_site      : "save_site",
    temp_site      : "temp_site",
    // corb
    CORB           : "corb",
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