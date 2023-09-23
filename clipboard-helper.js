function copyToClipboard(title, url) {
    function oncopy(event) {
        document.removeEventListener("copy", oncopy, true);

        event.stopImmediatePropagation();

        const text = title + "\n" + url;

        const safeUrl = escapeHTML(url)
        const html = `<a href="${safeUrl}">${title}</a>`

        event.preventDefault();
        event.clipboardData.setData("text/plain", text);
        event.clipboardData.setData("text/html", html);
    }
    document.addEventListener("copy", oncopy, true);

    document.execCommand("copy");
}

// https://gist.github.com/Rob--W/ec23b9d6db9e56b7e4563f1544e0d546
function escapeHTML(str) {
    // Note: string cast using String; may throw if `str` is non-serializable, e.g. a Symbol.
    // Most often this is not the case though.
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        .replace(/</g, "&lt;").replace(/>/g, "&gt;");
}