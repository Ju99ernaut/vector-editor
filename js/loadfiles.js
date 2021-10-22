let w, h;

function addSvg(e) {
  const fileType = e.target.files[0].type;
  const url = URL.createObjectURL(e.target.files[0]);

  if (fileType === 'image/svg+xml') { //check if svg
    fabric.loadSVGFromURL(url, function (objects, options) {
      const obj = fabric.util.groupSVGElements(objects, options);
      obj.set({
        left: 5,
        top: 5,
        angle: 0,
        originX: 'left',
        originY: 'top'
      });
      canvas.add(obj);
      canvas.renderAll();
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

document.querySelector("[data-add=svg]").onclick = function () {
  document.querySelector("input[type=file].add").click();
};