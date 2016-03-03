微信能力调用：

1.html中引入<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

2.html中再引入sha.js与weixin.js

3.javascript初始化微信接口Weixin.init();

【参考文档】http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html


weixin.js使用需知：

1.此js用于初始化微信环境，这样方能使用微信本地能力

2.使用此js需要把填写在微信上的服务器地址处于开启状态

3.使用此js需要微信公众号上的两个参数：appid | secret