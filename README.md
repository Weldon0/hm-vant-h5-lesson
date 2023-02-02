##  

如果一次性加载所有的页面内容
问题：打包之后的体积非常大，加载速度慢
首次获取到的js文件的体积会非常大，加载速度慢
访问到哪个页面再请求哪个页面的js，不用一次性全部返回

路由懒加载
login，只把登录页面的js返回，其他页面的js不返回
只有你访问到了其他页面的时候，再返回对应页面的js

路由懒加载的实现方式
组件的同步引入，变成动态import引入

```js

import Login from '@/views/login'

const routes = [{
  path: '/login',
  component: Login
}]


// 路由懒加载

const routes = [{
  path: '/login',
  component: () => import('@/views/login')
}]
```

webpack遇到import函数，把imoprt函数导入的内容单独的打包成一个js文件，用到的时候再进行引入

