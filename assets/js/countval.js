//CountVal 文字计数器
(function(window,document,undefined){
	window.CountVal=function(field,params){
		/*================
		Model
		================*/
		var defaults={
			fieldAttr:"data-countval",
			forFieldAttr:"data-countval-for",
			ruleAttr:"data-rule"
			/*
            Callbacks:
            onInput:function(CountVal)
			onInputOut:function(CountVal)//文字超过限制
			onInputIn:function(CountVal)//文字未超过限制
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
		//Field
		s.field=typeof field === "string"?document.querySelector(field):field;
		//console.log(s.field);return;
		var forFieldId=s.field.getAttribute(s.params.fieldAttr);
		s.field.forField=document.querySelector("["+s.params.forFieldAttr+"="+forFieldId+"]");

		/*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
        	s.field.maxlength=0;
        	var fieldRules=s.field.getAttribute(s.params.ruleAttr);
        	var rules=fieldRules.split(" ");
			for(var i=0,rule;rule=rules[i++];){
				if(rule.indexOf("maxlength")>=0){
					s.field.maxlength=rule.split(":")[1];
				}
			}
			if(!s.hasInputEvent){
				s.field[action]("input",s.onInput,false);
				s.hasInputEvent=true;
			}
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
	window.CountVals=function(params){
		var s=this;
        //获得所有元素
        s.fields=document.querySelectorAll("[data-countval]");
        s.fields.fields=[];
        var jsonParams={};
        if(params)jsonParams=params;
        //实例化所有元素
        for(var i=0,field;field=s.fields[i++];){
            s.fields.fields[i]=new CountVal(field,jsonParams);
        }
	}
})(window,document,undefined);