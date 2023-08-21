import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'cp': './src/cp/index.ts',
			'cp/*': './src/cp/*',
		},
		adapter: adapter()
	}
};

export default config;
