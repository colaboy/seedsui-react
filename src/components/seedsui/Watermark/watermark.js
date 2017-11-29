var Watermark = function (params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    font: '20px microsoft yahei',
    color: 'rgba(255, 255, 255, 0.5)',
    text: '水印'
  }
  params = params || {}
  for (var def in defaults) {
    if (params[def] === undefined) {
      params[def] = defaults[def]
    }
  }
  var s = this
  s.params = params

  if (!s.params.src) {
    console.log('SeedsUI Error : Watermark 没有src，无法绘制水印')
    return
  }
  var img = new Image()
  img.src = s.params.src
  /* ----------------------
  Method
  ---------------------- */
  /*s.ceateCanvas = function () {
    var canvas = document.createElement('canvas')
    canvas.setAttribute('width', '300')
    canvas.setAttribute('height', '300')
    return canvas
  }*/
  s.canvas = document.getElementById("myCanvas")
  s.ctx = s.canvas.getContext('2d')
  // 加载完成开始绘制
  img.onload=function(){
    // 绘制图片
    s.ctx.drawImage(img, 0, 0)
    // 绘制水印
    s.ctx.font=s.params.font
    s.ctx.fillStyle = s.params.color
    s.ctx.fillText(params.text, 100, 100)
  }
  s.save = function () {
    return s.canvas.toDataURL('image/png')
  }
}

;//export default Draw
