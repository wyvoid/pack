<template>
  <div class="liveList-bg">
    <div v-if="list.length>0">
      <div v-for="item in list" :key="item.id">
        <div class="live-square" v-if="item.currentState==0" @click="gotoLiveRoom(item.roomId)">
          <img :src="item.coverUrl" class="img-corner"/>
          <div class="live-style">
            <span class="live-status live-status1">直播中</span>
            <span class="live-status live-num">{{item.watchNumber}}观看</span>
          </div>
          <div v-if="item.userLiveVo" class="live-bt">
            <img :src="item.userLiveVo.userImg">
            <span>{{item.userLiveVo.shopName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 空白缺损页 -->
    <div class="ent-img" v-else>
      <img  src="https://gxs-bucket.oss-cn-shanghai.aliyuncs.com/social-h5/git/noLiveX2.png" alt="">
    </div>
  <div class="live-bottom" @click="gotoMyAttention()">
    <span>我的关注</span>
  </div>
  </div>
</template>
<script>
  require("./liveList.scss");
  import * as fetch from '../../utils/api'
  export default {
    name:'liveList',
    data(){
    return{
      list:[]//数据
    }
  },
  mounted() {
    this.getLiveList();
  },
  methods:{
    gotoMyAttention(id){
      this.$router.push({ name: "myLiveAttention"});
    },
    gotoLiveRoom(id){
      this.$router.push({ name: "liveRoom", query: { roomId: id, timestamp: new Date().getTime()}});
    },
    getLiveList(){
      let _this = this
      fetch.getLiveListData({
        method:'get',
        data:{
          currentPage:1,
          limitNum:20
        }
      }).then((response)=>{
        _this.list=response.data.results
      }).catch((response)=>{
        // console.log(response)
      })
    }
  }

  }
</script>
