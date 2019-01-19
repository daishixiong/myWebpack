# my-webpack

> vue + webpack + element-ui模版

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev --module=mgmt
npm run dev --module=hospital

# build for production with minification
npm run build --module=mgmt
npm run build --module=hospital

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## ElementUI自定义样式

修改文件：`~/src/assets/css/element-ui-theme.scss`

如果需要对原有样式进行覆盖重写，则需要在当前目录下创建对应组件的scss文件，如：`element/checkbox.scss`

修改`.babelrc`
```json
"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "style": false
      }
    ]
]
```
## 全局自定义样式

文件：`~/src/theme.less`

## 网络请求
