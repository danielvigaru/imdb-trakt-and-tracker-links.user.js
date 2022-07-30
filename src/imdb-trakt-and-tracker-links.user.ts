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
    function getIMDBid(): string | null {
        const regexImdbNum: RegExp = /\/title\/tt(\d{1,})/;
        const location = String(document.location);
        const id = regexImdbNum.exec(location)?.[1] ?? null;
        return id;
    }

    function addLinks(): void {
        const movieId = getIMDBid();

        if (!movieId) return;

        const style = "style='text-decoration:none; color:white;' target='_blank'";
        const linkRarbg = `<a ${style} href='https://rarbgmirror.org/torrents.php?imdb=tt${movieId}'">RARBG</a>`;
        const linkFilelist = `<a ${style} href='https://filelist.io/browse.php?search=tt${movieId}'">FileList</a>`;
        const linkTrakt = `<a ${style} href='https://trakt.tv/search/imdb?q=tt${movieId}'">Trakt</a>`;

        const links = document.createElement("div");
        links.innerHTML = `${linkTrakt} · ${linkFilelist} · ${linkRarbg}`;
        links.style.fontFamily = "'Roboto', sans-serif";
        links.style.fontSize = "0.9rem";

        const banner = document.querySelector("[data-testid='hero-subnav-bar-left-block']");
        banner?.prepend(links);
    }

    addLinks();
})();
