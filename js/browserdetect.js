/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// Detect browser support onload
function unsupportedBrowser() {
  alertify.log("You are using an unsupported browser!");
  setTimeout(function() {
    alertify.log('We recommend using <a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a>');
  }, 2000);
}
if (bowser.msie && bowser.version <= 6) {
  // hello ie
  unsupportedBrowser();
} else if (bowser.firefox) {
  // hello firefox
  unsupportedBrowser();
} else if (bowser.chrome) {
  // hello chrome
} else if (bowser.safari) {
  // hello safari
  unsupportedBrowser();
} else if(bowser.iphone || bowser.android) {
  // hello mobile
  unsupportedBrowser();
}