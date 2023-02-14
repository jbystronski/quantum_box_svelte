<script lang="ts">
	import { onMount } from 'svelte';

	import { createOneLevelData, createManyLevelData } from '../tests/fixtures/data';
	import Grid from '$lib/components/Grid.svelte';
	import List from '$lib/components/List.svelte';
	import Tree from '$lib/components/Tree.svelte';
	import ListItem from './ListItem.svelte';
	import TreeItem from './TreeItem.svelte';
	import DefaultItem from '$lib/components/DefaultItem.svelte';

	let lastGridKey = 301;

	let gridData;

	const cb = (entry, index) => {
		entry['key'] = index;

		return entry;
	};

	onMount(async () => {
		gridData = createOneLevelData(0, 300, cb);
	});

	let listData = createOneLevelData(0, 300, cb);

	const root = {
		id: 'root',
		value: 'root',
		children: createManyLevelData(0, 20, 2)
	};
</script>

<div class="wrapper listWrapper">
	<List
		Item={ListItem}
		nextData={() =>
			new Promise((resolve, reject) => {
				resolve(createOneLevelData(0, 150, cb));
			})}
		data={listData}
		containerHeight={700}
		containerWidth={600}
		itemHeight={50}
		treshold={0.95}
	/>
</div>

<div class="gridWrapper wrapper">
	{#if gridData}
		<Grid
			Item={DefaultItem}
			data={gridData}
			containerHeight={700}
			containerWidth={470}
			rowItems={3}
			itemWidth={150}
			itemHeight={150}
			treshold={0.9}
			nextData={() =>
				new Promise((resolve, reject) => {
					resolve(createOneLevelData(lastGridKey, lastGridKey + 150, cb));
					lastGridKey = lastGridKey + 150;
				})}
			maxFeeds={10}
		/>
	{/if}
	<Tree
		indent={20}
		data={root}
		Item={TreeItem}
		containerHeight={700}
		itemHeight={150}
		defaultOpen={true}
	/>
</div>

<style>
	.listWrapper {
		width: 600px;
	}

	.gridWrapper {
		width: 450px;
	}

	.wrapper {
		border: 1px solid #000;
	}
</style>
