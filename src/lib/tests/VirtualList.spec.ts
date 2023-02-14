import { describe, expect, it, afterAll } from 'vitest';
import { VirtualList } from '$lib/utils/VirtualList';
import { VirtualComponent } from '$lib/utils/VirtualComponent';
import { createOneLevelData } from './fixtures/data';

describe('VirtualList test suite', () => {
	let emptyList = new VirtualList();

	const data = createOneLevelData(0, 10, (entry, index) => entry);

	const dataScheme = [
		{ top: 0 },
		{ top: 1 },
		{ top: 2 },
		{ top: 3 },
		{ top: 4 },
		{ top: 5 },
		{ top: 6 },
		{ top: 7 },
		{ top: 8 },
		{ top: 9 },
		{ top: 10 }
	];

	let list = new VirtualList(data, null, 1000, 100, 0.75);

	it('checks instance', () => {
		expect(emptyList).toBeInstanceOf(VirtualList);
		expect(emptyList).toBeInstanceOf(VirtualComponent);
	});

	it('checks default properties', () => {
		expect(emptyList.treshold).toBe(0);
		expect(emptyList.data).toEqual([]);
		expect(emptyList.itemHeight).toBe(100);
		expect(emptyList.containerHeight).toBe(700);
	});

	it('checks set properties', () => {
		expect(list.treshold).toBe(0.75);
		expect(list.itemHeight).toBe(100);
		expect(list.containerHeight).toBe(1000);
	});

	it('checks if input data formatted correctly', () => {
		expect(list.data).toEqual(dataScheme);
	});

	it('checks insertion', () => {
		const insertion = createOneLevelData(0, 2);

		list.insert(3, insertion);

		expect(list.data).toEqual([...dataScheme, { top: 11 }, { top: 12 }, { top: 13 }]);
	});

	it('checks deletion', () => {
		list.remove(0, 4);
		expect(list.data.length).toBe(10);
	});

	it('checks merge', () => {
		list.merge(createOneLevelData(0, 2));
		expect(list.data.length).toBe(13);
	});

	afterAll(() => {
		(emptyList as VirtualList | undefined) = undefined;
		(list as VirtualList | undefined) = undefined;
	});
});
