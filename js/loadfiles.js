var w, h;

function upload(e) {
  clearCanvas();

  var fileType = e.target.files[0].type;
  var url = URL.createObjectURL(e.target.files[0]);

  var img = new Image();
  img.onload = function () {
    w = this.width;
    h = this.height;
    $("[data-project=width]").val(w).trigger('keyup');
    $("[data-project=height]").val(h).trigger('keyup');
  }
  img.src = url;

  if (fileType === 'image/svg+xml') { //check if svg
    fabric.loadSVGFromURL(url, function (objects, options) {
      var svg = fabric.util.groupSVGElements(objects, options);
      canvas.add(svg);
    });
  } else {
    alertify.error("Sorry that file type is not supported. .svg files only!");
  }
}

// load svg file on click
document.querySelector("[data-load=svg]").onclick = function () {
  // close navigation panel
  $('.mdl-layout__drawer').removeClass('is-visible');
  $('.mdl-layout__obfuscator').removeClass('is-visible');

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