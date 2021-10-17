/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// variables
let _w, _h;

// open/close project settings
//TweenMax.set("[data-projectSettings]", {xPercent:-50, left:"50%", yPercent:-50, top:"50%", position: "absolute"});
//$("[data-open=projectSettings]").click(function () {
//  var elm = $("[data-play=animation] .material-icons");
//  if (elm.text() === "stop") {
//    $("[data-play=animation]").click();
//  }
//
//  $(".projectsettingsbg").fadeIn();
//  $("[data-projectSettings]").fadeIn();
//  $('.mdl-layout__drawer').removeClass('is-visible');
//  $('.mdl-layout__obfuscator').removeClass('is-visible');
//});
//$("[data-close=projectSettings]").click(function () {
//  $(".projectsettingsbg").fadeOut();
//  $("[data-projectSettings]").fadeOut();
//});

function updateCanvasSize() {
  const cC = document.querySelector('[data-canvas]');
  _w = $("[data-project=width]")[0].value;
  _h = $("[data-project=height]")[0].value;
  document.getElementById('canvas').width = _w;
  document.getElementById('canvas').height = _h;
  canvas.setDimensions({ width: _w, height: _h });
  cC.style.marginLeft = '-' + parseInt(_w / 2) + 'px';
  cC.style.marginTop = '-' + parseInt(_h / 2) + 'px';
}
updateCanvasSize();

$("[data-project=width], [data-project=height]").on('change keyup', function () {
  updateCanvasSize();
});