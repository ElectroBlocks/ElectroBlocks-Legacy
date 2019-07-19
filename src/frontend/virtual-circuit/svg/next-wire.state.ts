
const bottomBreadBoardHoles: Array<{status: 'available'|'taken', position: number }> = [];


for (let i = 4; i <= 61; i += 3) {
	bottomBreadBoardHoles.push({status: 'available', position: i});
}

export const takeNextBottomBreadboardHole = () => {
	const hole = bottomBreadBoardHoles.find(({ status }) => status == 'available');

	hole.status = 'taken';

	return hole.position;
};

export const returnBottomHole = (position: number) => {

	const index = bottomBreadBoardHoles.findIndex(hole => hole.position == position);

	bottomBreadBoardHoles[index].status = 'available';
};


