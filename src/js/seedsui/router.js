//Page 单页模式
(function(window,document,undefined){
    window.Router=function(params){
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
			onBack:function(Router)//返回
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
		//History
		s.history=[];
		/*=========================
          Method
          ===========================*/
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
        /*
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
		}*/
		//开窗函数
		s.open=function(pageId,target,animation){
			var page=document.getElementById(pageId.substring(1));
			/*if(animation){
				page.setAttribute("data-animation",animation);
				s.update();
			}*/
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
			//s.showPage(page);
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
            //hash值监听
            window[action]("popstate",s.onPopstate,false);
            //window[action]("hashchange",s.onPopstate,false);

            //动画监听
            /*document[action]("webkitTransitionEnd",s.onTransitionEnd,false);
            //页面初始化
            window[action]("load",s.onLoad,false);*/
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
        	//console.log(e);
			//console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
			if(e.state==null){
				console.log("返回到底层");
				return;
			}
			var href=e.state.href;
			console.log(href);
			s.history.push(href);
			/*var targetPageId=null,targetPage=null;
			//如果本地历史记录为空(刷新导致)，而浏览器历史记录不为空，则监听浏览器历史记录
			if(s.history.length==0 && window.history.state && window.history.state.href){
				console.log("刷新和前进");
				s.isRoot=false;
				console.log(s.history);
				targetPageId=window.history.state.href;
				//console.log("无本地记录，但有浏览器历史记录"+targetPageId);
				targetPage=document.getElementById(targetPageId.substring(1));
				//s.hideAllPage(targetPageId);
				//Callback onLoad
				s.targetPageId=targetPageId;
				s.targetPage=targetPage;
				//s.showPage(targetPage);
				return;
			}
			if(s.history.length==0){
				console.log("返回到底层");
				s.isRoot=true;//底层标识
				console.log(s.history);
				//console.log("无本地记录，也无浏览器有历史记录");
				
				targetPageId=null;
				targetPage=null;
				//s.hideAllPage();
			}else{
				console.log("返回");
				console.log(s.history);
				//获得最新历史记录，并关闭那个页面
				var pageId=s.history[s.history.length-1];
				//if(pageId)s.close(pageId);
				//删除对应的历史记录
				s.removeHistory(pageId);
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
			}*/
		};
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);