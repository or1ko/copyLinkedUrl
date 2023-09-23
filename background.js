
browser.menus.create({
    id: "copy-title-and-url",
    title: browser.i18n.getMessage("copyTitleAndLink"),
    contexts: ["link", "page"],
});

function copyToClipboard(title, url, tabId) {

    const code = "copyToClipboard(" +
        JSON.stringify(title) + "," +
        JSON.stringify(url) + ");";

    browser.tabs.executeScript({
        code: "typeof copyToClipboard === 'function';",
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
            const title = tab.title;
            const url = info.pageUrl;
            copyToClipboard(title, url, tab.id);
            break;
    }
});
