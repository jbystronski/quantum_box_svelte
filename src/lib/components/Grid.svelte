<script lang="ts" type="module">
	import { VirtualGrid } from '$lib/utils/VirtualGrid';

	export let data;
	export let itemHeight: number = 50;
	export let itemWidth: number = 50;
	export let containerHeight: number = 600;
	export let containerWidth = 400;
	export let nextData: App.NextData = () => [];
	export let Item: ConstructorOfATypedSvelteComponent;
	export let rowItems: number = 4;
	export let treshold: number = 0;
	export let maxFeeds = false;

	const grid = new VirtualGrid(
		data.slice(),
		nextData,
		containerHeight,
		itemHeight,
		itemWidth,
		rowItems,
		treshold,
		maxFeeds
	);

	let outputData: App.DataObject[] = [];
	let container: HTMLDivElement;
	let totalHeight: number;

	$: container && container.dispatchEvent(new CustomEvent('scroll'));

	async function handleScroll(ev: App.Ev) {
		outputData = grid.getChunk(ev);
		totalHeight = grid.totalHeight;
	}
</script>

<div
	class="wrapper"
	bind:this={container}
	on:scroll={handleScroll}
	style:height={containerHeight + 'px'}
	style:width={containerWidth + 'px'}
>
	{#if outputData.length}
		<div class="container" style:height={totalHeight + 'px'}>
			{#each outputData as item, i}
				<div
					class="item"
					style:top={item['top'] * grid.itemHeight + 'px'}
					style:left={(item['left'] - 1) * grid.itemWidth + 'px'}
					style:height={grid.itemHeight + 'px'}
					style:max-height={grid.itemHeight + 'px'}
					style:width={grid.itemWidth + 'px'}
				>
					<svelte:component this={Item} itemData={item} itemKey={item['key']} />
				</div>
			{/each}
		</div>{/if}
</div>

<style>
	.wrapper {
		overflow: auto;
	}

	.container {
		margin: 0;
		padding: 0;
		position: relative;
	}

	.item {
		box-sizing: border-box;
		position: absolute;
	}
</style>
