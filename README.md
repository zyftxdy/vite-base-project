# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## 项目启动、打包

```bash
# install dependency
npm install

# develop
npm run serve

# build for beta environment
npm run build:beta

# build for production environment
npm run build:prod
```

# usual-search 组件

### 属性

|     参数      |       说明       |  类型   |   可选值    | 默认值 |
| :-----------: | :--------------: | :-----: | :---------: | :----: |
|  showExport   | 是否显示导出按钮 | Boolean | true, false | false  |
|   showArrow   |   是否显示展开   | Boolean | true, false | false  |
|  labelWidth   | 表单域标签的宽度 | Number  |      -      |   70   |
|     width     | el-input 的宽度  | Number  |      -      |  220   |
| searchOptions |    搜索栏配置    |  Array  |      -      |   -    |
|   listQuery   | 双向绑定数据配置 | Object  |      -      |   -    |

#### searchOptions 基础配置项

|    参数     |            说明            |   类型   |             可选值              | 默认值 |
| :---------: | :------------------------: | :------: | :-----------------------------: | :----: |
|    type     |         筛选框类型         |  String  | input,select,date,cascader,slot |   --   |
|    label    |        label 标签名        |  String  |                -                |   -    |
|    prop     | 筛选框绑定值对应 listQuery |  String  |                -                |   -    |
| placeholder |   筛选框默认 placeholder   |  String  |                -                |   -    |
|   method    |    item 绑定的普通方法     | Function |                -                |   -    |

##### type === input 配置项

| 参数 |          说明          |  类型   | 可选值 | 默认值 |
| :--: | :--------------------: | :-----: | :----: | :----: |
| icon | 是否显示 icon 搜索组件 | Boolean |   --   | false  |

##### type === search 配置项

|     参数     |                       说明                       |   类型   | 可选值 | 默认值  |
| :----------: | :----------------------------------------------: | :------: | :----: | :-----: |
| optionsList  |                 options 下拉数组                 |  Array   |   --   |   --    |
|  optionKey   |                el-option 对应 key                |  String  |   --   | 'value' |
| optionLabel  |               el-option 对应 label               |  String  |   --   | 'label' |
|   multiple   |                    是否可多选                    | Boolean  |   --   |  false  |
|  filterable  |                    是否可搜索                    | Boolean  |   --   |  false  |
|    remote    |                 是否开启远程搜索                 | Boolean  |   --   |  false  |
|  clearable   |                    是否可清空                    | Boolean  |   --   |  false  |
| remoteMethod |                     远程方法                     | Function |   --   |   --    |
| clearMethod  |                     清空方法                     | Function |   --   |   --    |
|  seletType   | 远程、清空方法的区分类型(多个远程、清空方法区分) |  String  |   --   |   --    |

```html
<!-- selectType eg: 
    type1: teacher
    type2: course
    type3: class
    clearMethod类似 -->
<el-search :remoteMethod="e => remoteMethod(e, 'teacher')" />
<el-search :remoteMethod="e => remoteMethod(e, 'course')" />
<el-search :remoteMethod="e => remoteMethod(e, 'class')" />
```

##### type === date 配置项

日期筛选框默认为 `daterange` 后续可拓展

##### type === cascader 配置项

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-: | :-: | :-: | :-: | :-: |
| props | 配置选项 | CascaderProps(element-plus) | -- | -- |
| options | 可选项数据源，键名可通过 Props 属性配置 | CascaderOption[](element-plus) | -- | -- |
| clearable | 是否可清空 | Boolean | -- | false |
| filterable | 是否可搜索 | Boolean | -- | false |
| showAllLevels | 是否展示所有类别 | Boolean | -- | false |

