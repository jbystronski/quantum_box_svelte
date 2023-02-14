import { VirtualComponent } from './VirtualComponent';

export class VirtualList extends VirtualComponent {
	constructor(
		data: App.DataObject[] = [],
		nextData: App.NextData,
		containerHeight = 700,
		itemHeight = 100,
		treshold = 0,
		maxFeeds = false
	) {
		super(containerHeight, itemHeight, treshold, maxFeeds);
		this.data = this.transformData(data);
		this.nextData = nextData;
	}

	parse(position: number) {
		const start = Math.floor(position / this.itemHeight);
		const end = Math.floor(this.containerHeight / this.itemHeight) + 2;

		return this.data.slice(start, start + end);
	}

	get totalHeight() {
		return this.itemHeight * this.data.length;
	}

	transformData(data: App.DataObject[] = [], index = 0, offsetTop = 0) {
		if (!data.length) return data;
		let curr = index;
		while (curr <= data.length - 1) {
			data[curr]['top'] = offsetTop;

			curr++;
			offsetTop++;
		}

		return data;
	}

	shift(index: number) {
		const itemBefore = this.data[index - 1];
		const offsetTop = itemBefore ? (itemBefore['top'] as number) + 1 : 0;
		const startIndex = itemBefore ? index : 0;

		this.data = [
			...this.data.slice(0, startIndex),
			...this.transformData(this.data.slice(startIndex), 0, offsetTop)
		];
	}
}
