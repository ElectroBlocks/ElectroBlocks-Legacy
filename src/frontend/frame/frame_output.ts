import { Variable } from "./variable";
import { FrameLocation } from "./frame";

export interface FrameOutput {
	frameNumber: number,
	usbMessage: string,
	bluetoothMessage: string,
	variables: { [key: string]: Variable },
	frameLocation: FrameLocation,
	lastFrame: boolean,
	blockId: string
}
