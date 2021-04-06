/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// export png file
document.querySelector("[data-save=png]").onclick = function() {
  var c = document.getElementById("canvas");
  var link = document.createElement('a');
  link.setAttribute('download', 'download.png');
  link.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();
};