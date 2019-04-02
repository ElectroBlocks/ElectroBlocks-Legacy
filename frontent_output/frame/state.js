"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BlockState {
    constructor(blockId, valueType, frameLocation, value) {
        this.blockId = blockId;
        this.valueType = valueType;
        this.frameLocation = frameLocation;
        this.value = value;
    }
}
exports.BlockState = BlockState;
class StateHolder {
    constructor() {
        this.blockStates = [];
    }
    setState(blockId, frameLocation, valueType, value) {
        let [blockStateToSet] = this.blockStates
            .filter(blockState => blockState.frameLocation == frameLocation && blockId == blockState.blockId);
        if (blockStateToSet) {
            blockStateToSet.value = value;
            return;
        }
        blockStateToSet =
            new BlockState(blockId, valueType, frameLocation, value);
        this.blockStates.push(blockStateToSet);
    }
    getState(blockId, frameLocation) {
        const [blockState] = this.blockStates
            .filter(blockState => blockState.frameLocation == frameLocation &&
            blockId == blockState.blockId);
        return blockState;
    }
}
const stateHolder = new StateHolder();
exports.stateHolder = stateHolder;
//# sourceMappingURL=state.js.map