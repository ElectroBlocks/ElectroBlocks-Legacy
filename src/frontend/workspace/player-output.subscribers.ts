import { DebugValueBlock, get_blockly } from "../frame/block";
import { map, tap, filter } from "rxjs/operators";

import { framePlayer } from "../frame/frame_player.factory";
import { inputState } from "../frame/input_state";
import { blocksInsideInput } from "../frame/blockly_helper";
import { BluetoothState } from "../arduino/state/bluetooth.state";

const debugTbody = document.getElementById( 'debug-tbody' );
const playBtn = document.getElementById( 'video-debug-play' ) as HTMLLinkElement;
const scrubBar = document.getElementById( 'scrub-bar' ) as HTMLInputElement;

framePlayer.changeFrame$.pipe(
	map(frameOutput => frameOutput.blockId),
	tap(blockId => {
		const block = get_blockly().mainWorkspace.getBlockById(blockId);

		if (block) {
			block.select();
		}
	})
).subscribe();

framePlayer.changeFrame$
	.pipe(
		map(frameOutput => frameOutput.frameLocation),
		tap(frameLocation => {
			get_blockly().mainWorkspace.getAllBlocks()
				.filter(block => block.defaultDebugValue !== undefined )
				.forEach(block => {
					const callNumber = inputState.callNumber(block.id, frameLocation);

					const debugBlocks =
						blocksInsideInput(block, 'FRAME_VALUES') as DebugValueBlock[];

					debugBlocks.forEach(block => {
						block.setColour(330);
					});

					if (!debugBlocks[callNumber - 1]) {
						return;
					}

					console.log(callNumber, 'current call number');

					debugBlocks[callNumber - 1].setColour('#aa0b3e');


				})
		})
	)
	.subscribe();

framePlayer.changeFrame$
	.pipe(
		filter(frameOutput => frameOutput.lastFrame),
		tap(() => {
			playBtn.firstElementChild.classList.add( 'fa-play' );
			playBtn.firstElementChild.classList.remove( 'fa-stop' );
		})
).subscribe();

framePlayer.changeFrame$
	.pipe(
		map( frameOutput => frameOutput.frameNumber ),
		tap( frameNumber => scrubBar.value = frameNumber.toString())
	)
	.subscribe();

framePlayer.changeFrame$
	.pipe(
		tap( frameOutput => {
			if (frameOutput.state.sendMessage.length > 0) {
				alert(`Arduino Say: ${frameOutput.state.sendMessage}`);
			}
		}),
		tap(frameOutput => {
			const bluetoothState = frameOutput.state.components.find(state => state instanceof BluetoothState);

			if (bluetoothState instanceof BluetoothState && bluetoothState.sendMessage.length > 0) {
				alert(`Bluetooth Say: ${bluetoothState.sendMessage}`);

			}

		})
	)
	.subscribe();



framePlayer.changeFrame$.pipe(
	map( frameOutput => frameOutput.state.variables ),
	map( variables => {
		let tbody = '';
		Object.keys( variables ).forEach( key => {

			const value = variables[ key ].type.toString().indexOf( 'List' ) === -1 ?
				variables[ key ].value : `[${variables[ key ].value}]`;

			tbody += '<tr>';
			tbody += '<td>' + variables[ key ].name + '</td>';
			tbody += '<td>' + variables[ key ].type + '</td>';
			tbody += '<td>' + value + '</td>';
			tbody += '</tr>';

		} );

		return tbody;
	} ),
	tap(tbody => {
		debugTbody.innerHTML = tbody;
	})
).subscribe();




