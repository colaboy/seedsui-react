//Tree 树结构
(function(window,document,undefined){
window.Tree=function(container,params){
    /*=========================
      Model
      ===========================*/
    var defaults={
        "addButton":"[data-click=add]",
        "removeButton":"[data-click=remove]",
        "selectedContainer":null,
        "optionClass":"mark-grayscale",
        "extandClass":"extand",
        "collapseClass":"collapse",
        "liconClass":"tree-licon",
        "riconClass":"tree-ricon",
        "ticonClass":"tree-ticon",
        "rightClass":"tree-right",
        "titleClass":"tree-title",
        "dataId":"data-id",
        "dataName":"data-name",
        "listClass":"tree-line",
        "listActiveClass":"active"
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

    //SelectedContainer
    if(s.params.selectedContainer){
        s.selectedContainer=typeof s.params.selectedContainer=="string"?document.querySelector(s.params.selectedContainer):s.params.selectedContainer;
    }

    //AddButton
    s.addButtonKey=s.params.addButton.substring(s.params.addButton.indexOf("[")+1,s.params.addButton.indexOf("="));
    s.addButtonVal=s.params.addButton.substring(s.params.addButton.indexOf("=")+1,s.params.addButton.length-1);

    //RemoveButton
    s.removeButtonKey=s.params.removeButton.substring(s.params.removeButton.indexOf("[")+1,s.params.removeButton.indexOf("="));
    s.removeButtonVal=s.params.removeButton.substring(s.params.removeButton.indexOf("=")+1,s.params.removeButton.length-1);

    //SelectedContainer
    if(s.params.selectedContainer){
        s.selectedContainer=typeof s.params.selectedContainer=="string"?document.querySelector(s.params.selectedContainer):s.params.selectedContainer;
    }

    //SelectedEl
    s.selected={};

    /*=========================
      Method
      ===========================*/
    //根据id获取树元素
    s.getTreeNodeById=function(id){
        return s.container.querySelector("["+s.params.dataId+"="+id+"]");
    }
    //根据id获得选中容器元素
    s.getSelNodeById=function(id){
        return s.selectedContainer.querySelector("["+s.params.dataId+"="+id+"]");
    }
    //显示选中项
    s.showSelected=function(){
        s.selectedContainer.style.display="block";
    }
    //隐藏选中项
    s.hideSelected=function(){
        s.selectedContainer.style.display="none";
    }
    //显示添加按钮
    s.showAddBtn=function(id){
        var node=s.getTreeNodeById(id);
        var addBtns=[].slice.call(node.parentNode.querySelectorAll(s.params.addButton));
        addBtns.forEach(function(n,i,a){
            n.style.display="block";
        })
    }
    //隐藏添加按钮
    s.hideAddBtn=function(id){
        var addBtns=[].slice.call(node.parentNode.querySelectorAll(s.params.addButton));
        addBtns.forEach(function(n,i,a){
            n.style.display="none";
        })
    }
    //创建选中项
    s.createSelectedOption=function(id,name){
        //var span='<span class="mark-grayscale" data-id="'+treeID+'" data-name="'+treeName+'">'+treeName+'<a class="icon-clear-fill delete-selection"></a></span>';
        var option=document.createElement("span");
        option.setAttribute("class",s.params.optionClass);
        option.setAttribute(s.params.dataId,id);
        option.setAttribute(s.params.dataName,name);
        var optionText=''+name+'<a data-click="remove" class="icon-clear-fill delete-selection"></a>';
        option.innerHTML=optionText;
        return option;
    }
    //添加到选中项
    s.addSelected=function(id,node){
        if(JSON.stringify(s.selected)=="{}"){
            var isFirst=true;
        }
        s.selected[id]=node;
        s.addSelectedNode(id,node);

        if(isFirst)s.showSelected();
    }
    //添加到选中容器
    s.addSelectedNode=function(id,node){
        var name=node.getAttribute(s.params.dataName);
        var option=s.createSelectedOption(id,name);
        s.selectedContainer.appendChild(option);
        
    }
    //删除选中项
    s.removeSelected=function(id){
        if(s.selected[id])delete s.selected[id];
        if(JSON.stringify(s.selected)=="{}"){
            s.hideSelected();
        }
        s.removeSelectedNode(id);
    }
    //选中容器删除选中项
    s.removeSelectedNode=function(id){
        var node=s.getSelNodeById(id);
        if(!node)return;
        s.selectedContainer.removeChild(node);
        //删除树选中状态
        var treeNode=s.getTreeNodeById(id);
        treeNode.classList.remove(s.params.listActiveClass);
    }
    //展开与收缩
    s.toggleCollection=function(targetList){
        if(targetList.classList.contains(s.params.extandClass)){
            targetList.classList.remove(s.params.extandClass);
        }else{
            targetList.classList.add(s.params.extandClass);
        }
    }
    //选中
    s.toggleActive=function(targetList,isActive){
        if(!isActive || targetList.classList.contains(s.params.listActiveClass)){
            targetList.classList.remove(s.params.listActiveClass);
        }else{
            targetList.classList.add(s.params.listActiveClass);
        }
    }
    /*=========================
      Control
      ===========================*/
    //绑定事件
    s.events=function(detach){
        //树结构
        var treeTarget=s.container;
        var action=detach?"removeHandler":"addHandler";
        EventUtil[action](treeTarget,"tap",s.onTapTree);
        //选中容器
        var action2=detach?"removeEventListener":"addEventListener";
        if(s.selectedContainer)s.selectedContainer[action2]("click",s.onClickRemoveBtn,false);
    }
    //attach、dettach事件
    s.attach=function(event){
        s.events();
    }
    s.detach=function(event){
        s.events(true);
    }
    //点击树
    s.onTapTree=function(e){
        //点击树
        s.targetLi,s.targetLine,s.target=e.target;
        
        if(s.target.classList.contains(s.params.listClass)){//点击二级
            s.targetLine=s.target;
            s.targetLi=s.target.parentNode;
        }else if(s.target.classList.contains(s.params.liconClass)||
        s.target.classList.contains(s.params.riconClass)||
        s.target.classList.contains(s.params.ticonClass)||
        s.target.classList.contains(s.params.rightClass)||
        s.target.classList.contains(s.params.titleClass)){//点击三级
            s.targetLine=s.target.parentNode;
            s.targetLi=s.target.parentNode.parentNode;
        }

        //点击添加
        if(s.target.getAttribute(s.addButtonKey)==s.addButtonVal){
            s.onClickAddBtn(s.targetLi);
            //Callback onTap
            if(s.params.onTap)s.params.onTap(s);
            return;
        }

        //点击底层
        if(!s.targetLine.nextElementSibling){
            //Callback
            if(s.params.onTapLastChild)s.params.onTapLastChild(s);
        }
        //展开与收缩
        s.toggleCollection(s.targetLine);
        //Callback onTap
        if(s.params.onTap)s.params.onTap(s);
    }

    //点击添加按钮
    s.onClickAddBtn=function(elLi){
        var elLists=elLi.querySelectorAll("."+s.params.listClass);
        //选中的节点
        var activeList=elLists[0];
        //当前及以下的添加按钮
        var addBtns=elLi.querySelectorAll(s.params.addButton);
        for(var i=0;i<elLists.length;i++){
            var id=elLists[i].getAttribute(s.params.dataId);
            //隐藏添加按钮
            addBtns[i].style.display="none";
            //删除所有选中的子节点
            s.removeSelected(id);
        }
        //添加到选中项
        s.addSelected(activeList.getAttribute(s.params.dataId),activeList);
        //选中当前项
        s.toggleActive(activeList,true);
    }

    //点击选中节点框
    s.onClickRemoveBtn=function(e){
        s.target=e.target;
        if(s.target.getAttribute(s.removeButtonKey)==s.removeButtonVal){
            var id=s.target.parentNode.getAttribute(s.params.dataId);
            //删除选中容器内的标签
            s.removeSelected(id);
            console.log(id);
            //显示添加按钮
            s.showAddBtn(id);
        }
    }

    //主函数
    s.init=function(){
        s.attach();
    }
    s.init();
}
})(window,document,undefined);