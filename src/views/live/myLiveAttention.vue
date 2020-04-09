<template>
  <div class="liveList-bg">
    <div v-if="list.length>0">
      <div v-for="item in list">
        <div class="live-square live-square-att" v-if="item.currentState==0">
          <img :src="item.coverUrl | autoWebP" class="img-corner img-corner-att" @click="gotoLiveRoom(item.roomId)" />
          <div class="live-style">
            <span class="live-status live-status1">直播中</span>
            <span class="live-status live-num">{{item.watchNumber}}观看</span>
          </div>
          <div class="live-title" @click="gotoliveAnchorHomePage(item.roomId)">
            <img :src="item.userLiveVo.userImg | autoWebP">
            <span>{{item.userLiveVo.shopName}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 空白缺损页 -->
    <div class="ent-img" v-else>
      <img  src="https://gxs-bucket.oss-cn-shanghai.aliyuncs.com/social-h5/git/myAttentionX2.png" alt="">
    </div>
  </div>
</template>
<script>
  require("./liveList.scss");
  import * as fetch from '../../utils/api'
  import { Badge } from 'vux'
  export default {
    name:'liveList',
    data(){
    return{
      list:[]//数据
    }
  },
  activated(){
    this.getLiveList();
  },
  methods:{
    gotoLiveRoom(id){
      this.$router.push({ name: "live", query: { roomId: id }});
    },
    //去主播首页
    gotoliveAnchorHomePage(id){
      this.$router.push({ name: "liveAnchorHomePage", query: { roomId: id }});
    },
    getLiveList(){
      let _this = this
      fetch.getMyliveAttention({
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
<style lang="less" scoped>
.live-square-att{
  height: 220px;
  .img-corner-att{
    display: block;
    height: 174px;
  }
  .live-title{
    img{
      display: block;
      margin-top:10px;
    }
  }
}
</style>