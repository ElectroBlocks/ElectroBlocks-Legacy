"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
const frame_player_1 = require("./frame_player");
const arduino_frame_1 = require("../arduino/arduino_frame");
const command_1 = require("./command");
const blockly = require("./block");
describe('player', () => {
    let framePlayer;
    let block;
    let blocklyMock;
    let selectSpy;
    const frames = [
        arduino_frame_1.ArduinoFrame.makeEmptyFrame('a3234', { location: 'loop', iteration: 1 }),
        new arduino_frame_1.ArduinoFrame('342343', {
            'name': {
                name: 'name',
                value: 'blue',
                type: 'String'
            }
        }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 1 }),
        new arduino_frame_1.ArduinoFrame('342343', {
            'name': {
                name: 'name',
                value: 'blue',
                type: 'String'
            }
        }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 2 }),
        new arduino_frame_1.ArduinoFrame('342343', {
            'name': {
                name: 'name',
                value: 'bill',
                type: 'String'
            }
        }, [], new command_1.EmptyCommand(), { location: 'loop', iteration: 2 }),
    ];
    beforeEach(() => {
        framePlayer = new frame_player_1.FramePlayer(new frame_player_1.ExecuteDebugFrame());
        framePlayer.setFrames(frames);
        jasmine.clock().install();
        blocklyMock = {
            mainWorkspace: {
                getBlockById: (blockId) => { }
            }
        };
        block = {
            select() {
            }
        };
        spyOn(blocklyMock.mainWorkspace, 'getBlockById')
            .withArgs(jasmine.anything()).and
            .callFake(() => block);
        selectSpy = spyOn(block, 'select').and.returnValue(undefined);
        spyOn(blockly, 'get_blockly').and.returnValue(blocklyMock);
    });
    afterEach(() => {
        jasmine.clock().uninstall();
    });
    it('should be able to play through a series of frames', () => {
        const variableInfoOutputted = [];
        const frameActual = [];
        const frameNumberOutput = [];
        framePlayer.frame$.subscribe(frame => frameActual.push(frame));
        framePlayer.variables$
            .subscribe(variable => variableInfoOutputted.push(variable));
        framePlayer.frameNumber$
            .subscribe(frameNumber => frameNumberOutput.push(frameNumber));
        expect(framePlayer.isPlaying()).toBeFalsy();
        framePlayer.play(true);
        expect(framePlayer.isPlaying()).toBeTruthy();
        expect(framePlayer.onLastFrame()).toBeFalsy();
        jasmine.clock().tick(3000);
        expect([0, 0, 1, 2, 3]).toEqual(frameNumberOutput);
        expect(variableInfoOutputted).toEqual([
            {},
            {},
            {
                'name': {
                    name: 'name',
                    value: 'blue',
                    type: 'String'
                }
            },
            {
                'name': {
                    name: 'name',
                    value: 'blue',
                    type: 'String'
                }
            },
            {
                'name': {
                    name: 'name',
                    value: 'bill',
                    type: 'String'
                }
            }
        ]);
        expect(frames)
            .toEqual(frameActual.map(frameInfo => frameInfo.frame));
        expect(selectSpy).toHaveBeenCalledTimes(4);
        expect(framePlayer.isPlaying()).toBeTruthy();
        expect(framePlayer.onLastFrame()).toBeTruthy();
    });
    it('should be able to move forward if it\s not at the end of the frames set', () => {
        const frameNumbers = [];
        framePlayer.frameNumber$.subscribe(frameNumber => {
            frameNumbers.push(frameNumber);
        });
        framePlayer.frame$.subscribe();
        framePlayer.skipToFrame(2);
        framePlayer.next();
        jasmine.clock().tick(300);
        expect(frameNumbers).toEqual([0, 2, 3]);
    });
    it('should not be able to move forward if player is at the end of the set', () => {
        const frameNumbers = [];
        framePlayer.frameNumber$.subscribe(frameNumber => {
            frameNumbers.push(frameNumber);
        });
        framePlayer.frame$.subscribe();
        framePlayer.skipToFrame(3);
        framePlayer.next();
        jasmine.clock().tick(300);
        expect(frameNumbers).toEqual([0, 3, 3]);
    });
    it('should be able to move backward if it is not at the end of the frame set', () => {
        const frameNumbers = [];
        framePlayer.frameNumber$.subscribe(frameNumber => {
            frameNumbers.push(frameNumber);
        });
        framePlayer.frame$.subscribe();
        framePlayer.skipToFrame(2);
        framePlayer.previous();
        jasmine.clock().tick(300);
        expect(frameNumbers).toEqual([0, 2, 1]);
    });
    it('should not be able to move backward if player is at the beginning of the set', () => {
        const frameNumbers = [];
        framePlayer.frameNumber$.subscribe(frameNumber => {
            frameNumbers.push(frameNumber);
        });
        framePlayer.frame$.subscribe();
        framePlayer.previous();
        jasmine.clock().tick(300);
        expect(frameNumbers).toEqual([0, 0]);
    });
});
//# sourceMappingURL=frame_player.spec.js.map