```js
// demo
searchOptions = [
  {
    type: 'input',
    label: '品牌名称',
    prop: 'brandName',
    placeholder: '请输入品牌名称',
    icon: true
  },
  {
    type: 'date',
    label: '创建时间',
    prop: 'dates',
    method: () => {},
    disabledDate: time => time.getTime() > Date.now()
  },
  {
    type: 'select',
    label: '主营类目',
    prop: 'tag',
    optionsList: [],
    optionKey: 'k',
    optionLabel: 'name',
    clearable: true,
    filterable: true
  },
  [
    {
      type: 'select',
      label: '所在地区',
      width: '120px',
      prop: 'provinceCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择省份',
      method: () => {}
    },
    {
      type: 'select',
      label: '所在地区',
      width: '120px',
      prop: 'cityCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择市',
      method: () => {}
    },
    {
      type: 'select',
      label: '所在地区',
      width: '120px',
      prop: 'districtCode',
      optionsList: [],
      optionKey: 'code',
      optionLabel: 'fullName',
      placeholder: '请选择区县'
    }
  ]
]
```

# usual-table 组件

实现 table 列表组件以下功能：

1. 自定义列、自定义头部
2. 列可操作（移动、删除）
3. table 树形结构
4. 筛选列、列排序功能

## table

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-: | :-: | :-: | :-: | :-: |
| border | 是否带有纵向边框 | boolean | -- | false |
| treeProps | 渲染嵌套数据的配置选项 | object | -- | { hasChildren: 'hasChildren', children: 'children' } |
| showSelect | 是否显示筛选框 | boolean | -- | false |
| loading | 显示 loading | boolean | -- | false |
| list | 渲染数据 | Recordable[] | -- | [] |
| columns | 渲染列 | TableColumn[] | -- | [] |
| rowKey | 行数据的 Key | String | -- | '' |
| text | 表格为空时显示的描述 | String | -- | '暂无数据' |

## table-v2

|      参数       |              说明               |     类型      | 可选值 |   默认值   |
| :-------------: | :-----------------------------: | :-----------: | :----: | :--------: |
|   showSelect    |         是否显示筛选框          |    boolean    |   --   |   false    |
|     loading     |          显示 loading           |    boolean    |   --   |   false    |
|      list       |            渲染数据             | Recordable[]  |   --   |     []     |
|     columns     |             渲染列              | TableColumn[] |   --   |     []     |
|     rowKey      |          行数据的 Key           |    String     |   --   |     ''     |
|      text       |      表格为空时显示的描述       |    String     |   --   | '暂无数据' |
| expandColumnKey | 列的 key 来标记哪个行可以被展开 |    String     |   --   |     ''     |

#### TableColumn 类型

```ts
interface TableColumn {
  label: string
  prop: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean | 'custom'
  width?: number
  overflow?: boolean
  merge?: boolean
  fixed?: true | 'left' | 'right'
  formatter?: (row?: any, column?: any, cellValue?: any, index?: number) => any
  renderHeader?: (
    cellValue: any,
    data?: any
  ) => VNode | undefined | JSX.Element | Element | string | number
  render?: (
    cellValue: any,
    data?: any
  ) => VNode | undefined | JSX.Element | Element | string | number
}
```

```js
// TableColumn demo
const columns = [
  { label: '品牌名称', prop: 'brandName' },
  { label: '校区名称', prop: 'schoolName' },
  {
    label: '所在地区',
    prop: 'provinceName',
    formatter: row => row.provinceName + row.cityName + row.districtName
  },
  { label: '详细地址', prop: 'address' },
  { label: '品牌所属人', prop: 'ownerName' },
  { label: '入选时间', prop: 'updateTime' },
  { label: '操作人', prop: 'updateName' },
  { label: '操作', prop: 'action', overflow: false, width: 140, fixed: 'right' }
]
```

# Pageation 组件

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :-: | :-: | :-: | :-: | :-: |
| scrollTop | 是否回到页面顶部 | boolean | -- | true |
| background | 是否为分页按钮添加背景色 | boolean | -- | true |
| total | 总条目数 | number | -- | 0 |
| pageNum | 当前所在的页数 | number | -- | 1 |
| pageSize | 每页显示条目个数 | number | -- | 10 |
| pageSizes | 每页显示个数选择器的选项设置 | number[] | -- | [10, 20, 30, 50] |
| layout | 组件布局，子组件名用逗号分隔 | String | -- | 'prev, pager, next, jumper, ->, total' |

# usual-upload 组件

### 属性

