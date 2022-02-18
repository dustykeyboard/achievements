<script lang="ts">
	import { achievements } from '../stores.js';
	import Greeting from '../components/Greeting.svelte';
	import AchievementView from '../components/Achievement.svelte';
	import type { Achievement } from '../components/Achievement.svelte';

	let filters = [];
	let handleFilter = (workArea) =>
		(filters = [...filters.filter((filter) => filter != workArea), workArea]);
	let removeFilter = (workArea) => (filters = filters.filter((filter) => filter != workArea));

	$: filteredAchievements = $achievements.filter(
		(achievement: Achievement) =>
			// no filters or achievement workArea includes a filter
			!filters.length || achievement.workAreas.some((workArea) => filters.includes(workArea))
	);
</script>

<svelte:head>
	<title>Achievements</title>
</svelte:head>

<h1>
	<Greeting />'s Achievements
</h1>

{#if filters.length}
	{#each filters as filter}
		<span class="p-chip">
			<span class="p-chip__value">{filter}</span>
			<button class="p-chip__dismiss" on:click={() => removeFilter(filter)}>Dismiss</button>
		</span>
	{/each}
{/if}

{#if filteredAchievements.length}
	<div class="u-align--right">
		<a class="p-button--base" href="/WorkAreas">Edit Work Areas</a>
		<a class="p-button" href="/Achievement/new">Add an achievement</a>
	</div>

	{#each filteredAchievements as achievement}
		<AchievementView {achievement} {handleFilter} />
	{/each}

	<div class="u-align--right">
		<a class="p-button--base" href="/WorkAreas">Edit Work Areas</a>
		<a class="p-button" href="/Achievement/new">Add an achievement</a>
	</div>
{:else}
	<p>You haven't added anything here yet.</p>

	<div class="u-align--right">
		<a class="p-button--base" href="/WorkAreas">Edit Work Areas</a>
		<a class="p-button" href="/Achievement/new">Add your first achievement</a>
	</div>
{/if}
