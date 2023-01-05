export default {
  // 选中先辈并展开
  activePredecessor(value, list) {
    let predecessor = []
    if (Array.isArray(value) && value[0] && value[0].id) {
      predecessor = list.getDeepTreePredecessor(value[0].id)
    }
    console.log(predecessor)
    return predecessor
  }
}
