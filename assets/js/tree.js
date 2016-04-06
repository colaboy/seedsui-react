/*!
 * 多媒体控件
 * @version 1.0.0
 * @author WangMingzhu
 * @require jQuery
 */

/**
*  树结构
* 
*  @class Tree
*  @constructor
*  @param container(ul树容器) params(配置项)
*/
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
    s.selectedEl=[];

    s.selectedBox=function(){
        if($(s.params.selectedContainer).is(':empty')){
            s.selectedEl=[];
            $(s.params.selectedContainer).slideUp();
        }else{
            s.selectedEl=[];
            $("span",s.selectedContainer).each(function(i,n){
                s.selectedEl.push($(this).data("id"));
            });
            $(s.params.selectedContainer).slideDown();
        }
    }
    /*=========================
      Touch Events
      ===========================*/
    //onTapTree
    s.onTapTree=function(){
        //点击树
        EventUtil.addHandler(s.container,"tap",function(e){
            var target=e.target;
            //当点击添加时,将所选添加到stautsbar上
            if(target.className.indexOf("icon-rdoadd")>= 0 && s.params.selectedContainer){
                s.elLI=target.parentNode.parentNode;
                //子节点及自身添加active状态
                $(s.elLI).find(".treetitle").addClass('active');
                $(s.elLI).find(".icon-rdoadd").fadeOut();

                //添加到selected-box中
                var treeID=s.elLI.getAttribute("id");
                var treeName=s.elLI.getAttribute("data-name");
                var span='<span class="mark-desaturate" data-id="'+treeID+'">'+treeName+'<a class="icon-clear-fill delete-selection"></a></span>';
                $(s.params.selectedContainer).append(span);
                s.selectedBox();
            
                //删除selected-box上的子节点
                $(s.elLI).find("li").each(function(i,n){
                    var id=n.id;
                    $("[data-id='"+id+"']").fadeOut(500,function(){
                        $(this).remove();
                        //selected-box是否为空
                        s.selectedBox();
                    });
                });
            }else if(target.className.indexOf("treetitle")>=0){//当点击标题时
                s.elLI=e.target.parentNode;
            } else if(target.className.indexOf("treeicon")>=0){//当点击左侧箭头时
                s.elLI=e.target.parentNode.parentNode;
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
    //onTapTreeSelected
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
                    s.selectedBox();
                })
            }
        },false);
    }
    /*================
      Method
    =================*/
    s.getSelectedEl=function(){
        if(s.selectedEl)return s.selectedEl;
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