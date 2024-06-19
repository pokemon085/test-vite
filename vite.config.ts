import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import mkcert from 'vite-plugin-mkcert'; //http ->https 因為chrome會擋

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue(),mkcert()],
    server: {
        https: true,
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
