<div align="center"><a name="readme-top"></a>

<img height="180" src="https://res.waiqin365.com/d/seedsui/logo.png">

<h1>SeedsUI for React</h1>

An enterprise-class UI design language and React UI library.

![](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png)

</div>

## 📦 Install

### Css

#### Less import

```bash
@import '//res.waiqin365.com/d/waiqin365_h5/externals/seedsui-react.5.9.17.min.css';
```

#### CSS import

```html
<link
  rel="stylesheet"
  href="//res.waiqin365.com/d/waiqin365_h5/externals/seedsui-react.5.9.17.min.css"
/>
```

### NPM

```bash
npm install seedsui-react
```

```bash
yarn add seedsui-react
```

```bash
pnpm add seedsui-react
```

### UMD

Add scripts to `index.html`

```html
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/react.18.2.0.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/react-dom.18.2.0.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/axios.1.6.2.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/dayjs.1.11.8.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/ahooks.3.8.1.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/lodash.4.17.21.min.js"></script>
<!-- The react-router cannot use the UMD mode.  Because @ahooksjs/use-url-state not supported. -->
<!--
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/react-router.6.26.1.min.js"></script>
<script src="//res.waiqin365.com/d/waiqin365_h5/externals/react-router.5.1.2.min.js"></script>
-->

<!-- SeedsUI must defer -->
<script
  defer
  src="//res.waiqin365.com/d/waiqin365_h5/externals/seedsui-react.5.8.52.min.js"
></script>

<!-- The UMD tool unpkg can get the latest base library, example:  -->
<!-- <script src="https://unpkg.com/react-routers"></script> -->

<script>
  // The UMD version of lodash must have reference to window.lodash
  window.lodash = window._
</script>
```

Config webpack.config.js

```js
return {
  // [自定义修改]公共cdn文件 start
  // externalsType: 'umd',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    axios: 'axios',
    dayjs: 'dayjs',
    lodash: '_',
    ahooks: 'ahooks',
    'seedsui-react': 'SeedsUI'
  },
  // [自定义修改]公共cdn文件 end
  target: ['browserslist'],
  ...
}
```

## 🔨 Usage

```tsx
import { Button, DatePicker } from 'seedsui-react'

export default () => (
  <>
    <Button className="primary">PRESS ME</Button>
    <DatePicker.Combo type="date" placeholder="select date" />
  </>
)
```

[Visit seedsui-react docs](https://colaboy.github.io/seedsui-react/)
