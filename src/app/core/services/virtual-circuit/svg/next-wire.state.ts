import { ARDUINO_UNO_PINS } from '../../player/arduino/arduino_frame';
import { connectionToBreadboard } from './arduino.svg';

let bottomBreadBoardHoles: Array<{
  status: 'available' | 'taken';
  position: number;
}> = [];

const skipHolesList = [
  6,
  9,
  13,
  18,
  22,
  27,
  31,
  37,
  41,
  46,
  51,
  54,
  58,
  61,
  56,
  50,
  44,
  38,
  32,
  26,
  20,
  14,
  8
];

export const takeNextBottomBreadboardHole = () => {
  const hole = bottomBreadBoardHoles
    .sort((holeA, holeB) => (holeA.position > holeB.position ? 1 : -1))
    .find(({ status }) => status === 'available');

  hole.status = 'taken';

  return hole.position;
};

export const takeClosestBottomBreadboardHole = (
  pin: ARDUINO_UNO_PINS,
  direction: 'right' | 'left'
) => {
  const pinNumber = parseInt(
    connectionToBreadboard(pin)
      .replace('pin', '')
      .replace('C', ''),
    0
  );

  const sortedWholes = bottomBreadBoardHoles
    .sort((a, b) => {
      return (
        Math.abs(a.position - pinNumber) - Math.abs(b.position - pinNumber)
      );
    })
    .filter(hole =>
      direction === 'right'
        ? hole.position > pinNumber
        : hole.position < pinNumber
    );

  if (sortedWholes.length == 0) {
    const sortedWholes = bottomBreadBoardHoles.sort((a, b) => {
      return (
        Math.abs(a.position - pinNumber) - Math.abs(b.position - pinNumber)
      );
    });

    const selectedHole = sortedWholes.find(hole => hole.status == 'available');

    selectedHole.status = 'taken';
    return selectedHole.position;
  }

  const selectedHole = sortedWholes.find(hole => hole.status == 'available');

  selectedHole.status = 'taken';
  return selectedHole.position;
};

export const returnBottomHole = (position: number) => {
  const index = bottomBreadBoardHoles.findIndex(
    hole => hole.position == position
  );

  bottomBreadBoardHoles[index].status = 'available';
};

export const resetBreadBoardWholes = () => {
  bottomBreadBoardHoles = [];

  for (let i = 4; i <= 61; i += 1) {
    if (skipHolesList.includes(i)) {
      continue;
    }
    bottomBreadBoardHoles.push({ status: 'available', position: i });
  }
};
