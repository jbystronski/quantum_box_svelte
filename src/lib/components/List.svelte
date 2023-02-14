<script lang="ts">
	import { VirtualList } from '$lib/utils/VirtualList';

	export let data,
		itemHeight: number = 100,
		containerHeight: number = 600,
		containerWidth: number = 300,
		nextData: App.NextData = () => [],
		Item: ConstructorOfATypedSvelteComponent,
		treshold = 0,
		maxFeeds = false;

	const list = new VirtualList(
		data.slice(),
		nextData,
		containerHeight,
		itemHeight,
		treshold,
		maxFeeds
	);

	let outputData: App.DataObject[] = [],
		container: HTMLDivElement,
		totalHeight: number;

	$: container && container.dispatchEvent(new CustomEvent('scroll'));

	async function handleScroll(ev: App.Ev) {
		outputData = list.getChunk(ev);
		totalHeight = list.totalHeight;
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
		<ul class="container" style:height={totalHeight ? totalHeight + 'px' : 'inherit'}>
			{#each outputData as item, i}
				<li
					class="item"
					style:height={list.itemHeight + 'px'}
					style:max-height={list.itemHeight + 'px'}
					style:top={item['top'] * list.itemHeight + 'px'}
				>
					<svelte:component this={Item} itemData={item} itemKey={item['key']} />
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.wrapper {
		overflow: auto;
	}

	.container {
		margin: 0;
		padding: 0;
		position: relative;
		overflow: hidden;
	}

	.item {
		width: 100%;
		position: absolute;
		left: 0px;
	}
</style>
