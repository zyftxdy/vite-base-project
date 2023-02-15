import type { RouteMenu } from '#/menu'
/**
 * 路由菜单格式
 * path尽量不要添加'/' 确保能添加到layout子路由下
 */
export const baseRouters: RouteMenu[] = [
  {
    component: 'Layout',
    name: 'demo',
    path: 'demo',
    meta: {
      activeMenu: '',
      icon: 'component',
      title: '组件展示'
    },
    children: [
      {
        component: 'Layout',
        name: 'table',
        path: 'table',
        meta: {
          title: '列表组件'
        },
        children: [
          {
            component: 'demo/table/baseTable',
            name: 'baseTable',
            path: 'base',
            meta: {
              title: '基础列表'
            }
          },
          {
            component: 'demo/table/virtualTable',
            name: 'virtualTable',
            path: 'virtual',
            meta: {
              title: '虚拟列表'
            }
          }
        ]
      },
      {
        component: 'demo/desc/index',
        name: 'desc',
        path: 'desc',
        meta: {
          title: '详情组件'
        }
      },
      {
        component: 'demo/card/index',
        name: 'card',
        path: 'card',
        meta: {
          title: '卡片组件'
        }
      },
      {
        component: 'demo/cropper/index',
        name: 'cropper',
        path: 'cropper',
        meta: {
          title: '图片裁剪'
        }
      },
      {
        component: 'demo/image/index',
        name: 'image',
        path: 'image',
        meta: {
          title: '图片组件'
        }
      },
      {
        component: 'demo/animationText/index',
        name: 'text',
        path: 'text',
        meta: {
          title: '动画组件'
        }
      },
      {
        component: 'demo/charts/index',
        name: 'charts',
        path: 'charts',
        meta: {
          title: '图表组件'
        }
      },
      {
        component: 'demo/upload/index',
        name: 'upload',
        path: 'upload',
        meta: {
          title: '上传组件'
        }
      },
      {
        component: 'demo/editor/index',
        name: 'editor',
        path: 'editor',
        meta: {
          title: '富文本组件'
        }
      },
      {
        component: 'demo/qrcode/index',
        name: 'qrcode',
        path: 'qrcode',
        meta: {
          title: '二维码组件'
        }
      }
    ]
  }
]
