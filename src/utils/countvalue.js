//CountValue 文字计数器
(function(window,document,undefined){
	window.CountValue=function(field,params){
		/*================
		Model
		================*/
		var defaults={
			maxLengthAttr:"data-maxlength",
			defaultMaxLength:20
			/*
            Callbacks:
            onInput:function(CountValue)
			onInputOut:function(CountValue)//文字超过限制
			onInputIn:function(CountValue)//文字未超过限制
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
		//Field(Element)
		s.field=typeof field === "string"?document.querySelector(field):field;
		//Maxlength(Number)
		s.maxLength=s.field.getAttribute(s.params.maxLengthAttr)||s.params.defaultMaxLength;
		/*================
		Method
		================*/
		s.destroy=function(){
			s.detach();
		}
		/*================
		Controller
		================*/
		s.events=function(detach){
			var action=detach?"removeEventListener":"addEventListener";
			s.field[action]("input",s.onInput,false);
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
			if(s.maxLength<s.target.value.length && s.params.onInputOut){
				if(s.params.onInputOut)s.params.onInputOut(s);
			}else{
				if(s.params.onInputIn)s.params.onInputIn(s);
			}
        }
        //Init
        s.init=function(){
        	s.attach();
        }
        s.init();
	}
	window.CountValues=function(params){
		/*================
		Model
		================*/
		var defaults={
			fieldClass:"countvalue",
			/*
            Callbacks:
            onInput:function(CountValue)
			onInputOut:function(CountValue)//文字超过限制
			onInputIn:function(CountValue)//文字未超过限制
			*/
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		var s=this;
		s.countValues=[];
		//Params
		s.params=params;
        //获得所有元素
        s.update=function(){
        	var elements=document.querySelectorAll("."+s.params.fieldClass);
        	for(var i=0,el;el=elements[i++];){
        		s.countValues[i]=new CountValue(el,s.params);
        	}
        }
        s.update();
        /*================
		Method
		================*/
        s.destroy=function(){
        	for(var i=0;i<s.countvalues.length;i++){
	            s.countValues[i].destroy();
	        }
	        s.countValues=null;
        }
        return s.countValues;
	}
})(window,document,undefined);