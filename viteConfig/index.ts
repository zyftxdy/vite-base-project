import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configSvgIconsPlugin } from './plugin/svgIcons'
import { configHtmlPlugin } from './plugin/html'
import { configCompressPlugin } from './plugin/compress'
import { configVisualizerPlugin } from './plugin/visualizer'
import { configComponentsPlugin } from './plugin/components'
import type { PluginOption } from 'vite'

export function createVitePlugins(env: Recordable, isBuild: boolean) {
  const vitePlugins: PluginOption[] = [
    vue(),
    vueJsx(),
    vueSetupExtend()
  ]

  vitePlugins.push(configComponentsPlugin(isBuild))
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(env, isBuild))
  // vite-plugin-compression
  isBuild && env.VITE_USE_COMPRESS && vitePlugins.push(configCompressPlugin())
  // rollup-plugin-visualizer
  isBuild && vitePlugins.push(configVisualizerPlugin())
  return vitePlugins
}