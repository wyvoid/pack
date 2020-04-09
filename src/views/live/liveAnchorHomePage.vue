<template>
  <div class="propTer">
      <div class="header" style="margin:0;">
        <!-- 背景图 -->
        <img class="loadImgTop" v-if="shopForImg" :src="shopForImg | autoWebP" alt>
        <img class="loadImg" v-else :src="'../../../static/img/Loading3.png'" alt>
        <!-- <img class="loadImg"  :src="'../../../static/img/gift/giftExclusive2.png'" alt> -->
        <!-- 蒙板 -->
        <div class="layer"></div>
      </div>
      <div style="background:#fff;border-radius:6px 6px 0px 0px;height:4rem;">
        <div class="info" style="background:none;margin:auto">
          <div class="attention">
            <span v-if="!liveingORnumORatt.isAttention" class="attention-un" @click="attentionAnchor()">关注</span>
            <span v-else class="attention-ed" @click="cancelAttentionAnchor()">已关注</span>
          </div>
          <div class="photo">
            <img :src="userImg | autoWebP" alt>
          </div>
          <div class="floatLeft">
            <span class="name">{{shopUserName}}</span>

            <img class="leve" style="width:0.4rem" v-if="grade==1" src="../../../static/img/v1.png" alt>

            <img class="leve" style="width:0.6rem" v-else-if="grade==2" src="../../../static/img/v2.png" alt>

            <img class="leve" style="width:0.6rem" v-else src="../../../static/img/v3.png" alt>
          </div>
          <span class="number">店铺序号：{{invitationCode}}</span>
          <div class="flex absolute" style="left:.15rem;top:.64rem;" >
            <div class="flex-center" style="margin-right:16px;">
              <span class="font-w f18">{{fans.fansNumber}}</span>
              <span class="f11" style="color:rgba(102, 102, 102, 1)">粉丝</span>
            </div>
            <div class="flex-center" style="margin-right:16px;">
              <span class="font-w f18">{{fans.watchNumber}}</span>
              <span class="f11" style="color:rgba(102, 102, 102, 1)">关注</span>
            </div>
            <div class="flex-center" style="margin-right:16px;">
              <span class="font-w f18">{{fans.giveLikeNumber}}</span>
              <span class="f11" style="color:rgba(102, 102, 102, 1)">获赞</span>
            </div>
          </div>
          <div class="absolute f12" style="left:.15rem;top:.94rem;color:rgba(102, 102, 102, 1)">{{userShopSignature?userShopSignature:"您关注的主播有点小懒，暂未留下只言片语～"}}</div>
          <div class="absolute" style="width:3.35rem;height:1px;background:rgba(229, 229, 229, 1);left:.15rem;top:1.34rem;"></div>

          <div v-if="liveingORnumORatt.liveStatus==1" class="absolute f12 font-w watch-live" style="top:2rem;">
              <span>正在播（{{liveingORnumORatt.goodsCount}}）</span>
              <span class="to-watch" @click="gotoLiveRoom()">去观看<span></span></span>
          </div>
          <div class="absolute" style="width:3.35rem;height:1px;background:rgba(229, 229, 229, 1);left:.15rem;top:2.3rem;"></div>
        </div>
        <ul style="margin-top:1.6rem;background:#fff;" v-if="shopList.length" class="shoplist" v-infinite-scroll="loadMore" infinite-scroll-disabled="isMoreLoading"
            infinite-scroll-distance="20" infinite-scroll-immediate-check="true">
            <li @click="hrefGoods(item.actionparam)" v-for="(item,index) in shopList" :key="index">
              <img :src="item.img | autoWebP" alt>
              <p>{{item.text}}</p>
              <p>{{item.sellPoint}}</p>
              <p v-if="item.tags">
                <span v-show="item.tags[0]" class="teMai">{{item.tags[0]}}</span>
                <span v-show="item.tags[1]" class="New">{{item.tags[1]}}</span>
              </p>
              <p>
                <i>￥</i>
                <i>{{String(item.price).split('.')[0]}}</i>
                <i v-show="String(item.price).split('.')[1]">.{{String(item.price).split(".")[1]}}</i>
              </p>
              <div id="pay"><img src="../../../static/img/icon-shopping.png" alt=""/></div>
            </li>
          </ul>
      </div>
  </div>
