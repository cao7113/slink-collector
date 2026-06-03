# Slink Chrome Extension

Shareup Link Collector

## Todo

- 页面布局优化
- 多 tab 实现
- collect api 422 status test and handling
- gh actions deploy release
- deploy to web store

## AI prompt

来，我们分多步实现一个优美的 chrome 插件 slink-collector，以收集网址。

第 1 步：搭建技术框架

希望使用的技术：

- bun 作为依赖包管理工具
- vite 作为构建&开发工具，使用 create-vite 的 vanilla-ts 模板
- 使用 typescript 进行代码开发和配置
- 样式和布局使用 tailwindcss postcss autoprefixer daisyui(bun add -d 进行包依赖安装), 配置 tailwind 时使用 bun tailwindcss init --postcss --esm --ts，生成 tailwind.config.ts 和 postcss.config.ts
- 添加@types/chrome 进行 chrome api type 提示
- 插件的 manifest.json 文件默认放在 public/下
- 生成一个简单的 src/background.ts 文件 包含 console.log("extension installed!")

插件选项 options.html 需求如下：

- 页面使用 tailwind-css 或 daisyui 设计，不增加新的样式
- 用户可添加多组配置，每组配置包括 apiUrl（默认 input tag 的 value = 'http://localhost:4000/api/links')，bearerToken，用户备注 note(非必填)，每个 input 占一行
- 表单提交之后 reset 到初始状态，并在页面上显示 flash 消息告知用户配置添加成功
- 使用 chrome.storage.sync 进行存储，以便在多设备同步
- 用户可设置某组配置为当前生效配置，默认为第一组，且最多仅有一组配置为当前生效配置（高亮显示）
- 用户可删除一组配置，删除按钮用危险提示方式
- 用户可对列表中的配置上下拖动排序，原生 js 方式，不使用第三方 js 库
- 列表展示配置时 beaerToken 信息时只展示一半，其余 mask 遮挡（私密保护）
- 可将某组配置作为配置模板，点击 Fork 按钮将对应配置复制到顶部的提交表单对应字段中，方便创建新配置
- options.ts 和 style.css 放入 src 目录，options.html 在根目录,（引用方式为 <link rel="stylesheet" href="/src/style.css">和<script type="module" src="/src/options.ts"></script>)

请给出具体实现代码

第 2 步：插件弹出页 popup.html 实现，功能需求如下：

- 用户点快捷键或点击 action icon 时触发 创建一个表单，填充当前 tab 的 url 和 title
- 用户可输入 note 和 tags 字段
- 用户点击提交或快捷键时将 该表单 提交到 在 options 配置的当前生效的 api-url
- 当页面提交后，页面有有提示消息：某页面已提交，可显示服务端回传的信息，如 id 等

请给出具体实现代码

## Debug

Access to fetch at 'http://localhost:4000/api/links' from origin 'chrome-extension://lbgapililbcipfpmcncpapinhmlmjnim' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

https://medium.com/@marksaystuff/cors-settings-in-phoenix-bb27d7160
