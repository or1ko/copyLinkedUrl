
browser.menus.create({
    id: "copy-title-and-url",
    title: browser.i18n.getMessage("copyTitleAndLink"),
    contexts: ["link", "page"],
});

browser.menus.create({
    id: "copy-selection-with-title-and-url",
    title: browser.i18n.getMessage("copySelectedTextWithTitleAndLink"),
    contexts: ["selection"],
});

function linkCode(title, url) {
    return "copyToClipboard(" +
        JSON.stringify(title) + "," +
        JSON.stringify(url) + ");";
}

function citationCode(text, title, url) {
    return "copyCitationToClipboard(" +
        JSON.stringify(text) + "," +
        JSON.stringify(title) + "," +
        JSON.stringify(url) + ");";
}

function copyToClipboard(code, fname, tabId) {
    browser.tabs.executeScript({
        code: "typeof " + fname + " === 'function';",
    }).then((results) => {
        if (!results || results[0] !== true) {
            return browser.tabs.executeScript(tabId, {
                file: "clipboard-helper.js",
            });
        }
    }).then(() => {
        return browser.tabs.executeScript(tabId, {
            code,
        });
    }).catch((error) => {
        console.error(error);
    });
}

browser.menus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "copy-title-and-url":
        case "copy-selection-with-title-and-url":
            const title = tab.title;
            const url = info.pageUrl;

            if (info.menuItemId == "copy-title-and-url") {
                const code = linkCode(title, url);
                copyToClipboard(code, "copyCitation", tab.id)
            } else {
                const text = info.selectionText;
                const code = citationCode(text, title, url);
                copyToClipboard(code, "copyCitationToClipboard", tab.id);
            }
            break;
    }
});
