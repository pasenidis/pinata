function drawSide(l) {
    return '*'.repeat(l);
}

function drawAngle(l) {
    return ['*'.repeat(l * 2), '*'.repeat(l / 2)];
}

export { drawAngle, drawSide };