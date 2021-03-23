export function formatterRouter(router) {
  router.forEach((item, index) => {
    if ((!item.id || !item.label) && item.meta) {
      item.id = index
      item.label = item.meta.title
    }
    if (item.children && item.children.length > 1) {
      formatterRouter(item.children)
    }
  })
  return router
}
