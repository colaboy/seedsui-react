//Form
(function(window,document,undefined){
	window.Form=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			ignoreFieldClass:null,//过滤表单元素
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Form
		var s=this;
		//Params
		s.params = params;
		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container){
            console.log("SeedsUI Error：未找到Form表单的DOM对象，请检查传入参数是否正确");
            return;
        }
		//表单元素
		s.fields=[];
		s.update=function(){
			s.fields=[];
			//获取有效的表单元素
			for(var i=0;i<s.container.elements.length;i++){
				var field=s.container.elements[i];
				//过滤没有name的表单元素
				if(!field.type || !field.name){
					continue;
				}
				//过滤button、reset、submit
				if(field.type=="button" || field.type=="reset" || field.type=="submit"){
					continue;
				}
				//过滤未选中的checkbox和radio
				if(field.type=="radio" || field.type=="checkbox"){
					if(!field.checked){
						continue;
					}
				}
				if(s.params.ignoreFieldClass && field.classList.contains(s.params.ignoreFieldClass)){
					continue;
				}
				//push到数组里
				s.fields.push(field);
			}
		};
		s.update();
		
		/*================
		Method
		================*/
		//设置fields对象
		s.setFields=function(fields){
			s.fields=fields;
		};
		//添加fields对象
		s.pushField=function(field){
			s.fields.push(field);
		};
		/*表单Json化*/
		s.serializeArray=function(){
			var parts=[],field=null;
			for(var i=0;i<s.fields.length;i++){
				field=s.fields[i];
				//如果是多选框，则每个值单独一个条目
				if(field.type=="select-one" || field.type=="select-multiple"){
					for(var j=0;j<field.options.length;j++){
						var option=field.options[j];
						if(option.selected){
							parts.push(field.name+"="+field.value);
						}
					}
				}else{
					//push到数组里
					parts.push(field.name+"="+field.value);
				}
			}
			return parts;
		};
		/*表单序列化*/
		s.serialize=function(){
			//序列化
			var parts=s.serializeArray();
			//获得字符串
			return parts.join("&");
		};
		return s;
	}
})(window,document,undefined);