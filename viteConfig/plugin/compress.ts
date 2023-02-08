import viteCompression from 'vite-plugin-compression'

export function configCompressPlugin() {
  const compressPlugin = viteCompression({
    verbose: true, //是否在控制台输出压缩结果
    disable: false, //是否禁用,相当于开关在这里
    deleteOriginFile: false, //删除源文件
    threshold: 102400,
    algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
    ext: '.gz' //文件后缀
  })

  return compressPlugin
}
