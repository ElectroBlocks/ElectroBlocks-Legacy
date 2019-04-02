"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const electron_1 = require("electron");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const timer_1 = require("rxjs/observable/timer");
const block_1 = require("./block");
var FrameExecutionType;
(function (FrameExecutionType) {
    FrameExecutionType[FrameExecutionType["DIRECT"] = 0] = "DIRECT";
    FrameExecutionType[FrameExecutionType["NEXT"] = 1] = "NEXT";
})(FrameExecutionType = exports.FrameExecutionType || (exports.FrameExecutionType = {}));
class FramePlayer {
    constructor(frameExecutor, scrubBar) {
        this.frameExecutor = frameExecutor;
        this.scrubBar = scrubBar;
        this.frameSubject = new rxjs_1.Subject();
        this.playFrame = false;
        this.executeOnce = false;
        this.currentFrame = 0;
        this.frames = [];
        this.frame$ = this.frameSubject
            .asObservable()
            .pipe(operators_1.filter(() => this.executeOnce || this.playFrame), operators_1.tap(frameType => {
            const frame = frameType.frame;
            if (frameType.type == FrameExecutionType.DIRECT) {
                this.frameExecutor.executeCommand(frame.setupCommandUSB().command);
            }
            if (frame.command.type == command_1.COMMAND_TYPE.USB) {
                this.frameExecutor.executeCommand(frame.nextCommand().command);
            }
        }), operators_1.tap(frameInfo => {
            console.log(this.currentFrame, 'current frame');
            this.scrubBar.value = this.currentFrame.toString();
            const block = block_1.getBlockly().mainWorkspace.getBlockById(frameInfo.frame.blockId);
            block.select();
        }), operators_1.delayWhen(frameType => {
            if (frameType.frame.command.type == command_1.COMMAND_TYPE.TIME) {
                return timer_1.timer(parseInt(frameType.frame.command.command));
            }
            return timer_1.timer(200);
        }), operators_1.tap(() => this.executeOnce = false), operators_1.tap(() => {
            if (this.playFrame && this.currentFrame < this.frames.length) {
                this.play();
            }
        }), operators_1.map((frame) => {
            return {
                frameNumber: this.currentFrame,
                frame: frame.frame
            };
        }), operators_1.tap(() => this.currentFrame += 1));
    }
    setFrames(frames) {
        this.frames = frames;
    }
    play() {
        if (this.currentFrame >= this.frames.length) {
            this.currentFrame = 0;
        }
        const frame = this.frames[this.currentFrame];
        if (!frame) {
            return;
        }
        this.playFrame = true;
        this.frameSubject.next({
            frame,
            type: FrameExecutionType.NEXT
        });
    }
    stop() {
        this.playFrame = false;
    }
    skipToFrame(frameNumber) {
        this.executeOnce = true;
        this.playFrame = false;
        this.currentFrame = frameNumber;
        this.frameSubject.next({
            frame: this.frames[this.currentFrame],
            type: FrameExecutionType.DIRECT
        });
    }
}
exports.FramePlayer = FramePlayer;
class ExecuteUSBFrame {
    constructor() { }
    executeCommand(command) {
        electron_1.ipcRenderer.send('send:message', command);
    }
}
exports.ExecuteUSBFrame = ExecuteUSBFrame;
class ExecuteDebugFrame {
    executeCommand(command) {
        console.log(command, 'USB COMMAND');
    }
}
exports.ExecuteDebugFrame = ExecuteDebugFrame;
//# sourceMappingURL=frame_player.js.map