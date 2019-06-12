"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_1 = require("../frame/block");
const operators_1 = require("rxjs/operators");
const frame_player_1 = require("../frame/frame_player");
const debugTbody = document.getElementById('debug-tbody');
const playBtn = document.getElementById('video-debug-play');
const scrubBar = document.getElementById('scrub-bar');
frame_player_1.framePlayer.changeFrame$.pipe(operators_1.map(frameOutput => frameOutput.blockId), operators_1.tap(blockId => {
    const block = block_1.get_blockly().mainWorkspace.getBlockById(blockId);
    if (block) {
        block.select();
    }
})).subscribe();
frame_player_1.framePlayer.changeFrame$.pipe(operators_1.filter(frameOutput => frameOutput.lastFrame), operators_1.tap(() => {
    playBtn.firstElementChild.classList.add('fa-play');
    playBtn.firstElementChild.classList.remove('fa-stop');
})).subscribe();
frame_player_1.framePlayer.changeFrame$
    .pipe(operators_1.map(frameOutput => frameOutput.frameNumber), operators_1.tap(frameNumber => scrubBar.value = frameNumber.toString()))
    .subscribe();
frame_player_1.framePlayer.changeFrame$
    .pipe(operators_1.tap(frameOutput => {
    if (frameOutput.usbMessage.length > 0) {
        alert(`Arduino Say: ${frameOutput.usbMessage}`);
    }
}), operators_1.tap(frameOutput => {
    if (frameOutput.bluetoothMessage.length > 0) {
        alert(`Bluetooth Say: ${frameOutput.bluetoothMessage}`);
    }
}))
    .subscribe();
frame_player_1.framePlayer.changeFrame$.pipe(operators_1.map(frameOutput => frameOutput.variables), operators_1.map(variables => {
    let tbody = '';
    Object.keys(variables).forEach(key => {
        const value = variables[key].type.toString().indexOf('List') === -1 ?
            variables[key].value : `[${variables[key].value}]`;
        tbody += '<tr>';
        tbody += '<td>' + variables[key].name + '</td>';
        tbody += '<td>' + variables[key].type + '</td>';
        tbody += '<td>' + value + '</td>';
        tbody += '</tr>';
    });
    return tbody;
}), operators_1.tap(tbody => {
    debugTbody.innerHTML = tbody;
})).subscribe();
//# sourceMappingURL=player-output.subscribers.js.map