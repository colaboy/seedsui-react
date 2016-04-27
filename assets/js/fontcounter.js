(function(window,document,undefined){
	window.FontCounter=function(params){
		var fontcounters=document.querySelectorAll("[data-fontcounter]");
		[].slice.call(fontcounters).forEach(function(n,i,a){
			var s={};
			s.field=n;
			s.fieldRules=n.getAttribute("data-rule");
			var fieldDescription=s.field.getAttribute("data-fontcounter");
			s.fieldCounter=document.querySelector("[data-fontcounter-for='"+fieldDescription+"']");
			s.maxlength=0;
			if(!s.fieldRules){
				console.log("请给对象加上data-rule限制");
				return;
			}
			var rules=s.fieldRules.split(" ");
			for(var i=0,rule;rule=rules[i++];){
				if(rule.indexOf("maxlength")>=0){
					s.maxlength=rule.split(":")[1];
				}
			}
			EventUtil.addHandler(s.field,"input",function(e){
				s.target=e.target;
				s.currentlength=this.value.length;
				if(params.onInput)params.onInput(s);
				if(s.maxlength<s.currentlength && params.onMoreThanCount){
					params.onMoreThanCount(s);
				}else{
					params.onNotMoreThanCout(s);
				}
			});
		});
	}
})(window,document,undefined);