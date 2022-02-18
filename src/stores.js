import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { sampleWorkAreas, sampleAchievements } from './sample.js';

export let view = writable(browser && window.localStorage?.view || 'summary');
view.subscribe(value => { if (browser) { localStorage.view = value } });

export let user = writable(browser && window.localStorage?.user || 'User');
user.subscribe(value => { if (browser) { localStorage.user = value } });

export let workAreas = writable(browser && JSON.parse(window.localStorage?.workAreas) || sampleWorkAreas);
workAreas.subscribe(value => { if (browser) { localStorage.workAreas = JSON.stringify(value) } });

export let achievements = writable(browser && JSON.parse(window.localStorage?.getItem('achievements')) || sampleAchievements);
achievements.subscribe(value => { if (browser) { localStorage.achievements = JSON.stringify(value) } });