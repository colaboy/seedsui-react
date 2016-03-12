/*!
 * section页面切换
 * @version 1.0.0
 * @author WangMingzhu
 * @requie jquery.js
 */

(function(window,document,undefined){
	
	/*=========================
      Dom Library and plugins
      ===========================*/
    var $;
    if (typeof Dom7 === 'undefined') {
        $ = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
        $ = Dom7;
    }
    if (!$) return;
    
    function init(params){
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
		var s=this;
		s.params=params;
		s.history=[];
		/*=========================
          Method
          ===========================*/
		//打开URL
		s.openURL=function(href, push){
		    if(window.history.pushState){
		        if(push)
		            window.history.pushState({href:href},document.title, href);
		        else
		            window.history.replaceState({href:href},document.title, href);
		    }
		}
		//设置section动画
		s.setSectionAnimation=function(id){
			var sectionAnimation=$(id).data("sectionanimation");
			if(sectionAnimation){
				s.params.animation=animations[sectionAnimation];
			}else{
				s.params.animation=s.params.defaultAnimation;
			}
		}
		//开窗函数
		function openSection(){
			//添加历史记录，并修改浏览器地址
			s.history.push(s.sectionId);
			s.openURL(s.sectionId,true);
			//Callback onSectionOpenStart
			if(s.params.onSectionOpenStart)s.params.onSectionOpenStart(s);
			//设置窗口动画
			s.setSectionAnimation(s.sectionId);
			//开窗
			$(s.sectionId).addClass("active");
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
				return;
			}
			$(s.sectionId).css(s.params.animation[1]);
			$(s.sectionId).animate(s.params.animation[0],s.params.duration,function(){
				//Callback onSectionOpenEnd
				if(s.params.onSectionOpenEnd)s.params.onSectionOpenEnd(s);
			});
		}
		//关窗函数
		function closeSection(){
			//清除顶层历史记录
			s.sectionId=s.history.pop();
			console.log(s.sectionId);
			//Callback onSectionCloseStart
			if(s.params.onSectionCloseStart)s.params.onSectionCloseStart(s);

			//设置窗口动画
			s.setSectionAnimation(s.sectionId);
			//如果窗口选择为无动画
			if(s.params.animation=="none"){
				$(s.sectionId).removeClass("active");
				//Callback onSectionOpenEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionOpenEnd(s);
				return;
			}
			//关窗
			$(s.sectionId).animate(s.params.animation[1],s.params.duration,function(){
				$(this).removeClass("active");
				//Callback onSectionOpenEnd
				if(s.params.onSectionCloseEnd)s.params.onSectionCloseEnd(s);
			});
		}
		/*=========================
          Events Click
          ===========================*/
		$("[data-target=section]").click(function(){
			s.sectionId=$(this).attr("href");
			if($.inArray(s.sectionId,s.history)>=0)return false;
			//开窗
			openSection();
			return false;
		});
		/*=========================
          Events Back
          ===========================*/
		window.onpopstate = function(event) {
			if(event.state && event.state.href && s.sectionId==event.state.href){
				openSection(event.state.href);
				console.log("不允许前进");
				return;
			}
			//关窗
			closeSection();
			console.log("后退"+s.history);
			//console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
		};
	}
	window.Section={
		init:init
	}
})(window,document,undefined);