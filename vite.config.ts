import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    server: {
        host: '0.0.0.0',
        port: 3007, //启动端口
        hmr: {
            host: '0.0.0.0',
            port: 3007
        },
       // 设置 https 代理
        // proxy: {
        //     '/api': {
        //         target: 'your https address',
        //         changeOrigin: true,
        //         rewrite: (path: string) => path.replace(/^\/api/, '')
        //     }
        // }
    }

});
