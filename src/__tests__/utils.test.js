import {
	shortenText,
	dateRangeOverlaps,
	generateRandomID,
} from '../common/helper/utils.ts';

it('shortens text correctly', () => {
	expect(shortenText('Test', 10)).toBe('Test');
	expect(shortenText('Lorem Ipsum Dolor', 10)).toBe('Lorem I...');
});

it('calculates date overlap correctly', () => {
	expect(dateRangeOverlaps(10, 20, 15, 35)).toBe(true);
	expect(dateRangeOverlaps(10, 20, 25, 35)).toBe(false);
	expect(dateRangeOverlaps(10, 20, 20, 35)).toBe(false);
});

it('creates unique ids', () => {
	[1, 2, 3, 4, 5].forEach(() =>
		expect(generateRandomID()).not.toBe(generateRandomID())
	);
});
