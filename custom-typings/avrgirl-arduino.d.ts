declare module 'avrgirl-arduino';




declare class AvrgirlArduino {

	constructor( options: { board: string, manualReset: boolean, port: string } );

	flash(file: string, cb: (error: Error) => any): void;
}
