import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'seedsui-react',
  favicon: 'https://res.waiqin365.com/d/seedsui/favicon.png',
  logo: 'https://res.waiqin365.com/d/seedsui/logo.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // 设置路由前缀，通常用于部署到非根目录
  base: '/seedsui-react/',
  // more config: https://d.umijs.org/config
  // 自定义配置
  locales: [
    ['en', 'English'],
    ['zh', '中文']
  ],
  // 一级菜单
  navs: {
    zh: [
      { title: '起步', path: '/zh/guide' },
      { title: '组件', path: '/zh/components' }
    ],
    en: [
      { title: 'Started', path: '/guide' },
      { title: 'Components', path: '/components' }
    ]
  },
  // 二级菜单
  menus: {
    '/': [
      {
        title: 'Home',
        path: 'index'
      }
    ],
    '/zh': [
      {
        title: '首页',
        path: 'index'
      }
    ],
    '/guide': [
      {
        title: 'Quick Start',
        path: '/guide/quick-start'
      },
      {
        title: 'Locale',
        path: '/guide/locale'
      }
    ],
    '/zh/guide': [
      {
        title: '快速开始',
        path: '/zh/guide/quick-start'
      },
      {
        title: '国际化',
        path: '/zh/guide/locale'
      }
    ],
    '/components': [
      {
        title: 'Common',
        children: [
          {
            title: 'Button',
            path: '/components/button'
          }
        ]
      },
      {
        title: 'Layout',
        children: [
          {
            title: 'Page',
            path: '/components/page'
          },
          {
            title: 'Body',
            path: '/components/body'
          }
        ]
      },
      {
        title: 'Data Input',
        children: [
          {
            title: 'Input.Text',
            path: '/components/input'
          }
        ]
      },
      {
        title: 'Data Display',
        children: [
          {
            title: 'Tree',
            path: '/components/tree'
          },
          {
            title: 'Cascader',
            path: 'components/cascader'
          },
          {
            title: 'Calendar',
            path: '/components/calendar'
          },
          {
            title: 'Videos',
            path: '/components/videos'
          },
          {
            title: 'Photos',
            path: '/components/Photos'
          }
        ]
      }
    ],
    '/zh/components': [
      {
        title: '通用',
        children: [
          {
            title: 'Button 按钮',
            path: '/zh/components/button'
          }
        ]
      },
      {
        title: '布局',
        children: [
          {
            title: 'Page 页面',
            path: '/zh/components/page'
          },
          {
            title: 'Body 身体',
            path: '/zh/components/body'
          }
        ]
      },
      {
        title: '数据录入',
        children: [
          {
            title: 'Input 录入框',
            path: '/zh/components/input'
          }
        ]
      },
      {
        title: '数据展示',
        children: [
          {
            title: 'Tree 树',
            path: '/zh/components/Tree'
          },
          {
            title: 'Cascader 级联选择',
            path: '/zh/components/cascader'
          },
          {
            title: 'Calendar 日历',
            path: '/zh/components/calendar'
          },
          {
            title: 'Videos 视频列表',
            path: '/zh/components/videos'
          },
          {
            title: 'Photos 照片列表',
            path: '/zh/components/photos'
          }
        ]
      }
    ]
  }
})
