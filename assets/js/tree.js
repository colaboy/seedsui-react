//Tree
(function(window,document,undefined){
window.Tree=function(container,params){
    //Model
    /*=========================
      Params
      ===========================*/
    var defaults={
        "selectedContainer":null,
        /*callbacks
        onTap:function(Tree)
        onTapLastChild:function(Tree)
        */
    }
    params=params||{};
    for(var def in defaults){
        if(params[def]===undefined){
            params[def]=defaults[def];
        }
    }
    //Tree
    var s=this;

    //Params
    s.params = params;
    
    //Container
    s.container=typeof container=="string"?document.querySelector(container):container;
    if(!s.container)return;

    //当前点击节点|图标、下级节点
    s.elLI="",s.elIcon="",s.elChildUL="";

    //SelectedContainer
    if(s.params.selectedContainer){
        s.selectedContainer=typeof s.params.selectedContainer=="string"?document.querySelector(s.params.selectedContainer):s.params.selectedContainer;
    }

    //SelectedEl
    s.selectedNodes=[];
    /*=========================
      SelectedContainer Container
      ===========================*/
    s.selectedContainerSize=function(){
        
        if($(s.params.selectedContainer).is(':empty')){
            s.selectedNodes=[];
            $(s.params.selectedContainer).slideUp();
        }else{
            s.selectedNodes=[];
            $("span",s.selectedContainer).each(function(i,n){
                s.selectedNodes.push({"id":$(this).data("id"),"name":$(this).data("name")});
            });
            $(s.params.selectedContainer).slideDown();
        }
    }
    /*=========================
      Touch Events
      ===========================*/
    //点击树
    s.onTapTree=function(){
        //点击树
        EventUtil.addHandler(s.container,"tap",function(e){
            s.target=e.target;
            //当点击添加时,将所选添加到stautsbar上
            if(s.target.className.indexOf("icon-rdoadd")>= 0 && s.params.selectedContainer){
                s.elLI=s.target.parentNode.parentNode;
                //子节点及自身添加active状态
                $(s.elLI).find(".treetitle").addClass('active');
                $(s.elLI).find(".icon-rdoadd").css("display","none");

                //添加到selected-box中
                var treeID=s.elLI.getAttribute("id");
                var treeName=s.elLI.getAttribute("data-name");
                var span='<span class="mark-grayscale" data-id="'+treeID+'" data-name="'+treeName+'">'+treeName+'<a class="icon-clear-fill delete-selection"></a></span>';
                $(s.params.selectedContainer).append(span);
                s.selectedContainerSize();

                //删除selected-box上的子节点
                $(s.elLI).find("li").each(function(i,n){
                    var id=n.id;
                    $("[data-id='"+id+"']").fadeOut(500,function(){
                        $(this).remove();
                        //selected-box是否为空
                        s.selectedContainerSize();
                    });
                });
            }else if(s.target.className.indexOf("treetitle")>=0){//当点击标题时
                s.elLI=s.target.parentNode;
            } else if(s.target.className.indexOf("treeicon")>=0){//当点击左侧箭头时
                s.elLI=s.target.parentNode.parentNode;
            }
            if(!s.elLI)return;
            //CallBack onTap
            if(s.params.onTap)s.params.onTap(s);
            //展开与收缩
            s.elIcon=s.elLI.querySelector(".treeicon");
            s.elChildUL=s.elLI.querySelector("ul");
            //没有子节点
            if(!s.elChildUL){
                if(s.params.onTapLastChild)s.params.onTapLastChild(s);
                return;
            }
            //展开与收缩树
            if(s.elChildUL.style.display=="none" || !s.elChildUL.style.display){
                //展开
                s.elIcon.classList.add("active");
                s.elChildUL.style.display="block";
            }else{
                //收缩
                s.elIcon.classList.remove("active");
                s.elChildUL.style.display="none";
            }
        });
    }
    //点击选中节点框
    s.onTapTreeSelected=function(){
        //点击selected-box
        if(!s.selectedContainer)return;
        s.selectedContainer.addEventListener("click",function(e){
            var target=e.target;
            if(target.className.indexOf("icon-clear-fill")>= 0){
                var markTarget=target.parentNode;
                var id=$(markTarget).data("id");
                //还原树结构中的active状态
                $("#"+id).find(".treetitle").removeClass("active").find(".icon-rdoadd").fadeIn(500);
                //删除点击的mark
                $(markTarget).fadeOut(500,function(e){
                    $(this).remove();
                    s.selectedContainerSize();
                })
            }
        },false);
    }

    //主函数
    s.init=function(){
        s.onTapTree();
        if(s.selectedContainer)s.onTapTreeSelected();
    }
    s.init();

    // Return Tree instance
    return s;
}
})(window,document,undefined);