|      参数       |         说明          |    类型    |    可选值    |         默认值         |
| :-------------: | :-------------------: | :--------: | :----------: | :--------------------: |
|      type       |     图片上传类型      |   String   | single, list |         single         |
|    imageSize    | 图片上传大小(单位：M) |   Number   |      --      |           10           |
|    imageDesc    |     图片上传描述      |   String   |      --      |           --           |
|    maxLength    |    图片最大上传数     |   Number   |      --      |           1            |
|      width      |   图片上传尺寸--宽    |   number   |      --      |          104           |
|     height      |   图片上传尺寸--高    |   number   |      --      |          104           |
|   imageLimit    |     图片上传格式      |   Array    |      --      | ['jpg', 'png', 'jpeg'] |
|    extraTips    |    额外的上传提示     |   String   |      --      |           --           |
| showUploadVideo |   是否显示视频上传    |  Boolean   |      --      |         false          |
|      image      |   上传文件图片编号    |   String   |      --      |           --           |
|    imageUrl     |   上传文件图片 url    |   String   |      --      |           --           |
|    fileList     |     上传文件列表      | FileList[] |      --      |           []           |

#### FileList 类型

```ts
interface FileList {
  imageNo: string
  imageUrl: string
}
```

# Qrcode 二维码组件

### 属性

|  参数   |          说明          |          类型          |   可选值    | 默认值 |
| :-----: | :--------------------: | :--------------------: | :---------: | :----: |
| codeUrl |    生成二维码的 url    |         String         |     --      |   --   |
|  width  |      二维码的大小      |         Number         |     --      |   --   |
|  logo   | 生成的二维码的 logoUrl |         string         |     --      |   --   |
| options |  配置二维码所需的参数  | QRCodeRenderersOptions |     --      |   --   |
|   tag   |    生成二维码的类型    |         String         | canvas, img | canvas |

```ts
  // 事件触发： done
  // 参数：url: 生成的bas64二维码图片
  <qrcode :codeUrl="coderUrl" @done="done"/>
```

# Cropper 裁剪组件

### cropper

#### 属性

|    参数     |        说明        |      类型       | 可选值 | 默认值 |
| :---------: | :----------------: | :-------------: | :----: | :----: |
|     src     |   要裁剪的原 url   |     String      |   --   |   --   |
|   height    |   裁剪区域的高度   |     String      |   --   | 360px  |
|   circled   | 是否裁剪圆形的图片 |     boolean     |   --   | false  |
| crossorigin |    图片是否跨域    |     String      |   --   |   --   |
| imageStyle  |     图片的样式     |  CSSProperties  |   --   |   --   |
|   options   | cropper 裁剪的配置 | Cropper.Options |   --   |   --   |

```ts
  // 事件触发 cropend
  // 参数： url: 生成的base64图片  blob: 生成的blob文件
  <cropper :src="src" @cropend="cropend">
```

### cropperModel 裁剪+上传组件

#### 属性

|  参数   |        说明        |  类型   | 可选值 | 默认值 |
| :-----: | :----------------: | :-----: | :----: | :----: |
| height  |   裁剪区域的高度   | String  |   --   | 300px  |
| circled | 是否裁剪圆形的图片 | boolean |   --   | false  |

```ts
  // 事件触发 success
  // 参数： fileNo: 文件编号  fileUrl: 文件url
  <cropper-model @success="success">
```

# AnimationText 文本动画组件

|  参数  |      说明      |  类型  | 可选值 | 默认值 |
| :----: | :------------: | :----: | :----: | :----: |
| source |  要渲染的文本  | String |   --   |   ''   |
| delay  | 渲染动画的速度 | Number |   --   |   30   |

# Description 详情 - 描述展示组件

|   参数    |      说明      |    类型    |    可选值    |   默认值   |
| :-------: | :------------: | :--------: | :----------: | :--------: |
|  column   | 每行展示的列数 |   Number   |      --      |     3      |
|   data    |  待展示的数据  |   Object   |      --      |     --     |
|  schema   | 渲染展示的描述 | DescItem[] |      --      |     --     |
| direction |    排列方式    |   string   | 'horizontal' | 'vertical' | horizontal |
|  border   |      边框      |  boolean   |      --      |   false    |

**_ enum 里的 listQuery 写成函数模式，防止页面修改导致数据污染 _**
