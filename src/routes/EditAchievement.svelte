<script lang="ts">
	import { workAreas, achievements, view } from '../stores.js';
	import Greeting from '../components/Greeting.svelte';
	import type { Achievement } from '../components/Achievement.svelte';

	export let achievementId;

	// load existing achievement or create "empty" object
	let achievement: Achievement = {
		...$achievements.find((achievement) => achievement.id === achievementId)
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

		// return to the summary
		$view = 'summary';
	};

	let editWorkAreas = () => ($view = 'workAreas');
	let cancel = () => ($view = 'summary');
</script>

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
			<button type="button" class="p-button--link" on:click|preventDefault={editWorkAreas}>
				Edit Work Areas
			</button>
		</div>
	</div>

	<div class="u-align--right">
		<button type="button" class="p-button--base" on:click|preventDefault={cancel}>Cancel</button>
		<button type="submit" class="p-button" on:click|preventDefault={updateAchievement}
			>Save Achievement</button
		>
	</div>
</form>
