//Form
(function(window,document,undefined){
	window.Form=function(container,params){
		/*================
		Model
		================*/
		var defaults={
			formFilterClass:null,//过滤表单元素
			promptParent:document.body,//提示框的父元素
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
		//表单元素
		s.formElements=[];
		s.update=function(){
			s.formElements=[];
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
				if(s.params.formFilterClass && field.classList.contains(s.params.formFilterClass)){
					continue;
				}
				//push到数组里
				s.formElements.push(field);
			}
		};
		s.update();
		
		/*================
		Method
		================*/
		//设置formElements对象
		s.setFormElements=function(formElements){
			s.formElements=formElements;
		};
		//添加formElements对象
		s.pushElement=function(el){
			s.formElements.push(el);
		};
		/*表单Json化*/
		s.serializeArray=function(){
			var parts=[],field=null;
			for(var i=0;i<s.formElements.length;i++){
				field=s.formElements[i];
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
	}
})(window,document,undefined);