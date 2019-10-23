import { publishReplay } from 'rxjs/operators';
import { ComponentSvg } from './component.svg';
import { ElectricAttachmentComponentState } from '../../player/arduino/state/electric.state';
import { ArduinoState } from '../../player/arduino/state/arduino.state';
import { Parent, Text } from 'svg.js';
import { LCDScreenState } from '../../player/arduino/state/lcd_screen.state';
import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';

export class LcdSvg extends ComponentSvg {
  constructor(
    public readonly svg: Parent,
    public readonly columns: number,
    public readonly rows: number
  ) {
    super(svg);
    this.initDisplay();
    this.arduinoPins.push(ARDUINO_UNO_PINS.PIN_A4, ARDUINO_UNO_PINS.PIN_A5);
  }

  private isBlinking = false;

  private blinkCol = 0;

  private blinkRow = 0;

  private interval: NodeJS.Timeout = null;

  private isBlinkSquareWhite = true;

  initDisplay() {
    if (this.columns == 16 && this.rows == 2) {
      for (let i = 17; i <= 20; i += 1) {
        this.svg
          .select(`#letter-${i}-1`)
          .first()
          .hide();
        this.svg
          .select(`#letter-${i}-2`)
          .first()
          .hide();
        this.svg
          .select(`#space-${i}-1`)
          .first()
          .hide();
        this.svg
          .select(`#space-${i}-2`)
          .first()
          .hide();
        this.svg
          .select(`#num-col-${i}`)
          .first()
          .hide();
      }

      for (let i = 1; i <= 20; i += 1) {
        this.svg
          .select(`#letter-${i}-3`)
          .first()
          .hide();
        this.svg
          .select(`#letter-${i}-4`)
          .first()
          .hide();
        this.svg
          .select(`#space-${i}-3`)
          .first()
          .hide();
        this.svg
          .select(`#space-${i}-4`)
          .first()
          .hide();
      }

      this.svg
        .select('#num-row-3')
        .first()
        .hide();
      this.svg
        .select('#num-row-4')
        .first()
        .hide();
    }
    this.hideAllLetter();
  }

  hideAllLetter() {
    for (let col = 1; col <= 20; col += 1) {
      for (let row = 1; row <= 4; row += 1) {
        this.svg
          .select(`#letter-${col}-${row}`)
          .first()
          .hide();
      }
    }
  }

  public resetComponent() {
     this.initDisplay();
  }

  isComponent(component: ElectricAttachmentComponentState): boolean {
    return (
      component instanceof LCDScreenState &&
      component.rows == this.rows &&
      component.columns == this.columns
    );
  }

  matchState(state: ArduinoState): void {
    const lcdState = state.components.find(c =>
      this.isComponent(c)
    ) as LCDScreenState;

    if (!lcdState) {
      return;
    }

    for (let col = 0; col <= this.columns - 1; col += 1) {
      for (let row = 0; row <= this.rows - 1; row += 1) {
        let currentRow = lcdState.rowsOfText[row];

        const textSVG = this.svg
          .select(`#letter-${col + 1}-${row + 1}`)
          .first() as Text;
        textSVG.node.textContent = currentRow.charAt(col);
        textSVG.show();

        const space = this.svg
          .select(`#space-${col + 1}-${row + 1} rect`)
          .first();
        space.fill(lcdState.backLightOn ? '#FFFFFF' : '#000000');
      }
    }

    const hasBlinkingStateChange =
      this.blinkCol !== lcdState.blink.column ||
      this.blinkRow !== lcdState.blink.row ||
      this.isBlinking !== lcdState.blink.blinking;

    const isBlinkStateValid =
      lcdState.blink.column >= 1 && lcdState.blink.row >= 1;

    if (hasBlinkingStateChange && isBlinkStateValid) {
      this.updateBlink(lcdState);
    }
  }

  updateBlink(lcdState: LCDScreenState) {
    clearInterval(this.interval);
    const space = this.svg
      .select(`#space-${lcdState.blink.column}-${lcdState.blink.row} rect`)
      .first();
    if (space) {
      space.fill(lcdState.backLightOn ? '#FFFFFF' : '#000000');
    }

    if (!lcdState.blink.blinking || !space) {
      return;
    }

    this.interval = setInterval(() => {
      const space = this.svg
        .select(`#space-${lcdState.blink.column}-${lcdState.blink.row} rect`)
        .first();
      space.fill(this.isBlinkSquareWhite ? '#FFFFFF' : '#000000');
      this.isBlinkSquareWhite = !this.isBlinkSquareWhite;
    }, 500);
  }
}
