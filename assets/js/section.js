/*!
 * section页面切换
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

(function(window,document,undefined){
    window.Section=function(params){
    	/*=========================
          Params
          ===========================*/
        var animations={
			"none":"none",
			"slideleft":[{left:"0px"},{"left":"100%"}],
			"slideright":[{left:"0"},{left:"-100%"}],
			"slideup":[{top:"0"},{top:"100%"}],
			"slidedown":[{top:"0"},{top:"-100%"}],
			"fade":[{opacity:"1"},{opacity:"0"}],
		}

		var defaults={
			"defaultAnimation":animations["slideleft"],
			"sectionActiveClass":"active",
			"duration":"500"

			/*callbacks
			onSectionOpenStart:function(Section)//开窗前
			onSectionOpenEnd:function(Section)//开窗完成时动画
			onSectionCloseStart:function(Section)//关窗前
			onSectionCloseEnd:function(Section)//关窗完成时动画
			*/
		}

		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s={};
		s.params=params;
		s.history=[];
		/*=========================
          Method
          ===========================*/
		//打开URL
		s.openURL=function(href, isPush){
			s.history.push(href);
			try{
		        if(isPush)
		            window.history.pushState({href:href},document.title, href);
		        else
		            window.history.replaceState({href:href},document.title, href);
		    }catch(err){
		    	console.log("请检查您当前运行的环境是否为服务器端");
		    }
		}
		//设置section动画
		s.setSectionAnimation=function(aniOrId){
			var sectionAnimation=aniOrId;
			if(aniOrId.indexOf("#")==0)sectionAnimation=$(aniOrId).data("sectionanimation");
			if(sectionAnimation) s.params.animation=animations[sectionAnimation];
			else s.params.animation=s.params.defaultAnimation;
		}
		//关窗函数
		s.closeSection=function(sectionId,animation){
			//删除对应的历史记录
			s.history=s.history.filter(function(n,i,a){
				return n!=sectionId;
			})
			//Callback onSectionCloseStart
			if(s.params.onSectionCloseStart)s.params.onSectionCloseStart(s);
			//设置窗口动画
			if(animation)s.setSectionAnimation(animation);
			else s.setSectionAnimation(sectionId);
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				$(sectionId).removeClass("active");
				//Callback onSectionCloseEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionCloseEnd(s);
				return;
			}
			//关窗
			$(sectionId).animate(s.params.animation[1],s.params.duration,function(){
				$(this).removeClass("active");
				//Callback onSectionCloseEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionCloseEnd(s);
			});
		}
		//开窗函数
		s.openSection=function(sectionId){
			//添加历史记录，并修改浏览器地址
			s.openURL(sectionId,true);
			//Callback onSectionOpenStart
			if(s.params.onSectionOpenStart)s.params.onSectionOpenStart(s);
			//设置窗口动画
			s.setSectionAnimation(sectionId);
			//开窗
			$(sectionId).addClass("active");
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
				return;
			}
			$(sectionId).css(s.params.animation[1]);
			$(sectionId).animate(s.params.animation[0],s.params.duration,function(){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
			});
		}
		//回退函数
		s.backSection=function(){
			//清除顶层历史记录
			s.sectionId=s.history[s.history.length-1];
			//关闭清除的那层
			s.closeSection(s.sectionId);
		}
		/*=========================
          Events Click
          ===========================*/
		$("[data-target=section]").click(function(e){
			s.target=e.target;
			s.sectionId=$(this).attr("href");
			if($.inArray(s.sectionId,s.history)>=0)return false;
			//开窗
			s.openSection(s.sectionId);
			return false;
		});
		/*=========================
          Events Back
          ===========================*/
		window.onpopstate = function(event) {
			if(event.state && event.state.href && s.sectionId==event.state.href){
				s.openSection(event.state.href);
				console.log("不允许前进");
				return;
			}
			//后退
			s.backSection();
			console.log("后退"+s.history);
			//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
		};
		return s;
	}
})(window,document,undefined);