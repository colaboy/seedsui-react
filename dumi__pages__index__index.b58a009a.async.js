(self.webpackChunkseedsui_react=self.webpackChunkseedsui_react||[]).push([[8863],{26291:function(w,p,r){var d,k,f,x=r(18698).default;(function(t,l){k=[],d=l,f=typeof d=="function"?d.apply(p,k):d,f!==void 0&&(w.exports=f)})(this,function(){function t(l,s,n,i){this.path=l,this.reset(),this.begin=typeof s!="undefined"?this.valueOf(s):0,this.end=typeof n!="undefined"?this.valueOf(n):this.length,this.circular=typeof i!="undefined"?i:!1,this.timer=null,this.animationTimer=null,this.draw(this.begin,this.end,0,{circular:this.circular})}return t.prototype={reset:function(){this.length=this.path.getTotalLength(),this.path.style.strokeDashoffset=this.length*2},draw:function(s,n,i,e){if(this.circular=e&&e.hasOwnProperty("circular")?e.circular:!1,i){this.stop();var c=this,a=e&&e.hasOwnProperty("delay")?parseFloat(e.delay)*1e3:0;if(a)return delete e.delay,this.timer=setTimeout(function(){c.draw(s,n,i,e)},a),this.timer;this.startTime=new Date,this.initBegin=this.begin,this.initEnd=this.end,this.finalBegin=this.valueOf(s),this.finalEnd=this.valueOf(n),this.pausedTime=0,this.duration=i,this.easing=e&&e.hasOwnProperty("easing")?e.easing:null,this.update=e&&e.hasOwnProperty("update")?e.update:null,this.callback=e&&e.hasOwnProperty("callback")?e.callback:null,this.animationTimer=requestAnimationFrame(this.play.bind(this))}else this.path.style.strokeDasharray=this.strokeDasharray(s,n)},play:function(){var s=new Date;this.pausedTime&&(this.startTime.setMilliseconds(this.startTime.getMilliseconds()+(s-this.pausedTime)),this.pausedTime=0);var n=(s-this.startTime)/1e3,i=n/parseFloat(this.duration),e=i;if(typeof this.easing=="function"&&(e=this.easing(e)),i>1?(e=1,this.stop()):this.animationTimer=requestAnimationFrame(this.play.bind(this)),this.drawStep(e),i>1&&typeof this.callback=="function")return this.callback.call(this)},pause:function(){this.animationTimer&&(this.stop(),this.pausedTime=new Date)},resume:function(){this.animationTimer||(this.animationTimer=requestAnimationFrame(this.play.bind(this)))},stop:function(){cancelAnimationFrame(this.animationTimer),this.animationTimer=null,clearTimeout(this.timer),this.timer=null},drawStep:function(s){this.begin=this.initBegin+(this.finalBegin-this.initBegin)*s,this.end=this.initEnd+(this.finalEnd-this.initEnd)*s,this.begin=this.begin<0&&!this.circular?0:this.begin,this.begin=this.begin>this.length&&!this.circular?this.length:this.begin,this.end=this.end<0&&!this.circular?0:this.end,this.end=this.end>this.length&&!this.circular?this.length:this.end,this.end-this.begin<=this.length&&this.end-this.begin>0?this.draw(this.begin,this.end,0,{circular:this.circular}):this.circular&&this.end-this.begin>this.length?this.draw(0,this.length,0,{circular:this.circular}):this.draw(this.begin+(this.end-this.begin),this.end-(this.end-this.begin),0,{circular:this.circular}),typeof this.update=="function"&&this.update(this)},strokeDasharray:function(s,n){if(this.begin=this.valueOf(s),this.end=this.valueOf(n),this.circular){var i=this.begin>this.end||this.begin<0&&this.begin<this.length*-1?parseInt(this.begin/parseInt(this.length)):parseInt(this.end/parseInt(this.length));i!==0&&(this.begin=this.begin-this.length*i,this.end=this.end-this.length*i)}if(this.end>this.length){var e=this.end-this.length;return[this.length,this.length,e,this.begin-e,this.end-this.begin].join(" ")}if(this.begin<0){var c=this.length+this.begin;return this.end<0?[this.length,this.length+this.begin,this.end-this.begin,c-this.end,this.end-this.begin,this.length].join(" "):[this.length,this.length+this.begin,this.end-this.begin,c-this.end,this.length].join(" ")}return[this.length,this.length+this.begin,this.end-this.begin].join(" ")},valueOf:function(s){var n=parseFloat(s);if((typeof s=="string"||s instanceof String)&&~s.indexOf("%")){var i;~s.indexOf("+")?(i=s.split("+"),n=this.percent(i[0])+parseFloat(i[1])):~s.indexOf("-")?(i=s.split("-"),i.length===3?n=-this.percent(i[1])-parseFloat(i[2]):n=i[0]?this.percent(i[0])-parseFloat(i[1]):-this.percent(i[1])):n=this.percent(s)}return n},percent:function(s){return parseFloat(s)/100*this.length}},t})},87361:function(w,p,r){"use strict";r.r(p),r.d(p,{default:function(){return n}});var d=r(27424),k=r.n(d),f=r(32345),x=r(67294),t=r(85893),l=function(){var i=(0,f.bU)();function e(a,o){return(i==null?void 0:i.id)==="en-US"?a:o}var c=[{title:"SeedsUI",items:[{title:"GitHub",link:"https://github.com/colaboy/seedsui-react"},{title:e("Releases","\u53D1\u5E03\u65E5\u5FD7"),link:"https://github.com/colaboy/seedsui-react/releases"},{title:e("Questions And Feedback","\u63D0\u95EE\u4E0E\u53CD\u9988"),link:"https://github.com/colaboy/seedsui-react/issues/new/choose"}]},{title:e("Dependence Products","\u4F9D\u8D56\u4EA7\u54C1"),items:[{title:e("axios - Request library","axios - \u8BF7\u6C42\u5E93"),link:"https://axios-http.com/"},{title:e("lodash - JavaScript utility library","lodash - JavaScript\u5DE5\u5177\u5E93"),link:"https://lodash.com/"},{title:e("rc-tree - Tree Select library","rc-tree - \u6811\u9009\u62E9\u5E93"),link:"https://github.com/react-component/tree"},{title:e("vConsole - debugging tool","vConsole - \u8C03\u8BD5\u5DE5\u5177"),link:"https://github.com/Tencent/vConsole"}]},{title:e("More Products","\u66F4\u591A\u4EA7\u54C1"),items:[{title:e("ahooks - React Hooks library","ahooks - React Hooks \u5E93"),link:"https://github.com/alibaba/hooks"},{title:e("Dumi - Libraries/Documents Development Tool","Dumi - \u7EC4\u4EF6/\u6587\u6863\u7814\u53D1\u5DE5\u5177"),link:"https://d.umijs.org"}]}];return(0,t.jsx)("div",{className:"homepage-footer",children:(0,t.jsxs)("div",{className:"columns",children:[c.map(function(a){return(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:a.title}),a.items.map(function(o){return(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:o.link,target:"_blank",children:o.title})},o.title)})]},a.title)}),(0,t.jsxs)("ul",{children:[(0,t.jsx)("li",{children:e("WeChat Feedback","QQ\u4EA4\u6D41\u53CD\u9988")}),(0,t.jsx)("li",{children:(0,t.jsx)("img",{src:"https://res.waiqin365.com/d/seedsui/qrcodeqq-seedsui.png",alt:"WeChat-feedback",width:240})})]})]})})},s=function(){var i=(0,f.bU)(),e=(0,x.useState)(400),c=k()(e,2),a=c[0],o=c[1],h=r(26291);(0,x.useEffect)(function(){o(window.innerHeight-64),v()},[]);function g(m,u){return(i==null?void 0:i.id)==="en-US"?m:u}function y(){var m=document.getElementById("seedsuiLogo"),u=document.getElementById("seedsuiLogoFill");m&&u&&(m.style.display="none",u.style.display="")}function v(){var m=document.getElementById("path1"),u=document.getElementById("path2"),M=document.getElementById("path3"),j=document.getElementById("path4"),b=document.getElementById("path5"),W=document.getElementById("path6"),E=document.getElementById("path7"),B=document.getElementById("path8"),T=document.getElementById("path9"),C=document.getElementById("path10"),S=document.getElementById("path11"),F=new h(m),I=new h(u),D=new h(M),A=new h(j),O=new h(b),N=new h(W),L=new h(E),z=new h(B),P=new h(T),U=new h(C),R=new h(S);F.draw("0%","0%",2),I.draw("0%","0%",2),D.draw("0%","0%",2),A.draw("0%","0%",1,{delay:2}),O.draw("0%","0%",1,{delay:2}),N.draw("0%","0%",1,{delay:2}),L.draw("0%","0%",1,{delay:2}),z.draw("0%","0%",1,{delay:2}),P.draw("0%","0%",1,{delay:2}),U.draw("100%","100%",1,{delay:2}),R.draw("0%","0%",1,{delay:2,callback:y})}return(0,t.jsxs)("div",{className:"homepage",children:[(0,t.jsx)("div",{className:"main",style:{height:"".concat(a,"px")},children:(0,t.jsxs)("div",{className:"header",children:[(0,t.jsxs)("div",{className:"headerLeft",children:[(0,t.jsx)("h1",{className:"title",children:"SeedsUI React"}),(0,t.jsx)("p",{className:"description",children:g("A Mobile First HTMl5 and CSS3 UI Framework","\u4E13\u4E3A\u79FB\u52A8\u8BBE\u5907\u8BBE\u8BA1\u7684\u6A21\u7248\u6846\u67B6")}),(0,t.jsxs)("p",{className:"buttons",children:[(0,t.jsx)("a",{href:g("/seedsui-react/en-US/guide","/seedsui-react/guide"),children:g("Get Started","\u5F00\u59CB\u4F7F\u7528")}),(0,t.jsx)("a",{href:g("/seedsui-react/en-US/components","/seedsui-react/components"),children:g("Components","\u7EC4\u4EF6\u5217\u8868")})]})]}),(0,t.jsxs)("div",{className:"logoContainer",children:[(0,t.jsxs)("svg",{version:"1.1",id:"seedsuiLogo",className:"logo",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"100%",height:"100%",viewBox:"0 0 1000 1000",enableBackground:"new 0 0 1000 1000",xmlSpace:"preserve",children:[(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"11.6787",strokeMiterlimit:"10",d:"M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7 c31.1,62.8,80.3,108.2,152,112.8C667.2,300.2,685.5,152,550.6,157.7z"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"11.6787",strokeMiterlimit:"10",d:"M686.4,575.5c0.4-42-15.6-81.6-45-111.6 c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3 c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"11.6787",strokeMiterlimit:"10",d:"M629.9,335.2 c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1c-10.8-10.4-31.3-19.6-69.2-22.8 C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7c93,17,122.8,97.2,131.5,152.9 c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9C823.1,738.5,823.5,350.6,629.9,335.2z"})]}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7858",strokeMiterlimit:"10",d:"M261.7,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M585.5,769.6c0,0,0,79,0,103.8 c0,24.8-20,45-45,45c-32.4,0-45.1-28.6-45.1-49.8c0-21.2,10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7858",strokeMiterlimit:"10",d:"M671,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"27.2503",strokeMiterlimit:"10",d:"M779.2,816.5c0,0,0,39.8,0,65.1 s-22.5,28.5-28.5,28.5c-6,0-28.5-3.2-28.5-28.5s0-65.1,0-65.1"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"29.1968",strokeLinecap:"round",strokeMiterlimit:"10",d:"M819.1,785.1v0.7"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"27.2503",strokeMiterlimit:"10",d:"M819.1,921.6V816.5V921.6z"})]}),(0,t.jsxs)("svg",{version:"1.1",id:"seedsuiLogoBtm",className:"logo",xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"100%",height:"100%",viewBox:"0 0 1000 1000",enableBackground:"new 0 0 1000 1000",xmlSpace:"preserve",children:[(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{fill:"none",id:"path1",stroke:"#8dc63f",strokeWidth:"12.5",strokeMiterlimit:"10",d:"M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7 c31.1,62.8,80.3,108.2,152,112.8C667.2,300.2,685.5,152,550.6,157.7z"}),(0,t.jsx)("path",{fill:"none",id:"path2",stroke:"#8dc63f",strokeWidth:"12.5",strokeMiterlimit:"10",d:"M686.4,575.5c0.4-42-15.6-81.6-45-111.6 c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3 c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"}),(0,t.jsx)("path",{fill:"none",id:"path3",stroke:"#8dc63f",strokeWidth:"12.5",strokeMiterlimit:"10",d:"M629.9,335.2 c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1c-10.8-10.4-31.3-19.6-69.2-22.8 C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7c93,17,122.8,97.2,131.5,152.9 c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9C823.1,738.5,823.5,350.6,629.9,335.2z"})]}),(0,t.jsx)("path",{fill:"none",id:"path4",stroke:"#8dc63f",strokeWidth:"9",strokeMiterlimit:"10",d:"M261.7,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",id:"path5",stroke:"#8dc63f",strokeWidth:"9",strokeMiterlimit:"10",d:"M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",id:"path6",stroke:"#8dc63f",strokeWidth:"9",strokeMiterlimit:"10",d:"M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",id:"path7",stroke:"#8dc63f",strokeWidth:"9",strokeMiterlimit:"10",d:"M585.5,769.6c0,0,0,79,0,103.8 c0,24.8-20,45-45,45c-32.4,0-45.1-28.6-45.1-49.8c0-21.2,10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"}),(0,t.jsx)("path",{fill:"none",id:"path8",stroke:"#8dc63f",strokeWidth:"9",strokeMiterlimit:"10",d:"M671,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",id:"path9",stroke:"#8dc63f",strokeWidth:"29",strokeMiterlimit:"10",d:"M779.2,816.5c0,0,0,39.8,0,65.1 s-22.5,28.5-28.5,28.5c-6,0-28.5-3.2-28.5-28.5s0-65.1,0-65.1"}),(0,t.jsx)("path",{fill:"none",id:"path10",stroke:"#8dc63f",strokeWidth:"29.1968",strokeLinecap:"round",strokeMiterlimit:"10",d:"M819.1,785.1v0.7"}),(0,t.jsx)("path",{fill:"none",id:"path11",stroke:"#8dc63f",strokeWidth:"27.2503",strokeMiterlimit:"10",d:"M819.1,921.6V816.5V921.6z"})]}),(0,t.jsxs)("svg",{version:"1.1",id:"seedsuiLogoFill",style:{display:"none"},xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",x:"0px",y:"0px",width:"100%",height:"100%",viewBox:"0 0 1000 1000",enableBackground:"new 0 0 1000 1000",xmlSpace:"preserve",children:[(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{fill:"#ffffff",d:"M550.6,157.7c-48.9,4.1-35.4,29.7-35.4,29.7c31.1,62.8,80.3,108.2,152,112.8 C667.2,300.2,685.5,152,550.6,157.7z"}),(0,t.jsx)("path",{fill:"#ffffff",d:"M686.4,575.5c0.4-42-15.6-81.6-45-111.6c-27.2-27.7-64-44.2-104.1-46.4l-12.6-0.2l-148.3,1l-3.7,147.4 l-0.1,14c0.2,5.6,0.7,11.1,1.5,16.6c2.4,17,7.3,33.2,14.8,48.3c7.2,14.6,16.7,27.9,28.2,39.6c29.4,30,68.7,46.7,110.7,47.1 c42,0.4,81.7-15.6,111.6-45C669.3,656.8,686,617.5,686.4,575.5z"}),(0,t.jsx)("path",{fill:"#ffffff",d:"M629.9,335.2c-246.7-19.6-190.1-319.1,49-289.1c-118.7-16.9-195.4,16.4-234.7,68.1 c-10.8-10.4-31.3-19.6-69.2-22.8C83.8,79.1,123.3,399.3,123.3,399.3c128.2-8.2,223-76.8,290-177.2c5.8,73.8,60.5,146.1,156.7,163.7 c93,17,122.8,97.2,131.5,152.9c2.9,13.1,4.8,26.4,4.6,40.1c-0.5,47.1-19.2,91.2-52.8,124.1c-22,21.6-49,36.1-78.1,43.9 C823.1,738.5,823.5,350.6,629.9,335.2z"})]}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7858",strokeMiterlimit:"10",d:"M261.7,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M376.6,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M485.4,870.8c-1.2,26.2-22.8,47.2-49.3,47.2 c-27.3,0-49.4-22.1-49.4-49.4c0-27.3,22.1-49.4,49.4-49.4c16.3,0,30.7,7.9,39.7,20l-79.6,56.2"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7099",strokeMiterlimit:"10",d:"M585.5,769.6c0,0,0,79,0,103.8s-20,45-45,45 c-32.4,0-45.1-28.6-45.1-49.8s10.7-49.4,44.1-49.4c21.6-0.3,32.2,15.3,32.2,15.3"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"7.7858",strokeMiterlimit:"10",d:"M671,821.9c0,0-22.7,0-45.6,0 c-25.8,0-32.1,33.1-3.9,40.4c0,0,23.4,5.9,31.1,8.1c32,6.8,27.7,46.4-3.9,46.4c-35.5,0-49.1,0-49.1,0"}),(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeWidth:"27.2503",strokeMiterlimit:"10",d:"M779.2,816.5c0,0,0,39.8,0,65.1 s-22.5,28.5-28.5,28.5s-28.5-3.2-28.5-28.5s0-65.1,0-65.1"}),(0,t.jsx)("line",{fill:"none",stroke:"#ffffff",strokeWidth:"27.2503",strokeMiterlimit:"10",x1:"819.1",y1:"816.5",x2:"819.1",y2:"921.6"}),(0,t.jsx)("line",{fill:"none",stroke:"#ffffff",strokeWidth:"29.1968",strokeLinecap:"round",strokeMiterlimit:"10",x1:"819.1",y1:"785.1",x2:"819.1",y2:"785.8"})]})]})]})}),(0,t.jsx)(l,{})]})},n=function(){return(0,t.jsx)(s,{})}}}]);