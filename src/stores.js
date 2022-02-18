import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { sampleWorkAreas, sampleAchievements } from './sample.js';

const initialView = browser ? window.localStorage.getItem('view') ?? 'summary' : 'summary';
export let view = writable(initialView);
view.subscribe(value => { if (browser) { localStorage.view = value } });

const initialUser = browser ? window.localStorage.getItem('user') ?? 'User' : 'User';
export let user = writable(initialUser);
user.subscribe(value => { if (browser) { localStorage.user = value } });

const initialWorkAreas = browser ? JSON.parse(window.localStorage.getItem('workAreas')) ?? sampleWorkAreas : sampleWorkAreas;
export let workAreas = writable(initialWorkAreas);
workAreas.subscribe(value => { if (browser) { localStorage.workAreas = JSON.stringify(value) } });

const initialAchievements = browser ? JSON.parse(window.localStorage.getItem('achievements')) ?? sampleAchievements : sampleAchievements;
export let achievements = writable(initialAchievements);
achievements.subscribe(value => { if (browser) { localStorage.achievements = JSON.stringify(value) } });