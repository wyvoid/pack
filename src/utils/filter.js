export default {

  autoWebP(src){
       let agent = navigator.userAgent.toLowerCase();
       let iphone = agent.indexOf("iphone");
       let ipad = agent.indexOf("ipad");
      if(iphone != -1 || ipad != -1){
        if(src){
          // 汇合一起解决
          if(src.lastIndexOf('format,webp') >= 0){
            src=src.split('?')[0]
          }
        }
      }
      return src
  },

  defaImg(src){
    if(!src){
      src=require('assets/images/Bitmap.png')
    }
    return src
  },

  // 日期格式化
  dateFilter(longTypeDate, fmt) {
    var date = longTypeDate instanceof Date ? longTypeDate : new Date(longTypeDate)
    var o = {   
      "M+" : date.getMonth()+1,                 //月份   
      "d+" : date.getDate(),                    //日   
      "h+" : date.getHours(),                   //小时   
      "m+" : date.getMinutes(),                 //分   
      "s+" : date.getSeconds(),                 //秒   
      "q+" : Math.floor((date.getMonth()+3)/3), //季度
      "S"  : date.getMilliseconds()             //毫秒   
    }  
    if(/(y+)/.test(fmt)){
      fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length))
    } 
    for(var k in o){
      if(new RegExp("("+ k +")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
      }
    } 
    return fmt
  },

  phoneEncrypt(str) {
      let newStr = str+''
      return newStr.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')

  }, 
  
  toFixed2(num) {
    if (typeof num !== 'number') {
      throw new Error('入参数据类型必输是数字')
    }
    return num.toFixed(2)
  }
}