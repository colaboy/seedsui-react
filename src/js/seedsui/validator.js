//Validator 表单验证 (require safelvl.js)
(function(window,document,undefined){
	/********************验证策略类********************/
	var ruleExpress={
		"required":/.+/,//不能为空
		"integer":/^[1-9]{1,}[0-9]*$/,//正整数
		"username":/^[\w]*$/,//只能包括字母、数字和下划线
		"password":/^[0-9_a-zA-Z-~!@#$]*$/,//密码格式不正确
		"mail":/^(\w+@\w+\.[\.\w]+)?$/,//邮箱格式不正确
		"phone":/^([1][34578][0-9]{9})?$/,//手机号码输入不正确
		"chinese":/^[\u4E00-\u9FA5]*$/,//只能填写中文
		"specialchar":/^([\u4e00-\u9fa5]*|[a-zA-Z0-9]*)$///不能为特殊字符
	};
	window.Rules={
		required:function(value,errorMsg){
			if(!ruleExpress["required"].test(value)){
				return errorMsg;
			}
		},
		integer:function(value,errorMsg){
			if(!ruleExpress["integer"].test(value)){
				return errorMsg;
			}
		},
		username:function(value,errorMsg){
			if(!ruleExpress["username"].test(value)){
				return errorMsg;
			}
		},
		password:function(value,errorMsg){
			if(!ruleExpress["password"].test(value)){
				return errorMsg;
			}
		},
		mail:function(value,errorMsg){
			if(!ruleExpress["mail"].test(value)){
				return errorMsg;
			}
		},
		phone:function(value,errorMsg){
			if(!ruleExpress["phone"].test(value)){
				return errorMsg;
			}
		},
		chinese:function(value,errorMsg){
			if(!ruleExpress["chinese"].test(value)){
				return errorMsg;
			}
		},
		specialchar:function(value,errorMsg){
			if(!ruleExpress["specialchar"].test(value)){
				return errorMsg;
			}
		},
		number:function(value,errorMsg){
			if(value.length != 0 && !Number(value)){
				return errorMsg;
			}
		},
		minNumber:function(value,min,errorMsg){
			if(value.length != 0 && value < min){
				return errorMsg;
			}
		},
		maxNumber:function(value,max,errorMsg){
			if(value.length != 0 && value < max){
				return errorMsg;
			}
		},
		minLength:function(value,length,errorMsg){
			if(value.length != 0 && value.length < length){
				return errorMsg;
			}
		},
		maxLength:function(value,length,errorMsg){
			if(value.length != 0 && value.length > length){
				return errorMsg;
			}
		},
		compare:function(value1,value2,errorMsg){
			if(value1 != value2){
				return errorMsg;
			}
		},
		safeLvl:function(value,lvl,errorMsg){
	        var valLvl=SafeLvl.check(value);
	        if(value.length != 0 && valLvl < lvl){
	        	return errorMsg;
	        }
	    }
	};

	/********************Validator类********************/
	window.Validator=function(){
		var s=this;
		s.caches=[];
		s.add=function(field,strategies){
			var self=this;
			for(var i=0,strategy;strategy=strategies[i++];){
				(function(strategy){
					var ruleArray=strategy.rule.split(":");
					var errorMsg=strategy.errorMsg;

					s.caches.push(function(){
						var ruleName=ruleArray.shift();
						ruleArray.unshift(field.value);
						ruleArray.push(errorMsg);//此时ruleArray的值为 ruleValue,fieldValue,errorMsg
						var ruleErrorMsg=Rules[ruleName].apply(null,ruleArray);
						if(ruleErrorMsg) return {field:field,errorMsg:ruleErrorMsg};
					});
				})(strategy);
			}
		};
		s.start=function(){
			for(var i=0,valiFn;valiFn=s.caches[i++];){
				var error=valiFn();
				if(error)return error;
			}
		};
	};
})(window,document,undefined);