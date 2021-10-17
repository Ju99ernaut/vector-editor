/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// export svg file
document.querySelector("[data-save=svg]").onclick = function () {
  // close navigation panel
  $('.mdl-layout__drawer').removeClass('is-visible');
  $('.mdl-layout__obfuscator').removeClass('is-visible');

  var yourSVG = canvas.toSVG();

  console.log('====================================');
  console.log(yourSVG);
  console.log('====================================');
  //saveAs(blob, projectname + ".svg");
};