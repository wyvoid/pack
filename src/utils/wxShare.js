import * as fetch from './api'
let wxShare=function(title, link, imgUrl,desc,fn){
    fetch.config({
        method:'get',
        data:{
            url:location.href
        }
    }).then((res)=>{
        let data=res.data
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList:[
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
            ]
        });
        wx.ready(function(){
            let getTimestamp=new Date().getTime();
            wx.onMenuShareAppMessage({  //分享给朋友
                
                title:title||'默认分享文案',
                // link:(link`&getTimestamp=${getTimestamp}`)||location.href,
                link:link,
                imgUrl:imgUrl,
                desc:desc||'默认副标题',
                type:'',
                dataUrl:'',
                success: function (e) {
                    // alert('分享成功')
                    if(fn){
                        fn()
                    }
                   
                },
                fail:function(e){
                    console.log(e)
                    
                }
            });
            wx.onMenuShareTimeline({  //分享给朋友圈
                title: title||'默认分享文案', 
                link:link,
                // link: (link`&getTimestamp=${getTimestamp}`)||location.href, 
                success: function () {
                    // alert('分享成功')
                    console.log(e)
                    if(fn){
                        fn()
                    }
                    
                },
                fail:function(e){
                    console.log(e)
                    
                }
            })
        })
    })
}

export { wxShare }