

let timeout;
function executeFrames(frames, currentFrame) {

    if (currentFrame >= frames.length - 1) {
        return;
    }

    executeFrame(frames[currentFrame])
        .then(() => executeFrames(frames, currentFrame + 1));

}

let executeFrame = (frame) => {
    return new Promise((res, rej) => {
        if (frame.move.length <= 0) {
            res(undefined);
        }

        if (frame.move.type == 'delay') {
           timeout = setTimeout(() => {
                res(undefined);
            }, frame.move.time);
            return;
        }

        let usbCommand = usbFunctionList[frame.move.type](frame.move);

        ipcRenderer.send('send:message', usbCommand);

        timeout = setTimeout(() => {
            res(undefined);
        }, 150);
    });
}