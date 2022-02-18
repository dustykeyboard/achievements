<script context="module">
	export async function load({ params }) {
		return {
			props: {
				achievementId: params.achievementId
			}
		};
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { workAreas, achievements } from '../../stores.js';
	import Greeting from '../../components/Greeting.svelte';

	export let achievementId;

	// load existing achievement or create "empty" object
	let achievement = {
		...$achievements.find((achievement) => achievement.id == achievementId)
	};

	if (!achievementId) {
		achievement.id = $achievements.map((a) => a.id).reduce((m, i) => Math.max(m, i), 1) + 1;
		achievement.date = new Date().toISOString().substr(0, 10);
		achievement.workAreas = [];
	}

	let updateAchievement = () => {
		// validation
		if (!achievement.title || !achievement.description || !achievement.workAreas.length) return;

		// remove the old achievement and store updated the achievement in the store
		$achievements = [achievement, ...$achievements.filter((a) => a.id != achievement.id)];

		// redirect to the list of achievements
		goto('/');
	};
</script>

<svelte:head>
	<title>Achievements {achievementId} &rarr; {achievement.title}</title>
</svelte:head>

<h1>
	<Greeting />, {achievementId ? 'update your' : 'add an'} achievement
</h1>

<form class="p-form">
	<input
		type="text"
		class="is-required"
		bind:value={achievement.title}
		required
		placeholder="My achievement"
	/>
	<textarea
		class="is-required"
		bind:value={achievement.description}
		required
		placeholder="Describe your achievement..."
	/>
	<div class="achievement-metadata">
		<input type="date" bind:value={achievement.date} />
		<div class="workAreas">
			{#each $workAreas as workArea, i}
				<label class="p-checkbox">
					<input
						type="checkbox"
						class="p-checkbox__input"
						aria-labelledby="workArea{i}"
						bind:group={achievement.workAreas}
						value={workArea}
					/>
					<span class="p-checkbox__label" id="workArea{i}">
						{workArea}
					</span>
				</label>
			{/each}
			<a class="p-button--link" href="/WorkAreas"> Edit Work Areas </a>
		</div>
	</div>

	<div class="u-align--right">
		<a class="p-button--base" href="/">Cancel</a>
		<button type="submit" class="p-button" on:click|preventDefault={updateAchievement}
			>Save Achievement</button
		>
	</div>
</form>
