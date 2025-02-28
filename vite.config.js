/* eslint-disable no-unused-vars */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: 'build',
	},
	plugins: [svgr(), react()],
	resolve: {
		alias: {
			app: '/src/app',
			entities: '/src/entities',
			features: '/src/features',
			pages: '/src/pages',
			shared: '/src/shared',
			widgets: '/src/widgets',
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: (content, filename) => {
					if (filename.endsWith('.module.scss')) {
						return `
							@import 'shared/assets/styles/abstracts/functions.scss';
							@import 'shared/assets/styles/abstracts/variables.scss';
							@import 'shared/assets/styles/abstracts/mixins.scss';
							@import 'shared/assets/styles/abstracts/extenders.scss';
							${content}
						`;
					}
					return content;
				},
			},
		},
	},
});
