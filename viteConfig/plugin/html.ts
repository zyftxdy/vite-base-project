import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin(env: Recordable, isBuild: boolean) {
  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    entry: 'src/main.ts',
    inject: {
      data: {
        title: env.VITE_TITLE
      }
    }
  })

  return htmlPlugin
}