</template>
<script>
  import * as fetch from "../../utils/api";
  import axios from "axios";

  import {
    InfiniteScroll,
    Spinner
  } from "mint-ui";
  import {
    wxShare
  } from "../../utils/wxShare";
  import utils from "../../utils/commom";
  export default {
    components: {
      ViewBox,
      Toast,
      InfiniteScroll,
      Spinner,
    },
    data() {
      return {
        noImg: "",
        grade: "", //社长等级
        invitationCode: "无", //邀请码
        isLoading: false,
        shopUserName: "", //社长名
        isMoreLoading: false, // 加载更多
        noMore: false, //是否还有更多
        currentPage: 1,
        limitNum: 5,
        totalPage: "",
        shopForImg: "",
        userImg: "",
        shopList: [],
        userShopId: "",
        userShopSignature: "",
        getBarWidth:'28px',
        active:'rgba(236, 50, 50, 1)',
        fans:'',
        liveingORnumORatt:'',
        typeSiler:2 //1直播商品 2店铺精选
      };
    },
    created() {},
    activated() {
      if (this.$route.query.invitationCode || this.$route.query.yqCode) {
        localStorage.setItem("inviteCode", this.$route.query.invitationCode || this.$route.query.yqCode);
      }
      if(this.$route.query.roomId){
        this.userShopId=this.$route.query.roomId;
      }
      this.invitationCode = this.userShopId;
      this.getUserByInvitationCode();//获取展示的社长等级
      this.liveInfofans();//获取fans相关信息
      this.liveInfoMore();//获取主播的最近开播的直播状态和数量以及是否关注
      this.getUserShopGoodsList();//获取精选列表商品,店铺图、标语,主播昵称 头像
      this.getShareUrlByUserShop();//分享接口
    },
    mounted() {},
    methods: {
      //通过邀请码获取 等级
      getUserByInvitationCode() {
        let _this=this;
        fetch
          .getUserByInvitationCode({
            method: "get",
            data: {
              invitationCode: _this.userShopId
            }
          })
          .then(function (res) {
            if (res.resultCode == 1000) {
                _this.grade = res.data.grade;
            }else if (res.resultCode == 31001) {
              _this.$vux.toast.text(res.reason, "middle");
            }
          });
      },
      //获取fans相关信息
      liveInfofans(){  
        fetch.liveInfofans({
          data:{
            userShopId:this.userShopId
          }
        }).then((res)=>{
          this.fans=res.data
        })
      },
      //获取主播的最近开播的直播状态和数量以及是否关注
      liveInfoMore(){  
        fetch.liveInfoMore({
          method: "get",
          data:{
            userShopId:this.userShopId
          }
        }).then((res)=>{
          this.liveingORnumORatt=res.data
        })
      },
      //店主直播主页已播商品列表
      livedListfans(e){ 
        if(e){
           this.currentPage=1
        }
        fetch.livedListfans({
          method:'get',
          data:{
            currentPage: this.currentPage,
            limitNum: this.limitNum,
            userShopId:this.userShopId
          }
        }).then((res=>{
          if (res.resultCode === 1000) {
            if(e){
              this.shopList=[]
              this.typeSiler=e
              this.shopList=res.data.results
            }else{
             this.shopList=this.shopList.concat(res.data.results)
            }
            this.totalNum=res.data.paging.total
            this.totalPage=res.data.paging.pages
            this.isMoreLoading = false;
          }
        }))
      },
      //获取精选列表商品 店铺图、标语 昵称 头像
      getUserShopGoodsList(e) {
          if(e){
             this.currentPage=1
          }
        fetch
          .getUserShopGoodsList({
            data: {
              currentPage: this.currentPage,
              limitNum: this.limitNum,
              userShopId: this.userShopId
            }
          })
          .then(
            res => {
              if (res.resultCode === 1000) {
                if(e){
                   this.shopList=[]
                   this.typeSiler=e
                    this.shopList=res.data.extResult.data
                }else{
                  this.shopList = this.shopList.concat(res.data.extResult.data);
                }
                this.isMoreLoading = false;
                this.shopForImg = res.data.extResult.shopForImg;
                this.userShopSignature = res.data.extResult.userShopSignature;
                this.shopUserName =  res.data.extResult.shopUserName;
                this.userImg = res.data.extResult.shopUserImg;
                this.totalNum = res.data.paging.total; //总页数
                this.totalPage=res.data.paging.pages;
              } else {
                this.isLoading = false;
              }
            },
            err => this.$vux.toast.text(err, "bottom")
          );
      },
      // 加载更多的数据
      loadMore(e){
        if(e){
            this.typeSiler=e
           this.currentPage=1
        }else{
          this.currentPage += 1; // 增加分页
        }
        this.isMoreLoading = true; //还有继续加载
        this.isLoading = false;
        if (this.currentPage <= this.totalPage) {
          this.isLoading = true;
          this.noMore = false;
          //加载中
          setTimeout(() => {
            false;
            if(this.typeSiler == 1){
               this.livedListfans()
            }else{
               this.getUserShopGoodsList();
            }
            this.isMoreLoading = false;
          }, 1000);
          this.isLoading = true;
          return false;
        } else {
          this.isMoreLoading = true; //没有了，不再加载
          this.noMore = true; // 显示没有更多了
          this.isLoading = false; // 关闭加载中
          return false;
        }
      },
      //跳转商品详情
      hrefGoods(e) {
        this.$router.push({
          name: "goodShopping",
          query: {
            goodsId: e.goodsInfoId,
            skuId: e.skuId
          }
        });
      },
      //去观看
      gotoLiveRoom(){
        this.$router.push({ name: "live", params: { roomId: this.userShopId }});
      },
      //关注主播
      attentionAnchor() {
        let _this=this;
        fetch
          .attentionAnchor({
            method: "post",
            data: {
              userShopId: _this.userShopId
            }
          })
          .then(function (res) {
            if (res.resultCode == 1000) {
              _this.liveingORnumORatt.isAttention=true;
              _this.$vux.toast.text("关注成功", "middle");
            }else {
              _this.$vux.toast.text(res.reason, "middle");
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
              userShopId: _this.userShopId
            }
          })
          .then(function (res) {
            if (res.resultCode == 1000) {
              _this.liveingORnumORatt.isAttention=false;
              _this.$vux.toast.text("取消成功", "middle");
            }else {
              _this.$vux.toast.text(res.reason, "middle");
            }
          });
      },
      //分享接口
      getShareUrlByUserShop() {
        let _this = this;
        fetch
          .getShareUrlByUserShop({
            method: "get"
          })
          .then(res => {
            let data = res.data;
            let img = utils.isfilterWebp(data.img);
            wxShare(_this.shopUserName, data.shareUrl, img, _this.userShopSignature || "不来看看怎么知道没有喜欢的好货呢？");
          });
      }
    }
  };

