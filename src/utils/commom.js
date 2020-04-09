  // Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();

import {
  getWxUserInfo,
  getWxAppid
} from './api'

export const ScrollTop=()=>{
  
        let timer = null
        let  isTop=true
        timer = setInterval(function () {
            let osTop = document.documentElement.scrollTop || document.body.scrollTop
            let ispeed = Math.floor(-osTop / 5)
            document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
            this.isTop = true
            // console.log(osTop)
            if (osTop === 0) {
              clearInterval(timer)
            }
            console.log(11 )
          }, 20)
        document.body.scrollTop = 0
        // document.getElementsByName('z-app').ScrollTop=0
}
var common = {
  url:'http://social1.ipanshi.com',
  formValid: function(rule, data, isBtnClass){ //认证表单封装的相关方法
      var result = true,
          msg = "";
      rule.every(n =>{
          if(n.required){
              if(!data[n.id]){
                  msg = n.requiredErrorMsg || "请填写"+n.name;
                  result = false;
                  return false;
              }else if(n.reg && !isBtnClass){
                  if(n.reg.test(data[n.id])){
                      return true
                  }else{
                      msg = n.regErrorMsg || "请填写正确"+n.name;
                      result = false;
                      return false
                  }
              }else{
                  return true
              }
          }else{
              return true
          }
      })
      return {
          result: result,
          msg: msg
      };
  },
  siblings:function(elem){  //siblings获取兄弟节点
    var r = [];
    var n = elem.parentNode.firstChild;
    for ( ; n; n = n.nextSibling ) {
        if ( n.nodeType === 1 && n !== elem ) {
            r.push( n );
        }
    }
    
    return r;
  },
  find:function(oClass){  //全局获取class
    var tags=document.all?document.all:document.getElementsByTagName('*');
    var arr=[];
    for (var i = 0; i < tags.length; i++) {
        var classNa=tags[i].className;
        var num=classNa.indexOf(oClass,0);
        if (num!=-1) {
            arr.push(tags[i]);
        };
    };
    return arr;
  },
  dateFormat:function(longTypeDate){
    var dateTypeDate = "";  
    var date=new Date(longTypeDate)
    dateTypeDate+=date.getFullYear();
    dateTypeDate+="."+ (date.getMonth()+1);
    dateTypeDate+="."+date.getDate();

    return dateTypeDate; 
  },
  dateFormat2: function(longTypeDate, fmt) {
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
  dateFormat3:function(e){
    var date=new Date()
    var dateTypeDate=''
    var type=e||1
    if(type==1){
      dateTypeDate+=date.getFullYear();
      dateTypeDate+=date.getMonth()+1>=10?"-"+(date.getMonth()+1):"-"+'0'+(date.getMonth()+1);
      dateTypeDate+=date.getDate()>=10?"-"+date.getDate():"-"+'0'+date.getDate();
    }else{
      dateTypeDate=date.getHours()>=10?date.getHours():'0'+date.getHours()
    }
    
    return dateTypeDate; 
  },
  dateFilter:function(longTypeDate){
    var dateTypeDate = "";  
    var Hours=''
    var Minutes=''
    var Seconds=''
    longTypeDate=parseInt(longTypeDate/1000)
    day=parseInt(longTypeDate/86400)
    Hours=parseInt((longTypeDate % 86400)/3600)
    Minutes= parseInt(longTypeDate % 3600 /60 )
    Seconds = parseInt(longTypeDate%60);
    dateTypeDate=day+' '+Hours+'-'+Minutes+'-'+Seconds
    return dateTypeDate; 
  },
  detect:function(){  //判断系统
    var equipmentType = "";
        var agent = navigator.userAgent.toLowerCase();
        var android = agent.indexOf("android");
        var iphone = agent.indexOf("iphone");
        var ipad = agent.indexOf("ipad");
        if(android != -1){
            equipmentType = "android";
        }
        if(iphone != -1 || ipad != -1){
            equipmentType = "ios";
        }
        return equipmentType;
  },
  checkWebp:function(){  //判断是否支持webp
    try{
        return(document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
    }catch(err) {
        return false;
    }
  },
  // 倒计时 @parms(num, callback)
  countDown: function(num, callback) {

    var countNum = num || 60

    
    

    var interval = setInterval(function() {
      // 如果 num 为0 就停止倒计时
      if (countNum <= 0 ) {
        countNum = 0
        clearInterval(interval)
        return callback(0)
      }      
      callback(countNum--)
    }, 1000);

    console.log(interval)
  },
  isAndroid: function() {
    return (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
  },
  isIOS: function() {
    return (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
  },
  isIE: function() {
    return UA && /msie|trident/.test(UA)
  },
  isChrome: function() {
    return UA && /chrome\/\d+/.test(UA) && !isEdge
  },
  isIE9: function() {
    return UA && UA.indexOf('msie 9.0') > 0
  },
  isPhantomJS: function() {
    return UA && /phantomjs/.test(UA)
  },
  isEdge: function() {
    return UA && UA.indexOf('edge/') > 0
  },
  isFF: function() {
    return UA && UA.match(/firefox\/(\d+)/)
  },
  isfilterWebp:function(e){
    let agent = navigator.userAgent.toLowerCase();
    let iphone=agent.indexOf('iphone')
    if(iphone != -1){
      e=e.split('?')[0]
    }
    return e
  },
  getColor:function(e){
    let st=''
    if(e == '特卖'){
        st='v2-bg-yellow'
    }else if(e == '新品'){
        st='v2-btn-dl'
    }else if(e == '热销'){
        st='v2-btn-dh'
    }else if (e  == '精选'){
        st='v2-btn-dz'
    }
    return st
  },
  isWx:function(){
    let ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == "micromessenger"){
      return true
    }
  },
  /**
   * @params code this.$route.query.code
   */ 
  wxAuthorize: function(query_code, callback) {
    if(query_code) {  //获取code
      let params = {
        code: query_code,
        checkGrade: '1'
      }
      getWxUserInfo({data: params}).then((response) => {
        let resData = response.data
        if(response.resultCode == 1000) {
          // token
          resData.access_token && localStorage.setItem('token',resData.access_token)
          // openid
          resData.openid && localStorage.setItem('openid',resData.openid)
          // unionid
          resData.unionid && localStorage.setItem('unionid',resData.unionid)
          // invitationCode
          resData.invitationCode && localStorage.setItem('invitationCode',resData.invitationCode)
          // grade
          resData.grade && localStorage.setItem('grade',resData.grade)
          // refresh_token
          resData.refresh_token && localStorage.setItem('refreshToken',resData.refresh_token)
          // 页面重定向
          location.href = localStorage.getItem('fullPath')
        }else if(response.resultCode == 2018){
          // openid
          resData.openid && localStorage.setItem('openid',resData.openid)
          // unionid
          resData.unionid && localStorage.setItem('unionid',resData.unionid)
          // 
          callback && callback()
        }

      })
    }else{
      if(!this.isWx()) return
      getWxAppid({method: 'get'}).then((response) => {
        location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+response.data+'&redirect_uri='+encodeURIComponent(window.location.href)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      })
    }
  }
}
export default common