import { defineConfig } from 'dumi'

// 读取package.json文件
// const packageJson = require('./package.json')

// 代理服务
const proxyServer = 'https://sftcloud.qince.com'
/*
'http://172.31.3.215:6020'
*/

// 导出配置，国际化有问题所以暂时只用中文
export default defineConfig({
  outputPath: 'docs',
  favicons: ['https://res.waiqin365.com/d/seedsui/favicon.png'],
  logo: 'https://res.waiqin365.com/d/seedsui/logo.png',
  // 设置html引用资源路径
  publicPath: '/seedsui-react/',
  // 设置路由前缀，通常用于部署到非根目录
  base: '/seedsui-react/',
  headScripts: [
    `window.onload = function(){
      let root = document.getElementById('root')
      if (root) {
        root.addEventListener('click', function (e) {
          // 点击编辑按钮, 激活编辑器
          if (e.target.classList.contains('dumi-default-previewer-editor-tip-btn')) {
            e.target.closest('.dumi-default-previewer-meta').classList.toggle('active')
          }
        }, false)
      }
    }`
  ],
  styles: [
    `
    /* windows滚动条样式 */
    * { scrollbar-width: thin !important; }

    /* 主体宽度 */
    .dumi-default-header-content,
    .dumi-default-doc-layout > main {
      max-width: none !important;
    }

    /* 编辑按钮修改 */
    .dumi-default-previewer-editor-tip-btn {
      cursor: pointer !important;
    }
    .dumi-default-previewer-editor-tip-btn * {
      pointer-events: none;
    }

    .dumi-default-previewer-meta{
      .dumi-default-source-code-editor-textarea {
        display: none;
      }
    }

    /* 点击编辑按钮, 激活编辑器 */
    .dumi-default-previewer-meta.active{
      .dumi-default-source-code-editor-textarea {
        display: block;
        background: #fff;
        color: #000;
      }
    }
  `
  ],
  metas: [{ name: 'viewport', content: 'width=device-width,viewport-fit=cover' }],
  themeConfig: {
    name: 'SeedsUI',
    // 导航
    nav: {
      'zh-CN': [
        { title: '安装', link: '/guide' },
        { title: '组件', link: '/components' },
        { title: '工具', link: '/utils' },
        { title: '页面', link: '/pages' },
        { title: '开发规范', link: '/dev' },
        { title: '交互规范', link: '/ux' },
        { title: '问答', link: '/faq' }
      ],
      'en-US': [
        { title: 'Install', link: '/en-US/guide' },
        { title: 'Components', link: '/en-US/components' },
        { title: 'Utils', link: '/en-US/utils' },
        { title: 'Pages', link: '/en-US/pages' },
        { title: 'Dev Standards', link: '/en-US/dev' },
        { title: 'UX Standards', link: '/en-US/ux' },
        { title: 'FAQ', link: '/en-US/faq' }
      ]
    },
    // 底部
    footer:
      '<div class="homepage-copyright">Copyright © 2023 | Powered <span style="color: #ff8800;">❤</span> by <a href="https://github.com/colaboy/seedsui-react" target="_blank" rel="noreferrer">SeedsUI</a></div>',
    // 配置 demo 预览器的设备宽度，默认为 375px
    deviceWidth: 375,
    // 配置为空数组时可禁用 umi-hd 高清方案, 否则预览时会缩小
    hd: { rules: [] },
    // 开启时 demo 预览容器将不会有内边距
    compact: false
  },
  conventionRoutes: {
    // to avoid generate routes for .dumi/pages/index/components/xx
    exclude: [new RegExp('index/components/')]
  },
  resolve: {
    // 文档目录
    docDirs: ['src-docs'],
    // 原子资产
    atomDirs: [
      { type: 'components', dir: 'src/components' },
      { type: 'pages', dir: 'src/pages' },
      { type: 'utils', dir: 'src/utils' }
    ]
    // codeBlockMode: 'passive',
  },
  alias: {
    src: '/src',
    locale: '/locale'
  },
  chainWebpack(memo: any) {
    // 设置 alias
    memo.resolve.alias.set('src', '/src')

    // 添加额外插件
    // memo.plugin('hello').use(Plugin, [...args]);

    // 删除 dumi 内置插件
    // memo.plugins.delete('hmr');
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' }
  ],
  // 代理
  proxy: {
    // 代理-api(访问 /api/users 就能访问到 http://jsonplaceholder.typicode.com/users 的数据。)
    '/api': {
      target: proxyServer,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    },
    // 代理登录
    '/login': {
      target: proxyServer,
      changeOrigin: true,
      pathRewrite: {
        '^/login': '/'
      }
    },
    /* 代理登录: 登陆页面的其它请求start */
    '/auth': {
      target: proxyServer,
      changeOrigin: true
    },
    '/platform': {
      target: proxyServer,
      changeOrigin: true
    },
    '/app/apaas': {
      target: proxyServer,
      changeOrigin: true,
      pathRewrite: { '^/api/app/apaas': '' }
    },
    '/apaas': {
      target: proxyServer,
      changeOrigin: true,
      pathRewrite: { '^/api/apaas': '' }
    },
    '/portal': {
      target: proxyServer,
      changeOrigin: true
    },
    /* 代理登录: 登陆页面的其它请求end */
    // 代理-pdf
    '/contract_redirect/': {
      // target: 'https://contract.waiqin365.com',
      target: 'https://contract-test.waiqin365.com',
      changeOrigin: true,
      pathRewrite: {
        '^/contract_redirect/': '/'
      }
    }
  }
})
