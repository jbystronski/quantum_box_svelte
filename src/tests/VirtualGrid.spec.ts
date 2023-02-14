import { describe, expect, it, afterAll } from 'vitest';
import { VirtualGrid } from '$lib/utils/VirtualGrid';
import { VirtualComponent } from '$lib/utils/VirtualComponent';
import { createOneLevelData } from './fixtures/data';

describe('VirtualGrid test suite', () => {
	let emptyGrid = new VirtualGrid();

	const data = createOneLevelData(0, 10, (entry, index) => entry);

	const dataScheme = [
		{ top: 0, left: 1 },
		{ top: 0, left: 2 },
		{ top: 0, left: 3 },
		{ top: 0, left: 4 },
		{ top: 1, left: 1 },
		{ top: 1, left: 2 },
		{ top: 1, left: 3 },
		{ top: 1, left: 4 },
		{ top: 2, left: 1 },
		{ top: 2, left: 2 },
		{ top: 2, left: 3 }
	];

	let grid = new VirtualGrid(data, null, 1000, 100, 100, 4, 0.75);

	it('checks instance', () => {
		expect(emptyGrid).toBeInstanceOf(VirtualGrid);
		expect(emptyGrid).toBeInstanceOf(VirtualComponent);
	});

	it('checks default properties', () => {
		expect(emptyGrid.treshold).toBe(0);
		expect(emptyGrid.data).toEqual([]);
		expect(emptyGrid.itemHeight).toBe(100);
		expect(emptyGrid.itemWidth).toBe(100);
		expect(emptyGrid.rows).toBe(4);
		expect(emptyGrid.containerHeight).toBe(700);
	});

	it('checks set properties', () => {
		expect(grid.treshold).toBe(0.75);
		expect(grid.itemHeight).toBe(100);
		expect(grid.itemWidth).toBe(100);
		expect(grid.containerHeight).toBe(1000);
	});

	it('checks if input data formatted correctly', () => {
		expect(grid.data).toEqual(dataScheme);
	});

	it('checks insertion', () => {
		const insertion = createOneLevelData(0, 2);
		grid.insert(3, insertion);
		expect(grid.data).toEqual([
			...dataScheme,
			{ top: 2, left: 4 },
			{ top: 3, left: 1 },
			{ top: 3, left: 2 }
		]);
	});

	it('checks deletion', () => {
		grid.remove(0, 4);
		expect(grid.data.length).toBe(10);
	});

	it('checks merge', () => {
		grid.merge(createOneLevelData(0, 7));
		expect(grid.data.length).toBe(18);
	});

	afterAll(() => {
		(emptyGrid as VirtualGrid | undefined) = undefined;
		(grid as VirtualGrid | undefined) = undefined;
	});
});
