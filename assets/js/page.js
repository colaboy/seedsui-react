//Page 单页模式
(function(window,document,undefined){
    window.Page=function(params){
    	/*=========================
          Model
          ===========================*/
		var defaults={
			"pageBtn":"[data-target=page]",
			"pageClass":"page",
			"pageActiveClass":"active",
			"defaultAnimation":"slideleft",
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
	            page.style.webkitTransitionDuration=s.params.duration+"ms";
	            page.style.webkitTransitionProperty="transform,opacity";
			}
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
			try{
		        window.history.pushState({href:pageId},document.title, pageId);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
        }
        s.replaceHistory=function(pageId){
        	s.history.pop();
        	s.history.push(pageId);
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
		s.open=function(pageId,animation){
			var page=document.querySelector(pageId);
			if(animation){
				page.setAttribute("data-animation",animation);
				s.update();
			}
			//添加历史记录，并修改浏览器地址
			s.addHistory(pageId);
			//显示Page
			s.showPage(page);
			//Callback
			s.targetPage=page;
			if(s.params.onOpenStart)s.params.onOpenStart(s);
		}
		//回退函数
		s.back=function(){
			//清除顶层历史记录
			s.pageId=s.history[s.history.length-1];
			//关闭清除的那层
			s.close(s.pageId);
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
        s.onClickBtn=function(e){
    		s.target=e.target;
			s.pageId=s.target.getAttribute("href");
			s.open(s.pageId);
			e.preventDefault();
		}
        s.onPopstate=function(event) {
			if(event.state && event.state.href && s.pageId==event.state.href){
				s.open(event.state.href);
				console.log("不允许前进");
				return;
			}
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