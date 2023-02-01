import { defineConfig, loadEnv, type PluginOption } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isBuild = (command === 'build')

  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ]
    }),
    Components({
      //组件的有效文件扩展名
      extensions: ['tsx', 'vue'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    }),
    createHtmlPlugin({
      minify: isBuild,
      entry: 'src/main.ts',
      inject: {
        data: {
          title: env.VITE_TITLE
        }
      }
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      svgoOptions: isBuild,
      symbolId: 'icon-[dir]-[name]'
    })
  ]

  isBuild && plugins.push(
    visualizer({
      emitFile: true,
      filename: 'analysis.html',
      open: true, //在默认用户代理中打开生成的文件
      gzipSize: true, //从源代码中收集 gzip 大小并将其显示在图表中
      brotliSize: true //从源代码中收集 brotli 大小并将其显示在图表中
    })
  )
  isBuild && plugins.push(
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      threshold: 102400,
      algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz' //文件后缀
    })
  )

  // const SPLIT_CHUNK_CONFIG = [
  //   {
  //     match: /[\\/]src[\\/]_?utils(.*)/,
  //     output: 'chunk-utils'
  //   },
  //   {
  //     match: /[\\/]src[\\/]_?components(.*)/,
  //     output: 'chunk-components'
  //   }
  // ]

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

            // for (const item of SPLIT_CHUNK_CONFIG) {
            //   const { match, output } = item
            //   if (match.test(id)) {
            //     return output
            //   }
            // }
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
      host: true,
      port: 9527,
      open: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    plugins: plugins
  }
})
