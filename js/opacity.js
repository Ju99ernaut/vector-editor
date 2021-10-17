/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

$('#menu-opacity').click(function () {
  const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    opac.MaterialSlider.change(activeObj.get('opacity'));
  } else {
    //alertify.error('No item selected');
    return false;
  }
});

opac.onchange = function () {
  const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    activeObj.set('opacity', this.value);
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
};