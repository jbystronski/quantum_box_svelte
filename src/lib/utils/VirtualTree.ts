import { VirtualComponent } from './VirtualComponent';

export class Node implements App.Tree.Node.Props {
	readonly id: App.Tree.Node.Props['id'] = null;
	readonly parentAddr: App.Tree.Node.Props['addr'] = [];
	readonly addr: App.Tree.Node.Props['addr'] = [];

	open: App.Tree.Node.Props['open'] = false;
	value: App.Tree.Node.Props['value'] = null;
	children: App.Tree.Node.Props['children'] = [];
	top: 0;

	constructor(
		id: App.Tree.Node.Props['id'],
		parentAddr: App.Tree.Node.Props['addr'],
		value: App.Tree.Node.Props['value'],
		open: false,
		top: 0
	) {
		this.id = id;
		this.parentAddr = parentAddr;
		this.addr = [...parentAddr, id];
		this.value = value;
		this.open = open;
		this.top = top;
	}

	get isLeaf() {
		return this.children.length === 0;
	}

	get parentId() {
		return this.parentAddr.reverse()[0];
	}

	get nestingLevel() {
		return this.parentAddr?.length - 1;
	}
}

export class Tree<K, V> {
	private map: Array<K> = [];
	private storage = new Map<K, V>();

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
		return this.map.slice(start, end).map((key) => this.get(key));
	}
}

export class VirtualTree extends VirtualComponent {
	tree: Tree;
	containerHeight = 500;
	itemHeight = 100;
	height = 0;
	defaultOpen = false;

	constructor(data: App.DataObject[], containerHeight = 500, itemHeight = 50, defaultOpen = false) {
		super(containerHeight, itemHeight);
		this.create(data);
		this.defaultOpen = defaultOpen;
		this.height = this.tree.size;
	}

	filterIds(data) {
		return data.map((c) => c.id);
	}

	create(data) {
		this.tree = new Tree();
		const root = new Node(data.id, [null], data.value, this.defaultOpen, 0);
		root.children = this.filterIds(data.children);
		this.tree.set(root.id, root);

		if (data.children) this.appendChildren(this.tree, root.addr, data.children, 1);
	}

	appendChildren(map: Tree<Node['id'], Node>, parentAddr: Node['addr'], children, top) {
		children.forEach((child) => {
			const node = new Node(child.id, parentAddr, child.value, this.defaultOpen, top);

			if (map && node) {
				map.store(node.id, node);
			}

			if (Object.hasOwn(child, 'children') && child.children.length > 0) {
				node.children = this.filterIds(child.children);
				return this.appendChildren(map, node.addr, child.children, top + 1);
			}
		});
	}

	recursiveRemap(childrenKeys: [], container = []) {
		for (const key of childrenKeys) {
			container.push(key);
			const childNode = this.tree.get(key);

			if (childNode.open) this.recursiveRemap(childNode.children, container);
		}

		return container;
	}

	parse(position: number = this.position) {
		const display = Math.floor(this.containerHeight / this.itemHeight) + 2;
		const start = Math.floor(position / this.itemHeight);
		return this.tree.range(start, display + start).filter((n: Node) => n !== undefined);
	}

	toggle(id) {
		const node = this.tree.get(id);
		if (node && !node.isLeaf) {
			const isOpen = node.open;
			if (isOpen) {
				node.open = false;
				const nodesToClose = this.recursiveRemap(node.children);
				this.tree.remap(node.id, nodesToClose.length);
				this.height = this.tree.size;
			} else {
				node.open = true;
				this.tree.remap(node.id, 0, this.recursiveRemap(node.children));
				this.height = this.tree.size;
			}
		}

		// add position
	}
}
