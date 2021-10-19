let w, h;

function insertSvg(e) {
  const fileType = e.target.files[0].type;
  const url = URL.createObjectURL(e.target.files[0]);

  const img = new Image();
  img.onload = function () {
    w = this.width;
    h = this.height;
    $("[data-project=width]").val(w).trigger('keyup');
    $("[data-project=height]").val(h).trigger('keyup');
  }
  img.src = url;

  if (fileType === 'image/svg+xml') { //check if svg
    fabric.loadSVGFromURL(url, function (objects, options) {
      const obj = fabric.util.groupSVGElements(objects, options);

      let scaleFactor = 1;
      if (obj.width > obj.height) {
        scaleFactor = (canvas.width / 3) / obj.width;
      } else {
        scaleFactor = (canvas.height / 3) / obj.height;
      }

      obj.set({
        top: Math.floor(canvas.height / 5),
        left: Math.floor(canvas.width / 5),
        scaleY: scaleFactor,
        scaleX: scaleFactor
      });

      canvas.add(obj);
      obj.perPixelTargetFind = true;
      obj.targetFindTolerance = 4;
      canvas.discardActiveObject();
      canvas.setActiveObject(obj);
      canvas.renderAll();

      // Push the canvas state to history
      canvas.trigger("object:statechange");
    });
  } else {
    //alertify.error("Sorry that file type is not supported. .svg files only!");
  }
}

function upload(e) {
  clearCanvas();

  const fileType = e.target.files[0].type;
  const url = URL.createObjectURL(e.target.files[0]);

  const img = new Image();
  img.onload = function () {
    w = this.width;
    h = this.height;
    $("[data-project=width]").val(w).trigger('keyup');
    $("[data-project=height]").val(h).trigger('keyup');
  }
  img.src = url;

  if (fileType === 'image/svg+xml') { //check if svg
    fabric.loadSVGFromURL(url, function (objects, options) {
      canvas.add(fabric.util.groupSVGElements(objects, options));
    });
  } else {
    //alertify.error("Sorry that file type is not supported. .svg files only!");
  }
}

// load svg file on click
document.querySelector("[data-load=svg]").onclick = function () {
  let conf = confirm('Are you sure you want to load this file?');
  if (conf) document.querySelector("input[type=file]").click();
  // trigger input
  //swal({
  //  title: 'Are you sure you want to load this file?',
  //  text: "You will loose all your work and you won't be able to revert this!",
  //  type: 'warning',
  //  showCancelButton: true
  //}).then((result) => {
  //  if (result.value) {
  //    document.querySelector("input[type=file]").click();
  //  }
  //})
};

document.querySelector("[data-insert=svg]").onclick = function () {
  let conf = confirm('Are you sure you want to load this file?');
  if (conf) document.querySelector("input[type=file]").click();
}