/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

$('#menu-fill-color-picker').click(function () {
  var activeObj = canvas.getActiveObject();
  if (activeObj) {
    $('[data-picker=fill]').empty().append('<input type="text" class="picker fillpicker" style="color: #000; width: 207px;">');

    // enable color picker
    $('.fillpicker').spectrum({
      color: activeObj.get('fill'),
      flat: true,
      preferredFormat: "rgb",
      showAlpha: true,
      showInitial: true,
      showInput: true,
      showButtons: false,
      change: function (color) {
        activeObj.set('fill', color.toRgbString());
        canvas.renderAll();
      }
    }).spectrum("show");
  } else {
    //alertify.error('No item selected');
    return false;
  }
});