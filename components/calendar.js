(function() {
	function DateSelect(opt) {
		this.temp_date_array = [];
		this.temp_prev_date_array = [];
		this.temp_next_date_array = [];
		this.temp_month_calender_date_array = [];
		this.temp_prev_month_calender_date_array = [];
		this.temp_next_month_calender_date_array = [];

		var i = 0,
			weekMilliSecound = 7 * 24 * 60 * 60 * 1000,
			dayMilliSecound = 24 * 60 * 60 * 1000;

		if (opt.activeDate) {
			this.active_date = opt.activeDate;
		} else {
			this.active_date = new Date();
		}

		for (i = 0; i < 7; ++i) {
			this.temp_date_array.push(new Date());
			this.temp_prev_date_array.push(new Date());
			this.temp_next_date_array.push(new Date());
		}

		for (i = 0; i < 42; ++i) {
			this.temp_month_calender_date_array.push(new Date());
			this.temp_prev_month_calender_date_array.push(new Date());
			this.temp_next_month_calender_date_array.push(new Date());
		}

		function _prevWeek() {
			this.active_date.setTime(this.active_date.getTime() - weekMilliSecound);
		}

		function _nextWeek() {
			this.active_date.setTime(this.active_date.getTime() + weekMilliSecound);
		}

		function _prevMonth() {
			this.active_date.setMonth(this.active_date.getMonth() - 1);
		}

		function _nextMonth() {
			this.active_date.setMonth(this.active_date.getMonth() + 1);
		}

		function _getSelected() {
			return this.active_date;
		}

		function _setSelected(activeDate) {
			this.active_date.setTime(activeDate);
		}

		function _setSelectedDay(day) {
			this.active_date.setTime(this.active_date.getTime() + dayMilliSecound * (parseInt(day, 10) - this.active_date.getDay()));
		}

		function _getWeekArrayByTimeAndArray(date_array, time) {
			var j = 1;

			date_array[0].setTime(time);

			for (j = 1; j < 7; ++j) {
				date_array[j].setTime(date_array[j - 1].getTime() + dayMilliSecound);
			}

			return date_array;
		}

		function _getWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day;

			return _getWeekArrayByTimeAndArray(this.temp_date_array, first_date_time);
		}

		function _getPrevWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day - weekMilliSecound;

			return _getWeekArrayByTimeAndArray(this.temp_prev_date_array, first_date_time);
		}

		function _getNextWeekDate() {
			var day = this.active_date.getDay();

			var first_date_time = this.active_date.getTime() - dayMilliSecound * day + weekMilliSecound;

			return _getWeekArrayByTimeAndArray(this.temp_next_date_array, first_date_time);
		}

		function _getMonthCalenderArrayByTimeAndArray(date_array, time) {
			var j = 1;

			date_array[0].setTime(time);

			for (j = 1; j < 42; ++j) {
				date_array[j].setTime(date_array[j - 1].getTime() + dayMilliSecound);
			}

			return date_array;
		}

		var tempMonthCalenderDate = new Date();

		function _getMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_month_calender_date_array, first_date_time);
		}

		function _getPrevMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setMonth(tempMonthCalenderDate.getMonth() - 1);

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_prev_month_calender_date_array, first_date_time);
		}

		function _getNextMonthCalenderDate() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setMonth(tempMonthCalenderDate.getMonth() + 1);

			var day = tempMonthCalenderDate.getDay();

			var first_date_time = tempMonthCalenderDate.getTime() - dayMilliSecound * day;

			return _getMonthCalenderArrayByTimeAndArray(this.temp_next_month_calender_date_array, first_date_time);
		}

		function _getWeekNumInCalender() {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			return Math.floor((tempMonthCalenderDate.getDay() + this.active_date.getDate() - 1) / 7);
		}

		function _getMonthCalenderDateTimeByIndex(index) {
			tempMonthCalenderDate.setTime(this.active_date.getTime() - dayMilliSecound * (this.active_date.getDate() - 1));

			tempMonthCalenderDate.setTime(tempMonthCalenderDate.getTime() + dayMilliSecound * (index - tempMonthCalenderDate.getDay()));

			return tempMonthCalenderDate.getTime();
		}


		this.prevWeek = _prevWeek;
		this.nextWeek = _nextWeek;
		this.prevMonth = _prevMonth;
		this.nextMonth = _nextMonth;
		this.getSelected = _getSelected;
		this.setSelected = _setSelected;
		this.setSelectedDay = _setSelectedDay;
		this.getWeekDate = _getWeekDate;
		this.getPrevWeekDate = _getPrevWeekDate;
		this.getNextWeekDate = _getNextWeekDate;
		this.getMonthCalenderDate = _getMonthCalenderDate;
		this.getPrevMonthCalenderDate = _getPrevMonthCalenderDate;
		this.getNextMonthCalenderDate = _getNextMonthCalenderDate;
		this.getWeekNumInCalender = _getWeekNumInCalender;
		this.getMonthCalenderDateTimeByIndex = _getMonthCalenderDateTimeByIndex;
	}


	function Calender(opt) {
		var day_num_array = ["日", "一", "二", "三", "四", "五", "六"];

		this.container_element = document.getElementById(opt.containerDivId);
		this.mode = opt.mode ? opt.mode : 'week';
		this.dateSelectObject = opt.dateSelectObject;
		this.onChange = opt.onChange;

		this.keyElement = {
			calender_container: this.container_element.getElementsByClassName('calender_container')[0],
			date_container: this.container_element.getElementsByClassName('date_container')[0],
			month_container: this.container_element.getElementsByClassName('month_container')[0]
		};

		this.keyData = {
			calenderWidth: this.container_element.clientWidth,
			calenderHeight: this.keyElement.date_container.getElementsByClassName('day-date')[0].clientHeight
		};

		if (!this.container_element) {
			return false;
		}

		function _initCalenderDom(_this, containerElement) {
			var month_container = _this.keyElement.month_container,
				html = '',
				i, j, k;

			for (i = 0; i < 3; ++i) {
				html += '<div class="month-block">';
				for (j = 0; j < 6; ++j) {
					html += '<div class="week-line">';
					for (k = 0; k < 7; ++k) {
						html += '<div class="day-date"><span class="datenum_' + i + '_' + j + '_' + k + ' show-date">' + j + i + '</span></div>';
					}
					html += '</div>';
				}
				html += '</div>';
			}

			month_container.innerHTML = html;
		}

		_initCalenderDom(this, this.container_element);

		function _getFirstNumByString(string) {
			return parseInt(string.match(/-?\d+/)[0], 10);
		}

		function _getPositionInfo(_this) {
			var tempXPostion = _getFirstNumByString(_this.keyElement.calender_container.style.transform),
				tempYPostion = _getFirstNumByString(_this.keyElement.month_container.style.transform),
				tempHeight = _this.keyElement.date_container.style.height;

			tempHeight = parseInt(tempHeight.substring(0, tempHeight.length - 2), 10);

			return {
				positonX: tempXPostion,
				positonY: tempYPostion,
				height: tempHeight
			};
		}

		function _drawCalenderDate(_this) {
			var month_container = _this.keyElement.month_container,
				selectedDate = _this.dateSelectObject.getSelected(),
				tempThisMonthCalenderDate = _this.dateSelectObject.getMonthCalenderDate(),
				tempSpanElement,
				i, j, k, today = new Date();

			_this.container_element.getElementsByClassName('calendar-title')[0].innerHTML = selectedDate.getFullYear() + '-' + (selectedDate.getMonth() + 1) + '-' + selectedDate.getDate() + ' ' + '周' + day_num_array[selectedDate.getDay()];

			for (i = 0; i < 6; ++i) {
				for (j = 0; j < 7; ++j) {
					k = i * 7 + j;
					tempSpanElement = month_container.getElementsByClassName('datenum_1_' + i + '_' + j)[0];
					tempSpanElement.innerHTML = tempThisMonthCalenderDate[k].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempThisMonthCalenderDate[k].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ active/g, '');
					if (tempThisMonthCalenderDate[k].getDate() === selectedDate.getDate() && tempThisMonthCalenderDate[k].getMonth() === selectedDate.getMonth()) {
						tempSpanElement.className += " active";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempThisMonthCalenderDate[k].getDate() === today.getDate() && tempThisMonthCalenderDate[k].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}
				}
			}

			if (_this.mode === 'week') {
				var lineNum = _this.dateSelectObject.getWeekNumInCalender(),
					tempPrevWeekDate = _this.dateSelectObject.getPrevWeekDate(),
					tempNextWeekDate = _this.dateSelectObject.getNextWeekDate();

				for (i = 0; i < 7; ++i) {
					tempSpanElement = month_container.getElementsByClassName('datenum_0_' + lineNum + '_' + i)[0];
					tempSpanElement.innerHTML = tempPrevWeekDate[i].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempPrevWeekDate[i].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempPrevWeekDate[i].getDate() === today.getDate() && tempPrevWeekDate[i].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}

					tempSpanElement = month_container.getElementsByClassName('datenum_2_' + lineNum + '_' + i)[0];
					tempSpanElement.innerHTML = tempNextWeekDate[i].getDate();
					tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
					if (tempNextWeekDate[i].getMonth() != selectedDate.getMonth()) {
						tempSpanElement.className += " not-this-month";
					}

					tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
					if (tempNextWeekDate[i].getDate() === today.getDate() && tempNextWeekDate[i].getMonth() === today.getMonth()) {
						tempSpanElement.className += " today";
					}
				}
			} else if (_this.mode === 'month') {
				var tempPrevMonthCalenderDate = _this.dateSelectObject.getPrevMonthCalenderDate(),
					tempNextMonthCalenderDate = _this.dateSelectObject.getNextMonthCalenderDate();

				for (i = 0; i < 6; ++i) {
					for (j = 0; j < 7; ++j) {
						k = i * 7 + j;
						tempSpanElement = month_container.getElementsByClassName('datenum_0_' + i + '_' + j)[0];
						tempSpanElement.innerHTML = tempPrevMonthCalenderDate[k].getDate();
						tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
						tempSpanElement.className += " not-this-month";

						tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
						if (tempPrevMonthCalenderDate[k].getDate() === today.getDate() && tempPrevMonthCalenderDate[k].getMonth() === today.getMonth()) {
							tempSpanElement.className += " today";
						}

						tempSpanElement = month_container.getElementsByClassName('datenum_2_' + i + '_' + j)[0];
						tempSpanElement.innerHTML = tempNextMonthCalenderDate[k].getDate();
						tempSpanElement.className = tempSpanElement.className.replace(/ not-this-month/g, '');
						tempSpanElement.className += " not-this-month";

						tempSpanElement.className = tempSpanElement.className.replace(/ today/g, '');
						if (tempNextMonthCalenderDate[k].getDate() === today.getDate() && tempNextMonthCalenderDate[k].getMonth() === today.getMonth()) {
							tempSpanElement.className += " today";
						}
					}
				}
			}

			_setPostionAndHeight(_this);
		}

		function _setPostionAndHeight(_this, positionInfo) {
			if (positionInfo) {
				_this.keyElement.calender_container.style.transform = 'translateX(' + positionInfo.positonX + 'px)';

				_this.keyElement.date_container.style.height = positionInfo.height + 'px';

				_this.keyElement.month_container.style.transform = 'translateY(' + positionInfo.positonY + 'px)';

				return true;
			}

			_this.keyElement.calender_container.style.transform = 'translateX(-' + _this.keyData.calenderWidth + 'px)';

			_this.keyElement.date_container.style.height = _this.mode == 'week' ? _this.keyData.calenderHeight + 'px' : _this.keyData.calenderHeight * 6 + 'px';

			_this.keyElement.month_container.style.transform = _this.mode == 'week' ? 'translateY(' + (-1 * _this.dateSelectObject.getWeekNumInCalender() * _this.keyData.calenderHeight) + 'px)' : 'translateY(0px)';
		}

		function _animationTo(_this, direct, positon, finishCB) {
			var speed = 30,
				step = 25,
				_animationFunction;

			(function(_this, direct, positon, finishCB) {
				var targetPostion = {
					'x': {
						'0': {
							positonX: (-1 * _this.keyData.calenderWidth)
						},
						'1': {
							positonX: (-2 * _this.keyData.calenderWidth)
						},
						'-1': {
							positonX: 0
						}
					},
					'y': {
						'0': {
							positonY: 0,
							height: _this.keyData.calenderHeight * 6
						},
						'1': {
							positonY: (-1 * _this.dateSelectObject.getWeekNumInCalender() * _this.keyData.calenderHeight),
							height: _this.keyData.calenderHeight
						}
					}
				};

				_animationFunction = function() {
					var tempPositionInfo = _getPositionInfo(_this);

					var tempTargetPostion = targetPostion[direct][positon];

					var key, animationSign = false;

					for (key in tempTargetPostion) {
						if (tempTargetPostion[key] != tempPositionInfo[key]) {
							if ((tempTargetPostion[key] > tempPositionInfo[key]) && (tempTargetPostion[key] > tempPositionInfo[key] + step)) {
								tempPositionInfo[key] = tempPositionInfo[key] + step;
							} else if ((tempTargetPostion[key] < tempPositionInfo[key]) && (tempTargetPostion[key] < tempPositionInfo[key] - step)) {
								tempPositionInfo[key] = tempPositionInfo[key] - step;
							} else {
								tempPositionInfo[key] = tempTargetPostion[key];
							}
							animationSign = true;
						}
					}

					if (animationSign) {
						_setPostionAndHeight(_this, tempPositionInfo);
						return true;
					}

					return false;
				};
			})(_this, direct, positon, finishCB);

			(function(_animationFunction) {
				function _animationLoopFunction() {
					if (_animationFunction()) {
						setTimeout(_animationLoopFunction, speed);
					} else if (typeof finishCB === 'function') {
						finishCB();
					}
				}

				_animationLoopFunction();
			})(_animationFunction);
		}

		function _initDateTouchAndAnimation(_this) {
			_drawCalenderDate(_this);

			_this.keyElement.date_container.addEventListener('touchstart', function(e) {
				var firstFinger = e.touches[0];
				_this.keyData.tempX = firstFinger.clientX;
				_this.keyData.tempY = firstFinger.clientY;
				_this.keyData.direct = 0;
			}, false);

			_this.keyElement.date_container.addEventListener('touchmove', function(e) {
				var firstFinger = e.touches[0],
					diffX = firstFinger.clientX - _this.keyData.tempX,
					diffY = firstFinger.clientY - _this.keyData.tempY;

				var tempPositionInfo = _getPositionInfo(_this);

				var tempNumX = tempPositionInfo.positonX + (diffX),
					tempNumY = tempPositionInfo.positonY + diffY,
					tempHeightNum = tempPositionInfo.height + diffY;

				if (_this.keyData.direct === 0) {
					_this.keyData.direct = Math.abs(diffX) > Math.abs(diffY) ? 1 : -1;
				}

				if (_this.keyData.direct === 1) {
					if (tempNumX < 0 && tempNumX > -2 * _this.keyData.calenderWidth) {
						_this.keyElement.calender_container.style.transform = 'translateX(' + tempNumX + 'px)';
					}
				} else if (_this.keyData.direct === -1) {
					if (tempNumY < 0 && tempNumY > -6 * _this.keyData.calenderHeight && tempHeightNum > _this.keyData.calenderHeight) {
						_this.keyElement.month_container.style.transform = 'translateY(' + tempNumY + 'px)';
					}

					if (tempHeightNum > _this.keyData.calenderHeight && tempHeightNum < 6 * _this.keyData.calenderHeight) {
						_this.keyElement.date_container.style.height = tempHeightNum + 'px';
					}
				}

				_this.keyData.tempX = firstFinger.clientX;
				_this.keyData.tempY = firstFinger.clientY;
			}, false);

			function _redrawCalenderDate() {
				_drawCalenderDate(_this);
			}

			function removeFinger() {
				var tempPositionInfo = _getPositionInfo(_this);

				if (_this.keyData.direct === 1) {
					if (tempPositionInfo.positonX < -1.2 * _this.keyData.calenderWidth) {
						if (_this.mode === 'week') {
							_this.dateSelectObject.nextWeek();
						} else {
							_this.dateSelectObject.nextMonth();
						}
						if (typeof _this.onChange === "function") {
							_this.onChange(_this.dateSelectObject.getSelected());
						}
						_animationTo(_this, 'x', 1, _redrawCalenderDate);
					} else if (tempPositionInfo.positonX > -0.8 * _this.keyData.calenderWidth) {
						if (_this.mode === 'week') {
							_this.dateSelectObject.prevWeek();
						} else {
							_this.dateSelectObject.prevMonth();
						}
						if (typeof _this.onChange === "function") {
							_this.onChange(_this.dateSelectObject.getSelected());
						}
						_animationTo(_this, 'x', -1, _redrawCalenderDate);
					} else {
						_animationTo(_this, 'x', 0, _redrawCalenderDate);
					}
				} else if (_this.keyData.direct === -1) {
					var turnTo = _this.mode;

					if (turnTo === 'week' && (tempPositionInfo.height > _this.keyData.calenderHeight * 2)) {
						turnTo = 'month';
					} else if (turnTo === 'month' && (tempPositionInfo.height < _this.keyData.calenderHeight * 4)) {
						turnTo = 'week';
					}

					if (turnTo === 'week') {
						_this.mode = 'week';
						_animationTo(_this, 'y', 1, _redrawCalenderDate);
					} else {
						_this.mode = 'month';
						_animationTo(_this, 'y', 0, _redrawCalenderDate);
					}
				}
			}

			_this.switchMode = function() {
				if (_this.mode === 'month') {
					_this.mode = 'week';
					_animationTo(_this, 'y', 1, _redrawCalenderDate);
				} else {
					_this.mode = 'month';
					_animationTo(_this, 'y', 0, _redrawCalenderDate);
				}
			};

			_this.switchToWeek = function() {
				_this.mode = 'week';
				_animationTo(_this, 'y', 1, _redrawCalenderDate);
			};

			_this.switchToMonth = function() {
				_this.mode = 'month';
				_animationTo(_this, 'y', 0, _redrawCalenderDate);
			};

			_this.jumpToDate = function(date) {
				if (date && date.getTime) {
					_this.dateSelectObject.setSelected(date.getTime());
					_drawCalenderDate(_this);
				}
			};

			_this.getActiveDate = function(date) {
				return _this.dateSelectObject.getSelected();
			};

			_this.keyElement.date_container.addEventListener('touchend', removeFinger, false);

			_this.keyElement.date_container.addEventListener('touchcancel', removeFinger, false);

			var day_date_element_array = _this.container_element.getElementsByClassName("show-date"),
				day_date_length = day_date_element_array.length,
				i, tempHandleDateClickDate = new Date();

			function handleDateClick(e) {
				var className, indexArray, dateIndex;

				className = e.target.className;

				indexArray = className.substr(className.indexOf('date_num_') + 9, 5).split('_');

				dateIndex = parseInt(indexArray[1], 10) * 7 + parseInt(indexArray[2], 10);

				tempHandleDateClickDate.setTime(_this.dateSelectObject.getMonthCalenderDateTimeByIndex(dateIndex));


				if (tempHandleDateClickDate.getMonth() == _this.dateSelectObject.getSelected().getMonth() && tempHandleDateClickDate.getDate() == _this.dateSelectObject.getSelected().getDate()) {
					return;
				}

				_this.dateSelectObject.setSelected(tempHandleDateClickDate.getTime());

				if (typeof _this.onChange === "function") {
					_this.onChange(_this.dateSelectObject.getSelected());
				}
				_drawCalenderDate(_this);
			}

			for (i = 0; i < day_date_length; ++i) {
				day_date_element_array[i].onclick = handleDateClick;
			}

			_this.container_element.getElementsByClassName("arrowleft")[0].onclick = function(e) {
				if (_this.mode == 'week') {
					_this.dateSelectObject.prevWeek();
				} else {
					_this.dateSelectObject.prevMonth();
				}
				_animationTo(_this, 'x', -1, _redrawCalenderDate);
			};

			_this.container_element.getElementsByClassName("arrowright")[0].onclick = function(e) {
				if (_this.mode == 'week') {
					_this.dateSelectObject.nextWeek();
				} else {
					_this.dateSelectObject.nextMonth();
				}
				_animationTo(_this, 'x', 1, _redrawCalenderDate);
			};
		}

		_initDateTouchAndAnimation(this);
	}

	window.DateSelect = DateSelect;
	window.Calender = Calender;
})();