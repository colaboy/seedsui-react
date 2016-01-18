/*!
 * bar类库
 * @version 1.0.0
 * @author WangMingzhu
 * 
 * import $ from './jquery.js'
 * import $ from './iscroll.js’
 */

/**
*  常用的动画库
* 
*  @class Tabbar
*/
(function(window,document,undefined){
	'use strict';
	function createTabbar(tabtype,cols,tabs){
		var tabbar=document.createElement("ul");
		tabbar.setAttribute("class","tabbar");
		tabbar.setAttribute("data-tabtype",tabtype);
		if(cols && typeof cols === "number"){
			tabbar.setAttribute("data-cols",cols);
		}
		tabs.forEach(function(n,i){
			var li=document.createElement("li");
			li.setAttribute("class","tab");
			if(i==0){
				li.setAttribute("class","tab active");
			}
			var label=document.createElement("label");
			label.setAttribute("class","tab-label");
			label.innerHTML=n;
			li.appendChild(label);
			tabbar.appendChild(li);
		});
		return tabbar;
	}
	var tabbarScroller,tabbar,tab;
	window.Tabbar={
		init:function(params){
			if(!params || !params.id || !document.getElementById(params.id)){
				alert("请传入正确的tabbar的id");
				return;
			}
			if(!params.tabs || Object.prototype.toString.call(params.tabs)!="[object Array]"){
				alert("请传入tabbar的选项卡");
				return;
			}
			var id=params.id;
			var isScroll=params.isScroll||false;
			var cols=params.cols||null;
			var tabtype=params.clos||"slide";//tabbar类型
			var addClass=params.addClass||null;
			var tabs=params.tabs;
			//tabbar字符串
			var tabbarStr="";
			if(isScroll==true){
				tabbarStr=document.createElement("div");
				tabbarStr.setAttribute("class","hScroller");
				var tabbarUl=createTabbar(tabtype,cols,tabs);
				tabbarStr.appendChild(tabbarUl);
			}else{
				tabbarStr=createTabbar(tabtype,cols,tabs);
			}
			if(addClass && !tabbarStr.className.match(new RegExp(addClass))){
				tabbarStr.className+=" "+addClass;
			}
			document.getElementById(params.id).appendChild(tabbarStr);
		},
		initWidth:function(tabbar){
			var cols=tabbar.getAttribute("data-cols");
			var bodyWidth=document.body.clientWidth;
			var tabWidth=Math.round(bodyWidth/cols);
			var tab=tabbar.querySelectorAll(".tab");
			for(var i=0;i<tab.length;i++){
				tab[i].style.width=tabWidth+"px";
			}
		},
		initScroll:function(tabbarBox){
			tabbarScroller = new IScroll(tabbarBox, {
				scrollX: true,
				scrollY: false,
				bounce : false,//是否有弹性
				preventDefault:false,//是否屏蔽默认事件
			});
			/*if(tabbarScroller.scroller.className.match(new RegExp("lricon"))){
				tabbarScroller.scroller.style.width=Math.round(tabbar.clientWidth+200)+"px";
			}*/
		},
		index:function(argTarget){
			var index=argTarget;
			for(var i=0;i<tab.length;i++){
				tab[i].className=tab[i].className.replace(/\s{0,}active/,"");
				//如果传入的是一个对象，就找到该对象的索引
				if(Object.prototype.toString.call(argTarget)==="[object HTMLLIElement]"){
					if(tab[i]==argTarget){
						index=i;
					}
				}
			}
			if(typeof argTarget == "number"){
				tab[argTarget]
			}
			tab[index].className+=" active";
			//滑动到第指定个tab
			if(index>0){
				tabbarScroller.scrollToElement(tab[index-1], null, null, true);
			}else{
				tabbarScroller.scrollTo(0, 0, 200, IScroll.utils.ease.quadratic);
			}
			return index;
		},
		scrollTabbar:function(tabbarScrollerId,pageSlider){
			//如果传入的是id
			var id=tabbarScrollerId;
			var idExpr=/^#([\w-]*)$/;
			if(idExpr.exec(tabbarScrollerId) && idExpr.exec(tabbarScrollerId)[1]){
				id=idExpr.exec(tabbarScrollerId)[1];
			}
			if(!id){
				alert("请传入正确的包裹tabbar的iScroll的#id");
				return;
			}
			var tabbarBox=document.getElementById(id);
			tabbar=tabbarBox.querySelector(".tabbar");
			tab=tabbar.querySelectorAll(".tab");
			//设置tabbar的宽度
			this.initWidth(tabbar);
			//添加滑动
			this.initScroll(tabbarBox);
			//添加点击
			//判断是否已经绑定点击事件
			if($(tabbar).data("events") && $(tabbar).data("events")["click"] ){
				console.log("您已绑定事件");
				return this;
			}
			var _tabbar=this;
			tabbar.onclick=function(e){
				var target=e.target;
				if(e.target.tagName.toLowerCase()=="label"){
					target=e.target.parentNode;
				}
				var index=_tabbar.index(target);
				pageSlider.slideTo(index);
			}
			return this;
		}
	}
})(window,document,undefined)