</script>
<style lang="less" scoped>
  .propTer .bitmap p {
    text-align: center;
    color: #666666;
    font-size: 14px;
  }

  .propTer .bitmap img {
    display: block;
    width: 2rem;
    margin: 0.26rem auto 0;
  }

  .propTer .no-more {
    text-align: center;
    color: #333;
    font-size: 13px;
  }

  .propTer .noMore {
    width: 100%;
    padding: 0.5rem 0;
    text-align: center;
    color: #999;
    font-size: 13px;
    font-weight: 400;
  }

  .propTer .shoplist li i {
    display: inline-block;
  }

  .propTer .shoplist li #pay {
    position: absolute;
    right: 0.2rem;
    bottom: 0.25rem;
    width: 0.25rem;
    height: 0.25rem;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }

  .propTer .shoplist li p:nth-child(5) i {
    font-style: normal;
    font-weight: 500;
  }

  .propTer .shoplist li p:nth-child(5) i:nth-child(3) {
    font-size: 12px;
    margin-left: -0.03rem;
  }

  .propTer .shoplist li p:nth-child(5) i:nth-child(2) {
    margin-left: -0.05rem;
    font-size: 16px;
  }

  .propTer .shoplist li p:nth-child(5) i:nth-child(1) {
    font-size: 12px;
  }

  .propTer .shoplist li p:nth-child(5) {
    margin-top: 0.9rem;
    color: #d61818;
  }

  .propTer .shoplist li p:nth-child(4) {
    margin-top: 0.5rem;
  }

  .propTer .shoplist span {
    color: #ed0000;
    background: #ffeded;
    font-size: 10px;
    border-radius: 2px;
    padding: 0 0.04rem;
    /* margin-top: .40rem; */
  }

  .propTer .shoplist li p:nth-child(3) {
    font-size: 11px;
    height: 0.15rem;
    width: 2.1rem;
    line-height: 0.15rem;
    margin-top: 0.15rem;
    color: #999;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    margin-top: 0.35rem;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分省略号显示*/
  }

  .propTer .shoplist li p:nth-child(2) {
    font-size: 12px;
    height: 0.17rem;
    width: 2.1rem;
    line-height: 0.17rem;
    overflow: hidden;
    /*超出部分隐藏*/
    white-space: nowrap;
    /*不换行*/
    text-overflow: ellipsis;
    /*超出部分省略号显示*/
    margin-top: 0.15rem;
    color: #333;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    padding-right: 0.1rem;
  }

  .propTer .shoplist li p {
    position: absolute;
    left: 1.35rem;
  }

  .propTer .shoplist li img {
    width: 1.02rem;
    height: 1.07rem;
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
  }

  .propTer .shoplist {
    /* height: 100vh; */
    width: 3.55rem;
    padding: 0.02rem 0.1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .propTer .shoplist li {
    position: relative;
    border-radius: 4px;
    width: 3.55rem;
    height: 1.3rem;
    margin-top: 0.1rem;
    background: #fff;
  }

  .propTer .handpick img {
    width: 1.07rem;
    height: 0.2rem;
    margin: 0 auto;
  }

  .propTer .handpick i img {
    width: 100%;
  }

  .propTer .handpick i {
    display: inline-block;
    width: 0.16rem;
    height: 0.16rem;
    padding: 0 0.08rem;
    /* border:1px solid red; */
  }

  .propTer .handpick {
    width: 3.75rem;
    height: 0.2rem;
    line-height: 0.2rem;
    text-align: center;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    font-family: PingFangSC-Medium;
    margin-top: 0.14rem;
  }

  /* 头部 */
  .propTer .headInfor i img {
    width: 0.22rem;
    /* height: 0.22rem; */
  }

  .propTer .headInfor i {
    width: 0.22rem;
    height: 0.22rem;
    margin-left: 0.14rem;
  }

  .propTer .headInfor .Title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    font-size: 14px;
    color: #fff;
  }

  .propTer .headInfor {
    width: 3.75rem;
    height: 0.22rem;
    /* border:1px solid red; */
    position: absolute;
    top: 0.3rem;
    left: 0;
    z-index: 99;
  }

  .propTer .info .floatLeft i {
    font-style: normal;
  }

  .propTer .info .floatLeft {
    width: 2.5rem;
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0.7rem;
    top: 0.1rem;
  }

  .propTer .info .number {
    position: absolute;
    left: 0.7rem;
    top: 0.33rem;
    font-size: 11px;
    color: #333;
  }

  .propTer .info .floatLeft .leve {
    display: block;
    /* overflow: hidden; */
    /* width: 0.54rem; */
    margin-left: 0.1rem;
    /* height: 0.20rem; */

    /* position: absolute;
  left: 1.18rem;
  top: 0.11rem; */
  }

  .propTer .info .leve>img {
    display: block;
    /* width: 0.54rem; */

    /* position: absolute;
  left: 1.18rem;
  top: 0.11rem; */
  }

  .propTer .info .name {
    /* position: absolute;
  top: 0.13rem;
  left: 0.7rem; */
    /* border:1px solid red; */
    height: 0.19rem;
    line-height: 0.19rem;
    font-size: 13px;
    color: #333;
    font-weight: 500;
  }

  .propTer .info {
    position: relative;
    width: 3.55rem;
    height: 0.65rem;
    /* border:1px solid red; */
    margin: -0.3rem auto 0;
    // background: #fff;
    z-index: 99;
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(255, 252, 247, 1) 0%, rgba(255, 235, 202, 1) 100%);

  }

  .propTer .info .photo {
    border: 2px solid #fff;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 0.11rem;
    left: 0.15rem;
  }

  .propTer .header .loadImgTop {
    /* display: block; */
    /* margin: 0 auto; */
    width: 100%;
  }

  .propTer .header .loadImg {
    width: 2rem;
    height: 2rem;
    display: block;
    margin: 0 auto;
  }

  .propTer .header {
    position: relative;
    width: 3.75rem;
    height: 2rem;
    .layer{
      width:3.75rem;
      height:1rem;
      // border:1px solid blue;
      background:linear-gradient(180deg,rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.24) 55%,rgba(0,0,0,0) 100%);
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .propTer {
    background: #f5f5f5;
    // border:1px solid red;

  }
  .attention{ //关注
    position: absolute;
    top:0.1rem;
    right: 0;
    span{
      display: inline-block;
      height: 0.22rem;
      line-height: 0.22rem;
      font-size:.12rem;
      padding: 0 .1rem;
      border-radius:.15rem;
    }
    .attention-un{
      color:rgba(255,255,255,1);
      background:linear-gradient(270deg,rgba(255,85,51,1) 0%,rgba(255,81,81,1) 100%);
    }
    .attention-ed{
      color:rgba(181,181,181,1);
      background:rgba(240,240,240,1);
    }
  }
  .watch-live{ //去观看
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 0.10rem 0 0.15rem;
    text-align: center;
    .to-watch{
      display: inline-block;
      width:0.48rem;
      height:.2rem;
      line-height: .2rem;
      border-radius:2px;
      border:.01rem solid rgba(236,50,50,1);
      font-size:.11rem;
      font-weight:400;
      color:rgba(236,50,50,1);
      span{
        display: inline-block;
        width: 0;
        height: 0;
        border-left: 0.07rem solid rgba(236,50,50,1);
        border-top: 0.04rem solid transparent;
        border-bottom: 0.04rem solid transparent;
        margin-left: 0.02rem;
      }
    }
  }
</style>
<style lang="less">
  #noBorder{
    .vux-tab-container{
      .vux-tab{
        height: 40px;
        .vux-tab-item{
          background: none;
        }
      }
    }
  }
</style>