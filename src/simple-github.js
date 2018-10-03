export function updateSearch(q, callback, page) {
  const scriptTag = document.createElement('SCRIPT');
  let url = "https://api.github.com/search/users?"
    + `&q=${ q }`
    + `&callback=${ callback }`;

  if (page) {
    url += `&page=${ page }`;
  }

  console.log(url);

  scriptTag.src = url;

  document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
}