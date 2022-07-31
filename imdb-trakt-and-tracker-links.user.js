"use strict";
// ==UserScript==
// @name             IMDB links
// @icon             https://www.imdb.com/favicon.ico
// @description      Links to torrents and trakt directly from imdb page
// @license          MIT
// @include          https://www.imdb.com/*
// @version          2.4.1
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
    var movieId = getIMDBid();
    if (!movieId)
        return;
    function setStyles(element, stylesObj) {
        for (var property in stylesObj) {
            element.style[property] = stylesObj[property];
        }
    }
    function createLink(name, url) {
        var linkElement = document.createElement("a");
        linkElement.text = name;
        linkElement.href = url;
        linkElement.target = "_blank";
        setStyles(linkElement, {
            "text-decoration": "none",
            color: "white",
        });
        return linkElement;
    }
    var linkTrakt = createLink("Trakt", "https://trakt.tv/search/imdb?q=tt".concat(movieId));
    var linkRarbg = createLink("RARBG", "https://rarbgmirror.org/torrents.php?imdb=tt".concat(movieId));
    var linkFilelist = createLink("FileList", "https://filelist.io/browse.php?search=tt".concat(movieId));
    var separator = document.createElement("span");
    separator.textContent = "·";
    var links = document.createElement("div");
    links.appendChild(linkTrakt);
    links.appendChild(separator.cloneNode(true));
    links.appendChild(linkFilelist);
    links.appendChild(separator.cloneNode(true));
    links.appendChild(linkRarbg);
    setStyles(links, {
        "font-family": "'Roboto', sans-serif",
        "font-size": "0.9rem",
        display: "flex",
        gap: "1ch",
    });
    var banner = document.querySelector("[data-testid='hero-subnav-bar-left-block']");
    banner === null || banner === void 0 ? void 0 : banner.prepend(links);
})();
