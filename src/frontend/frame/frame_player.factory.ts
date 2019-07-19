import {  ExecuteVirtualCircuitFrame } from "./frame_execute";
import { virtualCircuitFactory } from "../virtual-circuit/factory/virtual-circuit.factory";
import { FramePlayer } from "./frame_player";

// This is done so that I can test frame player without testing the dom

export const framePlayer  = new FramePlayer(new ExecuteVirtualCircuitFrame(virtualCircuitFactory()));
