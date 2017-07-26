//Prompt 提示框
(function(window,document,undefined){
	
	window.Prompt=function(params){
		/*================
		Model
		================*/
		var defaults={
			parent:document.body,
			
			maskClass:"mask",
			maskActiveClass:"active",
			maskFeatureClass:"prompt-mask",

			promptClass:"prompt",
			promptActiveClass:"active",
			wrapperClass:"prompt-wrapper",

			isClickAllow:false,
			clickAllowClass:"prompt-clickallow",

			promptCss:{},
			wrapperCss:{},

			delay:1500,
			html:"",
			
			/*callbacks
            onShowed(Prompt)//显示动画结束后回调
            onHid(Prompt)//隐藏动画结束后回调
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
		s.prompt,s.wrapper;
		//Mask
		s.createMask=function(){
            var mask=document.createElement("div");
            mask.setAttribute("class",s.params.maskClass+" "+s.params.maskFeatureClass);
            if(s.params.isClickAllow)mask.classList.add(s.params.clickAllowClass);
            return mask;
        }
		s.createPrompt=function(){
			var prompt=document.createElement("div");
			prompt.setAttribute("class",s.params.promptClass);
			return prompt;
		}
		s.createPromptContent=function(){
			var wrapper=document.createElement("div");
			wrapper.setAttribute("class",s.params.wrapperClass);
			if(s.params.html)wrapper.innerHTML=s.params.html;
			return wrapper;
		}
		s.create=function(){
			s.mask=s.createMask();
			s.prompt=s.createPrompt();
			s.wrapper=s.createPromptContent();
			s.prompt.appendChild(s.wrapper);
			s.mask.appendChild(s.prompt);
			s.parent.appendChild(s.mask);
		}
		s.create();
		s.update=function(){
            for(var c in s.params.promptCss){
                s.prompt.style[c]=s.params.promptCss[c];
            }
            for(var c in s.params.wrapperCss){
                s.wrapper.style[c]=s.params.wrapperCss[c];
            }
		}
		s.update();

		/*================
		Method
		================*/
		s.setPromptClassName=function(className){
			s.params.promptClass=className;
			s.prompt.setAttribute("class",s.params.promptClass);
		};
		s.setHTML=function(html){
			s.wrapper.innerHTML=html;
		};
		s.setDelay=function(delay){
			s.params.delay=delay;
		};
		
		s.showMask=function(){
            s.mask.classList.add(s.params.maskActiveClass);
        }
        s.hideMask=function(){
        	s.mask.classList.remove(s.params.maskActiveClass);
        }
        s.destroyMask=function(){
        	s.parent.removeChild(s.mask);
        }

        s.showPrompt=function(){
            s.prompt.classList.add(s.params.promptActiveClass);
        }
        s.hidePrompt=function(){
        	s.prompt.classList.remove(s.params.promptActiveClass);
        }
        s.destroyPrompt=function(){
        	s.parent.removeChild(s.prompt);
        }

        s.isHid=true;
		s.hide=function(fn){
			s.isHid=true;
			s.hideMask();
			s.hidePrompt();
		};
		s.show=function(fn){
			s.isHid=false;
			s.showMask();
			s.showPrompt();

			//显示数秒后，自动消失
			if(s.delayer)window.clearTimeout(s.delayer);
			s.delayer=setTimeout(function(){
				s.hide();
			}, s.params.delay);
		};
		s.destroy=function(){
			s.destroyMask();
		};
		/*================
		Controller
		================*/
		s.events=function(detach){
			var target=s.prompt;
			var action=detach?"removeEventListener":"addEventListener";
			target[action]("webkitTransitionEnd",s.onTransitionEnd,false);
			//target[action]("webkitAnimationEnd",s.onAnimationEnd,false);
		}
		s.attach=function(){
			s.events();
		}
		s.detach=function(){
			s.events(false);
		}
		//Events Handler
		s.onTransitionEnd=function(e){
			if(e.propertyName=="visibility")return;
			if(s.isHid){
				//Callback onHid
				if(s.params.onHid)s.params.onHid(s);
			}else{
				//Callback onShowed
				if(s.params.onShowed)s.params.onShowed(s);
			}
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