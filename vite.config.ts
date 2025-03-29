import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
		alias: {
			'@errors': fileURLToPath(new URL('./src/shared/store/errors', import.meta.url)),
			'@request': fileURLToPath(new URL('./src/shared/services/http', import.meta.url)),
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
})
