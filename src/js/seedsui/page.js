//Page 单页模式
(function(window,document,undefined){
    window.Page=function(params){
    	/*=========================
          Model
          ===========================*/
		var defaults={
			isDisableSameClick:false,//是否禁止重复点击相同按钮
			isTakeHistory:true,//是否添加浏览器历史记录
			buttonAttr:"[data-toggle=page]",
			buttonActiveClass:"active",
			pageClass:"page",
			pageActiveClass:"active",
			defaultAnimation:"slideLeft",
			duration:"300"

			/*callbacks
			onLoad:function(Page)//加载中
			onOpenEnd:function(Page)//开窗完成时动画
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
		//Btns
        s.buttons=[].slice.call(document.querySelectorAll(s.params.buttonAttr));
		//Pages
		s.pages;
		s.update=function(){
			s.pages=[].slice.call(document.querySelectorAll("."+s.params.pageClass));
			for(var i=0,page;page=s.pages[i++];){
				if(!page.getAttribute("data-animation")){
	                page.setAttribute("data-animation",s.params.defaultAnimation);
	            }
	            var isActive=page.classList.contains(s.params.pageActiveClass);
	            var animation=page.getAttribute("data-animation");
	            if(animation=="slideDown"){
	            	page.showAnimation={visibility:"visible",webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(0,-100%,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(0,-100%,0)";
	            }else if(animation=="slideUp"){
	            	page.showAnimation={visibility:"visible",webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(0,100%,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(0,100%,0)";
	            }
	            else if(animation=="fade"){
	            	page.showAnimation={visibility:"visible",opacity:1};
	                page.hideAnimation={opacity:0};
	                if(!isActive)page.style.opacity=0;
	            }
	            else if(animation=="none"){
	            	page.showAnimation={display:"block",noAnimation:true};
	                page.hideAnimation={display:"none"};
	                if(!isActive)page.style.display="none";
	            }
	            else if(animation=="zoom"){
	            	page.showAnimation={visibility:"visible",webkitTransform:"scale(1,1)"};
	                page.hideAnimation={webkitTransform:"scale(0,0)"};
	                if(!isActive)page.style.webkitTransform="scale(0,0)";
	            }
	            else if(animation=="slideRight"){
	            	page.showAnimation={visibility:"visible",webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(-100%,0,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(-100%,0,0)";
	            }else if(animation=="slideLeft"){
	            	page.showAnimation={visibility:"visible",webkitTransform:"translate3d(0,0,0)"};
	                page.hideAnimation={webkitTransform:"translate3d(100%,0,0)"};
	                if(!isActive)page.style.webkitTransform="translate3d(100%,0,0)";
	            }
	            //page.style.webkitTransitionProperty="transform,opacity";
	            if(animation!="none"){
	            	s.durationPage(page);
	            }
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
        	s.isRoot=false;
        	s.isHid=false;
        	//Callback onLoad
        	if(s.params.onLoad)s.params.onLoad(s);

        	page.classList.add(s.params.pageActiveClass);
            for(var ani in page.showAnimation){
                page.style[ani]=page.showAnimation[ani];
            }
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
			var page=document.getElementById(pageId.substring(1));
			if(animation){
				page.setAttribute("data-animation",animation);
				s.update();
			}
			//删除对应的历史记录
			s.removeHistory(pageId);
			//隐藏Page
			if(page)s.hidePage(page);
		}
		//开窗函数
		s.open=function(pageId,target,animation){
			var page=document.getElementById(pageId.substring(1));
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
			//Callback onLoad
			s.targetPageId=pageId;
			s.targetPage=page;
			//显示Page
			s.showPage(page);
		}
		//回退函数
		s.back=function(){
			var targetPageId=null,targetPage=null;
			//如果本地历史记录为空(刷新导致)，而浏览器历史记录不为空，则监听浏览器历史记录
			if(s.history.length==0 && window.history.state && window.history.state.href){
				targetPageId=window.history.state.href;
				//console.log("无本地记录，但有浏览器历史记录"+targetPageId);
				targetPage=document.getElementById(targetPageId.substring(1));
				s.hideAllPage(targetPageId);
				//Callback onLoad
				s.targetPageId=targetPageId;
				s.targetPage=targetPage;
				s.showPage(targetPage);
				return;
			}
			if(s.history.length==0){
				//console.log("无本地记录，也无浏览器有历史记录");
				s.isRoot=true;//底层标识
				targetPageId=null;
				targetPage=null;
				s.hideAllPage();
			}else{
				//获得最新历史记录，并关闭那个页面
				var pageId=s.history[s.history.length-1];
				if(pageId)s.close(pageId);
				//获得关闭后的最新历史记录
				targetPageId=s.history[s.history.length-1];
				if(targetPageId)targetPage=document.getElementById(targetPageId.substring(1));
				//目录是否处于底层
				if(s.history.length==0){
					s.isRoot=true;//底层标识
					targetPageId=null;
					targetPage=null;
					//console.log("目前处于底层");
				}
			}
			//Callback onLoad
        	s.targetPage=targetPage;
        	s.targetPageId=targetPageId;
        	if(s.params.onLoad)s.params.onLoad(s);
		}
		//清空按钮选中样式
		s.activeButton=function(activebtn){
			s.buttons.forEach(function(btn){
				btn.classList.remove(s.params.buttonActiveClass);
			})
			activebtn.classList.add(s.params.buttonActiveClass);
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
            for(var i=0,btn;btn=s.buttons[i++];){
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
        		s.targetPageId=window.history.state.href;
        		s.targetPage=document.querySelector(s.targetPageId);
        		//关闭所有页面
        		s.hideAllPage(s.targetPageId);
        		//显示hash页面
        		s.showPage(s.targetPage);
        	}
        }
        s.onClickBtn=function(e){
        	if(s.params.isDisableSameClick){
	        	if(e.target.classList.contains(s.params.buttonActiveClass))return;
	        	s.activeButton(e.target);
        	}
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
				if(s.targetPage.showAnimation.visibility)s.targetPage.style.visibility="hidden";
				//CallBack onCloseEnd
				if(s.params.onCloseEnd)s.params.onCloseEnd(s);
				return;
			}
			//显示完成
			//CallBack onOpenEnd
			if(s.params.onOpenEnd)s.params.onOpenEnd(s);
		};
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);