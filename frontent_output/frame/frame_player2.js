"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("./command");
const block_1 = require("./block");
const BluebirdPromise = require("bluebird");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class FramePlayer2 {
    constructor(frameExecutor) {
        this.frameExecutor = frameExecutor;
        this.delayDivider = 1;
        this.changeFrameSubject = new rxjs_1.Subject();
        this.changeFrame$ = this.changeFrameSubject.asObservable()
            .pipe(operators_1.share());
        this.frames = [];
        this.playing = false;
        this.currentFrame = 0;
    }
    setFrames(frames) {
        this.playing = false;
        this.frames = frames;
        if (!this.currentFrameLocation) {
            this.currentFrameLocation = this.frames[0].frameLocation;
        }
        const currentFrame = this.frames
            .findIndex(frame => frame.frameLocation == this.currentFrameLocation);
        this.currentFrame = currentFrame < 0 ? 0 : currentFrame;
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.playing = true;
            yield this.playNextFrame();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.playing = false;
        });
    }
    isLastFrame() {
        return this.currentFrame >= this.lastFrameNumber();
    }
    isPlaying() {
        return this.playing;
    }
    lastFrameNumber() {
        return this.frames.length - 1;
    }
    previous() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentFrame -= 1;
            this.currentFrame = this.currentFrame < 0 ? 0 : this.currentFrame;
            this.playing = false;
            yield this.playNextFrame();
        });
    }
    next() {
        return __awaiter(this, void 0, void 0, function* () {
            this.currentFrame += 1;
            this.currentFrame = this.currentFrame > this.lastFrameNumber() ?
                this.lastFrameNumber() : this.currentFrame;
            this.playing = false;
            yield this.playNextFrame();
        });
    }
    skipToFrame(frameNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            this.playing = false;
            this.currentFrame = frameNumber < 0 ? 0 : frameNumber;
            this.currentFrame = this.currentFrame >= this.lastFrameNumber() ?
                this.lastFrameNumber() : this.currentFrame;
            yield this.executeFrame(true);
        });
    }
    playNextFrame() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.executeFrame(this.currentFrame === 0);
            if (this.playing && !this.isLastFrame()) {
                this.currentFrame += 1;
                yield this.playNextFrame();
                return;
            }
            if (this.playing && this.isLastFrame()) {
                this.currentFrame = 0;
                this.playing = false;
            }
        });
    }
    executeFrame(runSetup) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.frames.length == 0) {
                this.playing = false;
                return;
            }
            const frame = this.frames[this.currentFrame];
            if (runSetup) {
                this.frameExecutor.executeCommand(frame.setupCommandUSB().command);
            }
            if (frame.command.type == command_1.COMMAND_TYPE.USB) {
                this.frameExecutor.executeCommand(frame.nextCommand().command);
            }
            const usbMessage = frame.command.type == command_1.COMMAND_TYPE.MESSAGE ?
                frame.command.command : '';
            const bluetoothMessage = frame.command.type == command_1.COMMAND_TYPE.BLUETOOTH_MESSAGE ?
                frame.command.command : '';
            this.changeFrameSubject.next({ frameNumber: this.currentFrame, usbMessage, bluetoothMessage, variables: frame.variables, frameLocation: frame.frameLocation, lastFrame: this.isLastFrame() });
            const block = block_1.get_blockly().mainWorkspace.getBlockById(frame.blockId);
            if (block) {
                block.select();
            }
            let time = 400 / this.delayDivider;
            if (frame.command.type === command_1.COMMAND_TYPE.TIME) {
                time = parseInt(frame.command.command);
            }
            yield BluebirdPromise.delay(time);
        });
    }
}
exports.FramePlayer2 = FramePlayer2;
//# sourceMappingURL=frame_player2.js.map