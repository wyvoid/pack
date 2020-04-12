import throttle from '@/utils/throttle'

export default {
  bind: function(el, binding, vnode) {

    let dragEl = el
    // X轴可移动最大距离（页面宽度）
    let maxX = document.documentElement.getBoundingClientRect().width
    // Y轴可移动最大距离（页面高度）
    let maxY = document.documentElement.getBoundingClientRect().height

    var clientX = 0 // 触点的X轴坐标位置
    var clientY = 0 // 触点的Y轴坐标位置

    //手指触摸开始，记录元素的初始位置
    dragEl.addEventListener('touchstart', function(e) {
      moveAction(e)
    });

    //触摸中的，位置记录
    dragEl.addEventListener('touchmove', function(e) {
      if (binding.value) {
        // 使用节流操作，减少重排次数
        throttle(moveAction, binding.value.throttle)(e)
      } else {
        moveAction(e)
      }
      // 防止页面跟着弹动
      e.preventDefault()
    });

    function moveAction(e) {
      clientX = e.targetTouches[0].clientX
      clientY = e.targetTouches[0].clientY
      dragEl.style.cssText += `;left:${(clientX - dragEl.offsetWidth/2)}px;top:${(clientY - dragEl.offsetHeight/2)}px;`;
    }

    //触摸结束，位置记录
    dragEl.addEventListener('touchend', function(e) {
      // 触摸结束元素位置
      let endLeft =  (clientX - dragEl.offsetWidth/2)
      let endTop = (clientY - dragEl.offsetHeight/2)
      // 当拖拽超出屏幕可见范围时将元素位置重置到可视范围区域内
      if (clientX+dragEl.offsetWidth > maxX) {
        endLeft = maxX-dragEl.offsetWidth
      }
      if (clientY+dragEl.offsetHeight > maxY) {
        endTop = maxY-dragEl.offsetHeight
      }
      if (clientX - dragEl.offsetWidth < 0) {
        endLeft = 0
      }
      if (clientY-dragEl.offsetHeight < 0) {
        endTop = 0
      }
      dragEl.style.cssText += `;left:${endLeft}px;top:${endTop}px;`;
    })
  }
}