/**
 * @prettier
 */

// ==UserScript==
// @name             IMDB links
// @icon             https://www.imdb.com/favicon.ico
// @description      Links to torrents and trakt directly from imdb page
// @license          MIT
// @include          https://www.imdb.com/*
// @version          2.3.6
// @updateURL        https://raw.githubusercontent.com/danielvigaru/imdb.user.js/main/imdb.user.js
// @downloadURL      https://raw.githubusercontent.com/danielvigaru/imdb.user.js/main/imdb.user.js
// @grant            none
// ==/UserScript==

const getIMDBid = () => {
  const regexImdbNum = /\/title\/tt(\d{1,})/;
  const id = regexImdbNum.exec(document.location);
  return id[1];
};

window.onload = () => {
  const movieId = getIMDBid();

  if (movieId) {
    const linkConstructor = "<a style='text-decoration:none; color:white;' target='_blank'";
    const linkRarbg = `${linkConstructor} href='https://rarbgmirror.org/torrents.php?imdb=tt${movieId}'">RARBG</a>`;
    const linkFilelist = `${linkConstructor} href='https://filelist.io/browse.php?search=tt${movieId}'">FileList</a>`;
    const linkTrakt = `${linkConstructor} href='https://trakt.tv/search/imdb?q=tt${movieId}'">Trakt</a>`;

    const links = document.createElement('div');
    links.innerHTML = `${linkTrakt} · ${linkFilelist} · ${linkRarbg}`;
    links.style.fontFamily = "'Roboto','Helvetica','Arial',sans-serif";
    links.style.fontSize = '.9rem';

    const banner = document.querySelector('.SubNav__SubNavContent-sc-11106ua-3');
    banner.prepend(links);
  }
};
