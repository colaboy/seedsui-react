//FontCounter 文字计数器
(function(window,document,undefined){
	window.FontCounter=function(params){
		/*================
		Model
		================*/
		var defaults={
			fieldGroup:"data-fontcounter",
			forFieldGroup:"data-fontcounter-for",
			/*
            Callbacks:
            onInput:function(FontCounter)
			onInputOut:function(FontCounter)
			onInputIn:function(FontCounter)
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
		//Fontcounters
		s.fontcounters=[].slice.call(document.querySelectorAll("["+s.params.fieldGroup+"]"));

		/*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.fontcounters.forEach(function(n,i,a){
				var field=n;
	        	var fieldRules=field.getAttribute("data-rule");
	        	if(!fieldRules){
					console.log("请给对象加上data-rule maxlength限制");
					return;
				}
	        	var fieldGroup=field.getAttribute(s.params.fieldGroup);
	        	field.forContainer=document.querySelector("["+s.params.forFieldGroup+"='"+fieldGroup+"']");
	        	field.maxlength=0;
	        	var rules=fieldRules.split(" ");
				for(var i=0,rule;rule=rules[i++];){
					if(rule.indexOf("maxlength")>=0){
						field.maxlength=rule.split(":")[1];
					}
				}
				field[action]("input",s.onInput,false);
			})
		}
		s.attach=function(event){
            s.events();
        }
        s.detach=function(event){
            s.events(true);
        }
        s.onInput=function(e){
        	s.target=e.target;
        	//Callback
			if(s.params.onInput)s.params.onInput(s);
			if(s.target.maxlength<s.target.value.length && s.params.onInputOut){
				s.params.onInputOut(s);
			}else{
				s.params.onInputIn(s);
			}
        }
        //Init
        s.init=function(){
        	s.attach();
        }
        s.init();
	}
})(window,document,undefined);