<script>
	import { achievements, view } from '../stores.js';
	import Greeting from '../components/Greeting.svelte';
	import Achievement from '../components/Achievement.svelte';

	export let editAchievement;

	let addAchievements = () => ($view = 'add');

	let filters = [];
	let handleFilter = (workArea) =>
		(filters = [...filters.filter((filter) => filter != workArea), workArea]);
	let removeFilter = (workArea) => (filters = filters.filter((filter) => filter != workArea));

	$: filteredAchievements = $achievements.filter(
		(achievement) =>
			// no filters or achievement workArea includes a filter
			!filters.length || achievement.workAreas.some((workArea) => filters.includes(workArea))
	);
</script>

<h1>
	<Greeting />'s Achievements
</h1>

{#if filters.length}
	{#each filters as filter}
		<span class="p-chip">
			<span class="p-chip__value">{filter}</span>
			<button class="p-chip__dismiss" on:click={() => removeFilter(filter)}> Dismiss </button>
		</span>
	{/each}
{/if}

{#if filteredAchievements.length}
	<div class="u-align--right">
		<button class="p-button" on:click|preventDefault={addAchievements}
			>Add another achievement</button
		>
	</div>
	{#each filteredAchievements as achievement}
		<Achievement {achievement} {handleFilter} {editAchievement} />
	{/each}
	<div class="u-align--right">
		<button class="p-button" on:click|preventDefault={addAchievements}
			>Add another achievement</button
		>
	</div>
{:else}
	<p>You haven't added anything here yet.</p>

	<div class="u-align--right">
		<button class="p-button" on:click|preventDefault={addAchievements}
			>Add your first achievement</button
		>
	</div>
{/if}
