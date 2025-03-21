<div align="center"><a name="readme-top"></a>

<img height="180" src="https://colaboy.github.io/seedsui-react/assets/images/logo.png">

<h1>SeedsUI for React</h1>

An enterprise-class UI design language and React UI library.

<img height="8" width="100%" src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png"/>

</div>

## 📦 CSS

### Less import

```bash
@import 'seedsui-react.min.css';
```

### CSS import

```html
<link
  rel="stylesheet"
  href="https://colaboy.github.io/seedsui-react/assets/externals/seedsui-react.min.css"
/>
```

## 📦 Install

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
<script src="https://colaboy.github.io/seedsui-react/assets/externals/react.18.2.0.min.js"></script>
<script src="https://colaboy.github.io/seedsui-react/assets/externals/react-dom.18.2.0.min.js"></script>
<script src="https://colaboy.github.io/seedsui-react/assets/externals/axios.1.6.2.min.js"></script>
<script src="https://colaboy.github.io/seedsui-react/assets/externals/dayjs.1.11.8.min.js"></script>
<script src="https://colaboy.github.io/seedsui-react/assets/externals/ahooks.3.8.1.min.js"></script>
<script src="https://colaboy.github.io/seedsui-react/assets/externals/lodash.4.17.21.min.js"></script>
<!-- SeedsUI must defer -->
<script
  defer
  src="https://colaboy.github.io/seedsui-react/assets/externals/seedsui-react.min.js"
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
