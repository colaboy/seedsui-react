//Page 单页模式
(function(window,document,undefined){
    window.Page=function(params){
    	/*=========================
          Model
          ===========================*/
		var defaults={
			"isTakeHistory":true,
			"pageBtn":"[data-toggle=page]",
			"pageClass":"page",
			"pageActiveClass":"active",
			"defaultAnimation":"slideLeft",
			"duration":"300"

			/*callbacks
			onOpenStart:function(Page)//开窗前
			onOpenEnd:function(Page)//开窗完成时动画
			onCloseStart:function(Page)//关窗前
			onCloseEnd:function(Page)//关窗完成时动画
			*/
		}

		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		//Pages
		s.pages;
		s.update=function(){
			s.pages=document.querySelectorAll("."+s.params.pageClass);
			for(var i=0,page;page=s.pages[i++];){
				if(!page.getAttribute("data-animation")){
	                page.setAttribute("data-animation",s.params.defaultAnimation);
	            }
	            var isActive=page.classList.contains(s.params.pageActiveClass);
	            var animation=page.getAttribute("data-animation");
	            if(animation=="slideDown"){
	            	page.showAnimation={webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(0,-100%,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(0,-100%,0)";
	            }else if(animation=="slideUp"){
	            	page.showAnimation={webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(0,100%,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(0,100%,0)";
	            }
	            else if(animation=="fade"){
	            	page.showAnimation={opacity:1};
	                page.hideAnimation={opacity:0};
	                if(!isActive)page.style.opacity=0;
	            }
	            else if(animation=="none"){
	            	page.showAnimation={visibility:"visible",noAnimation:true};
	                page.hideAnimation={visibility:"hidden"};
	                if(!isActive)page.style.visibility="hidden";
	            }
	            else if(animation=="zoom"){
	            	page.showAnimation={webkitTransform:"scale(1,1)"};
	                page.hideAnimation={webkitTransform:"scale(0,0)"};
	                if(!isActive)page.style.webkitTransform="scale(0,0)";
	            }
	            else if(animation=="slideRight"){
	            	page.showAnimation={webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(-100%,0,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(-100%,0,0)";
	            }else{
	            	page.showAnimation={webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(100%,0,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(100%,0,0)";
	            }
	            page.style.webkitTransitionProperty="transform,opacity";
	            s.durationPage(page);
			}
        }
        s.durationPage=function(page){
        	setTimeout(function(){
        		page.style.webkitTransitionDuration=s.params.duration+"ms";
        	},100);
        }
        s.update();
		//History
		s.history=[];
		/*=========================
          Method
          ===========================*/
        s.historyHasPage=function(pageId){
        	s.history.some(function(n,i,a){
				return pageId==n;
			})
        }
        s.addHistory=function(pageId){
        	s.history.push(pageId);
        	if(s.params.isTakeHistory==false)return;
			try{
		        window.history.pushState({href:pageId},document.title, pageId);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
        }
        s.replaceHistory=function(pageId){
        	//移除最新一条，关闭上一页
        	var prePageId=s.history.pop();
        	var prePage=document.querySelector(prePageId);
        	s.durationHidePage(prePage);
        	//添加新记录
        	s.history.push(pageId);
        	if(s.params.isTakeHistory==false)return;
			try{
		        window.history.replaceState({href:pageId},document.title, pageId);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
        }
        s.removeHistory=function(pageId){
        	s.history=s.history.filter(function(n,i,a){
				return n!=pageId;
			})
        }
        s.isHid=true;
        s.showPage=function(page){
        	s.isHid=false;
        	page.classList.add(s.params.pageActiveClass);
        	page.style.visibility="visible";
            for(var ani in page.showAnimation){
                page.style[ani]=page.showAnimation[ani];
            }
            //如果窗口选择为无动画
            /*if(page.showAnimation["noAnimation"]){
            	var e={};
            	e.target=page;
            	s.onTransitionEnd(e);
            }*/
        }
        s.durationHidePage=function(page){
        	setTimeout(function(){
        		s.hidePage(page);
        	},500);
        }
        s.hidePage=function(page){
        	s.isHid=true;
        	page.classList.remove(s.params.pageActiveClass);
            for(var ani in page.hideAnimation){
                page.style[ani]=page.hideAnimation[ani];
            }
            //如果窗口选择为无动画
            /*if(page.showAnimation["noAnimation"]){
            	var e={};
            	e.target=page;
            	s.onTransitionEnd(e);
            }*/
        }
        s.hideAllPage=function(exceptPageId){
        	for(var i=0,page;page=s.pages[i++];){
        		if(exceptPageId && "#"+page.id==exceptPageId){
        			continue;
        		}
        		s.hidePage(page);
        	}
        }
		//关窗函数
		s.close=function(pageId,animation){
			var page=document.querySelector(pageId);
			if(animation){
				page.setAttribute("data-animation",animation);
				s.update();
			}
			//删除对应的历史记录
			s.removeHistory(pageId);
			//隐藏Page
			s.hidePage(page);
			//Callback
			s.targetPage=page;
			if(s.params.onCloseStart)s.params.onCloseStart(s);
		}
		//开窗函数
		s.open=function(pageId,target,animation){
			var page=document.querySelector(pageId);
			if(animation){
				page.setAttribute("data-animation",animation);
				s.update();
			}
			//添加历史记录，并修改浏览器地址
			if(target=="_self"){
				s.replaceHistory(pageId);
			}else{
				s.addHistory(pageId);
			}
			//显示Page
			s.showPage(page);
			//Callback
			s.targetPage=page;
			if(s.params.onOpenStart)s.params.onOpenStart(s);
		}
		//回退函数
		s.back=function(){
			var pageId,page;
			//如果本地历史记录为空，而浏览器历史记录不为空，则证明刷新过页面了(防刷新)
			if(s.history.length==0 && window.history.state && window.history.state.href){
				console.log("无本地记录，但浏览器有历史记录");
				pageId=window.history.state.href;
				page=document.getElementById(pageId.substring(1));
				s.hideAllPage(pageId);
				s.showPage(page);
				return;
			}
			//如果本地历史为空，浏览器历史也为空，却可以按返回按键，证明目前处于第二层(防刷新后第二层回不到第一层)
			if(s.history.length==0){
				s.hideAllPage();
				return;
			}
			//清除顶层历史记录
			pageId=s.history[s.history.length-1];
			//关闭清除的那层
			s.close(pageId);
		}
		/*=========================
          Control
          ===========================*/
        s.events=function(detach){
            var action=detach?"removeEventListener":"addEventListener";
            //动画监听
            document[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            //hash值监听
            window[action]("popstate",s.onPopstate,false);
            //页面初始化
            window[action]("load",s.onLoad,false);
            //window[action]("hashchange",s.onPopstate,false);
            //按钮监听
            var pageBtns=document.querySelectorAll(s.params.pageBtn);
            for(var i=0,btn;btn=pageBtns[i++];){
        		btn.addEventListener("click",s.onClickBtn,false);
            }
        }
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.onLoad=function(e){
        	if(window.history.state && window.history.state.href){
        		var pageId=window.history.state.href;
        		var page=document.querySelector(pageId);
        		//关闭所有页面
        		s.hideAllPage(pageId);
        		//显示hash页面
        		s.showPage(page);
        	}
        }
        s.onClickBtn=function(e){
    		s.target=e.target;
			var pageId=s.target.getAttribute("href");
			var openType=s.target.getAttribute("target");
			s.open(pageId,openType);
			e.preventDefault();
		}
        s.onPopstate=function(e) {
			//后退
			s.back();
			//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
		};
		s.onTransitionEnd=function(e){
			if(!e.target.classList.contains("page"))return;
			s.targetPage=e.target;
			//隐藏完成
			if(s.isHid){
				s.targetPage.style.visibility="hidden";
				//CallBack
				if(s.params.onCloseEnd)s.params.onCloseEnd(s);
				return;
			}
			//显示完成
			//CallBack
			if(s.params.onOpenEnd)s.params.onOpenEnd(s);
		};
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);