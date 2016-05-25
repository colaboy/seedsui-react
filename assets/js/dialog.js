(function(window,document,undefined){
    window.Dialog=function(container,params){
        //Model
        /*=========================
          Params
          ===========================*/
        var defaults={
            pos:"middle",
            width:null,
            isClickMaskHide:true
            /*callbacks
            onClick:function(this)
            */
        }
        params=params||{};
        for(var def in defaults){
            if(params[def]===undefined){
                params[def]=defaults[def];
            }
        }
        //Dialog
        var s=this;

        //Params
        s.params = params;

        //Container
        s.container=typeof container=="string"?document.querySelector(container):container;

        //ContainerBox
        s.containerBox;
        if(!s.containerBox){
            s.containerBox=document.createElement("div");
            s.containerBox.setAttribute("class","popup");
            s.containerBox.appendChild(s.container);
            document.body.appendChild(s.containerBox);
        }
        //Mask
        s.mask;
        if(!s.mask){
            s.mask=document.createElement("div");
            s.mask.setAttribute("class","popup-mask");
            s.containerBox.parentNode.insertBefore(s.mask,s.containerBox);
            if(s.params.isClickMaskHide==true)s.mask.addEventListener("click",hideDialog,false);
        }
        //设置宽度
        s.params.width=s.container.style.width;
        //设置动画
        var hideAnimate={opacity:0};
        var showAnimate={opacity:1};
        function updateAnimate(){
            switch(s.params.pos){
                case "middle":hideAnimate={opacity:0};showAnimate={opacity:1};break;
                case "top":hideAnimate={top:"-100%"};showAnimate={top:"0%"};break;
                case "bottom":hideAnimate={bottom:"-100%"};showAnimate={bottom:"0%"};break;
                case "left":hideAnimate={left:"-100%"};showAnimate={left:"0%"};break;
                case "right":hideAnimate={right:"-100%"};showAnimate={right:"0%"};break;
                default :s.params.pos="middle";hideAnimate={opacity:0};showAnimate={opacity:1};
            }
        }
        updateAnimate();
        /*=========================
          Method
          ===========================*/
        //隐藏遮罩与外框
        function hideDialog(){
            $(s.mask).animate({opacity:0},"fast","linear",function(){
                $(this).css("display","none");
            });
            $(s.containerBox).animate(hideAnimate,"fast","linear",function(){
                $(this).css("display","none");
            });
        }
        s.hide=hideDialog;

        //显示遮罩与外框
        function showDialog(){
            //显示遮罩
            $(s.mask).css("display","block").animate({opacity:1},"fast","linear");
            //初始化容器
            s.containerBox.setAttribute("style","");
            $(s.containerBox).css(hideAnimate);
            s.containerBox.setAttribute("data-pos",s.params.pos);
            //显示容器
            s.container.style.display="block";
            $(s.containerBox).animate(showAnimate,"fast","linear");
            //设置宽度
            if(s.params.width){
                s.container.style.width="100%";
                s.containerBox.style.width=s.params.width;
            }
        }
        s.show=showDialog;

        //设置位置
        s.setPos=function(pos){
            if(!pos)return;
            s.params.pos=pos;
            updateAnimate();
        }
        //设置回调
        s.removeOnClick=function(){
            s.params.onClick=null;
            s.container.removeEventListener("click",onClickCallback,false);
        }
        s.addOnClick=function(onclickFn){
            s.params.onClick=onclickFn;
            s.container.addEventListener("click",onClickCallback,false);
        }

        //Callback
        if(s.params.onClick){
            s.container.addEventListener("click",onClickCallback,false);
        }
        function onClickCallback(e){
            s.target=e.target;
            s.params.onClick(s)
        };
        return s;
    }
})(window,document,undefined);