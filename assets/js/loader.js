/*!
*	加载
*	@version 1.0.0
*	@author WangMingzhu
*   @requie jquery.js
*/

/**
*  加载遮罩，主要用于加载前显示遮罩，并提供了多种加载样式
* 
*  @class Loader
*/
var Loader=function(){
	var tagHead=document.head||document.getElementsByTagName("head")[0],//byTagName是为了兼容ie8
	tagBody=document.body,
	tagLink,
	tagDivMaskLayer,
	tagDivWait;
	//创建css
	function createLoaderCss(){
		var headLinks=tagHead.getElementsByTagName("link");
		
		for(var i=0;i<headLinks.length;i++){
			if(headLinks[i].getAttribute("href").indexOf("js/measy/css/loader.css")>=0){
				return;
			}
		}
		tagLink=document.createElement("link");
		tagLink.setAttribute("rel","stylesheet");
		tagLink.setAttribute("href","js/measy/css/loader.css");
		tagHead.appendChild(tagLink);
	}
	/**
	 * 创建遮罩层
	 * @method createLoaderDiv
	 * @param effect //加载动画效果，如"spinner"(旋转)、"scale"(放大)、"fade"(渐隐)、"gif"(gif图片)
	 * @param params //配置参数，如：{loaderImgSrc:"img/xx.gif",loaderLabel:"正在加载...",opacity:0}
	 * @return void
	 */
	function createLoaderDiv(effect,params){
		//获得loading效果
		var cssEffect={
			"spinner":"loading-spinner",
			"scale":"loading-scale",
			"fade":"loading-opacity",
			"gif":"loading-gif"
		}
		var loadingEffect="loading-gif";
		if(effect && typeof effect=="string" && cssEffect[effect]){
			loadingEffect=cssEffect[effect];
		}
		var loadingLabel="";
		if(params && params.loaderLabel){
			loadingLabel=params.loaderLabel;
		}
		
		//判断是否已经创建layer
		var layerDiv=document.getElementById("_layer_");
		if(!layerDiv){
			//创建layer
			tagDivLayer=document.createElement("div");
			tagDivLayer.setAttribute("id","_layer_");
			//创建markLayer
			tagDivMaskLayer=document.createElement("div");
			tagDivMaskLayer.setAttribute("id","_maskLayer_");
			if(params && params.opacity)
			tagDivMaskLayer.setAttribute("style","filter: alpha(opacity="+params.opacity*100+");opacity: "+params.opacity+";");
			
			//创建wait
			tagDivWait=document.createElement("div");
			tagDivWait.setAttribute("id","_wait_");
			
			var tagImg=document.createElement("div");
			tagImg.setAttribute("class",loadingEffect);
			if(params && params.loaderImgSrc){
				tagImg.setAttribute("background-image","url("+loaderImgSrc+")");
			}
			tagDivWait.appendChild(tagImg);
			
			var tagP=document.createElement("p");
			tagP.innerHTML=loadingLabel;
			tagDivWait.appendChild(tagP);
			
			//加入到body中
			tagDivLayer.appendChild(tagDivWait);
			tagDivLayer.appendChild(tagDivMaskLayer);
			var bodyfirst=tagBody.firstChild;
			tagBody.insertBefore(tagDivLayer,bodyfirst);
			//tagBody.appendChild(tagDivLayer);
		}
		$('#_wait_ div').attr("class",loadingEffect);
		$('#_wait_ p').html(loadingLabel);
		$('#_layer_').fadeIn('slow');
	}
	
	//删除遮罩层
	var removeMark=function(){
		if(tagHead && tagBody && tagLink && tagDivMaskLayer && tagDivWait){
			tagHead.removeChild(tagLink);
			tagBody.removeChild(tagDivMaskLayer);
			tagBody.removeChild(tagDivWait);
		}
	};
	return{
		//显示遮罩层
		showMark:function(effect,params) {
			createLoaderCss();
			createLoaderDiv(effect,params);
		},
		//隐藏遮罩层
		hideMark:function(){
			$('#_layer_').fadeOut('slow','linear');
			//$('#_layer_').fadeOut('slow','linear',removeMark());
		}
	}
}();