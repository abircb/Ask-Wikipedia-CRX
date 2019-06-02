var title = "Ask Wikipedia";
var contexts = ["selection"];
chrome.contextMenus.create({
  "title": title,
  "contexts": contexts,
  "id": "wiki"
});

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if (clickData.menuItemId == "wiki" && clickData.selectionText){
        var searchKey = disambiguate(clickData.selectionText);
        var wikiUrl = "https://en.wikipedia.org/wiki/Special:Search/" + fixedEncodeURI(searchKey);
        var createProperties = {
          "url": wikiUrl
        };
        chrome.tabs.create(createProperties, function(){});
    }
});

function disambiguate (str) {
  str = (str.toLowerCase()).trim();
  n = str.length;
  lastCharCode = str.charCodeAt(n-1);

  if(lastCharCode > 43 && lastCharCode < 46) {
    if(n > 1) str = str.slice(0, n-1);
  }
  if(includesSpecialChar(str)) {
    if(n > 2) return 'Special Characters';
  }
  return str;
}

function includesSpecialChar (str) {
    var regex = RegExp(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g);

    if(regex.test(str)) return true;
    return false;
}
