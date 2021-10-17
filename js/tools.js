/*
  Version: 0.0.1
  vector-editor, copyright (c) by Michael Schwartz
  Distributed under an MIT license: https://github.com/michaelsboost/vector-editor/blob/gh-pages/LICENSE
  
  This is vector-editor (https://michaelsboost.github.io/vector-editor/), A free open source vector design app
*/

function initCanvas() {
  $('.canvas-container').each(function (index) {

    var canvasContainer = $(this)[0];
    var canvasObject = $("canvas", this)[0];

    var imageOffsetX, imageOffsetY;

    function handleDragStart(e) {
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
      this.classList.add('img_dragging');
      var imageOffset = $(this).offset();
      imageOffsetX = e.clientX - imageOffset.left;
      imageOffsetY = e.clientY - imageOffset.top;
    }

    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'copy';
      return false;
    }

    function handleDragEnter(e) {
      this.classList.add('over');
    }

    function handleDragLeave(e) {
      this.classList.remove('over');
    }

    function handleDrop(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      var img = document.querySelector('.furniture img.img_dragging');
      console.log('event: ', e);

      var offset = $(canvasObject).offset();
      var y = e.clientY - (offset.top + imageOffsetY);
      var x = e.clientX - (offset.left + imageOffsetX);

      var newImage = new fabric.Image(img, {
        width: img.width,
        height: img.height,
        left: x,
        top: y
      });
      canvas.add(newImage);
      return false;
    }

    function handleDragEnd(e) {
      [].forEach.call(images, function (img) {
        img.classList.remove('img_dragging');
      });
    }

    var images = document.querySelectorAll('.furniture img');
    [].forEach.call(images, function (img) {
      img.addEventListener('dragstart', handleDragStart, false);
      img.addEventListener('dragend', handleDragEnd, false);
    });
    canvasContainer.addEventListener('dragenter', handleDragEnter, false);
    canvasContainer.addEventListener('dragover', handleDragOver, false);
    canvasContainer.addEventListener('dragleave', handleDragLeave, false);
    canvasContainer.addEventListener('drop', handleDrop, false);
  });
}
initCanvas();

var canvas = new fabric.Canvas('canvas', {
  selection: false,
  preserveObjectStacking: true
});
fabric.Object.prototype.set({
  transparentCorners: false,
});

var current;
var list = [];
var state = [];
var index = 0;
var index2 = 0;
var action = false;
var refresh = true;

canvas.on("object:added", function (e) {
  var object = e.target;
  console.log('object:modified');

  if (action === true) {
    state = [state[index2]];
    list = [list[index2]];

    action = false;
    console.log(state);
    index = 1;
  }
  object.saveState();

  console.log(object.originalState);
  state[index] = JSON.stringify(object.originalState);
  list[index] = object;
  index++;
  index2 = index - 1;

  refresh = true;
});
canvas.on("object:modified", function (e) {
  var object = e.target;
  console.log('object:modified');

  if (action === true) {
    state = [state[index2]];
    list = [list[index2]];

    action = false;
    console.log(state);
    index = 1;
  }

  object.saveState();

  state[index] = JSON.stringify(object.originalState);
  list[index] = object;
  index++;
  index2 = index - 1;

  console.log(state);
  refresh = true;
});

function copy() {
  // clone what are you copying since you
  // may want copy and paste on different moment.
  // and you do not want the changes happened
  // later to reflect on the copy.
  canvas.getActiveObject().clone(function (cloned) {
    _clipboard = cloned;
  });
}
function paste() {
  // clone again, so you can do multiple copies.
  _clipboard.clone(function (clonedObj) {
    canvas.discardActiveObject();
    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
      // active selection needs a reference to the canvas.
      clonedObj.canvas = canvas;
      clonedObj.forEachObject(function (obj) {
        canvas.add(obj);
      });
      // this should solve the unselectability
      clonedObj.setCoords();
    } else {
      canvas.add(clonedObj);
    }
    _clipboard.top += 10;
    _clipboard.left += 10;
    canvas.setActiveObject(clonedObj);
    canvas.requestRenderAll();
  });
}
function duplicate() {
  copy();
  paste();
}
function remove() {
  canvas.getActiveObjects().forEach((obj) => {
    canvas.remove(obj)
  });
  canvas.discardActiveObject().renderAll()
}

