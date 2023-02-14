import { isPromise } from './isPromise';

export abstract class VirtualComponent {
	data: App.DataObject[];
	containerHeight;
	itemHeight;
	treshold;
	maxFeeds = false;
	position = 0;

	constructor(containerHeight = 400, itemHeight = 50, treshold = 0, maxFeeds = false) {
		this.containerHeight = containerHeight;
		this.itemHeight = itemHeight;
		this.treshold = treshold;
		this.maxFeeds = maxFeeds;
		this.data = [];
	}

	abstract parse(position: number): App.DataObject[];

	abstract transformData(data: App.DataObject[]): App.DataObject[];

	abstract shift(index: number): void;

	remove(from: number, to: number) {
		this.data.splice(from, to);
		this.shift(from);
	}

	unwrapNextData() {
		const nextData = this.nextData();

		const merge = this.merge.bind(this);

		isPromise(nextData) ? nextData.then(merge) : this.merge(nextData);
	}

	insert(from: number, items: App.DataObject[]) {
		this.data.splice(from, 0, ...items);

		this.shift(from);
	}

	tresholdPassed(t) {
		if (this.treshold && this.treshold >= 0.5 && this.treshold <= 1) {
			const tresholdPosition = (this.totalHeight - t.clientHeight) * this.treshold;

			return this.position > tresholdPosition;
		}
		return false;
	}

	merge(data: App.DataObject[]) {
		this.insert(this.data.length, data);
	}

	get size() {
		return this.data.length;
	}

	getChunk(event: App.Ev) {
		const target = event.target || event;
		this.position = target.scrollTop;

		if (this.tresholdPassed(target)) {
			if (this.maxFeeds === false) {
				this.unwrapNextData();
			}

			if (typeof this.maxFeeds === 'number' && this.maxFeeds > 0) {
				this.maxFeeds--;
				this.unwrapNextData();
			}
		}

		return this.parse(this.position);
	}
}
