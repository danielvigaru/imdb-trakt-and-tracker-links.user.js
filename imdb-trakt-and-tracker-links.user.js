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
        const regexImdbNum = /\/title\/tt(\d{1,})/;
        const location = String(document.location);
        const id = regexImdbNum.exec(location)?.[1] ?? null;
        return id;
    }

    const movieId = getIMDBid();
    if (!movieId) return;

    function setStyles(element, stylesObj) {
        for (const property in stylesObj) {
            element.style[property] = stylesObj[property];
        }
    }

    function createLink(name, url) {
        const linkElement = document.createElement("a");
        linkElement.text = name;
        linkElement.href = url;
        linkElement.target = "_blank";

        setStyles(linkElement, {
            "text-decoration": "none",
            color: "white",
        });

        return linkElement;
    }

    const linkTrakt = createLink("Trakt", `https://trakt.tv/search/imdb?q=tt${movieId}`);
    const linkRarbg = createLink("RARBG", `https://rarbgmirror.org/torrents.php?imdb=tt${movieId}`);
    const linkFilelist = createLink(
        "FileList",
        `https://filelist.io/browse.php?search=tt${movieId}`
    );

    const separator = document.createElement("span");
    separator.textContent = "·";

    const links = document.createElement("div");
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

    const banner = document.querySelector("[data-testid='hero-subnav-bar-left-block']");
    banner?.prepend(links);
})();
