import path from 'path'
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@': path.resolve('./src'),
			'@components': path.resolve('./src/components'),
			'@lib': path.resolve('./src/lib'),
			'@routes': path.resolve('./src/routes')
		},
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			prerender: true,
			precompress: false,
			strict: false
		}),
		paths: {
			base: ''
		}
	}
};

export default config;
