var Watermark = function (params) {
  /* ----------------------
  Model
  ---------------------- */
  var defaults = {
    src: '',
    suffix: 'image/png',
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
  /* ----------------------
  Method
  ---------------------- */
  s.convertImgToBase64 = function(callback) {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.src = s.params.src;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      // 绘制图片
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);

      // 绘制文字
      if(s.params.font){
        ctx.font=s.params.font
        ctx.fillStyle = s.params.color
        ctx.fillText(s.params.text, 100, 100)
      }

      var dataURL = canvas.toDataURL(s.params.suffix);
      // callback.call(this, dataURL);
      // Clean up 
      canvas = null;

      return dataURL
    }
  }
  s.save = function(){
    return s.convertImgToBase64();
  }
}

;//export default Draw
