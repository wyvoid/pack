import axios from 'axios'

// 巨坑，打包的时候导致请求参数序列化不对，POST请求发布出去
// 参考链接  https://blog.csdn.net/weixin_34365635/article/details/93268295
// import { querystring } from 'vux'  

import querystring from 'qs'
import { Toast } from 'mint-ui'

// localStorage.setItem('token','d1747f84-b62b-4743-9a90-1360d43c251e')
const token=localStorage.getItem('token')
if(token){
  axios.defaults.headers.common['Authorization'] = token || ''
}
axios.defaults.headers.common['platform'] ='H5'
axios.defaults.headers.common['appVersion'] ='V2.5'
axios.defaults.headers.common['version'] ='2.0'
// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//POST传参序列化
axios.interceptors.request.use((config) => {
  // 邀请码兼容问题修改：后端要求传invitationCode参数
  config.headers['invitationCode'] = localStorage.getItem('invitationCode') || ''
  if (config.method === 'post') {
    // POST 秦秋参数是以键值对的形式存在请求体里， 用qs.stringify() 就是把传入的对象转换为键值对
    config.data = querystring.stringify(config.data)
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
  if(res.data.resultCode == 401){
    localStorage.removeItem('token')
    localStorage.setItem('fullPath',location.href)
    location.href=window.location.origin+'/index/getCode'
  }
  return res
}, (err) => {
  if (err.message === 'Network Error') {
    return Toast('网络错误，请检查网络是否正常')
  }
  let httpStatus = err.response.data && err.response.data.httpStatus
  let status = err.response.status
  if (httpStatus === 502 || status === 500) {
    return Toast('服务升级中，请稍候再试')
  }
  Toast(err.message)
})

export default function request(url, options) {

  options = options ? options : {data: {}};
  
  axios.defaults.baseURL = options.baseURL || "/api/";

  if (options.headers) {
    axios.headers = options.headers;
  }
  if (!options.method) {
    options.method = "post";
  }
  if (options.method == "get") {
    options.params = options.data;
  }
  return new Promise((resolve, reject) => {
    axios(url, {...options, withCredentials: true}).then(response => {
      resolve(response.data);
    }, err => {
      reject(err)
    }).catch(error => {
      reject(error)
    })
  })
}
