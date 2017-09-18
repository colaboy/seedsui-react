// Shake 摇一摇
var Shake = function (params) {
  /* ---------------------
  Params
  --------------------- */
  var defaults = {
    threshold: 3000
    /* callbacks
    onShook:function(Slider)
     */
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  // Shake
  var s = this
  s.params = params
  var lastUpdate = 0// 设置最后更新时间，用于对比
  var curShakeX = 0
  var curShakeY = 0
  var curShakeZ = 0
  var lastShakeX = 0
  var lastShakeY = 0
  var lastShakeZ = 0
  /* ---------------------
  Handler
  --------------------- */
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
      if (speed > s.params.threshold) {
        if (s.params.onShook) s.params.onShook(s)
      }
      lastShakeX = curShakeX
      lastShakeY = curShakeY
      lastShakeZ = curShakeZ
    }
  }
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', deviceMotionHandler, false)
  } else {
    console.log('您好，你目前所用的设备好像不支持重力感应哦！')
  }
};

//export default Shake
