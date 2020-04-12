/***
 * 2020年04月12日21:36:25
 * 节流函数
 * @params {fn, delay}
 * fn 要执行的函数
 * delay 节流的时间，delay事件内fn只执行一次
 * */ 
export default function(fn, delay) {
  return function() {
    var args = arguments
    var context = this
    if (!fn.timerId) {
      fn.timerId = setTimeout(function(){
        fn.apply(context, args)
        clearTimeout(fn.timerId)
        fn.timerId = null
      }, delay)
    }
  }
}