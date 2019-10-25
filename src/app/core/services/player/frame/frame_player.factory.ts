import { ExecuteVirtualCircuitFrame } from './frame_execute';
import { FramePlayer } from './frame_player';

// This is done so that I can test frame player without testing the dom

let player = null;

export const framePlayerFactory = async () => {

  if (!player) {
    player = new FramePlayer(
      new ExecuteVirtualCircuitFrame()
    );
  }

  return player;
};
