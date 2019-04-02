"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FrameLocation {
    constructor(location, currentIteration) {
        this.location = location;
        this.currentIteration = currentIteration;
    }
}
exports.FrameLocation = FrameLocation;
var FrameLocationType;
(function (FrameLocationType) {
    FrameLocationType["BEFORE_SETUP"] = "before_setup";
    FrameLocationType["SETUP"] = "setup";
    FrameLocationType["LOOP"] = "loop";
})(FrameLocationType = exports.FrameLocationType || (exports.FrameLocationType = {}));
;
exports.currentGeneratingFrameLocation = new FrameLocation(FrameLocationType.BEFORE_SETUP, 0);
//# sourceMappingURL=frame_location.js.map