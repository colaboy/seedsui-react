//Loading
(function(window,document,undefined){
	
	window.Loading=function(params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			container:null,

			containerClass:"loading",
			progressBoxClass:"loading-progress-box",
			progressClass:"loading-progress",

			/*
            Callbacks:
            onClick:function(Loading)
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]==undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.params=params;
		s.parent=typeof s.params.parent=="string"?document.querySelector(s.params.parent):s.params.parent;
		s.container,s.progressBox,s.progress;
		//Container
		s.createContainer=function(){
			var container=document.createElement("div");
            container.setAttribute("class",s.params.containerClass);
            return container;
		}
        //ProgressBox
		s.createProgressBox=function(){
			var progressBox=document.createElement("div");
			progressBox.setAttribute("class",s.params.progressBoxClass);
			return progressBox;
		}
		//Progress
		s.createProgress=function(){
            var progress=document.createElement("div");
            progress.setAttribute("class",s.params.progressClass);
            return progress;
        }
		s.create=function(){
			if(s.params.container){
				s.container=typeof s.params.container=="string"?document.querySelector(s.params.container):s.params.container;
				if(!s.container){
					console.log("SeedsUI Error：未找到Aside的DOM对象，请检查传入参数是否正确");
				}else{
					s.progress=s.container.querySelector("."+s.params.progressClass);
					s.progressBox=s.container.querySelector("."+s.params.progressBoxClass);
					return;
				}
			}
			s.container=s.createContainer();
			s.progressBox=s.createProgressBox();
			s.progress=s.createProgress();
			s.progressBox.appendChild(s.progress);

			s.container.appendChild(s.progressBox);

			s.parent.appendChild(s.container);
		}
		s.create();
		/*================
		Method
		================*/
		s.isHid=true;
		s.hide=function(){
			s.isHid=true;
        	s.container.style.display="none";

		};
		s.show=function(){
			s.isHid=false;
            s.container.style.display="block";
		};
		s.destroy=function(){
			//移动事件监听
			s.detach();
			//移除遮罩
			s.parent.removeChild(s.container);
		};
		//动态设置
		s.setOnClick=function(fn){
        	s.params.onClick=fn;
        }
		/*================
		Control
		================*/
        s.events=function(detach){
            var touchTarget=s.container;
            var action=detach?"removeEventListener":"addEventListener";
            touchTarget[action]("click",s.onClick,false);
        }
        //attach、dettach事件
        s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
		s.onClick=function(e){
			s.target=e.target;
			if(s.params.onClick)s.params.onClick(s);
		}
		/*================
		Init
		================*/
		s.init=function(){
			s.attach();
		}
		s.init();
	}
})(window,document,undefined);