function flipH() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    var currentFlip = activeObj.get('flipX')
    if (currentFlip === true) {
      activeObj.set('flipX', false)
    } else {
      activeObj.set('flipX', true)
    }
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function flipV() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    var currentFlip = activeObj.get('flipY')
    if (currentFlip === true) {
      activeObj.set('flipY', false)
    } else {
      activeObj.set('flipY', true)
    }
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function rotateCW() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    var currentAngle = activeObj.get('angle')
    //    activeObj.set('originX', "center")
    //    activeObj.set('originY', "center")
    activeObj.set('angle', currentAngle + 90)
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function rotateCCW() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    var currentAngle = activeObj.get('angle')
    //    activeObj.set('originX', "center")
    //    activeObj.set('originY', "center")
    activeObj.set('angle', currentAngle - 90)
    activeObj.setCoords();
    canvas.renderAll();
  }
}

// Align the selected object
function process_align(val, activeObj) {
  //Override fabric transform origin to center
  fabric.Object.prototype.set({
    originX: 'center',
    originY: 'center',
  });

  const bound = activeObj.getBoundingRect()

  switch (val) {
    case 'left':
      activeObj.set({
        left: activeObj.left - bound.left
      });
      break;
    case 'right':
      activeObj.set({
        left: canvas.width - bound.width / 2
      });
      break;
    case 'top':
      activeObj.set({
        top: activeObj.top - bound.top
      });
      break;
    case 'bottom':
      activeObj.set({
        top: canvas.height - bound.height / 2
      });
      break;
    case 'center':
      activeObj.set({
        left: canvas.width / 2
      });
      break;
    case 'middle':
      activeObj.set({
        top: canvas.height / 2
      });
      break;
  }
}

