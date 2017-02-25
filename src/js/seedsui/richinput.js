//Richinput 带表情输入框 (require slider.js)
(function(window,document,undefined){
	window.Richinput=function(container,params){
		/*=========================
          Params
          ===========================*/
        var defaults={
        	"maskClass":"mask",
			"emojiBoxClass":"emoji",
			"sliderParam":{
				"pagination":".slider-pagination"
			}
		}
		params=params||{};
		for(var def in defaults){
			if(params[def]===undefined){
				params[def]=defaults[def];
			}
		}
		//Richinput
		var s=this;

		//Params
		s.params = params;

		//Container
		s.container=typeof container=="string"?document.querySelector(container):container;
		if(!s.container){
            console.log("SeedsUI Error：未找到Richinput的DOM对象，请检查传入参数是否正确");
            return;
        }

		//Slider
		s.slider;

		//Mask Div
		s.mask=document.querySelector(container+"+."+s.params.maskClass);

		//表情容器
		s.emojiBox=s.container.querySelector("."+s.params.emojiBoxClass);

		//Textarea Form
		s.textarea=s.container.querySelector("textarea");

		//辅助计算textarea高度的pre和preSpan
		/*var pre=s.container.querySelector("pre");
		var preSpan=pre.querySelector("span");

		s.textarea.style.height=pre.clientHeight+"px";*/

		/*=========================
          Method
          ===========================*/
		//插入表情
		function insertFace(objFace){
			var emojiName=objFace.getAttribute("alt");
			//var emojiSrc=objFace.getAttribute("data-emoji-src");
			var editText=s.textarea.value;
			var editTextBefore=editText.substr(0,cursorOffset);
			var editTextAfter=editText.substr(cursorOffset,editText.length);
			var editTextInsert=emojiName;
			cursorOffset=cursorOffset+emojiName.length;
			s.textarea.value=editTextBefore+editTextInsert+editTextAfter;
		}

		/*=========================
          Events Listener
          ===========================*/
		//遮罩层添加点击事件
		s.mask.addEventListener("click",function(e){
			s.container.classList.remove("active");
			//s.container.className=s.container.className.replace(/\s{1,}active/,"");
			s.textarea.blur();
		},false);

		//获得光标位置
		var cursorOffset=0;
		document.onselectionchange=function(e){
			if(Object.prototype.toString.call(e.target.activeElement)=="[object HTMLTextAreaElement]"){
				//计算textarea高度
				/*preSpan.innerText=s.textarea.value;
				s.textarea.style.height=pre.clientHeight+"px";*/
				//获得光标位置
				cursorOffset=s.textarea.selectionStart;
			}
		}
		s.textarea.addEventListener("input",function(e){
			//计算textarea高度
			/*preSpan.innerText=s.textarea.value;
			s.textarea.style.height=pre.clientHeight+"px";*/
			//获得光标位置
			cursorOffset=s.textarea.selectionStart;
		},false);
		//点击input框
		s.textarea.addEventListener("click",function(e){
			s.container.classList.add("active");
			if(!s.slider){
				s.slider=new Slider(container+" ."+s.params.emojiBoxClass,s.params.sliderParam);
			}
		},false);

		//点击表情
		s.emojiBox.addEventListener("click",function(e){
			if(e.target.getAttribute("data-emoji")){
				insertFace(e.target);
			}
			s.textarea.focus();
			Richeditor.setCaretPosition(s.textarea,cursorOffset);
		},false);
	}
})(window,document,undefined);
