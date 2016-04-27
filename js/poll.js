/*投票选择菜单*/
function dataToggle(elToggles,isAdd){
    [].slice.call(elToggles).forEach(function(n,i,a){
        if(isAdd){
            n.classList.add(n.getAttribute("data-toggle"));
        }else{
            n.classList.remove(n.getAttribute("data-toggle"));
        }
    });
}
function selCheckbox(e,container,params){
    var defaults={
        cboMaxCount:1,
        /*Callback
        maxCallback
        */
    }
    var params=params||{};
    for(var def in defaults){
        if(params[def]===undefined){
            params[def]=defaults[def];
        }
    }
	var cboCount=0;
	var target=e.target;
    var elRoot,elToggles,cbo;
    //获得多选框
	if(target.tagName.toLowerCase()=="a"){
		cbo=target.querySelector("input[type=checkbox]");
	}else if(target.tagName.toLowerCase()=="li"){
		cbo=target.querySelector("input[type=checkbox]");
	}else if(target.tagName.toLowerCase()=="p"){
		cbo=target.parentNode.parentNode.querySelector("input[type=checkbox]");
	}else if(target.tagName.toLowerCase()=="img" || target.tagName.toLowerCase()=="div" || target.tagName.toLowerCase()=="span"){
		cbo=target.parentNode.querySelector("input[type=checkbox]");
	}
    //获得根节点
    elRoot=cbo.parentNode;
    if(elRoot.tagName.toLowerCase()=="div"){
        elRoot=elRoot.parentNode;
    }
    elToggles=elRoot.querySelectorAll("[data-toggle]");
	if(cbo.checked==true){
		cboCount--;
        dataToggle(elToggles,false);
		cbo.checked=false;
		return;
	}
	[].slice.call(container.querySelectorAll("input[type=checkbox]")).forEach(function(n,i,a){
		if(n.checked){
			cboCount++;
		}
	});
	if(cboCount>=params.cboMaxCount){
        if(params.maxCallback)params.maxCallback();
		return;
	}
    dataToggle(elToggles,true);
	cbo.checked=true;
}