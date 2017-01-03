//History 单页模式
(function(window,document,undefined){
    window.History=function(params){
    	/*=========================
          Model
          ===========================*/
		var defaults={
			storageHistoryKey:"history",
			isTakeHistory:true,//是否添加浏览器历史记录

			/*callbacks
			onBack:function(History)//返回
			onForward:function(History)//前进
			onRefreshed:function(History)//刷新后
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

		s.list=[],s.currentHash="",s.prevHash="";

		//保存到storage中
		var storage=window.sessionStorage;
		var storageHistory=storage.getItem(s.params.storageHistoryKey);
		if(storageHistory)s.list=storageHistory.split(",");

		/*=========================
          Method
          ===========================*/
        var saveHistoryToStorage=function(){
        	storage.setItem(s.params.storageHistoryKey,s.list);
        }

        s.add=function(hash){
        	s.list.push(hash);
        	//历史记录保存到本地数据库中
        	saveHistoryToStorage();

        	if(s.params.isTakeHistory==false)return;
			try{
		        window.history.pushState({href:hash},document.title, hash);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
        }
        s.replace=function(hash){
        	s.prevHash=s.list.pop();
        	s.list.push(hash);
        	//历史记录保存到本地数据库中
        	saveHistoryToStorage();

        	if(s.params.isTakeHistory==false)return;
			try{
		        window.history.replaceState({href:hash},document.title, hash);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
        }

        s.remove=function(hash){
        	s.list=s.list.filter(function(n){
				return n!=hash;
			});
			//历史记录保存到本地数据库中
			saveHistoryToStorage();
        }

        s.back=function(){
        	s.prevHash=s.list.pop();
        	//历史记录保存到本地数据库中
			saveHistoryToStorage();
        }
        s.forward=function(){
        	s.prevHash=s.list[s.list.length-1]||"";
        	s.list.push(s.currentHash);
        	//历史记录保存到本地数据库中
			saveHistoryToStorage();
        }

		/*=========================
          Control
          ===========================*/
        s.events=function(detach){
            var action=detach?"removeEventListener":"addEventListener";
            //hash值监听
            window[action]("popstate",s.onPopstate,false);
            //window[action]("hashchange",s.onPopstate,false);
        }
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.onPopstate=function(e) {
			//console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
			//返回到根部
			if(e.state==null){
				s.back();
				s.currentHash="";
				//Callback onBack
				if(s.params.onBack)s.params.onBack(s);

				//console.log("根部——当前hash："+s.currentHash+";关闭页面："+s.prevHash);
				return;
			}

			
			s.currentHash=e.state.href;

			//前进与后退
			if(s.list.indexOf(s.currentHash)==-1){//前进
				s.forward();
				//Callback onForward
				if(s.params.onForward)s.params.onForward(s);

				//console.log("前进——当前hash："+s.currentHash+";上个页面："+s.prevHash);
			}else{//后退
				s.back();
				//Callback onBack
				if(s.params.onBack)s.params.onBack(s);

				//console.log("后退——当前hash："+s.currentHash+";关闭页面："+s.prevHash);
			}
		};
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);