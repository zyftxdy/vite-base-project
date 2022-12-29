export const ImageRef = () => ({
  logoBgUrl: '', // 机构端logo 白底
  logoCUrl: '', // 机构端logo 彩色
  iconUrl: '',
  picture1Url: '', // 机构端广告背景
  picture2Url: '', // 机构端登录背景
  picture5Url: '', // 监管端登陆背景
  picture6Url: '', // 监管端logo
  picture7Url: '', // 监管端后台产品logo
  picture8Url: '' // 监管端icon
})

export const ModelRef = () => ({
  id: '',
  ad1: '',
  ad2: '',
  ad4: '',
  ad5: '',
  ad6: '', // 网页端标签标题
  logoBg: '', // 机构端logo 白底
  logoC: '', // 机构端logo 彩色
  picture1: '', // 机构端广告背景
  picture2: '', // 机构端登录背景
  icon: '',  // 机构端标签图标
  ad7: '',  // 监管端欢迎语
  ad8: '',  // 监管端后台产品标题
  ad9: '',  // 监管端标签标题
  picture5: '', // 监管端登陆背景
  picture6: '', // 监管端logo
  picture7: '', // 监管端后台产品logo
  picture8: '' // 监管端icon
})

export const sample = (type: string) => {
  let title = ''
  let imgBg = ''
  switch (type) {
    case '1':
      title = '查看示例-教培机构端登录界面'
      imgBg = '/static/setting/setting3.png'
      break
    case '2':
      title = '查看示例-教培机构端管理后台'
      imgBg = '/static/setting/setting2.png'
      break
    case '3':
      title = '查看示例-教培机构端网页标签'
      imgBg = '/static/setting/setting5.png'
      break
    case '4':
      title = '查看示例-监管平台登录界面'
      imgBg = '/static/setting/setting4.png'
      break
    case '5':
      title = '查看示例-监管平台管理后台'
      imgBg = '/static/setting/setting1.png'
      break
    case '6':
      title = '查看示例-监管平台网页标签'
      imgBg = '/static/setting/setting5.png'
      break
  }
  return {
    title,
    imgBg
  }
}
