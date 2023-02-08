import { resolve } from 'path'
import setting from './src/settings'
import { createVitePlugins } from './viteConfig'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isBuild = command === 'build'

  return {
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      reportCompressedSize: false,
      assetsInlineLimit: 10240,
      rollupOptions: { 
        output: { //静态资源分类打包
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { //静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#': resolve(__dirname, 'types')
      }
    },
    server: {
      port: 9527,
      host: true,
      open: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss"; $theme-color: ${setting.themeColor};`
        }
      }
    },
    plugins: createVitePlugins(env, isBuild)
  }
})
