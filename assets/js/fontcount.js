(function(window,document,undefined){
	window.FontCount=function(container,params){
		var s=this;
		s.field=$(container);
		s.fieldCount=$(container+"-count");
		s.maxlenth=0;
		var rules=s.field.data("rule").split(" ");
		for(var i=0,rule;rule=rules[i++];){
			if(rule.indexOf("maxlength")>=0){
				s.maxlenth=rule.split(":")[1];
			}
		}
		s.field.on("input",function(e){
			s.currentLenth=$(this).val().length;
			if(params.onInput)params.onInput(s);
			if(s.maxlenth<s.currentLenth && params.onMoreThanCount){
				params.onMoreThanCount(s);
			}else{
				params.onNotMoreThanCout(s);
			}
		})
	}
})(window,document,undefined);