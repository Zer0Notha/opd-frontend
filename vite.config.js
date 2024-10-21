import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': "".concat(path.resolve(__dirname, './src/components')),
            '@config': "".concat(path.resolve(__dirname, './src/config')),
            '@pages': "".concat(path.resolve(__dirname, './src/pages')),
            '@services': "".concat(path.resolve(__dirname, './src/services')),
            '@schemas': "".concat(path.resolve(__dirname, './src/schemas')),
            '@assets': "".concat(path.resolve(__dirname, './src/assets')),
            '@store': "".concat(path.resolve(__dirname, './src/store')),
            '@utils': "".concat(path.resolve(__dirname, './src/utils')),
            '@hocs': "".concat(path.resolve(__dirname, './src/hocs')),
            '@hooks': "".concat(path.resolve(__dirname, './src/hooks')),
            '@router': "".concat(path.resolve(__dirname, './src/router')),
            '@context': "".concat(path.resolve(__dirname, './src/context')),
        },
    },
});
