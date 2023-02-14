import { VirtualComponent } from './VirtualComponent';

export class VirtualGrid extends VirtualComponent {
	rows;
	itemWidth;

	constructor(
		data: App.DataObject[] = [],
		nextData: App.NextData = () => null,
		containerHeight = 700,
		itemHeight = 100,
		itemWidth = 100,
		rows = 4,
		treshold = 0,
		maxFeeds = false
	) {
		super(containerHeight, itemHeight, treshold, maxFeeds);
		this.rows = rows;
		this.itemWidth = itemWidth;

		this.data = this.transformData(data);

		this.nextData = nextData;
	}

	parse(position: number) {
		let start = Math.floor(position / this.itemHeight) * this.rows;
		const end = Math.ceil(this.containerHeight / this.itemHeight) * this.rows + this.rows;

		while (this.data[start].left !== 1) {
			start--;
		}

		const range = this.data.slice(start, start + end);

		return range;
	}

	get totalHeight() {
		return Math.ceil(this.data.length / this.rows) * this.itemHeight;
	}

	transformData(data: App.DataObject[] = [], index = 0, offsetTop = 0, offsetLeft = 1) {
		if (!data.length) return data;

		let curr = index;

		while (data[curr]) {
			data[curr]['left'] = offsetLeft;
			data[curr]['top'] = offsetTop;

			curr++;
			if (offsetLeft === this.rows) {
				offsetLeft = 1;
				offsetTop++;
			} else {
				offsetLeft++;
			}
		}

		return data;
	}

	shift(index: number) {
		const itemBefore = this.data[index - 1];

		let offsetLeft = 1,
			offsetTop = 0,
			startIndex = 0;

		if (itemBefore) {
			const prevTop = itemBefore['top'] as number;
			const prevLeft = itemBefore['left'] as number;

			offsetLeft = prevLeft < this.rows ? prevLeft + 1 : 1;

			offsetTop = prevLeft < this.rows ? prevTop : prevTop + 1;

			startIndex = index;
		}

		this.data = [
			...this.data.slice(0, startIndex),
			...this.transformData(this.data.slice(startIndex), 0, offsetTop, offsetLeft)
		];
	}
}
