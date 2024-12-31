// Resolve android client just callback once, when multiple getLocation at the same time
const LocationTask = {
  locationTask: null,
  getLocationTask: function (res) {
    // 记录定位任务, 防止重复定位
    if (this.locationTask && this.locationTask.length) {
      for (let locationTaskItem of this.locationTask) {
        if (res.longitude && res.latitude) {
          if (locationTaskItem.success) locationTaskItem.success(res)
          if (locationTaskItem.complete) locationTaskItem.complete(res)
        } else {
          if (locationTaskItem.fail) locationTaskItem.fail(res)
          if (locationTaskItem.complete) locationTaskItem.complete(res)
        }
      }
    }
    this.locationTask = null
  }
}

export default LocationTask
