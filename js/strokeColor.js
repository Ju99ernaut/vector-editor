/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

$('#menu-stroke-color-picker').click(function () {
  var activeObj = canvas.getActiveObject();
  if (activeObj) {
    var defaultColor = tinycolor(activeObj.get('stroke'));
    defaultColor = defaultColor.toRgbString();
    $('[data-picker=stroke]').empty().append('<input type="text" class="picker strokepicker" value="' + defaultColor + '" data-opacty="1" style="color: #000; width: 207px;">');

    // enable color picker
    $('.strokepicker').minicolors({
      format: "rgb",
      opacity: true,
      show: true,
      position: "bottom left",
      change: function (value, opacity) {
        activeObj.set('stroke', this.value);
        canvas.renderAll();
      }
    }).minicolors("show", true);
  } else {
    //alertify.error('No item selected');
    return false;
  }
});