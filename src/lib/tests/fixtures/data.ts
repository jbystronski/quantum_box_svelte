export const createOneLevelData = (
	start: number,
	end: number,
	createCallback: (entry: object, index: number) => typeof entry = (entry, index) => {
		return entry;
	}
) => {
	const data = [];

	for (let i = start; i <= end; i++) {
		data.push(createCallback({}, i));
	}

	return data;
};

const getRandomBoolean = (input = 10) => Math.floor(Math.random() * input) % 2 === 0;

type TreeNode = {
	children: TreeNode[];
	value: any;
};

export const createManyLevelData = (
	start: number,
	end: number,

	maxDepth = 2,
	container: TreeNode[] = [],
	currentDepth = 0
) => {
	for (let i = start; i <= end; i++) {
		const data: TreeNode = {
			value: i,
			id: currentDepth + '-' + i,
			children: []
		};

		if (getRandomBoolean() && currentDepth <= maxDepth) {
			data['children'] = createManyLevelData(start, end, maxDepth, [], currentDepth + 1);
		}

		container.push(data);
	}

	return container;
};
