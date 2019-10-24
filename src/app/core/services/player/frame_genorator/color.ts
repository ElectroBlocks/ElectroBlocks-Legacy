
export interface Color {
	red: number;
	green: number;
	blue: number;
}



/**
 * Converts a #332323 hex string to rgb colour object
 *
 * @param hex
 * @return {*}
 */
export const hexToRgb = (hex: string) =>  {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		red: parseInt(result[1], 16),
		green: parseInt(result[2], 16),
		blue: parseInt(result[3], 16)
	} : null;
};

export const componentToHex = (colorPart: number) => {
	const  hex = colorPart.toString(16);
	return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (color: Color) => {
	return '#' + componentToHex(color.red) + componentToHex(color.green) + componentToHex(color.blue);
};


