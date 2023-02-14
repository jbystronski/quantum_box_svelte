import { describe, expect, it, afterAll } from 'vitest';
import { VirtualTree } from '$lib/utils/VirtualTree';
import { VirtualComponent } from '$lib/utils/VirtualComponent';
import { createManyLevelData } from './fixtures/data';

describe('VirtualTree test suite', () => {
	it('does an initial run', () => {
		const data = createManyLevelData(0, 20, 2);

		const root = {
			id: 'root',
			value: 'root',
			children: data
		};
		const tree = new VirtualTree(root, 500, 50, true);

		expect(tree).toBeInstanceOf(VirtualComponent);
		expect(true).toBe(true);
	});
});
