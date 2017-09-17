export default {
  activeItems (state, getters) {
    const { activeType, itemsPerPage, lists } = state

    if (!activeType) {
      return []
    }
    return lists[activeType]
  }
}