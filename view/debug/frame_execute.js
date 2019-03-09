
let timeout;

let stop = true;

function play(frames, frameNumber) {

    if (!stop) {
        return;
    }

    if (frameNumber >= frames.length - 1) {
        return;
    }

    updateSlideBar(frameNumber);

    executeFrame(frames[frameNumber])
        .then(() => {
            play(frames, frameNumber + 1);
        });

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

function updateSlideBar(frameNumber) {
    console.log(frameNumber, 'fake updating slidebar');
}

function goToFrameNumber(frames, frameNumber)  {
    // kill all setTimeouts
    // Execute all the commands
}