//Tree 树结构
(function(window,document,undefined){
window.Tree=function(container,params){
    /*=========================
      Model
      ===========================*/
    var defaults={
        selectedContainer:null,
        barButtonClass:"tree-bar-button",
        removeButtonClass:"tree-btnremove",
        addButtonClass:"tree-btnadd",
        extandClass:"extand",
        collapseClass:"collapse",
        treeClass:"tree",
        liconClass:"tree-licon",
        riconClass:"tree-ricon",
        ticonClass:"tree-ticon",
        rightClass:"tree-right",
        titleClass:"tree-title",
        dataId:"data-id",
        dataPrevId:"data-previd",
        dataName:"data-name",
        lineClass:"tree-line",
        lineActiveClass:"active"
        /*callbacks
        onTap:function(Tree)
        onTapLastChild:function(Tree)
        onClickTreebar:function(Tree)
        onClickTreebarDel:function(Tree)
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

    //SelectedContainer
    if(s.params.selectedContainer){
        s.selectedContainer=typeof s.params.selectedContainer=="string"?document.querySelector(s.params.selectedContainer):s.params.selectedContainer;
    }

    //SelectedEl
    s.selected={};

    /*=========================
      Method
      ===========================*/
    //Json是否为空
    s.isEmptyJson=function(json){
        var temp="";
        for(var j in json){
            temp+=j;
        }
        if(temp==="")return true;
        return false;
    }
    //删除选中项
    s.removeSelected=function(elOrId){
        var elOption,id;
        if(typeof elOrId=="string"){
            id=elOrId;
            elOption=s.selectedContainer.querySelector("["+s.params.dataId+"='"+id+"']");
        }else{
            elOption=elOrId;
            id=elOption.getAttribute(s.params.dataId);
        }
        if(s.selected[id])delete s.selected[id];
        if(elOption)s.selectedContainer.removeChild(elOption);
    }
    //选中节点
    s.addSelected=function(elLine){
        //删除子级
        var elLi=elLine.parentNode;
        var elLines=elLi.querySelectorAll("."+s.params.lineClass);
        for(var i=0,el;el=elLines[i++];){
            //移除active
            el.classList.remove(s.params.lineActiveClass);
            //删除选中项
            var elId=el.getAttribute(s.params.dataId);
            s.removeSelected(elId);
        }
        //显示点击级
        var elLine=elLines[0];
        elLine.classList.add(s.params.lineActiveClass);

        var id=elLine.getAttribute(s.params.dataId);
        var name=elLine.getAttribute(s.params.dataName);
        var elOption=s.createSelectedOption(id,name);
        s.selectedContainer.appendChild(elOption);

        s.selected[id]=elLine;
        s.showSelected();
    }
    //异步添加节点
    s.hasSelectOption=function(dataId,dataPrevId){
        //判断树中是否存在此ID
        var prevNode=s.container.querySelector("["+s.params.dataId+"='"+dataPrevId+"']");
        if(!prevNode){
            return false;
        }

        //判断选中列表是否存在
        if(s.selected[dataId] || s.selected[dataPrevId]){
            return true;
        }

        //向上查询是否已添加到选中项
        while(!prevNode.classList.contains(s.params.treeClass) && prevNode.tagName!="BODY"){
            prevNode=prevNode.parentNode;
            var siblingNode=prevNode.previousElementSibling;
            if(siblingNode && siblingNode.getAttribute(s.params.dataId)){
                var prevId=siblingNode.getAttribute(s.params.dataId);
                if(s.selected[prevId]){
                    return true;
                }
            }
        }

        //经过以上过滤，仍然未找到存在于选中项的迹象，说明没有存在于选中列表中
        return false;
    }
    s.addSelectNode=function(node){
        var elId=node.getAttribute(s.params.dataId);
        var elPrevId=node.getAttribute(s.params.dataPrevId);
        var elName=node.getAttribute(s.params.dataName);
        if(!elPrevId){
            alert("Tree.addSelectNode:没有找到dataPrevId");
            return;
        }
        if(s.hasSelectOption(elId,elPrevId)){
            console.log("Tree.addSelectNode:已经选中了");
        }else{
            //当前节点选中
            node.classList.add(s.params.lineActiveClass);
            //树结构中对应节点选中
            var treeSameNode=s.container.querySelector("["+s.params.dataId+"='"+elId+"']");
            if(treeSameNode)treeSameNode.classList.add(s.params.lineActiveClass);

            //创建选中项
            var elOption=s.createSelectedOption(elId,elName);
            s.selectedContainer.appendChild(elOption);
            //添加选中
            s.selected[elId]=node;
            s.showSelected();
        }
    }
    //显示选中项
    s.showSelected=function(){
        s.selectedContainer.style.display="block";
    }
    //隐藏选中项
    s.hideSelected=function(){
        s.selectedContainer.style.display="none";
    }
    //创建选中项
    s.createSelectedOption=function(id,name){
        //var span='<span class="mark-grayscale" data-id="'+treeID+'" data-name="'+treeName+'">'+treeName+'<a class="icon-clear-fill delete-selection"></a></span>';
        var option=document.createElement("span");
        option.setAttribute("class",s.params.barButtonClass);
        option.setAttribute(s.params.dataId,id);
        option.setAttribute(s.params.dataName,name);
        var optionHTML='<label>'+name+'</label><a class="'+s.params.removeButtonClass+'"></a>';
        option.innerHTML=optionHTML;
        return option;
    }
    /*=========================
      Events
      ===========================*/
    //绑定事件
    s.events=function(detach){
        var action=detach?"removeEventListener":"addEventListener";
        //树结构
        s.container[action]("touchstart",s.onTouchStart,false);
        s.container[action]("touchend",s.onTouchEnd,false);
        //选中容器
        if(s.selectedContainer){
            s.selectedContainer[action]("click",s.onTapTreebar,false);
        }
    }
    //attach、dettach事件
    s.attach=function(event){
        s.events();
    }
    s.detach=function(event){
        s.events(true);
    }
    /*=========================
      Event Handler
      ===========================*/
    //Tap
    s.touches={
        startX:0,
        startY:0,
        endX:0,
        endY:0,
        diffX:0,
        diffY:0,
    };
    s.onTouchStart=function(e){
        s.touches.startX = e.touches[0].clientX;
        s.touches.startY = e.touches[0].clientY;
    }
    s.onTouchEnd=function(e){
        s.touches.endX = e.changedTouches[0].clientX,
        s.touches.endY = e.changedTouches[0].clientY;
        s.touches.diffX=s.touches.startX - s.touches.endX;
        s.touches.diffY=s.touches.startY - s.touches.endY;
        //单击事件
        if(Math.abs(s.touches.diffX) < 6 && Math.abs(s.touches.diffY) < 6 ){
            s.onTapTree(e);
        }
    }
    //点击树
    s.onTapTree=function(e){
        //点击树
        s.targetLi,s.targetLine,s.target=e.target;
        
        if(s.target.classList.contains(s.params.lineClass)){//点击二级
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
        
        if(s.target.classList.contains(s.params.addButtonClass)){//点击添加
            s.onClickAddBtn(s.targetLine);
        }else{//点击其它元素
            //Callback onTapLastChild(点击底层)
            if(!s.targetLine.nextElementSibling && s.params.onTapLastChild)s.params.onTapLastChild(s);
            //展开与收缩
            s.targetLine.classList.toggle(s.params.extandClass);
        }
        //Callback onTap
        if(s.params.onTap)s.params.onTap(s);
    }
    //点击树bar
    s.onTapTreebar=function(e){
        if(e.target.classList.contains(s.params.removeButtonClass)){
            s.onClickRemoveBtn(e);
        }
        //Callback onTapLastChild(点击底层)
        s.target=e.target;
        if(s.params.onClickTreebar)s.params.onClickTreebar(s);
    }
    //点击添加按钮
    s.onClickAddBtn=function(elLine){
        s.addSelected(elLine);
    }

    //点击删除按钮
    s.onClickRemoveBtn=function(e){
        s.option=e.target.parentNode;

        //Callback onTapLastChild(点击底层)
        s.target=e.target;
        if(s.params.onClickTreebarDel)s.params.onClickTreebarDel(s);

        var id=s.option.getAttribute(s.params.dataId);
        var elLine=s.container.querySelector("["+s.params.dataId+"='"+id+"']");
        //选中容器删除选中项
        s.removeSelected(s.option);

        //移除active
        if(elLine)elLine.classList.remove(s.params.lineActiveClass);

        //如果为空，则隐藏选中容器
        if(s.isEmptyJson(s.selected)){
            s.hideSelected();
        }
    }

    //主函数
    s.init=function(){
        s.attach();
    }
    s.init();
}
})(window,document,undefined);