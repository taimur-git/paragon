/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
//import { server } from './tests/server';

export default defineConfig({
	plugins: [sveltekit()],
});
