/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

// initialize new project
document.querySelector("[data-new=project]").onclick = function() {
  // close navigation panel
  $('.mdl-layout__drawer').removeClass('is-visible');
  $('.mdl-layout__obfuscator').removeClass('is-visible');
  
  swal({
    title: 'Are you sure you want to reload?',
    text: "You will loose all your work and you won't be able to revert this!",
    type: 'warning',
    showCancelButton: true
  }).then((result) => {
    if (result.value) {
      clearCanvas();
    }
  })
};