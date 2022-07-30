"use strict";
// ==UserScript==
// @name             IMDB links
// @icon             https://www.imdb.com/favicon.ico
// @description      Links to torrents and trakt directly from imdb page
// @license          MIT
// @include          https://www.imdb.com/*
// @version          2.4.0
// @updateURL        https://github.com/danielvigaru/imdb-trakt-and-tracker-links.user.js/raw/main/imdb-trakt-and-tracker-links.user.js
// @downloadURL      https://github.com/danielvigaru/imdb-trakt-and-tracker-links.user.js/raw/main/imdb-trakt-and-tracker-links.user.js
// @homepageURL      https://github.com/danielvigaru/imdb-trakt-and-tracker-links.user.js
// @grant            none
// ==/UserScript==
(function () {
    function getIMDBid() {
        var _a, _b;
        var regexImdbNum = /\/title\/tt(\d{1,})/;
        var location = String(document.location);
        var id = (_b = (_a = regexImdbNum.exec(location)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : null;
        return id;
    }
    function addLinks() {
        var movieId = getIMDBid();
        if (!movieId)
            return;
        var style = "style='text-decoration:none; color:white;' target='_blank'";
        var linkRarbg = "<a ".concat(style, " href='https://rarbgmirror.org/torrents.php?imdb=tt").concat(movieId, "'\">RARBG</a>");
        var linkFilelist = "<a ".concat(style, " href='https://filelist.io/browse.php?search=tt").concat(movieId, "'\">FileList</a>");
        var linkTrakt = "<a ".concat(style, " href='https://trakt.tv/search/imdb?q=tt").concat(movieId, "'\">Trakt</a>");
        var links = document.createElement("div");
        links.innerHTML = "".concat(linkTrakt, " \u00B7 ").concat(linkFilelist, " \u00B7 ").concat(linkRarbg);
        links.style.fontFamily = "'Roboto', sans-serif";
        links.style.fontSize = "0.9rem";
        var banner = document.querySelector("[data-testid='hero-subnav-bar-left-block']");
        banner === null || banner === void 0 ? void 0 : banner.prepend(links);
    }
    addLinks();
})();
