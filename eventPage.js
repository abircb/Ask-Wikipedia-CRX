var id = "wiki";
var title = "Ask Wikipedia";
var contexts = ["selection"];
chrome.contextMenus.create({
  "id": id,
  "title": title,
  "contexts": contexts
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
  return str;
}
