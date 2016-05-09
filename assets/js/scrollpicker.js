/**
 * 
 * Find more about the Spinning Wheel function at
 * http://cubiq.org/spinning-wheel-on-webkit-for-iphone-ipod-touch/11
 *
 * Copyright (c) 2009 Matteo Spinelli, http://cubiq.org/
 * Released under MIT license
 * http://cubiq.org/dropbox/mit-license.txt
 * 
 * Version 1.4 - Last updated: 2009.07.09
 * 
 */

var SpinningWheel = {
	cellHeight: 44,
	friction: 0.003,
	slotData: [],


	/**
	 *
	 * Event handler
	 *
	 */

	handleEvent: function (e) {
		if (e.type == 'touchstart') {
			if(e.target.id == 'scrollpicker-mask'){
				this.close();
				return;
			}
			//this.lockScreen(e);
			if (e.currentTarget.id == 'scrollpicker-cancel' || e.currentTarget.id == 'scrollpicker-done') {
				this.tapDown(e);
			} else if (e.currentTarget.id == 'scrollpicker-touchlayer') {
				this.scrollStart(e);
			}
		} else if (e.type == 'touchmove') {
			//this.lockScreen(e);
			
			if (e.currentTarget.id == 'scrollpicker-cancel' || e.currentTarget.id == 'scrollpicker-done') {
				this.tapCancel(e);
			} else if (e.currentTarget.id == 'scrollpicker-touchlayer') {
				this.scrollMove(e);
			}
		} else if (e.type == 'touchend') {
			if (e.currentTarget.id == 'scrollpicker-cancel' || e.currentTarget.id == 'scrollpicker-done') {
				this.tapUp(e);
			} else if (e.currentTarget.id == 'scrollpicker-touchlayer') {
				this.scrollEnd(e);
			}
		} else if (e.type == 'webkitTransitionEnd') {
			if (e.target.id == 'scrollpicker') {
				this.destroy();
			} else {
				this.backWithinBoundaries(e);
			}
		} else if (e.type == 'orientationchange') {
			this.onOrientationChange(e);
		} else if (e.type == 'scroll') {
			this.onScroll(e);
		}
	},


	/**
	 *
	 * Global events
	 *
	 */

	onOrientationChange: function (e) {
		window.scrollTo(0, 0);
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
		this.calculateSlotsWidth();
	},
	
	onScroll: function (e) {
		this.swWrapper.style.top = window.innerHeight + window.pageYOffset + 'px';
	},

	lockScreen: function (e) {
		e.preventDefault();
		e.stopPropagation();
	},


	/**
	 *
	 * Initialization
	 *
	 */

	reset: function () {
		this.slotEl = [];

		this.activeSlot = null;
		
		this.swWrapper = undefined;
		this.swSlotWrapper = undefined;
		this.swSlots = undefined;
		this.swFrame = undefined;
	},

	calculateSlotsWidth: function () {
		var div = this.swSlots.getElementsByTagName('div');
		for (var i = 0; i < div.length; i += 1) {
			this.slotEl[i].slotWidth = div[i].offsetWidth;
		}
	},

	create:function(){
		var i,l,out,ul,div,mask;

		this.reset();//初始化变量
		//创建遮罩
		mask=document.createElement('div');
		mask.id='scrollpicker-mask';
		mask.setAttribute("class","popup-mask");
		mask.setAttribute("style","display: block; opacity: 1;");

		//创建滚动选择器DOM
		div=document.createElement('div');
		div.id='scrollpicker';
		div.style.top=window.innerHeight+window.pageYOffset+'px';//放置在实际的观看屏幕上
		div.style.webkitTransitionProperty='-webkit-transform';
		div.innerHTML = '<div id="scrollpicker-header">'+
		'<a id="scrollpicker-cancel">取消</a>'+
		'<a id="scrollpicker-done">完成</a>'+
		'</div>'+
		'<div id="scrollpicker-body"><div id="scrollpicker-slots"></div></div>'+
		'<div id="scrollpicker-touchlayer"><div class="scrollpicker-touchlayer-activebox"></div></div>';

		document.body.appendChild(mask);
		document.body.appendChild(div);

		this.swWrapper = div;
		this.scrollpickerMask=mask;										// The SW wrapper
		this.swSlotWrapper = document.getElementById('scrollpicker-body');		// Slots visible area
		this.swSlots = document.getElementById('scrollpicker-slots');						// Pseudo table element (inner wrapper)
		this.swFrame = document.getElementById('scrollpicker-touchlayer');						// The scrolling controller

		//创建一槽DOM
		for (l = 0; l < this.slotData.length; l += 1) {
			// Create the slot
			ul = document.createElement('ul');
			out = '';
			for (i in this.slotData[l].values) {
				out += '<li>' + this.slotData[l].values[i] + '</li>';
			}
			ul.innerHTML = out;

			div = document.createElement('div');// Create slot container
			div.className = this.slotData[l].style;// Add styles to the container
			div.appendChild(ul);
	
			// Append the slot to the wrapper
			this.swSlots.appendChild(div);
			
			ul.slotPosition = l;			// Save the slot position inside the wrapper
			ul.slotYPosition = 0;
			ul.slotWidth = 0;
			ul.slotMaxScroll = this.swSlotWrapper.clientHeight - ul.clientHeight - 86;
			ul.style.webkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';		// Add default transition
			
			this.slotEl.push(ul);			// Save the slot for later use
			
			// Place the slot to its default position (if other than 0)
			if (this.slotData[l].defaultValue) {
				this.scrollToValue(l, this.slotData[l].defaultValue);	
			}
		}
		
		this.calculateSlotsWidth();
		
		// Global events
		document.addEventListener('touchstart', this, false);			// Prevent page scrolling
		document.addEventListener('touchmove', this, false);			// Prevent page scrolling
		window.addEventListener('orientationchange', this, true);		// Optimize SW on orientation change
		window.addEventListener('scroll', this, true);				// Reposition SW on page scroll

		// Cancel/Done buttons events
		document.getElementById('scrollpicker-cancel').addEventListener('touchstart', this, false);
		document.getElementById('scrollpicker-done').addEventListener('touchstart', this, false);

		// Add scrolling to the slots
		this.swFrame.addEventListener('touchstart', this, false);
	},

	open: function () {
		this.create();

		this.swWrapper.style.webkitTransitionTimingFunction = 'ease-out';
		this.swWrapper.style.webkitTransitionDuration = '400ms';
		this.swWrapper.style.webkitTransform = 'translate3d(0, -260px, 0)';
		this.updateActiveClass();
	},
	
	
	/**
	 *
	 * Unload
	 *
	 */

	destroy: function () {
		this.swWrapper.removeEventListener('webkitTransitionEnd', this, false);

		this.swFrame.removeEventListener('touchstart', this, false);

		document.getElementById('scrollpicker-cancel').removeEventListener('touchstart', this, false);
		document.getElementById('scrollpicker-done').removeEventListener('touchstart', this, false);

		document.removeEventListener('touchstart', this, false);
		document.removeEventListener('touchmove', this, false);
		window.removeEventListener('orientationchange', this, true);
		window.removeEventListener('scroll', this, true);
		
		this.slotData = [];
		this.cancelAction = function () {
			return false;
		};
		
		this.cancelDone = function () {
			return true;
		};
		
		this.reset();
		document.body.removeChild(document.getElementById('scrollpicker-mask'));
		document.body.removeChild(document.getElementById('scrollpicker'));
	},
	
	close: function () {
		this.swWrapper.style.webkitTransitionTimingFunction = 'ease-in';
		this.swWrapper.style.webkitTransitionDuration = '400ms';
		this.swWrapper.style.webkitTransform = 'translate3d(0, 0, 0)';

		this.scrollpickerMask.style.display="none";
		
		this.swWrapper.addEventListener('webkitTransitionEnd', this, false);
	},


	/*=========================
      Methods
      ===========================*/
	getJsonLenth:function(json){
		var i=0;
		for(var obj in json){
			i++;
		}
		return i;
	},
	addSlot:function(values, style, defaultValue) {
		if (!style){
			style='';
		}
		style=style.split(' ');

		for(var i=0;i<style.length;i+=1){
			style[i]=style[i];
		}
		
		style = style.join(' ');
		var len=this.getJsonLenth(values);
		var obj = {'values':values,'style':style,'defaultValue':defaultValue,'length':len};
		this.slotData.push(obj);
	},
	replaceSlot:function(slotIndex,values, style, defaultValue){
		var obj = {'values':values,'style':style,'defaultValue':defaultValue,'length':len};
		this.slotData[slotIndex]=obj;
		document.getElementById("")
	},
	//更新状态
	updateActiveClass:function(){
		for(var i in this.slotEl) {
			[].slice.call(this.slotEl[i].getElementsByTagName("li")).forEach(function(n,i,a){
				n.classList.remove("active");
			})
		}
		var selectedel=this.getSelectedValues();
		if(!selectedel.elements)return;
		selectedel.elements.forEach(function(n,i,a){
			n.classList.add("active");
		});
	},
	//恢复位置初始值
	updateScrollPosition:function(){
		for(i in this.slotEl) {
			//移除滚动动画
			this.slotEl[i].removeEventListener('webkitTransitionEnd', this, false);
			this.slotEl[i].style.webkitTransitionDuration = '0';
			//恢复至原始位置
			if(this.slotEl[i].slotYPosition > 0) {
				this.setPosition(i, 0);
			}else if(this.slotEl[i].slotYPosition < this.slotEl[i].slotMaxScroll) {
				this.setPosition(i, this.slotEl[i].slotMaxScroll);
			}
		}
	},
	//获取选中的值
	getSelectedValues: function () {
		var index, count,
		    i, l,
			keys = [], values = [],elements=[];
			
		for (i in this.slotEl) {
			index = -Math.round(this.slotEl[i].slotYPosition / this.cellHeight);
			if (index < 0) {
				index=0;
			}else if(index >= this.slotData[i].length) {
				index=this.slotData[i].length-1;
			}
			count = 0;
			for (l in this.slotData[i].values) {
				if (count == index) {
					keys.push(l);
					values.push(this.slotData[i].values[l]);
					var activeEl=this.slotEl[i].childNodes[index];
					elements.push(activeEl);
					break;
				}
				count += 1;
			}
		}
		return { 'keys': keys, 'values': values ,'elements':elements};
	},


	/**
	 *
	 * Rolling slots
	 *
	 */

	setPosition: function (slot, pos) {
		this.slotEl[slot].slotYPosition = pos;
		this.slotEl[slot].style.webkitTransform = 'translate3d(0, ' + pos + 'px, 0)';
	},

	/*=========================
      Touch Handler
      ===========================*/
	//开始滚动
	scrollStart: function (e) {
		// Find the clicked slot
		var xPos = e.targetTouches[0].clientX - this.swSlots.offsetLeft;	// Clicked position minus left offset (should be 11px)

		// Find tapped slot
		var slot = 0;
		for (var i = 0; i < this.slotEl.length; i += 1) {
			slot += this.slotEl[i].slotWidth;
			
			if (xPos < slot) {
				this.activeSlot = i;
				break;
			}
		}

		// If slot is readonly do nothing
		if (this.slotData[this.activeSlot].style.match('readonly')) {
			this.swFrame.removeEventListener('touchmove', this, false);
			this.swFrame.removeEventListener('touchend', this, false);
			return false;
		}

		this.slotEl[this.activeSlot].removeEventListener('webkitTransitionEnd', this, false);	// Remove transition event (if any)
		this.slotEl[this.activeSlot].style.webkitTransitionDuration = '0';		// Remove any residual transition
		
		// Stop and hold slot position
		var theTransform = window.getComputedStyle(this.slotEl[this.activeSlot]).webkitTransform;
		theTransform = new WebKitCSSMatrix(theTransform).m42;
		if (theTransform != this.slotEl[this.activeSlot].slotYPosition) {
			this.setPosition(this.activeSlot, theTransform);
		}
		
		this.startY = e.targetTouches[0].clientY;
		this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
		this.scrollStartTime = e.timeStamp;

		this.swFrame.addEventListener('touchmove', this, false);
		this.swFrame.addEventListener('touchend', this, false);
		
		return true;
	},
	//滚动中
	scrollMove: function (e) {
		var topDelta = e.targetTouches[0].clientY - this.startY;

		if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			topDelta /= 2;
		}
		
		this.setPosition(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition + topDelta);
		this.startY = e.targetTouches[0].clientY;

		// Prevent slingshot effect
		if (e.timeStamp - this.scrollStartTime > 80) {
			this.scrollStartY = this.slotEl[this.activeSlot].slotYPosition;
			this.scrollStartTime = e.timeStamp;
		}
		this.updateActiveClass();
	},
	//滚动完成
	scrollEnd: function (e) {
		this.swFrame.removeEventListener('touchmove', this, false);
		this.swFrame.removeEventListener('touchend', this, false);

		// If we are outside of the boundaries, let's go back to the sheepfold
		if (this.slotEl[this.activeSlot].slotYPosition > 0 || this.slotEl[this.activeSlot].slotYPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			this.scrollTo(this.activeSlot, this.slotEl[this.activeSlot].slotYPosition > 0 ? 0 : this.slotEl[this.activeSlot].slotMaxScroll);
			return false;
		}

		// Lame formula to calculate a fake deceleration
		var scrollDistance = this.slotEl[this.activeSlot].slotYPosition - this.scrollStartY;

		// The drag session was too short
		if (scrollDistance < this.cellHeight / 1.5 && scrollDistance > -this.cellHeight / 1.5) {
			if (this.slotEl[this.activeSlot].slotYPosition % this.cellHeight) {
				this.scrollTo(this.activeSlot, Math.round(this.slotEl[this.activeSlot].slotYPosition / this.cellHeight) * this.cellHeight, '100ms');
			}

			return false;
		}

		var scrollDuration = e.timeStamp - this.scrollStartTime;

		var newDuration = (2 * scrollDistance / scrollDuration) / this.friction;
		var newScrollDistance = (this.friction / 2) * (newDuration * newDuration);
		
		if (newDuration < 0) {
			newDuration = -newDuration;
			newScrollDistance = -newScrollDistance;
		}

		var newPosition = this.slotEl[this.activeSlot].slotYPosition + newScrollDistance;

		if (newPosition > 0) {
			// Prevent the slot to be dragged outside the visible area (top margin)
			newPosition /= 2;
			newDuration /= 3;

			if (newPosition > this.swSlotWrapper.clientHeight / 4) {
				newPosition = this.swSlotWrapper.clientHeight / 4;
			}
		} else if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll) {
			// Prevent the slot to be dragged outside the visible area (bottom margin)
			newPosition = (newPosition - this.slotEl[this.activeSlot].slotMaxScroll) / 2 + this.slotEl[this.activeSlot].slotMaxScroll;
			newDuration /= 3;
			
			if (newPosition < this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4) {
				newPosition = this.slotEl[this.activeSlot].slotMaxScroll - this.swSlotWrapper.clientHeight / 4;
			}
		} else {
			newPosition = Math.round(newPosition / this.cellHeight) * this.cellHeight;
		}

		this.scrollTo(this.activeSlot, Math.round(newPosition), Math.round(newDuration) + 'ms');
		this.updateActiveClass();
		return true;
	},
	/*=========================
      Method
      ===========================*/
    //滚动至(列数，Y轴位置，运行时间)
	scrollTo: function (slotNum, dest, runtime) {
		this.slotEl[slotNum].style.webkitTransitionDuration = runtime ? runtime : '100ms';
		this.setPosition(slotNum, dest ? dest : 0);

		// If we are outside of the boundaries go back to the sheepfold
		if (this.slotEl[slotNum].slotYPosition > 0 || this.slotEl[slotNum].slotYPosition < this.slotEl[slotNum].slotMaxScroll) {
			this.slotEl[slotNum].addEventListener('webkitTransitionEnd', this, false);
		}
	},
	//滚动至(Y轴位置)
	scrollToValue: function (slot, value) {
		var yPos, count, i;

		this.slotEl[slot].removeEventListener('webkitTransitionEnd', this, false);
		this.slotEl[slot].style.webkitTransitionDuration = '0';
		
		count = 0;
		for (i in this.slotData[slot].values) {
			if (i == value) {
				yPos = count * this.cellHeight;
				this.setPosition(slot, yPos);
				break;
			}
			
			count -= 1;
		}
	},
	
	backWithinBoundaries: function (e) {
		e.target.removeEventListener('webkitTransitionEnd', this, false);

		this.scrollTo(e.target.slotPosition, e.target.slotYPosition > 0 ? 0 : e.target.slotMaxScroll, '150ms');
		return false;
	},


	/*=========================
      Buttons Event
      ===========================*/
    //按钮按下
	tapDown: function (e) {
		e.currentTarget.addEventListener('touchmove', this, false);
		e.currentTarget.addEventListener('touchend', this, false);
		e.currentTarget.className = 'sw-pressed';
	},
	//点击取消
	tapCancel: function (e) {
		e.currentTarget.removeEventListener('touchmove', this, false);
		e.currentTarget.removeEventListener('touchend', this, false);
		e.currentTarget.className = '';
	},
	//按钮按下后弹上
	tapUp: function (e) {
		this.tapCancel(e);

		if (e.currentTarget.id == 'scrollpicker-cancel') {
			this.cancelAction();
		} else {
			this.doneAction();
		}
		
		this.close();
	},
	setCancelAction: function (action) {
		this.cancelAction = action;
	},
	setDoneAction: function (action) {
		this.doneAction = action;
	},
	cancelAction: function () {
		return false;
	},
	cancelDone: function () {
		return true;
	}
};