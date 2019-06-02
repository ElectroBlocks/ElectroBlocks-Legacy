"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const electron_1 = require("electron");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const block_1 = require("./block");
const timer_1 = require("rxjs/observable/timer");
var FrameExecutionType;
(function (FrameExecutionType) {
    FrameExecutionType[FrameExecutionType["DIRECT"] = 0] = "DIRECT";
    FrameExecutionType[FrameExecutionType["NEXT"] = 1] = "NEXT";
})(FrameExecutionType = exports.FrameExecutionType || (exports.FrameExecutionType = {}));
class FramePlayer {
    constructor(frameExecutor) {
        this.frameExecutor = frameExecutor;
        this.variableSubject = new rxjs_1.BehaviorSubject({});
        this.messageSubject = new rxjs_1.BehaviorSubject('');
        this.message$ = this.messageSubject.asObservable()
            .pipe(operators_1.share());
        this.variables$ = this.variableSubject.asObservable()
            .pipe(operators_1.share());
        this.frameNumberSubject = new rxjs_1.BehaviorSubject(9);
        this.frameNumber$ = this.frameNumberSubject
            .asObservable()
            .pipe(operators_1.share());
        this.frameLocation = undefined;
        this.frameSubject = new rxjs_1.Subject();
        this.playFrame = false;
        this.executeOnce = false;
        this.currentFrame = 0;
        this.delayDivider = 1;
        this.frames = [];
        this.frame$ = this.frameSubject
            .asObservable()
            .pipe(operators_1.filter(() => this.executeOnce || this.playFrame), operators_1.filter(() => this.frames.length > 0), operators_1.tap(frameType => {
            const frame = frameType.frame;
            this.frameNumberSubject.next(this.currentFrame);
            this.variableSubject.next(frameType.frame.variables);
            if (frameType.type == FrameExecutionType.DIRECT || this.currentFrame === 0) {
                this.frameExecutor.executeCommand(frame.setupCommandUSB().command);
            }
            if (frame.command.type == command_1.COMMAND_TYPE.USB) {
                this.frameExecutor.executeCommand(frame.nextCommand().command);
            }
            if (frame.command.type == command_1.COMMAND_TYPE.MESSAGE) {
                this.messageSubject.next((frame.command.command));
            }
        }), operators_1.tap(frameInfo => {
            const block = block_1.get_blockly().mainWorkspace.getBlockById(frameInfo.frame.blockId);
            if (block) {
                block.select();
            }
        }), operators_1.delayWhen(frameInfo => {
            let time = 400 / this.delayDivider;
            if (frameInfo.frame.command.type === command_1.COMMAND_TYPE.TIME) {
                time = parseInt(frameInfo.frame.command.command);
            }
            return timer_1.timer(time > 3000 ? 3000 : time);
        }), operators_1.tap(() => this.executeOnce = false), operators_1.map((frame) => {
            return {
                frameNumber: this.currentFrame,
                frame: frame.frame
            };
        }), operators_1.tap(() => {
            if (this.playFrame && this.currentFrame != this.frames.length - 1) {
                this.currentFrame += 1;
                this.play();
            }
        }), operators_1.tap(frameInfo => {
            this.frameLocation = frameInfo.frame.frameLocation;
        }));
    }
    setDelayDivider(divider) {
        this.delayDivider = divider;
    }
    setFrames(frames) {
        this.frames = frames;
        if (!this.frameLocation || this.frameLocation.location == 'setup') {
            this.currentFrame = 0;
            this.frameNumberSubject.next(0);
            this.previous();
            return;
        }
        const iteration = this.frameLocation.iteration;
        let index = 0;
        for (let i = 0; i < frames.length; i += 1) {
            const currentFrame = frames[i];
            if (currentFrame.frameLocation.location !== 'setup' && currentFrame.frameLocation.iteration == iteration) {
                index = i;
                break;
            }
        }
        if (index === 0) {
            this.currentFrame = 0;
            this.frameNumberSubject.next(0);
            this.previous();
            return;
        }
        this.currentFrame = index - 1;
        this.frameNumberSubject.next(0);
        this.next();
    }
    play(triggerByUser = false) {
        if (triggerByUser && this.currentFrame >= this.frames.length - 1) {
            this.currentFrame = 0;
        }
        if (this.frames.length == 0) {
            return;
        }
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
    isPlaying() {
        return this.playFrame;
    }
    onLastFrame() {
        return this.currentFrame == this.frames.length - 1;
    }
    next() {
        if (this.frames.length == 0) {
            return;
        }
        this.executeOnce = true;
        this.currentFrame =
            this.currentFrame == this.frames.length - 1 ?
                this.currentFrame : this.currentFrame + 1;
        this.skipToFrame(this.currentFrame);
    }
    previous() {
        if (this.frames.length == 0) {
            return;
        }
        this.executeOnce = true;
        this.currentFrame = this.currentFrame <= 0 ? 0 : this.currentFrame - 1;
        this.skipToFrame(this.currentFrame);
    }
    stop() {
        if (this.frames.length == 0) {
            return;
        }
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