// Assign alignment
function alignLeft() {
  var cur_value = 'left';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
};
function alignCenter() {
  var cur_value = 'center';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    activeObj.set('originX', 'center');
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
}
function alignRight() {
  var cur_value = 'right';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    activeObj.set('originX', 'center');
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
}
function alignTop() {
  var cur_value = 'top';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    activeObj.set('originY', 'top');
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
}
function alignMiddle() {
  var cur_value = 'middle';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    activeObj.set('originY', 'center');
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
}
function alignBottom() {
  var cur_value = 'bottom';
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (cur_value != '' && activeObj) {
    activeObj.set('originY', 'center');
    process_align(cur_value, activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  } else {
    //alertify.error('No item selected');
    return false;
  }
}

var objectToSendBack;
canvas.on("selection:created", function (event) {
  objectToSendBack = event.target;
  $('.isselected').removeClass('hide');
});
canvas.on("selection:updated", function (event) {
  objectToSendBack = event.target;
});
canvas.on('selection:cleared', function () {
  $('.isselected').addClass('hide');
});
function sendBackwards() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    canvas.sendBackwards(activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function sendToBack() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    canvas.sendToBack(activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function bringForward() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    canvas.bringForward(activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function bringToFront() {
  var activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
  if (activeObj) {
    canvas.bringToFront(activeObj);
    activeObj.setCoords();
    canvas.renderAll();
  }
}
function ungroup() {
  var activeObject = canvas.getActiveObject();
  if (activeObject.type == "group") {
    var items = activeObject._objects;
    activeObject._restoreObjectsState();
    canvas.remove(activeObject);
    for (var i = 0; i < items.length; i++) {
      canvas.add(items[i]);
      canvas.item(canvas.size() - 1).hasControls = true;
    }

    canvas.renderAll();
  }
}

// zooming and panning
(function () {
  function renderVieportBorders() {
    var ctx = canvas.getContext();

    ctx.save();

    ctx.fillStyle = 'rgba(0,0,0,0.1)';

    ctx.fillRect(
      canvas.viewportTransform[4],
      canvas.viewportTransform[5],
      canvas.getWidth() * canvas.getZoom(),
      canvas.getHeight() * canvas.getZoom());

    ctx.setLineDash([5, 5]);

    ctx.strokeRect(
      canvas.viewportTransform[4],
      canvas.viewportTransform[5],
      canvas.getWidth() * canvas.getZoom(),
      canvas.getHeight() * canvas.getZoom());

    ctx.restore();
  }
  canvas.on('object:selected', function (opt) {
    var target = opt.target;
    if (target._cacheCanvas) {

    }
  })


  canvas.on('mouse:wheel', function (opt) {
    var e = opt.e;
    if (!e.ctrlKey) {
      return;
    }
    var newZoom = canvas.getZoom() - e.deltaY / 300;
    canvas.zoomToPoint({ x: e.offsetX, y: e.offsetY }, newZoom);

    renderVieportBorders();
    e.preventDefault();
    return false;
  });

  var viewportLeft = 0,
    viewportTop = 0,
    mouseLeft,
    mouseTop,
    _drawSelection = canvas._drawSelection,
    isDown = false;

  canvas.on('mouse:down', function (options) {
    if (options.e.altKey) {
      isDown = true;

      viewportLeft = canvas.viewportTransform[4];
      viewportTop = canvas.viewportTransform[5];

      mouseLeft = options.e.x;
      mouseTop = options.e.y;
      _drawSelection = canvas._drawSelection;
      canvas._drawSelection = function () { };
      renderVieportBorders();
    }
  });
  canvas.on('mouse:move', function (options) {
    if (options.e.altKey && isDown) {
      var currentMouseLeft = options.e.x;
      var currentMouseTop = options.e.y;

      var deltaLeft = currentMouseLeft - mouseLeft,
        deltaTop = currentMouseTop - mouseTop;

      canvas.viewportTransform[4] = viewportLeft + deltaLeft;
      canvas.viewportTransform[5] = viewportTop + deltaTop;

      canvas.renderAll();
      renderVieportBorders();
    }
  });
  canvas.on('mouse:up', function () {
    canvas._drawSelection = _drawSelection;
    isDown = false;
  });
})();

// touch gestures
var info = document.createTextNode("p");
canvas.on({
  'touch:gesture': function () {
    var text = document.createTextNode(' Gesture ');
    info.insertBefore(text, info.firstChild);
  },
  'touch:drag': function () {
    var text = document.createTextNode(' Dragging ');
    info.insertBefore(text, info.firstChild);
  },
  'touch:orientation': function () {
    var text = document.createTextNode(' Orientation ');
    info.insertBefore(text, info.firstChild);
  },
  'touch:shake': function () {
    var text = document.createTextNode(' Shaking ');
    info.insertBefore(text, info.firstChild);
  },
  'touch:longpress': function () {
    var text = document.createTextNode(' Longpress ');
    info.insertBefore(text, info.firstChild);
  }
});

// tools
var line, isDown;
function drawLine() {
  removeEvents();
  changeObjectSelection(false);
  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    line = new fabric.Line(points, {
      strokeWidth: 1,
      stroke: 'black',
      originX: 'center',
      originY: 'center',
      selectable: false,
      transparentCorners: false
    });
    canvas.add(line);
  });
  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    line.set({
      x2: pointer.x,
      y2: pointer.y
    });
    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    line.setCoords();
  });
}
function drawRect() {
  var rect, isDown, origX, origY;
  removeEvents();
  changeObjectSelection(false);

  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    rect = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      selectable: false,
      fill: `hsl(${Math.random() * 260}, 100%, 80%)`,
      stroke: 'black',
      strokeWidth: 1,
      transparentCorners: false
    });
    canvas.add(rect);
  });
  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      rect.set({
        left: Math.abs(pointer.x)
      });
    }
    if (origY > pointer.y) {
      rect.set({
        top: Math.abs(pointer.y)
      });
    }

    rect.set({
      width: Math.abs(origX - pointer.x)
    });
    rect.set({
      height: Math.abs(origY - pointer.y)
    });


    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    rect.setCoords();
  });
}
function drawCircle() {
  var circle, isDown, origX, origY;
  removeEvents();
  changeObjectSelection(false);
  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    circle = new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 1,
      strokeWidth: 1,
      fill: `hsl(${Math.random() * 260}, 100%, 80%)`,
      stroke: 'black',
      selectable: false,
      transparentCorners: false,
      originX: 'center',
      originY: 'center'
    });
    canvas.add(circle);
  });
  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    circle.set({
      radius: Math.abs(origX - pointer.x)
    });
    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    circle.setCoords();
  });
}
function drawEllipse() {
  var ellipse, isDown, origX, origY;
  removeEvents();
  changeObjectSelection(false);
  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    ellipse = new fabric.Ellipse({
      left: pointer.x,
      top: pointer.y,
      rx: pointer.x - origX,
      ry: pointer.y - origY,
      angle: 0,
      fill: `hsl(${Math.random() * 260}, 100%, 80%)`,
      strokeWidth: 1,
      stroke: 'black',
      selectable: false,
      transparentCorners: false,
      originX: 'center',
      originY: 'center'
    });
    canvas.add(ellipse);
  });
  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);
    var rx = Math.abs(origX - pointer.x) / 2;
    var ry = Math.abs(origY - pointer.y) / 2;
    if (rx > ellipse.strokeWidth) {
      rx -= ellipse.strokeWidth / 2
    }
    if (ry > ellipse.strokeWidth) {
      ry -= ellipse.strokeWidth / 2
    }
    ellipse.set({ rx: rx, ry: ry });

    if (origX > pointer.x) {
      ellipse.set({ originX: 'right' });
    } else {
      ellipse.set({ originX: 'left' });
    }
    if (origY > pointer.y) {
      ellipse.set({ originY: 'bottom' });
    } else {
      ellipse.set({ originY: 'top' });
    }
    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    ellipse.setCoords();
  });
}
function drawText() {
  var text, isDown, origX, origY;
  removeEvents();
  changeObjectSelection(false);
  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    text = new fabric.Text("Your text here", {
      left: pointer.x,
      top: pointer.y,
      fontFamily: 'Open Sans',
      //textAlign: 'center',
      angle: 0,
      strokeWidth: 0,
      fill: `hsl(${Math.random() * 260}, 100%, 80%)`,
      selectable: false,
      transparentCorners: false,
      originX: 'left',
      originY: 'top'
    });
    canvas.add(text);
    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    text.setCoords();
  });
}
function drawTriangle() {
  var triangle, isDown, origX, origY;
  removeEvents();
  changeObjectSelection(false);
  canvas.on('mouse:down', function (o) {
    isDown = true;
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    triangle = new fabric.Triangle({
      left: pointer.x,
      top: pointer.y,
      width: pointer.x - origX,
      height: pointer.y - origY,
      strokeWidth: 1,
      fill: `hsl(${Math.random() * 260}, 100%, 80%)`,
      stroke: 'black',
      strokeWidth: 1,
      selectable: false,
      transparentCorners: false,
      originX: 'left',
      originY: 'top'
    });
    canvas.add(triangle);
  });
  canvas.on('mouse:move', function (o) {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      triangle.set({
        left: Math.abs(pointer.x)
      });
    }
    if (origY > pointer.y) {
      triangle.set({
        top: Math.abs(pointer.y)
      });
    }

    triangle.set({
      width: Math.abs(origX - pointer.x)
    });
    triangle.set({
      height: Math.abs(origY - pointer.y)
    });


    canvas.renderAll();
  });
  canvas.on('mouse:up', function (o) {
    isDown = false;
    triangle.setCoords();
  });

}
function enableFreeDrawing() {
  removeEvents();
  canvas.isDrawingMode = true;
}
function enableSelection() {
  removeEvents();
  changeObjectSelection(true);
  canvas.selection = true;
}
function unselect() {
  removeEvents();
  changeObjectSelection(false);
  canvas.selection = false;
}
function changeObjectSelection(value) {
  canvas.forEachObject(function (obj) {
    obj.selectable = value;
  });
  canvas.renderAll();
}
function removeEvents() {
  canvas.isDrawingMode = false;
  canvas.selection = false;
  canvas.off('mouse:down');
  canvas.off('mouse:up');
  canvas.off('mouse:move');
}

