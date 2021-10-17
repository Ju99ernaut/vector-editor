/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

$('#menu-stroke-width').click(function () {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    strokeW.MaterialSlider.change(activeObj.get('strokeWidth'))
  } else {
    //alertify.error('No item selected');
    return false;
  }
});

strokeW.onchange = function () {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    activeObj.set('strokeWidth', this.value);
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
};