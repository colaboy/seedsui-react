(function(window,document,undefined){
    
    /*=========================
      jquery|Dom7|zepto 扩展
      ===========================*/
    var $;
    if (typeof Dom7 === 'undefined') {
        $ = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
        $ = Dom7;
    }
    if (!$) return;
    /*=========================
      dialog
      ===========================*/
    var containerBox,mask;
    $.fn.extend({
        dialog:function(params){
            //设置参数
            var defaults={
                pos:"middle",
                /*callbacks
                onClick:function(this)
                */
            };
            var params=params||{};
            for(var def in defaults){
                if(params[def]==undefined){
                    params[def]=defaults[def];
                }
            };
            //设置动画
            var hideAnimate={opacity:0};
            var showAnimate={opacity:1};
            switch(params.pos){
                case "middle":hideAnimate={opacity:0};showAnimate={opacity:1};break;
                case "top":hideAnimate={top:"-100%"};showAnimate={top:"0%"};break;
                case "bottom":hideAnimate={bottom:"-100%"};showAnimate={bottom:"0%"};break;
                case "left":hideAnimate={left:"-100%"};showAnimate={left:"0%"};break;
                case "right":hideAnimate={right:"-100%"};showAnimate={right:"0%"};break;
                default :params.pos="middle";hideAnimate={opacity:0};showAnimate={opacity:1};
            }
            var s=this;
            //生成外框
            if(!containerBox){
                containerBox=document.createElement("div");
                containerBox.setAttribute("class","popup");
                $(s).wrap(containerBox);
            }
            //生成遮罩
            if(!mask){
                mask=document.createElement("div");
                mask.setAttribute("class","popup-mask");
                $(s).parent().before(mask);
            }
            
            //隐藏遮罩与外框
            function hideMask(){
                $(mask).animate({opacity:0},"fast","linear",function(){
                    $(this).css("display","none");
                });
                mask.removeEventListener("click",hideMask,false);
                $(s).parent().animate(hideAnimate,"fast","linear",function(){
                    $(this).css("display","none");
                });
            }
            //显示遮罩与外框
            function showMask(){
                //显示遮罩
                $(mask).css("display","block").animate({opacity:1},"fast","linear");
                //遮罩绑定点击事件
                mask.addEventListener("click",hideMask,false);

                //设置宽度
                var popw=$(s)[0].style.width;
                if(!popw){
                    popw="100%";
                }
                //初始化容器
                $(s).parent().removeAttr("style");
                $(s).parent().css(hideAnimate);
                $(s).parent().attr("data-pos",params.pos);
                //显示容器
                $(s).css("display","block");
                $(s).parent().animate(showAnimate,"fast","linear");
            }
            s.hideDialog=hideMask;
            s.showDialog=showMask;
            showMask();
            //Callback
            if(params.onClick){
                $(s).click(function(e){
                    s.target=e.target;
                    params.onClick(s)
                });
            }
            return s;
        }
    });
})(window,document,undefined);