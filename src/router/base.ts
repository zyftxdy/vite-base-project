import type { RouteMenu } from '#/menu'
/**
 * 路由菜单基本格式
 * path尽量不要添加'/' 确保能添加到layout子路由下
 */
export const baseRouters: RouteMenu[] = [
  {
    component: 'Layout',
    name: 'demo',
    path: '/demo',
    meta: {
      activeMenu: '',
      icon: 'component',
      title: '组件展示'
    },
    redirect: '/demo/table',
    children: [
      {
        component: 'subLayout',
        name: 'table',
        path: 'table',
        meta: {
          title: '列表组件'
        },
        redirect: '/demo/table/base',
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
          },
          {
            component: 'demo/table/treeTable',
            name: 'treeTable',
            path: 'treeTable',
            meta: {
              title: '树状列表'
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
  },
  {
    component: 'Layout',
    name: 'echarts',
    path: '/echarts',
    meta: {
      activeMenu: '',
      icon: 'charts',
      title: 'echarts'
    },
    redirect: '/echarts/map',
    children: [
      {
        component: 'echarts/map',
        name: 'map',
        path: 'map',
        meta: {
          title: '地图'
        }
      },
      {
        component: 'echarts/line',
        name: 'line',
        path: 'line',
        meta: {
          title: '折线图'
        }
      },
      {
        component: 'echarts/pie',
        name: 'pie',
        path: 'pie',
        meta: {
          title: '饼图'
        }
      },
      {
        component: 'echarts/bar',
        name: 'bar',
        path: 'bar',
        meta: {
          title: '柱状图'
        }
      }
    ]
  }
]
