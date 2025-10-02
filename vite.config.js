import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@hooks': path.resolve(__dirname, 'src/app/hooks'),
            '@views': path.resolve(__dirname, 'src/views'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@styles': path.resolve(__dirname, 'src/app/styles')
        }
    }
})
