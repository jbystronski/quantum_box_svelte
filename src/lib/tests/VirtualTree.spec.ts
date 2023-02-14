import { describe, expect, it, afterAll } from 'vitest';
import { VirtualTree } from '$lib/utils/VirtualTree';
import { VirtualComponent } from '$lib/utils/VirtualComponent';
import { createManyLevelData } from './fixtures/data';

describe('VirtualTree test suite', () => {
	const data = createManyLevelData(0, 5, 2);

	const root = {
		id: 'root',
		value: 'root',
		children: data
	};
	const tree = new VirtualTree(root, 500, 50, true);
	it('does an initial run', () => {
		expect(tree).toBeInstanceOf(VirtualComponent);
		expect(true).toBe(true);
	});

	it('assure a single node has these properties present', () => {
		const node = tree.get('0');

		expect(Object.hasOwn(node, 'children') && Array.isArray(node['children'])).toBe(true);
		expect(Object.hasOwn(node, 'parentId') && node.parentId === null).toBe(true);
		expect(Object.hasOwn(node, 'id') && node.id === '0').toBe(true);
		expect(Object.hasOwn(node, 'value') && node.value === 'root').toBe(true);
		expect(Object.hasOwn(node, 'open') && node.open === true).toBe(true);
		expect(Object.hasOwn(node, 'nestingLevel')).toBe(true);
	});
});
