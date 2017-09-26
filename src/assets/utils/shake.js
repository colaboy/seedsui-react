var _Shake = function () {
  var eventShake = new CustomEvent('shake')
  var threshold = 3000 // 晃动速度
  var lastUpdate = 0 // 设置最后更新时间，用于对比
  var curShakeX = 0
  var curShakeY = 0
  var curShakeZ = 0
  var lastShakeX = 0
  var lastShakeY = 0
  var lastShakeZ = 0
  function deviceMotionHandler (e) {
    var acceleration = e.accelerationIncludingGravity // 获得重力加速
    var curTime = new Date().getTime()// 获得当前时间戳
    if ((curTime - lastUpdate) > 100) {
      var diffTime = curTime - lastUpdate // 时间差
      lastUpdate = curTime
      curShakeX = acceleration.x // x轴加速度
      curShakeY = acceleration.y // y轴加速度
      curShakeZ = acceleration.z // z轴加速度
      var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000
      if (speed > threshold) {
        window.dispatchEvent(eventShake)
      }
      lastShakeX = curShakeX
      lastShakeY = curShakeY
      lastShakeZ = curShakeZ
    }
  }
  var s = this
  s.addEvent = function () {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler, false)
    } else {
      alert('您好，你目前所用的设备好像不支持重力感应哦！')
    }
  }
  s.removeEvent = function () {
    window.removeEventListener('devicemotion', deviceMotionHandler, false);
  }
  s.addEvent()
}
var ShakeEvent = new _Shake()