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
require("jasmine");
const frame_player_1 = require("./frame_player");
const frame_execute_1 = require("./frame_execute");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("./command");
const BluebirdPromise = require("bluebird");
const operators_1 = require("rxjs/operators");
describe('Frame Player', () => {
    const frames = [new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
            location: 'setup', iteration: 0
        }),
        new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
            location: 'loop', iteration: 0
        }),
        new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
            location: 'loop', iteration: 1
        })];
    beforeEach(() => {
        jasmine.clock().install();
        spyOn(BluebirdPromise, 'delay').and.callFake((time) => {
            setTimeout(() => {
                console.log('inside callback');
            }, time);
        });
    });
    afterEach(() => {
        jasmine.clock().uninstall();
    });
    it('it should be able to load a bunch of frames and at the start be at 0 frame', () => {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        const frame1 = new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
            location: 'pre-setup', iteration: 0
        });
        framePlayer.setFrames([
            frame1,
            new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
                location: 'setup', iteration: 0
            }),
            new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
                location: 'loop', iteration: 0
            }),
            new arduino_frame_1.ArduinoFrame('b1', {}, [], new command_1.EmptyCommand(), {
                location: 'loop', iteration: 1
            }),
        ]);
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer['currentFrameLocation']).toEqual({ iteration: 0, location: 'pre-setup' });
    });
    it('should be able to call all the frames', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        let numberOfFramesExecuted = 0;
        framePlayer.changeFrame$.pipe(operators_1.tap(() => numberOfFramesExecuted += 1))
            .subscribe();
        yield framePlayer.play();
        expect(numberOfFramesExecuted).toBe(3);
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer.isPlaying()).toBeFalsy();
    }));
    it('stop should be able to stop the player from continuing', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        let numberOfFramesExecuted = 0;
        framePlayer.changeFrame$.pipe(operators_1.tap(() => numberOfFramesExecuted += 1), operators_1.filter(() => numberOfFramesExecuted == 2), operators_1.tap(() => framePlayer.stop())).subscribe();
        yield framePlayer.play();
        expect(numberOfFramesExecuted).toBe(2);
    }));
    it('should be able to go forward if frames are still available', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        let numberOfFramesExecuted = 0;
        const sub = framePlayer.changeFrame$.pipe(operators_1.tap(() => numberOfFramesExecuted += 1), operators_1.filter(() => numberOfFramesExecuted == 2), operators_1.tap(() => __awaiter(this, void 0, void 0, function* () {
            yield framePlayer.stop();
            sub.unsubscribe();
        }))).subscribe();
        yield framePlayer.play();
        expect(framePlayer['currentFrame']).toBe(1);
        yield framePlayer.next();
        expect(framePlayer['currentFrame']).toBe(2);
    }));
    it('should be able to go backward if not at frame 0', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        let numberOfFramesExecuted = 0;
        const sub = framePlayer.changeFrame$.pipe(operators_1.tap(() => numberOfFramesExecuted += 1), operators_1.filter(() => numberOfFramesExecuted == 2), operators_1.tap(() => __awaiter(this, void 0, void 0, function* () {
            yield framePlayer.stop();
            sub.unsubscribe();
        }))).subscribe();
        yield framePlayer.play();
        expect(framePlayer['currentFrame']).toBe(1);
        yield framePlayer.previous();
        expect(framePlayer['currentFrame']).toBe(0);
    }));
    it('if on last frame and next is ran it should run the last frame', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.next();
        expect(framePlayer['currentFrame']).toBe(1);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.next();
        expect(framePlayer['currentFrame']).toBe(2);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.next();
        expect(framePlayer['currentFrame']).toBe(2);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.next();
        expect(framePlayer['currentFrame']).toBe(2);
        expect(framePlayer.isPlaying()).toBeFalsy();
    }));
    it('if on the first frame and previous is ran the 0th frame should run', () => __awaiter(this, void 0, void 0, function* () {
        const framePlayer = new frame_player_1.FramePlayer(new frame_execute_1.ExecuteSilentFrame());
        framePlayer.setFrames(frames);
        yield framePlayer.skipToFrame(2);
        expect(framePlayer['currentFrame']).toBe(2);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.previous();
        expect(framePlayer['currentFrame']).toBe(1);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.previous();
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.previous();
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer.isPlaying()).toBeFalsy();
        yield framePlayer.previous();
        expect(framePlayer['currentFrame']).toBe(0);
        expect(framePlayer.isPlaying()).toBeFalsy();
    }));
});
//# sourceMappingURL=frame_player.spec.js.map