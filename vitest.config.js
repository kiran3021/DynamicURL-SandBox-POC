import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		css: true,
		setupFiles: ['./vitest.setup.js',"./vitest-cleanup-after-each.js"],
		// coverage: {
		// 		reporter: ['text', "html"]
		// 	  },

	
	},
});
