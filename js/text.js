function getFont() {
    const fontFamily = canvas.getActiveObject().get('fontFamily');
    return fontFamily ? fontFamily.toLowerCase() : '';
}

function setFont(font) {
    canvas.getActiveObject().set('fontFamily', font.toLowerCase());
    canvas.renderAll();
}

function bolden() {
    const activeObj = canvas.getActiveObject();
    activeObj.set('fontWeight', activeObj.get('fontWeight') === 'bold' ? 'normal' : 'bold');
    canvas.renderAll();
}

function italics() {
    const activeObj = canvas.getActiveObject();
    activeObj.set('fontStyle', activeObj.get('fontStyle') === 'italic' ? 'normal' : 'italic');
    canvas.renderAll();
}

function underline() {
    const activeObj = canvas.getActiveObject();
    activeObj.set('underline', !activeObj.get('underline'));
    canvas.renderAll();
}

function strikeThrough() {
    const activeObj = canvas.getActiveObject();
    activeObj.set('linethrough', !activeObj.get('linethrough'));
    canvas.renderAll();
}