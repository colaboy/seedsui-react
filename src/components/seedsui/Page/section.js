//Section 单页模式
(function(window,document,undefined){
    window.Section=function(container,params){
    	/*=========================
          Model
          ===========================*/
		var defaults={
			activeClass:"active",

			/*callbacks
			onStart:function(Page)//加载中
			onShowed:function(Page)//开窗完成时动画
			onHid:function(Page)//关窗完成时动画
			*/
		}

		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		//Params
		s.params=params;
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container){
            console.log("SeedsUI Error：未找到Section的DOM对象，请检查传入参数是否正确");
            return;
        }

		/*=========================
          Method
          ===========================*/
        s.isHid=true;
        s.show=function(){
        	s.isHid=false;
        	//Callback onStart
        	if(s.params.onStart)s.params.onStart(s);

        	s.container.classList.add(s.params.activeClass);
        }
        s.hide=function(){
        	s.isHid=true;
        	s.container.classList.remove(s.params.activeClass);
        }
		/*=========================
          Control
          ===========================*/
        s.events=function(detach){
            var action=detach?"removeEventListener":"addEventListener";
            //动画监听
            s.container[action]("webkitTransitionEnd",s.onTransitionEnd,false);
        }
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
		s.onTransitionEnd=function(e){
			if(e.propertyName=="visibility")return;
			if(s.container.classList.contains(s.params.activeClass)){
				//Callback onShowed
				if(s.params.onShowed)s.params.onShowed(s);
			}else{
				//Callback onHid
				if(s.params.onHid)s.params.onHid(s);
			}
		};
		s.init=function(){
			s.attach();
		}
		s.init();
	}

	window.Sections=function(params){
		/*================
		Model
		================*/
		var defaults={
			sectionAttr:"data-animation",

			/*callbacks
			onStart:function(Page)//加载中
			onShowed:function(Page)//开窗完成时动画
			onHid:function(Page)//关窗完成时动画
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		//对象
		s.sections=[];
		//Params
		s.params=params;
        //获得所有元素
        s.update=function(){
        	var elements=document.querySelectorAll("section["+s.params.sectionAttr+"]");
        	for(var i=0,el;el=elements[i++];){
        		s.sections[el.getAttribute("id")]=new Section(el,s.params);
        	}
        }
        s.update();
        /*================
		Method
		================*/
		return s.sections;
	}
})(window,document,undefined);