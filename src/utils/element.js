/* -------------------
  获得样式
  ------------------- */
Element.prototype.getStyles = function () {
  return window.getComputedStyle(this)
}
Element.prototype.getStyleValue = function (property) {
  return window.getComputedStyle(this).getPropertyValue(property)
}
