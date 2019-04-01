
export class FrameLocation {

	constructor(public location: FrameLocationType, public currentIteration: number) {

	}
}

export enum FrameLocationType {
	BEFORE_SETUP = 'before_setup',
	SETUP = 'setup',
	LOOP = 'loop'
};

export const currentGeneratingFrameLocation =
	new FrameLocation(FrameLocationType.BEFORE_SETUP, 0);

