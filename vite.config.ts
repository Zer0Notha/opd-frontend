import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
		alias: {
			'@components': `${path.resolve(__dirname, './src/components')}`,
			'@config': `${path.resolve(__dirname, './src/config')}`,
			'@pages': `${path.resolve(__dirname, './src/pages')}`,
			'@services': `${path.resolve(__dirname, './src/services')}`,
			'@schemas': `${path.resolve(__dirname, './src/schemas')}`,
			'@assets': `${path.resolve(__dirname, './src/assets')}`,
			'@store': `${path.resolve(__dirname, './src/store')}`,
			'@utils': `${path.resolve(__dirname, './src/utils')}`,
			'@hocs': `${path.resolve(__dirname, './src/hocs')}`,
			'@hooks': `${path.resolve(__dirname, './src/hooks')}`,
			'@router': `${path.resolve(__dirname, './src/router')}`,
			'@context': `${path.resolve(__dirname, './src/context')}`,
		},
	},
})
