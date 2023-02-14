<script lang="ts">
	export let itemKey: number, toggle, isOpen;
</script>

<div>
	<button on:click={toggle}>{isOpen ? 'close' : 'open'}</button>
	<p>{itemKey}</p>
</div>

<style>
	div {
		border: 1px solid #000;
		height: 100%;
		box-sizing: border-box;
	}
</style>
