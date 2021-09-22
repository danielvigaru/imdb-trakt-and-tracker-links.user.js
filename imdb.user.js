// ==UserScript==
// @name             IMDB links
// @icon             https://www.imdb.com/favicon.ico
// @description      Links to torrents and trakt directly from imdb page
// @license          MIT
// @include          https://www.imdb.com/*
// @version          2.3.5
// @updateURL        https://raw.githubusercontent.com/danielvigaru/imdb.user.js/main/imdb.user.js
// @downloadURL      https://raw.githubusercontent.com/danielvigaru/imdb.user.js/main/imdb.user.js
// @grant            none
// ==/UserScript==

function getIMDBid() {
  let regexImdbNum = /\/title\/tt(?:0*)(\d{7})\//;
  let id = regexImdbNum.exec(document.location);
  return id[1];
}

window.onload = () => {
  let movieId = getIMDBid();

  if (movieId) {
    let linkConstructor =
      "<a style='text-decoration:none; color:white;' target='_blank'";
    let linkRarbg = `${linkConstructor} href='https://rarbgmirror.org/torrents.php?imdb=tt${movieId}'">RARBG</a>`;
    let linkFilelist = `${linkConstructor} href='https://filelist.io/browse.php?search=tt${movieId}'">FileList</a>`;
    let linkTrakt = `${linkConstructor} href='https://trakt.tv/search/imdb?q=tt${movieId}'">Trakt</a>`;

    let links = document.createElement("div");
    links.innerHTML = `${linkTrakt} · ${linkFilelist} · ${linkRarbg}`;
    links.style.fontFamily = "'Roboto','Helvetica','Arial',sans-serif";
    links.style.fontSize = ".9rem";

    let banner = document.querySelector(".SubNav__SubNavContent-sc-11106ua-3");
    banner.prepend(links);
  }
};
