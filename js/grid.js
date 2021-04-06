/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// toggle grid
document.querySelector("[data-toggle=grid]").onclick = function() {
  var elm = document.querySelector("[data-toggle=grid] .material-icons");

//  if (elm.textContent === "grid_on") {
//    var svg = document.querySelector("[data-grab=svg] canvas");
//    svg.style.background = "none";
//
//    elm.textContent = "grid_off";
//  } else {
//    var svg = document.querySelector("[data-grab=svg] canvas");
//    svg.style.backgroundImage = "url('images/grid-transparent.png')";
//
//    elm.textContent = "grid_on";
//  }
  
  if (elm.textContent === "grid_on") {
    var svg = document.querySelector("[data-grab=svg] canvas");
    svg.style.background = "none";

    elm.textContent = "grid_off";
  } else {
    var svg = document.querySelector("[data-grab=svg] canvas");
    svg.style.backgroundImage = "url('images/grid-transparent.png')";

    elm.textContent = "grid_on";
  }
};