// toggle properties for selected item
$('[data-properties=icon]').click(function () {
  $('[data-menu=icons]').toggle();
  $('[data-properties=group]').toggle();
});

// change tool
$("[data-change=tool]").click(function () {
  var clickedTool = $(this).find("span");
  var elmChange = $("[data-active=tool]");

  if (clickedTool.text().trim() === "Pointer") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "touch_app") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Brush") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "timeline") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Line") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Rectangle") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Ellipse") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Text") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "Zoom") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else if (clickedTool.text().trim() === "pan_tool") {
    // show tool on menubar
    elmChange.html($(this).find('svg')[0].outerHTML).attr("style", "");

    // make tool active menubar
    $("[data-toolName]").attr("data-toolName", $(this).find("span").text().trim());

    // initiate tool
    detectTool();
  } else {
    //alertify.error("Error 001: Sorry we're unable to change your tool");
    return false;
  }
});

function detectTool() {
  var activeTool = $("[data-toolName]").attr("data-toolName").toString().toLowerCase();
  if ($(".zoomicon").is(":visible")) {
    $(".zoomicon").addClass("hide");
  }

  if (activeTool === "pointer") {
    enableSelection();
    return false;
  } else
    if (activeTool === "line") {
      drawLine();
      return false;
    } else
      if (activeTool === "rectangle") {
        drawRect();
        return false;
      } else
        if (activeTool === "ellipse") {
          drawEllipse();
          return false;
        } else
          if (activeTool === "brush") {
            enableFreeDrawing();
            return false;
          } else
            if (activeTool === "text") {
              drawText();
              return false;
            } else
              if (activeTool === "zoom") {
                unselect();

                var incriment = 1;
                var zoomint = $('#zoomint');
                var cC = document.querySelector('[data-canvas]');
                $(".zoomicon").removeClass("hide").on('mousedown touchstart', function () {
                  var incriment = 1;
                  var zoomint = $('#zoomint');
                  var addInc = setInterval(addTimer, 100);
                  var subtractInc = setInterval(subtractTimer, 100);
                  function addTimer() {
                    zoomint[0].stepUp(incriment);
                    cC.style.transform = 'scale(' + zoomint[0].value + ')';
                  }
                  function subtractTimer() {
                    zoomint[0].stepDown(incriment);
                    canvas.setZoom(zoomint[0].value)
                    cC.style.transform = 'scale(' + zoomint[0].value + ')';
                  }

                  if ($(this).hasClass("zoomin")) {
                    addTimer();
                    clearInterval(subtractInc);
                  } else if ($(this).hasClass("zoomout")) {
                    subtractTimer();
                    clearInterval(addInc);
                  } else {
                    clearInterval(addInc);
                    clearInterval(subtractInc);
                    incriment = 1;
                    zoomint[0].value = incriment;
                    cC.style.transform = '';
                    cC.style.marginLeft = '-' + parseInt(w / 2) + 'px';
                    cC.style.marginTop = '-' + parseInt(h / 2) + 'px';
                  }

                  $(this).on('mouseup mouseout touchend', function () {
                    clearInterval(addInc);
                    clearInterval(subtractInc);
                  });
                });
              } else {
                return false;
              }
  return false;
};
detectTool();

// remove all hidden icons
//$(".mdl-navigation .hide").removeClass("hide");