import { VirtualComponent } from './VirtualComponent';

export class Node implements App.Tree.Node.Props {
	readonly id: App.Tree.Node.Props['id'] = null;
	readonly parentId: App.Tree.Node.Id;
	nestingLevel: number;
	open: App.Tree.Node.Props['open'] = false;
	value: App.Tree.Node.Props['value'] = null;
	children: App.Tree.Node.Props['children'] = [];

	constructor(
		id: App.Tree.Node.Props['id'],
		parentId: App.Tree.Node.Props['id'],
		nestingLevel: number,
		value: App.Tree.Node.Props['value'],
		open: boolean
	) {
		this.id = id;
		this.parentId = parentId;
		this.nestingLevel = nestingLevel;
		this.value = value;
		this.open = open;
	}

	get isLeaf() {
		return this.children.length === 0;
	}
}

export class Tree<K, V> {
	map: Array<K> = [];
	storage = new Map<K, V>();

	remove(key: K): boolean {
		this.remap(key, 1);
		return this.storage.delete(key);
	}

	get(key: K): V | undefined {
		return this.storage.get(key);
	}

	store(key: K, value: V) {
		this.storage.set(key, value);
	}

	set(key: K, value: V, at?: K) {
		at ? this.remap(at, 0, [key]) : this.map.push(key);
		this.store(key, value);
	}

	remap(at: K, remove: number, add: Array<K> = []) {
		const atIndex = this.map.indexOf(at);

		this.map.splice(atIndex + 1, remove, ...add);
	}

	clear() {
		this.storage.clear();
	}

	get size() {
		return this.map.length || 0;
	}

	range(start: number, end: number) {
		let i = start;
		return this.map.slice(start, end).map((key) => {
			const item = this.get(key);
			item['tempIndex'] = i;
			i++;
			return item;
		});
	}
}

export class VirtualTree extends VirtualComponent {
	tree: Tree;

	height = 0;
	defaultOpen = false;

	constructor(data: App.DataObject[], containerHeight = 500, itemHeight = 40, defaultOpen = false) {
		super(containerHeight, itemHeight);
		this.tree = new Tree();
		this.defaultOpen = defaultOpen;

		this.attachNodes(0 + '', null, 0, data.value, this.defaultOpen, data.children);

		this.height = this.tree.size;
	}

	attachNodes(id, parentId, nestingLevel, value, open, children) {
		const node = new Node(id, parentId, nestingLevel, value, open);

		this.tree.set(node.id, node);

		if (children && children.length) {
			node.children = children.map((child, i) =>
				this.attachNodes(id + '-' + i, id, nestingLevel + 1, child.value, open, child.children)
			);
		}

		return node;
	}

	recursiveRemap(children: Node[], container = []) {
		for (const child of children) {
			container.push(child.id);
			const childNode = this.tree.get(child.id);

			if (childNode.open) this.recursiveRemap(childNode.children, container);
		}

		return container;
	}

	get(id) {
		return this.tree.get(id);
	}

	parse(position: number = this.position) {
		const display = Math.floor(this.containerHeight / this.itemHeight) + 2;
		const start = Math.floor(position / this.itemHeight);
		return this.tree.range(start, display + start).filter((n: Node) => n !== undefined);
	}

	toggle(id: Node['id']) {
		const node = this.get(id);
		if (node && !node.isLeaf) {
			if (node.open) {
				node.open = false;

				this.tree.remap(node.id, this.recursiveRemap(node.children).length);
			} else {
				node.open = true;
				this.tree.remap(node.id, 0, this.recursiveRemap(node.children));
			}

			this.height = this.tree.size;
		}
	}
}
