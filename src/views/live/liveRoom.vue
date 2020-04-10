<template>
  <div id="app">
    <div style="float: left;width:100px;height:100px;"  @click="goodsType=false">
          <div class="prism-player" @play="play($event)" :id="playerId"></div>
    </div>
    <!-- 主播信息-->
    <div class="anchorInfo">
      <!-- :src="anchorInfo.userImg?anchorInfo.userImg:'../../assets/images/Bitmap.png'"-->
      <img :src="anchorInfo.userImg" class="anchorImg">
      <p><span class="anchorName">{{anchorInfo.shopName}}</span><br><span class="anchorNum">{{watchNum}}观看</span></p>
      <span class="anchorBtn attention">
            <span v-if="!isAttention" class="attention-un" @click="attentionAnchor()">关注</span>
            <span v-else class="attention-ed" @click="cancelAttentionAnchor()">已关注</span>
      </span>
    </div>
    <!-- 点亮商品-->
    <div class="anchorLight">
      <div class="lightGoods"  v-for="(items,index) in lightGoods" :key="index"  @click="toUpGood(items.index)">
        <img :src="items.imgUrl"/>
        <span class="levelLabel">{{items.index}}</span>
        <span class="lightTitle">￥{{items.price}}</span>
      </div>
    </div>
    <!-- 聊天室-->
    <div class="msgBg">
      <div class="msgSystem">{{systemMsg}}</div>
      <div class="msgContent" id="content"></div>
      <div class="msgBlock">
        <span class="goods-icon" @click="goodsType=true">{{goodsListNum}}</span>
        <input type="text" class="msgInput" v-model="userMsg" @blur="iptFocus()" @focus="iptBlur()" >
        <span class="msgSend" @click="msgSentToClient">../../../static/img/fasong.png</span>
        <span @click="togetLikeImg(1)" class="msgSend ml15">
          <!-- 点赞图片列表 -->
          <div id="LikeImglistBox" class="LikeImglistBox" ref="LikeImglistBox">
            <img  v-for="(item,index) in LikeImglist" :key="index" :src="item" alt/>
          </div>
          <img src="https://gxs-bucket.oss-cn-shanghai.aliyuncs.com/social-h5/upload/share3.png"/>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  // require("./msg.scss");
  require("./liveRoom.scss");
  // import aliplayer from "./AliPlayer.vue"
  import * as fetch from '../../utils/api'
  import { MessageBox } from 'mint-ui';
  // import VueSocketIO from 'vue-socket.io'
  import Vue from 'vue'
  
  export default {
    name: "myPlayer",
    components: {
    //  "ali-player": aliplayer,
      // Toast,
      MessageBox
    },
    // inject:["reload"],
    data(){
      return{
        playSource:'',
        playWidth:'',
        playHeight:'',
        roomId:'1',
        anchorInfo:{},
        watchNum:0,
        isAttention:false,
        userName:'昵称未获取',
        logId:'',
        userMsg:'',
        systemMsg:'',
        goodsList:[],
        specsActive:[],//当前活动规格
        curSku:[{
          'specsItems':[],
          'skuStock':-1//设置个默认值
        }],
        catHasGoods:false,
        goodsType:false,
        lightGoods:[],
        count:'',
        swiperOption: {
          spaceBetween: 10,
          autoplay:false,
          direction: 'horizontal',
          notNextTick:false,
          observer:true,
          observeParents:true,
          loop: false,
          slidesPerView: 'auto',
          loopedSlides: 5,
        },
        LikeImglist:[],//直播点赞数组
        LikeImgindex:0,//记录点赞次数
        isToken:localStorage.getItem("token"),
        inFocus:'',
        goodsListNum:'',
        //
        playerId:
      "aliplayer_" +
      Math.random()
        .toString(36)
        .substr(2),
      scriptTagStatus: 0,
      isReload: false,
      instance: null,
      liveSkin: [
        {
          name: "bigPlayButton",
          align: "blabs",
          x: 30,
          y: 80
        },
        {
          name: "errorDisplay",
          align: "tlabs",
          x: 0,
          y: 0
        },
        {
          name: "infoDisplay"
        },
        {
          name: "controlBar",
          align: "blabs",
          x: 0,
          y: 0,
          children: [
            {
              name: "liveDisplay",
              align: "tlabs",
              x: 15,
              y: 25
            },
            {
              name: "fullScreenButton",
              align: "tr",
              x: 10,
              y: 25
            },
            {
              name: "volume",
              align: "tr",
              x: 10,
              y: 25
            }
          ]
        }
      ],
      playSkin: [
        {
          name: "bigPlayButton",
          align: "blabs",
          x: 30,
          y: 80
        },
        {
          name: "controlBar",
          align: "blabs",
          x: 0,
          y: 0,
          children: [
            {
              name: "progress",
              align: "tlabs",
              x: 0,
              y: 0
            },
            {
              name: "playButton",
              align: "tl",
              x: 15,
              y: 26
            },
            {
              name: "nextButton",
              align: "tl",
              x: 10,
              y: 26
            },
            {
              name: "timeDisplay",
              align: "tl",
              x: 10,
              y: 24
            },
            {
              name: "fullScreenButton",
              align: "tr",
              x: 10,
              y: 25
            },
            {
              name: "streamButton",
              align: "tr",
              x: 10,
              y: 23
            },
            {
              name: "volume",
              align: "tr",
              x: 10,
              y: 25
            }
          ]
        },
        {
          name: "fullControlBar",
          align: "tlabs",
          x: 0,
          y: 0,
          children: [
            {
              name: "fullTitle",
              align: "tl",
              x: 25,
              y: 6
            },
            {
              name: "fullNormalScreenButton",
              align: "tr",
              x: 24,
              y: 13
            },
            {
              name: "fullTimeDisplay",
              align: "tr",
              x: 10,
              y: 12
            },
            {
              name: "fullZoom",
              align: "cc"
            }
          ]
        }
      ]
      }
    },
    mounted(){     
      document.getElementById('content').innerHTML = '';
      this.roomId = this.$route.params.roomId || this.$route.query.roomId;
      this.getLiveUrl(this.roomId);
              if (window.Aliplayer !== undefined) {
                // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
                this.scriptTagStatus = 2;
                this.initAliplayer();
              } else {
                // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
                this.insertScriptTag();
              }

    },
    sockets:{
      connect() {
        let _this=this;
        this.getUserByInvitationCode(function(){
            _this.$socket.emit('join', {userName:_this.userName,roomId:_this.roomId,logId:_this.logId}); 
        });
            //监听connect事件
      },

      sys(data){
        this.systemMsg = `${data.userName}${data.msg}`;
        this.watchNum = data.userCount;
      },

      messageToClient(data){
        console.log(data);
        let html = document.createElement('p')
        html.innerHTML = `<span class="userName">${data.userName}说<span>：<span class="userContent">${data.msg}</span>`
        document.getElementById('content').appendChild(html)
        let div =document.getElementById('content')
        div.scrollTop = div.scrollHeight;
      },
      /*
       * 主播半闭
       * */
      anchorClose(data) {
        this.systemMsg = `${data.userName}${data.msg}`
        //退出房间
        this.$socket.emit('leave');
        MessageBox.alert('主播已关闭直播间！').then(action => {
          this.$router.go(-1);
        });
      },
      /*
       * 主播点亮
       * */
      anchorLightUp() {
      //刷新主播点亮方法
        this.getLightGoods(this.logId);
      },
      updated(){//数据更新时，向服务器端发送事件
       this.$socket.emit("compile"); 
      }
    },
    methods: {

      skuNumAdd(i,items){
        let _this=this;
        
        //vue从新渲染
        _this.$set(_this.goodsList[i],"aloneNum",items.aloneNum);
        _this.$forceUpdate();
      },
      //sku减
      skuNumReduce(i,items){
        let _this = this;
        if(items.aloneNum>=2){
          items.aloneNum--
        }
        //vue从新渲染
        _this.$set(_this.goodsList[i],"aloneNum",items.aloneNum);
        _this.$forceUpdate();
      },
      //轮播事件-数据初始化
      carousel(){
        this.swiperOption = {
          spaceBetween: 10,
          autoplay:false,
          direction: 'horizontal',
          notNextTick:false,
          observer:true,
          observeParents:true,
          loop: false,
          slidesPerView: 'auto',
          loopedSlides: 5
        }
      },
      msgSentToClient(){
        let t = this.userMsg.replace(/^\s+|\s+$/g,"");
       if (!t) return
        this.$socket.emit('sayToSystem', {userName:this.userName,roomId:this.roomId, msg: t});
        this.userMsg = '';
      },
      /*
      * 规格点击事件
      * i 当前标签下标
      * iSpecs 当前规格组下标
      * iGoods 当前商品下标
      * values 当前组数据
      * items 当前商品数据
      *
      * */
      //规格点击事件
      chooseSpecs(i,iSpecs,iGoods,values,items){
        let _this = this;
        //赋值基础数据
        let curSpecsItems=_this.curSku[iGoods]?_this.curSku[iGoods].specsItems:[];//当前商品规格组
        curSpecsItems[iSpecs] = {
          'specsKey':values.key,
          'specsSelectedId':values.value[i].specificationId
        }
        _this.curSku[iGoods]={
          'specsItems':curSpecsItems
        }
        //items.skuBriefList.list
        //点击给当前组数据赋值-点击样式
        values.value.forEach((item,index,arr)=>{
          item['selected']=false;
        })
        values.value[i].selected=true;//当前点击规格标签
        let specsArr = curSpecsItems.map(arr => arr.specsSelectedId);
        let specsStr = specsArr.join(',');
        items.skuBriefList.skus.forEach((item,index,arr)=>{
          if(item.specValue == specsStr){
            items.liveGoodsVos.originalPrice  = item.realSellPrice;
            items.liveGoodsVos.imgUrl = item.goodsImg;
            _this.curSku[iGoods]["skuStock"] = item.skuStock;
            _this.curSku[iGoods]["skuId"] = item.skuId;
            if(items.aloneNum > item.skuStock){//判断库存是否小于输入数量
              items.aloneNum =  item.skuStock
            }
          }
        })
//        console.log(_this.curSku[iGoods])
        //滚动重新赋值
        this.$nextTick(function(){
          this.carousel();
        })
      },
      //获取直播地址
      getLiveUrl(roomId){
        let w = document.documentElement.clientWidth;
        let h = document.documentElement.clientHeight;
        let _this = this
        this.playWidth = w;
        this.playHeight = h;
        fetch.getLiveURL({
          method:'get',
          data:{
            roomId
          }
        }).then((response)=>{
          if(response.resultCode==1000){
            _this.playSource=response.data.m3uUrl;
            _this.anchorInfo = response.data.userLiveVos[0];
            _this.logId = response.data.logId;
            _this.isAttention = response.data.isAttention;
            //  _this.getGoodsList(_this.logId);
            // _this.togetLikeImg(0);
            // _this.getLightGoods(_this.logId);
                if (window.Aliplayer !== undefined) {
                  // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
                  _this.scriptTagStatus = 2;
                  _this.initAliplayer();
                } else {
                  // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
                  _this.insertScriptTag();
                }
            // _this.getUserByInvitationCode(function(){
            //   _this.$socket.emit('join', {userName:_this.userName,roomId:_this.roomId,logId:_this.logId}); 
            // });
            // _this.reload();
          }else{
            MessageBox.alert(response.reason).then(action => {
              this.$router.go(-1);
            })
          }
        },function(err){
        }).catch(err => {
        })
      },
      //获取本场直播商品
      getGoodsList(logId){
        let _this = this
        fetch.getLiveGoodsList({
          method:'get',
          data:{
            logId,
            limitNum:99,
            currentPage:1
          }
        }).then((response)=>{
          _this.goodsListNum=response.data.paging.total;
          _this.goodsList=response.data.results.reverse();
          _this.goodsList.forEach((v,k)=>{
            v.aloneNum=1;
            v.liveGoodsVos.originalPrice=v.skuBriefList.skus[0].realSellPrice;
            // _this.chooseSpecs(0,0,0,v.skuBriefList.list[0],v)
          })
          _this.$nextTick(function(){
            _this.carousel();
          })
        }).catch((response)=>{
          // console.log(response)
        })
      },
      //获取主播点亮商品
      getLightGoods(logId){
        let _this=this;
        fetch.getLiveLightGoods({
          method:'get',
          data:{
            logId:_this.logId||logId,
            limitNum:3,
            currentPage:1
          }
        }).then((response)=>{
          _this.lightGoods = response.data;
        }).catch((response)=>{
          // console.log(response)
        })
      },
      //加入购物车
      liveCat(e,i,items){
        let that=this
        let msg = [],msgArr = items.skuBriefList.list;
        msgArr.forEach((item,index,arr)=>{
          msg.push(item.key)
          item.value.forEach((vItem,i,vArr)=>{
            if(vItem.selected){
               msg.pop()
            }
          })
        })

        if (e == 1) {
          fetch.shopcar({
            data: {
              skuId: that.curSku[i].skuId,
              count: items.aloneNum,
              liveId:that.roomId,
              liveScene:that.logId
            }
          }).then(response => {
            if (response.success) {
              that.countt()
              that.catHasGoods=true
            }
          });
        } else {
          if(this.isToken){
            let sku=[{
              count:items.aloneNum,
              skuId:that.curSku[i].skuId,
              activityType:that.curSku[i].activityType,
              activityCode:that.curSku[i].activityCode,
              liveId:that.roomId,
              liveScene:that.logId
            }]
            this.$router.push({
              name: "goodsPay",
              query: {skuList:JSON.stringify(sku),islive: true}
            });
          }else{
            this.getCode()
          }
        }
      },
      //获取购物车数量
      countt(){
        fetch.count({
          method:'get'
        }).then((res)=>{
          this.count=res.data
        })
      },
      //登陆 注册
      getCode() {
        localStorage.setItem('fullPath',location.href)
        this.$router.push({name:'getCode'})
      },
      //点赞主播 观看主播
      togetLikeImg(type){
        let _this=this;
        fetch.likesAnchor({
          method:'post',
          data:{
            logId:_this.logId,
            type
          }
        }).then((res)=>{
          if(type == 1){
            //动画效果

          }
        }).catch((err)=>{

        })
      },
      //关注主播
      attentionAnchor() {
        let _this=this;
        fetch
          .attentionAnchor({
            method: "post",
            data: {
              userShopId: _this.roomId
            }
          })
          .then(function (res) {
            if (res.resultCode == 1000) {
              _this.isAttention=true;
            }else {
            }
          });
      },
      //取消关注主播
      cancelAttentionAnchor() {
        let _this=this;
        fetch
          .cancelAttentionAnchor({
            method: "post",
            data: {
              userShopId: _this.roomId
            }
          })
          .then(function (res) {
            if (res.resultCode == 1000) {
              _this.isAttention=false;
            }else {
            }
          });
      },
      //通过邀请码获取 用户名
      getUserByInvitationCode(fn) {
        let _this=this;
        fetch
          .getNickname({
            method: "get",
            data: {
              invitationCode: '947727'
            }
          })
          .then(function (res) {
            _this.userName = res.nickName || "昵称未获取";
            if(fn){
              fn()
            }
          },function(err){
            if(fn){
              fn()
            }
          });
      },
      //focus
      iptFocus() {
         this.inFocus = true;
      },
      //blur
      iptBlur() {
         let this_ = this;
         this_.inFocus = false;
         setTimeout(function () {
            if(this_.inFocus == false){
               // 当input 失焦时,滚动一下页面就可以使页面恢复正常
               this_.checkWxScroll();
            }
         },200)
      },
      checkWxScroll(){
         var ua = navigator.userAgent.toLowerCase();
         var u = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
         if(ua.match(/MicroMessenger/i) == 'micromessenger'&&!!u){//在iphone 微信中
          // var osVersion  =  navigator.userAgent.match(/iPhone\sOS\s([\d\_]+)/i);
          // var  osArr = osVersion.length>=1? osVersion[1].split('_'):[];
          //  var newOS = osArr.length>=2 && (versionArr[0]>11)
          //  if(newOS){ //如果iphone版本号>=12
              this.temporaryRepair();
          //   }
         }
      },
      temporaryRepair(){
         var currentPosition,timer;
         var speed=1;//页面滚动距离
         timer=setInterval(function(){
            currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition-=speed;
            window.scrollTo(0,0);//页面向上滚动
            //  currentPosition+=speed; //speed变量
          //   window.scrollTo(0,currentPosition);//页面向下滚动
            clearInterval(timer);
         },1);
      },
      //点击点亮的商品 吊起相应商品
      toUpGood(index){
        let _this=this;
        this.goodsType=true;
        this.$nextTick(function(){
             _this.$refs.mySwiper.swiper.slideTo((index-1),1000);
        })
      },
      insertScriptTag() {
      const _this = this;
      let playerScriptTag = document.getElementById("playerScriptTag");
      // 如果这个tag不存在，则生成相关代码tag以加载代码
      if (playerScriptTag === null) {
        playerScriptTag = document.createElement("script");
        playerScriptTag.type = "text/javascript";
        playerScriptTag.src = "https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js";
        playerScriptTag.id = "playerScriptTag";
        let s = document.getElementsByTagName("head")[0];
        s.appendChild(playerScriptTag);
      }
      if (playerScriptTag.loaded) {
        _this.scriptTagStatus++;
      } else {
        playerScriptTag.addEventListener("load", () => {
          _this.scriptTagStatus++;
          playerScriptTag.loaded = true;
          _this.initAliplayer();
        });
      }
      _this.initAliplayer();
    },
    initAliplayer() {
      const _this = this;
      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
      if (
        _this.scriptTagStatus === 2 &&
        (_this.instance === null || _this.reloadPlayer)
      ) {
        _this.instance && _this.instance.dispose();

        document.querySelector("#" + _this.playerId).innerHTML = "";
        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
        // 所以，我们只能在 nextTick 里面初始化 Aliplayer
        _this.$nextTick(() => {
          let skin = _this.liveSkin;
          if (!_this.isLive) {
            skin = _this.playSkin;
          }
          let playSource = _this.playSource.replace('http://live.ipanshi.com', location.origin)
          _this.instance = window.Aliplayer({
            id: _this.playerId,
            autoplay: true,
            isLive:true,
            playsinline:true,
            format: "m3u8",
            width: _this.width+"px"||"100%",
            height: _this.height+"px"||"100%",
            controlBarVisibility: "hover",
            useH5Prism:true,
            useFlashPrism: false,
            vid: _this.vid,
            playauth: _this.playauth,
            source: playSource,
            cover: _this.cover,
            skinLayout: skin,
            x5_video_position:"center",
            x5_type: "h5",
            x5_fullscreen:false,
            x5_orientation: 'portraint',
            autoPlayDelay:0,
            autoPlayDelayDisplayText: _this.autoPlayDelayDisplayText,
            rePlay:false,
            showBuffer:true,
            showBarTime:5000
          });
          console.log(_this.source);
          // 绑定事件，当 AliPlayer 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
          _this.instance.on("ready", () => {
            this.$emit("ready", _this.instance);
          });
          _this.instance.on("play", () => {
            this.$emit("play", _this.instance);
          });
          _this.instance.on("pause", () => {
            this.$emit("pause", _this.instance);
          });
          _this.instance.on("ended", () => {
            this.$emit("ended", _this.instance);
          });
          _this.instance.on("liveStreamStop", () => {
            this.$emit("liveStreamStop", _this.instance);
          });
          _this.instance.on("m3u8Retry", () => {
            this.$emit("m3u8Retry", _this.instance);
          });
          _this.instance.on("hideBar", () => {
            this.$emit("hideBar", _this.instance);
          });
          _this.instance.on("waiting", () => {
            this.$emit("waiting", _this.instance);
          });
          _this.instance.on("snapshoted", () => {
            this.$emit("snapshoted", _this.instance);
          });

          _this.instance.on("timeupdate", () => {
            _this.$emit("timeupdate", _this.instance);
          });
          _this.instance.on("requestFullScreen", () => {
            _this.$emit("requestFullScreen", _this.instance);
          });
          _this.instance.on("cancelFullScreen", () => {
            _this.$emit("cancelFullScreen", _this.instance);
          });
          _this.instance.on("error", () => {
            _this.$emit("error", _this.instance);
          });
          _this.instance.on("startSeek", () => {
            _this.$emit("startSeek", _this.instance);
          });
          _this.instance.on("completeSeek", () => {
            _this.$emit("completeSeek", _this.instance);
          });  
        });
      }
    },
    /**
     * 播放视频
     */
    play: function() {
      this.instance.play();
    },
    /**
     * 暂停视频
     */
    pause: function() {
      this.instance.pause();
    },
    /**
     * 重播视频
     */
    replay: function() {
      this.instance.replay();
    },
    /**
     * 跳转到某个时刻进行播放
     * @argument time 的单位为秒
     */
    seek: function(time) {
      this.instance.seek(time);
    },
    /**
     * 获取当前时间 单位秒
     */
    getCurrentTime: function() {
      return this.instance.getCurrentTime();
    },
    /**
     *获取视频总时长，返回的单位为秒
     * @returns 返回的单位为秒
     */
    getDuration: function() {
      return this.instance.getDuration();
    },
    /**
     获取当前的音量，返回值为0-1的实数ios和部分android会失效
     */
    getVolume: function() {
      return this.instance.getVolume();
    },
    /**
     设置音量，vol为0-1的实数，ios和部分android会失效
     */
    setVolume: function(vol) {
      this.instance.setVolume(vol);
    },
    /**
     *直接播放视频url，time为可选值（单位秒）目前只支持同种格式（mp4/flv/m3u8）之间切换暂不支持直播rtmp流切换
     *@argument url 视频地址
     *@argument time 跳转到多少秒
     */
    loadByUrl: function(url, time) {
      this.instance.loadByUrl(url, time);
    },
    /**
     * 设置播放速度
     *@argument speed 速度
     */
    setSpeed: function(speed) {
      this.instance.setSpeed(speed);
    },
    /**
     * 设置播放器大小w,h可分别为400px像素或60%百分比chrome浏览器下flash播放器分别不能小于397x297
     *@argument w 播放器宽度
     *@argument h 播放器高度
     */
    setPlayerSize: function(w, h) {
      this.instance.setPlayerSize(w, h);
    },
    /**
     * 目前只支持HTML5界面上的重载功能,暂不支持直播rtmp流切换m3u8）之间切换,暂不支持直播rtmp流切换
     *@argument vid 视频id
     *@argument playauth 播放凭证
     */
    reloaduserPlayInfoAndVidRequestMts: function(vid, playauth) {
      this.instance.reloaduserPlayInfoAndVidRequestMts(vid, playauth);
    },
    reloadPlayer: function() {
      this.isReload = true;
      this.initAliplayer();
      this.isReload = false;
    }
    }
  }
</script>

