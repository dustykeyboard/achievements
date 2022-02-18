import { writable } from 'svelte/store';
import { sampleWorkAreas, sampleAchievements } from './sample.js';

export let view = writable('summary');

export let user = writable('_you_');

export let workAreas = writable(sampleWorkAreas);

export let achievements = writable(sampleAchievements);