import {  get_blockly } from "../frame/block";
import { map, tap, filter } from "rxjs/operators";

import { framePlayer } from "../frame/frame_player";

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

framePlayer.changeFrame$.pipe(
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
			if (frameOutput.usbMessage.length > 0) {
				alert(`Arduino Say: ${frameOutput.usbMessage}`);
			}
		}),
		tap(frameOutput => {
			if (frameOutput.bluetoothMessage.length > 0) {
				alert(`Bluetooth Say: ${frameOutput.bluetoothMessage}`);
			}
		})
	)
	.subscribe();



framePlayer.changeFrame$.pipe(
	map( frameOutput => frameOutput.variables ),
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




