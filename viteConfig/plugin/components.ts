import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import type { PluginOption } from 'vite'
import type { Resolver } from 'unplugin-auto-import/types'
import type { ComponentResolver } from 'unplugin-vue-components/types'

const fullImportPlugin = () => {
  return <PluginOption>{
    name: 'fullImportElementPlus',
    transform (code, id) {
      // 判断当前处理的是否是 _src/main.ts_
      if (/src\/main.ts$/.test(id)) {
        const name = 'ElementPlus'
        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`
        code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
        return prepend + code
      }
      return code
    }
  }
}

export function configComponentsPlugin(isBuild: boolean) {
  const plugins: PluginOption[] = []

  const AutoImportReslovers: Arrayable<Arrayable<Resolver>> = [
    IconsResolver({
      prefix: 'Icon'
    })
  ]
  const componentsReslovers:(ComponentResolver | ComponentResolver[])[] = [
    IconsResolver({
      enabledCollections: ['ep']
    })
  ]

  if (isBuild) {
    AutoImportReslovers.push(ElementPlusResolver() as any)
    componentsReslovers.push(ElementPlusResolver())
  } else {
    plugins.push(fullImportPlugin())
  }

  plugins.push(
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: AutoImportReslovers
    }),
    Components({
      //组件的有效文件扩展名
      // extensions: ['tsx', 'vue'],
      // 转换目标的过滤器
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      resolvers: componentsReslovers
    }),
    Icons({
      autoInstall: true
    })
  )

  return plugins
}
