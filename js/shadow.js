function setShadow(_color, _blur, _offsetX, _offsetY, object) {
    object = object || canvas.getActiveObject();
    object.set('boxShadow', `${_color} ${_blur}px ${_offsetX}px ${_offsetY}px`)
    object.set('shadow', {
        color: _color,
        blur: _blur,
        offsetX: _offsetX,
        offsetY: _offsetY
    });
    canvas.renderAll();
}

function changeShadowColor(color, object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    if (shadow === null) {
        setShadow(color, 10, 0, 0, object);
        return;
    }
    setShadow(color, shadow.blur, shadow.offsetX, shadow.offsetY, object);
}

function clearShadow(object) {
    object = object || canvas.getActiveObject();
    object.set('boxShadow', 'rgba(0,0,0,0) 0 0 0');
    object.set('shadow', {
        color: 'rgba(0,0,0,0)',
        blur: 0,
        offsetX: 0,
        offsetY: 0
    });
    canvas.renderAll();
}

function isShadow(object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    return (shadow !== null && (shadow.offsetX !== 0 || shadow.offsetY !== 0));
}

// Glow is just a shadow with an offset of zero
function isGlow(object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    return (shadow !== null && shadow.offsetX === 0 && shadow.offsetY === 0);
}

function getShadowBlur(object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    if (shadow === null) {
        return null;
    }

    return parseInt(shadow.blur);
}

function getShadowColor(object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    if (shadow === null) {
        return null;
    }

    return shadow.color;
}

function getShadowOffset(object) {
    object = object || canvas.getActiveObject();
    const shadow = object.shadow;
    if (shadow == null) {
        return null;
    }
    const x = parseInt(shadow.offsetX);
    const y = parseInt(shadow.offsetY);
    return { x, y };
}

$('#menu-shadow-color-picker').click(function () {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
        $('[data-picker=shadow]').empty().append('<input type="text" class="picker shadowpicker" data-opacty="1" style="color: #000; width: 207px;">');

        // enable color picker
        $('.shadowpicker').spectrum({
            color: activeObj.get('shadow')?.color || 'grey',
            flat: true,
            preferredFormat: "rgb",
            showAlpha: true,
            showInitial: true,
            showInput: true,
            showButtons: false,
            change: function (color) {
                changeShadowColor(color, activeObj);
            }
        }).spectrum("show");
    } else {
        //alertify.error('No item selected');
        return false;
    }
});

$('#menu-shadow-blur').click(function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        shadowBlur.MaterialSlider.change(getShadowBlur())
    } else {
        //alertify.error('No item selected');
        return false;
    }
});

shadowBlur.onchange = function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        const shadow = activeObj.shadow;
        if (shadow === null) {
            return null;
        }
        setShadow(shadow.color, this.value, shadow.offsetX, shadow.offsetY, activeObj);
    } else {
        //alertify.error('No item selected');
        return false;
    }
};

$('#menu-shadow-offsetX').click(function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        shadowOffsetX.MaterialSlider.change(getShadowBlur())
    } else {
        //alertify.error('No item selected');
        return false;
    }
});

shadowOffsetX.onchange = function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        const shadow = activeObj.shadow;
        if (shadow === null) {
            return null;
        }
        setShadow(shadow.color, shadow.blur, this.value, shadow.offsetY, activeObj);
    } else {
        //alertify.error('No item selected');
        return false;
    }
};

$('#menu-shadow-offsetY').click(function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        shadowOffsetY.MaterialSlider.change(getShadowBlur())
    } else {
        //alertify.error('No item selected');
        return false;
    }
});

shadowOffsetY.onchange = function () {
    const activeObj = canvas.getActiveObject() || canvas.getActiveGroup();
    if (activeObj) {
        const shadow = activeObj.shadow;
        if (shadow === null) {
            return null;
        }
        setShadow(shadow.color, shadow.blur, shadow.offsetX, this.value, activeObj);
    } else {
        //alertify.error('No item selected');
        return false;
    }
};