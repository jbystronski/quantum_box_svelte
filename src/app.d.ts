declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		type Ev = (Event & { target: HTMLElement }) | UIEvent;

		type Dimensions = {
			itemHeight: number;
			itemWidth?: number;
			containerHeight?: number;
			rowItems?: number;
		};

		type Parser = (ParserProps) => DataObject[];

		type NextDataOutput = DataObject[] | Promise<DataObject[]>;
		type NextData = () => NextDataOutput;

		interface DataObject {
			key?: number | string;
			top?: number;
			left?: number;
		}

		type ParserProps = {
			data: DataObject[];
			position: number;
			dimensions: Dimensions;
		};

		type Multi = boolean | string | number | [] | object;

		interface VirtualizedComponentProps {
			data: DataObject[];
			itemHeight: number;
			containerHeight: number;
			containerWidth?: number;
			nextData?: NextData;
		}
		type Item = {
			itemData: {
				[key: string]: Multi;
			};
			itemKey: number;
		};
		namespace Grid {
			interface Props extends VirtualizedComponentProps {
				Item?: Item;
				rowItems: number;
				itemWidth: number;
			}

			type Tile = {
				key: Item['itemKey'];
				top: number;
				left: number;
			};
		}

		namespace List {
			interface Props extends VirtualizedComponentProps {
				Item?: Item;
			}
		}

		namespace Tree {
			namespace Node {
				type Id = string | number | null;
				type Addr = Id[];
				type Value = object | null;
				type Children = Id[];
				type NestingLevel = number;
				type Open = boolean;
				type IsLeaf = boolean;

				interface Props {
					id: Id;
					nestingLevel: NestingLevel;
					isLeaf: IsLeaf;
					open: Open;
					addr: Addr;
					children: Children;
					parentAddr: Addr;
					parentId: Id;
					value: Value;
				}

				type Item = {
					id: Id;
					isLeaf: IsLeaf;
					isOpen: Open;
					toggle: (id: Id) => void;
					nestingLevel: NestingLevel;
					itemData: Value;
				};

				type DataObject = {
					value: Value;
					id: Id;
					children: DataObject[];
				};
			}

			interface Props {
				data: Node.DataObject;
				itemHeight: number;
				containerHeight: number;
				Item: Node.Item;
				indent: number;
			}

			interface UseTreeProps {
				data: Node.DataObject;
				itemHeight: Props['itemHeight'];
				containerHeight: Props['containerHeight'];
			}

			interface UseTreeExports {
				toggle: Node.Item['toggle'];
				visibleNodes: Node.Props[];
				handleScroll: (...args: Multi) => void;
				height: number;
				position: number;
			}
		}
	}
}

export {};
