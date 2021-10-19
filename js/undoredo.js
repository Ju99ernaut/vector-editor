/*
undo redo commandhistory with canvas
*/

canvas.counter = 0;
let newleft = 0;
canvas.selection = false;

let mods = 0;
canvas.on(
  'object:modified', function () {
    updateModifications(true);
  },
  'object:added', function () {
    updateModifications(true);
  });

function updateModifications(savehistory) {
  if (savehistory === true) {
    myjson = JSON.stringify(canvas);
    state.push(myjson);
  }
}

function undo() {
  if (mods < state.length) {
    canvas.clear().renderAll();
    canvas.loadFromJSON(state[state.length - 1 - mods - 1]);
    canvas.renderAll();
    //console.log("geladen " + (state.length-1-mods-1));
    //console.log("state " + state.length);
    mods += 1;
    //console.log("mods " + mods);
    //console.log("undo: mod " + mods + " of " + state.length);
  }
}

function redo() {
  if (mods > 0) {
    canvas.clear().renderAll();
    canvas.loadFromJSON(state[state.length - 1 - mods + 1]);
    canvas.renderAll();
    //console.log("geladen " + (state.length-1-mods+1));
    mods -= 1;
    //console.log("state " + state.length);
    //console.log("mods " + mods);
    //console.log("redo: mod " + mods + " of " + state.length);
  }
}

function clearCanvas() {
  canvas.clear().renderAll();
  newleft = 0;
}