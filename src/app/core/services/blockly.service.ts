import { FramePlayer } from './player/frame/frame_player';
import { ArduinoFrame, ARDUINO_UNO_PINS } from './player/arduino/arduino_frame';
import * as Blockly from 'blockly/core';
import 'blockly';
import { Subject, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import './blockly/overrides/FieldVariable.override';
import './blockly/overrides/variable-flyoutmenu.override';
import { overrideTrashBlocks } from './blockly/overrides/trashcan.override';
import { BlocklyPromptOverRide } from './blockly/overrides/BlocklyPrompt.override';
import { changeFramePopulateSensorBlock } from './blockly/events/changeFramePopulateSensorBlocks';

import * as _ from 'lodash';
import './blockly/block/index';
import './blockly/generators/index';
import { registerListMenu } from './blockly/menu/list.menu';
import './blockly/menu/variables.menu';
import { getToolBoxString } from './blockly/toolbox/toolbox';
import { forLoopChangeText } from './blockly/events/forLoopChangeText';
import { deleteVariables } from './blockly/events/deleteVariable';
import {
  disableEnableBlocks,
  sensorSetupBlocks
} from './blockly/events/enableDisableBlocks';
import { saveDebugBlockState } from './blockly/events/saveDebugBlockState';
import { generateListOfFrame } from './player/frame/generate_frame';
import { duplicatePinWarningTextBlocks } from './player/frame/block-duplicate-pin-warning-text';
import { Router } from '@angular/router';
import { changeSetupBlockValueBecauseOfLoopChange } from './blockly/events/changeSetupBlockValueBecauseOfLoopChange';
import { changeLoopNumberInSensorBlocks } from './blockly/events/changeLoopNumberInSensorSetupBlocks';
import { filter } from 'rxjs/operators';
import { checkRightPinSelected } from './blockly/events/checkButtonPinSelectionValid';
import { Block } from 'blockly';
import { COLOR_THEME } from './blockly/block/color_theme';
import { ToolboxService } from './toolbox.service';

@Injectable({
  providedIn: 'root'
})
export class BlocklyService {
  public static DEBUG_MODE = 'simple';

  public static DISABLE_READONLY_CHECK = false;

  private blocklyEventSubject = new Subject<Blockly.Events.Abstract>();

  private showFrameGeneratorError = true;

  public readonly blocklyEvents$ = this.blocklyEventSubject.asObservable();

  private workspace: Blockly.Workspace | any;

  private codeSubject = new ReplaySubject<string>(5);

  public code$ = this.codeSubject.asObservable();

  private framesSubject = new Subject<ArduinoFrame[]>();

  public frames$ = this.framesSubject.asObservable();

  constructor(
    private blocklyPromptOverRide: BlocklyPromptOverRide,
    private framePlayer: FramePlayer,
    private router: Router,
    private toolboxService: ToolboxService
  ) {
    (window as any).Blockly = Blockly;
    framePlayer.changeFrame$
      .pipe(filter(() => this.getWorkSpace() !== undefined))
      .subscribe((changeFrame) => {
        changeFramePopulateSensorBlock(
          changeFrame,
          this.getArduinoStartBlock()
        );
      });
  }

  public getWorkSpace(): Blockly.Workspace | any {
    return this.workspace;
  }

  setUpBlock(blocklyDiv: HTMLDivElement) {
    Blockly.Themes.Classic.setBlockStyle('logic_blocks', {
      colourPrimary: COLOR_THEME.CONTROL
    });
    Blockly.Themes.Classic.setBlockStyle('loop_blocks', {
      colourPrimary: COLOR_THEME.CONTROL
    });
    Blockly.Themes.Classic.setBlockStyle('procedure_blocks', {
      colourPrimary: COLOR_THEME.CONTROL
    });
    Blockly.Themes.Classic.setBlockStyle('math_blocks', {
      colourPrimary: COLOR_THEME.VALUES
    });
    Blockly.Themes.Classic.setBlockStyle('colour_blocks', {
      colourPrimary: COLOR_THEME.VALUES
    });
    Blockly.Themes.Classic.setBlockStyle('text_blocks', {
      colourPrimary: COLOR_THEME.VALUES
    });
    Blockly.Themes.Classic.setBlockStyle('variable_blocks', {
      colourPrimary: COLOR_THEME.DATA
    });
    Blockly.Themes.Classic.setBlockStyle('list_blocks', {
      colourPrimary: COLOR_THEME.DATA
    });

    Blockly.inject(blocklyDiv, {
      toolbox: getToolBoxString(this.toolboxService.fetchToolBox()),
      collapse: true,
      comments: true,
      disable: false,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      media: 'https://blockly-demo.appspot.com/static/media/',
      rtl: false,
      scrollbars: true,
      sounds: true,
      oneBasedIndex: true,
      grid: {
        spacing: 20,
        length: 1,
        colour: '#888',
        snap: false
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      }
    } as Blockly.BlocklyOptions);
    this.workspace = Blockly.getMainWorkspace();

    const xml =
      '<xml><block type="arduino_start" deletable="false" x="50" y="100" movable="true"></block></xml>';
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), this.workspace);

    registerListMenu(this.workspace);
    overrideTrashBlocks(this.workspace);
    this.workspace.addChangeListener(async (event) => {
      this.blocklyEventSubject.next(event);

      if (
        event.element === 'disabled' ||
        event.element === 'warningOpen' ||
        event.blockId === null ||
        event.element === 'click' ||
        event.element === 'selected' ||
        event.name === 'SIMPLE_DEBUG'
      ) {
        return;
      }
      forLoopChangeText(this.workspace);
      deleteVariables(this.workspace, event);
      disableEnableBlocks(this.workspace);
      checkRightPinSelected(
        this.workspace,
        ['is_button_pressed'],
        'push_button_setp'
      );
      checkRightPinSelected(
        this.workspace,
        ['digital_read'],
        'digital_read_setup'
      );
      checkRightPinSelected(
        this.workspace,
        ['analog_read'],
        'analog_read_setup'
      );
      changeSetupBlockValueBecauseOfLoopChange(this.workspace, event);
      saveDebugBlockState(this.workspace, this.getNumberLoops());
      this.nextArduinoCode();
      this.showDebugMode(
        this.router.routerState.snapshot.root.firstChild.data.showRunLoopOption
      );
      changeLoopNumberInSensorBlocks(this.getWorkSpace(), event);
      await this.generateFrames(event.blockId);
    });

    this.blocklyPromptOverRide.overRideBlocklyPrompt();
    this.showRunLoopOption(
      this.router.routerState.snapshot.root.firstChild.data.showRunLoopOption
    );
  }

  public showRunLoopOption(show: boolean) {
    const block = this.getArduinoStartBlock();
    if (show) {
      block.inputList[2].setVisible(false);
      block.inputList[3].setVisible(true);
      block.render();
      return;
    }

    block.inputList[2].setVisible(true);
    block.inputList[3].setVisible(false);
    block.render();
  }

  public showDebugMode(show: boolean) {
    if (!this.getWorkSpace()) {
      return;
    }

    this.getWorkSpace()
      .getAllBlocks()
      .forEach((block) => {
        block.inputList.filter((input) => {
          if (
            input.fieldRow.find((fieldRow) => fieldRow.name === 'SIMPLE_DEBUG')
          ) {
            input.setVisible(show);
            block.render();
          }
        });
        if (sensorSetupBlocks.includes(block.type)) {
          console.log(block, 'inside loop');
          let startHide = false;
          for (let i = 0; i < block.inputList.length; i += 1) {
            console.log(block.inputList);
            if (block.inputList[i].name === 'SHOW_CODE_VIEW') {
              startHide = true;
            }
            if (startHide) {
              block.inputList[i].setVisible(show);
            }
          }
          if (startHide) {
            block.render();
          }
        }
      });
  }

  public getArduinoStartBlock(): Block | undefined | any {
    return this.getWorkSpace()
      .getAllBlocks()
      .find((block) => block.type === 'arduino_start');
  }

  public nextArduinoCode() {
    this.codeSubject.next(this.getArduinoCode());
  }

  public getArduinoCode() {
    return Blockly.Arduino.workspaceToCode(this.workspace);
  }

  public getXMLCode() {
    const xml = Blockly.Xml.workspaceToDom(this.getWorkSpace());
    return Blockly.Xml.domToText(xml);
  }

  public loadFile(content: string) {
    this.getWorkSpace().clear();
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(content),
      this.getWorkSpace()
    );

    this.showRunLoopOption(
      this.router.routerState.snapshot.root.firstChild.data['showRunLoopOption']
    );
  }

  public resizeWorkspace() {
    Blockly.svgResize(this.workspace);
  }

  public selectBlock(blockId: string) {
    const block = this.workspace.getBlockById(blockId);
    if (block) {
      block.select();
    }
  }

  public getNumberLoops() {
    return parseInt(this.getArduinoStartBlock().getFieldValue('LOOP_TIMES'), 0);
  }

  public async generateFrames(blockId: string) {
    const frames = await generateListOfFrame();
    console.log(frames, 'new frames called');
    const block = this.getWorkSpace().getBlockById(blockId);
    const overRideIsEqual = block && ['is_button_pressed'].includes(block.type);
    if (_.isEqual(frames, this.framePlayer.getFrames()) && !overRideIsEqual) {
      return;
    }

    this.getWorkSpace()
      .getAllBlocks()
      .forEach((blockW) => blockW.setWarningText(null));

    if (frames.length === 0) {
      await this.framePlayer.setFrames([], false);
      this.framesSubject.next([]);
      return;
    }

    if (frames[frames.length - 1] instanceof ArduinoFrame) {
      await this.framePlayer.setFrames(frames as ArduinoFrame[], false);
      this.framesSubject.next(frames as ArduinoFrame[]);
      this.showFrameGeneratorError = true;
      return;
    }

    if (this.showFrameGeneratorError) {
      alert(
        `More than 2 things are using the same pins: ${frames.join(', ')}.`
      );
    }

    await this.framePlayer.setFrames([], false);
    this.framesSubject.next([]);
    this.showFrameGeneratorError = false;

    const duplicatePinList = frames as ARDUINO_UNO_PINS[];
    const pinFieldsNames = ['RX', 'TX', 'PIN'];
    this.getWorkSpace()
      .getAllBlocks()
      .filter((block) => {
        const duplicatePinFound = pinFieldsNames.reduce(
          (previous, currentPin) => {
            return (
              duplicatePinList.includes(block.getFieldValue(currentPin)) ||
              previous
            );
          },
          false
        );

        if (duplicatePinFound) {
          return true;
        }

        const possibleDuplicatePinsDefinition =
          duplicatePinWarningTextBlocks[block.type];
        if (!possibleDuplicatePinsDefinition) {
          return false;
        }

        return (
          possibleDuplicatePinsDefinition.pins.filter((pin) =>
            duplicatePinList.includes(pin)
          ).length > 0
        );
      })
      .map((block) => {
        const duplicatePin = pinFieldsNames.reduce((previous, current) => {
          return previous || block.getFieldValue(current);
        }, null);
        return {
          block,
          pin: duplicatePin
        };
      })
      .forEach(({ block, pin }) => {
        if (pin) {
          block.setWarningText(
            `Please make sure that no other components use pin ${pin}.`
          );
          return;
        }
        block.setWarningText(duplicatePinWarningTextBlocks[block.type].message);
      });
  }
}
