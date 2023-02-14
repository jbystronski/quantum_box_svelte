<script lang="ts">
	import { VirtualTree } from '$lib/utils/VirtualTree';

	export let data,
		indent: number = 20,
		itemHeight: number = 100,
		containerHeight: number = 600,
		containerWidth: number = 300,
		Item: ConstructorOfATypedSvelteComponent,
		defaultOpen: boolean = false;

	const tree = new VirtualTree(data, containerHeight, itemHeight, Boolean(defaultOpen));

	let outputData: App.DataObject[] = [],
		container: HTMLDivElement;

	$: container && container.dispatchEvent(new CustomEvent('scroll'));

	let height = tree.height;
	let position: number;

	async function handleScroll(ev: App.Ev) {
		position = tree.position;
		outputData = tree.getChunk(ev);
	}

	function onToggle(id) {
		tree.toggle(id);
		height = tree.height;
		outputData = tree.parse();
	}
</script>

<div
	class="wrapper"
	bind:this={container}
	on:scroll={handleScroll}
	style:height={containerHeight + 'px'}
>
	{#if outputData.length}
		<div class="container" style:height={height * tree.itemHeight + 'px' || 'inherit'}>
			{#each outputData as item, i}
				<div
					class="item"
					style:height={tree.itemHeight + 'px'}
					style:max-height={tree.itemHeight + 'px'}
					style:top={position + i * tree.itemHeight + 'px'}
					style:margin-left={indent * item.nestingLevel + 'px'}
				>
					<svelte:component
						this={Item}
						toggle={() => onToggle(item['id'])}
						itemData={item}
						itemKey={item['id']}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		overflow: auto;
		position: relative;
		width: 100%;
	}

	.container {
		width: 100%;
		border: 1px solid red;
	}

	.item {
		width: 100%;
		position: absolute;
	}
</style>
