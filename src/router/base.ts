import type { RouteMenu } from '#/menu'

export const baseRouters: RouteMenu[] = [
  {
    component: '',
    name: 'demo',
    path: 'demo',
    meta: {
      activeMenu: '',
      icon: 'component',
      title: '组件展示'
    },
    children: [
      {
        component: 'demo/table/index',
        name: 'table',
        path: 'demo/table',
        meta: {
          title: '列表展示'
        }
      },
      {
        component: 'demo/desc/index',
        name: 'desc',
        path: 'demo/desc',
        meta: {
          title: '详情展示'
        }
      },
      {
        component: 'demo/card/index',
        name: 'card',
        path: 'demo/card',
        meta: {
          title: '卡片展示'
        }
      },
      {
        component: 'demo/cropper/index',
        name: 'cropper',
        path: 'demo/cropper',
        meta: {
          title: '图片裁剪'
        }
      },
      {
        component: 'demo/image/index',
        name: 'image',
        path: 'demo/image',
        meta: {
          title: '图片展示'
        }
      },
      {
        component: 'demo/text/index',
        name: 'text',
        path: 'demo/text',
        meta: {
          title: '动画展示'
        }
      },
      {
        component: 'demo/charts/index',
        name: 'charts',
        path: 'demo/charts',
        meta: {
          title: '图标展示'
        }
      },
      {
        component: 'demo/upload/index',
        name: 'upload',
        path: 'demo/upload',
        meta: {
          title: '上传展示'
        }
      },
      {
        component: 'demo/editor/index',
        name: 'editor',
        path: 'demo/editor',
        meta: {
          title: '富文本展示'
        }
      },
      {
        component: 'demo/qrcode/index',
        name: 'qrcode',
        path: 'demo/qrcode',
        meta: {
          title: '二维码展示'
        }
      }
    ]
  }
]
