<script>
	import { user } from '../stores.js';
	let editing = false;
	let input;
	let done = () => (editing = false);
	let edit = () => {
		editing = true;
		setTimeout(() => {
			input.focus();
			input.select();
		}, 10);
	};
</script>

{#if editing}
	<input bind:value={$user} on:change={done} on:blur={done} bind:this={input} />
{:else}
	<span on:click={edit} title="Click to edit">{$user}</span>
{/if}

<style>
	span {
		cursor: pointer;
	}
</style>
