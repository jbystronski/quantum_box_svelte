<script lang="ts">
	export let itemKey: number, itemData, toggle, isOpen, nestingLevel;
</script>

<div class:dblShift={itemData.isLeaf}>
	{#if !itemData.isLeaf}
		<svg
			on:keypress={(e) => {
				e.code === 'Enter' && toggle();
			}}
			on:click={toggle}
			class="icon"
			class:right={itemData.open}
			class:down={!itemData.open}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg
		>
	{/if}
	<span class="item" class:shift={!itemData.isLeaf}>
		{#if !itemData.isLeaf}
			<svg
				class="folderIcon"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				><path
					d="M0 10v12h24v-12h-24zm0-2v-6h7c1.695 1.942 2.371 3 4 3h13v3h-2v-1h-11c-2.34 0-3.537-1.388-4.916-3h-4.084v4h-2z"
				/></svg
			>
		{:else}
			<svg
				class="file"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				><path
					d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm4.811 13h-10v-1h10v1zm0 2h-10v1h10v-1zm-3 3h-7v1h7v-1z"
				/></svg
			>
		{/if}
		<span class="label">#{itemKey}</span></span
	>
</div>

<style>
	.label {
		margin-left: 0.5rem;
	}

	.folderIcon {
		width: 1rem;
		height: 1rem;
	}

	.file {
		width: 1rem;
		height: 1rem;
	}

	.right {
		transform: rotate((0deg));
	}

	.down {
		transform: rotate(90deg);
	}

	div {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* padding-left: 1rem; */
	}

	.shift {
		/* margin-left: 1rem; */
	}

	.dblShift {
		padding-left: 1.35rem;
	}

	.item {
		box-sizing: border-box;

		padding: 0.5rem;
		padding-left: 0;
		min-width: 15rem;
		display: flex;
		align-items: center;
	}

	.icon {
		color: #fff;
		width: 0.6rem;
		height: 0.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		cursor: pointer;
		padding: 6px;
		transition: 0.1s;
	}
</style>
