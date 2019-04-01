import { FrameLocation } from "./frame_location";


export class BlockState {

	constructor(
		public readonly blockId: string,
		public readonly valueType: 'Number' | 'String' | 'Boolean',
		public readonly frameLocation: FrameLocation,
		public value: number | string | boolean
	) {
	}
}

class StateHolder {

	private blockStates: BlockState[] = []

	public setState(
		blockId: string,
		frameLocation: FrameLocation,
		valueType: 'Number' | 'String' | 'Boolean',
		value: number | string | boolean
	) {
		let [ blockStateToSet ] = this.blockStates
			.filter( blockState =>
				blockState.frameLocation == frameLocation && blockId == blockState.blockId           );

		if (blockStateToSet) {
			blockStateToSet.value = value;
			return;
		}

		blockStateToSet =
			new BlockState(blockId, valueType, frameLocation, value);

		this.blockStates.push(blockStateToSet);
	}

	getState( blockId: string, frameLocation: FrameLocation): undefined|BlockState {
		const [ blockState ] = this.blockStates
			.filter( blockState =>
				blockState.frameLocation == frameLocation &&
				blockId == blockState.blockId
			);

		return blockState;
	}
}

const stateHolder = new StateHolder();

export {
	stateHolder
}
