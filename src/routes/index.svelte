<script>
	import { view } from '../stores.js';
	import WorkAreas from './WorkAreas.svelte';
	import EditAchievement from './EditAchievement.svelte';
	import AllAchievements from './AllAchievements.svelte';

	let achievementId;

	let handleEditAchievement = (id) => {
		achievementId = id;
		$view = 'edit';
	};
</script>

<div id="app">
	{#if $view == 'add'}
		<EditAchievement achievementId={0} />
	{:else if $view == 'edit'}
		<EditAchievement {achievementId} />
	{:else if $view == 'workAreas'}
		<WorkAreas />
	{:else}
		<AllAchievements editAchievement={handleEditAchievement} />
	{/if}
</div>

<style>
	#app {
		padding: 1rem;
		margin: 0 auto;
		max-width: 45rem;
	}
</style>
