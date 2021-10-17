/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

$('#menu-stroke-color-picker').click(function () {
  const activeObj = canvas.getActiveObject();
  if (activeObj) {
    $('[data-picker=stroke]').empty().append('<input type="text" class="picker strokepicker" data-opacty="1" style="color: #000; width: 207px;">');

    // enable color picker
    $('.strokepicker').spectrum({
      color: activeObj.get('stroke'),
      flat: true,
      preferredFormat: "rgb",
      showAlpha: true,
      showInitial: true,
      showInput: true,
      showButtons: false,
      change: function (color) {
        activeObj.set('stroke', color.toRgbString());
        canvas.renderAll();
      }
    }).spectrum("show");
  } else {
    //alertify.error('No item selected');
    return false;
  }
});