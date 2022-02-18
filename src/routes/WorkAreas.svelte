<script>
	import { workAreas, view } from '../stores.js';
	import Greeting from '../components/Greeting.svelte';

	let newWorkArea = '';
	let handleAdding = () => ($workAreas = [...$workAreas, newWorkArea]);
	let handleRemove = (workArea) => ($workAreas = $workAreas.filter((wa) => wa !== workArea));

	let done = () => ($view = 'summary');
</script>

<svelte:head>
	<title>Work Areas</title>
</svelte:head>

<h1>
	<Greeting />'s work areas
</h1>

<div class="u-align--right">
	<a class="p-button p-button--base" href="/">Done</a>
</div>

<ul class="p-list--divided">
	{#each $workAreas as workArea}
		<li class="p-list__item">
			<button
				class="p-button--base is-inline is-small"
				on:click={() => handleRemove(workArea)}
				title="Remove this work area"><i class="p-icon--delete" /></button
			>
			{workArea}
		</li>
	{/each}
</ul>

<form class="p-form p-form--inline">
	<input type="text" placeholder="New work area" bind:value={newWorkArea} />
	<button class="p-button is-inline" type="button" on:click={handleAdding}> Add </button>
</form>

<div class="u-align--right">
	<a class="p-button p-button--base" href="/">Done</a>
</div>

<style>
	form {
		display: flex;
	}
</style>
