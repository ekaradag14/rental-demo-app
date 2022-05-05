export const shortenText = (str: string, maxChar: number) => {
	if (str.length > maxChar - 3) {
		str = str.substring(0, maxChar - 3) + '...';
	}
	return str;
};

export const dateRangeOverlaps = (
	a_start: number,
	a_end: number,
	b_start: number,
	b_end: number
) => {
	let hasOverlap = false;
	if (a_start < b_start && b_start < a_end) hasOverlap = true; // b starts in a
	if (a_start < b_end && b_end < a_end) hasOverlap = true; // b ends in a
	if (b_start < a_start && a_end < b_end) hasOverlap = true; // a in b
	return hasOverlap;
};
