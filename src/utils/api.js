import request from './request'

// 售后接口：：
// 售后信息详情页
export async function afterSaleMsg(serviceSn, options){
  return await request('/order/member/service/process/'+serviceSn, options)
}
// 售后申请表单数据
export async function goodsForService(urlTail, options){
  return await request('/order/member/goodsForService/'+urlTail, options)
}
// 售后原因
export async function serviceReasons(reasonType, options){
  return await request('/order/dict/service/reasons?reasonType='+reasonType, options)
}
// 订单详情接口
export async function orderMemberDetail(orderSn, options){
  return await request('/order/member/detail/'+orderSn, options)
}

export async function see(options) {
  return await request('/social/startPageHome/show', options)
}
// V2.0首页
export async function showTwo(options){
    return await request('/social/startPageHome/showTwo',options)
}
// V2.0社长力推
export async function marketingGoodList(options){
  return await request('/social/startPageHome/marketingGoodList',options)
}
// 首页皮肤/主题背景
export async function themeMsg(options){
    return await request('/social/background/getBackground',options)
}
// 首页底部导航 icon
export async function menuBarIcon(options){
    return await request('/platform/appMenuBar/getAppMenuBar',options)
}
export async function goodsDetail(options){
    return await request('/social/goods',options)
}

// 足迹  获取商品详情接口 缓存浏览记录用
export async function storageGoodsDetail(url, options) {
  return await request(url, options)
}

export async function getWxUserInfo(options) {
  return await request('/user/oauth2/third/wechat/getWxUserInfo', options)
}

export async function getTokenByRefreshToken(options) {
  return await request('/user/getTokenByRefreshToken', options)
}

export async function captcha(options) {
  return await request('/user/captcha', options)
}

export async function registryThird(options) {
  return await request('/user/authlogin/registryThird', options)
}

export async function multiThirdBindAccount(options) {
  return await request('/user/authlogin/multiThirdBindAccount', options)
}

export async function collection(options) {
  return await request('/social/collection', options)
}

export async function getGoodsCouponsByCustomerId(options) {
  return await request('/order/getGoodsCouponsByCustomerId', options)
}

export async function getGoodsCouponsByGoodsIdd(options) {
  return await request('/order/anon/getGoodsCouponsByGoodsId', options)
}

export async function getSkusBySpuId(options) {
  return await request('/social/order/getSkusBySpuId', options)
}

export async function receive(options) {
  return await request('/activity/member/coupon/page/receive', options)
}

export async function CouponsByCustomerId(options) {
  return await request('/order/getGoodsCouponsByCustomerId', options)
}

export async function virtual(options) {
  return await request('/order/member/virtual', options)
}

export async function create(options) {
  return await request('/order/member/create', options)
}

export async function shopcar(options) {
  return await request('/social/shopcar', options)
}
export async function wechatjsapi(options) {
  return await request('/order/member/pay/wechat/jsapi', options)
}
//获取appid
export async function getWxAppid(options) {
  return await request('/user/oauth2/third/wechat/getWxAppid', options)
}
//用户地址查询接口
export async function addressSearch(options) {
  return await request('/user/address/search', options)
}
//用户地址删除接口
export async function addressDelete(options) {
  return await request('/user/address/delete', options)
}
//用户地址新增或修改地址接口
export async function saveAndUpdate(options) {
  return await request('/user/address/saveAndUpdate', options)
}
//设置默认地址接口
export async function setIsDefault(options) {
  return await request('/user/address/isDefault', options)
}
// 购物车列表接口
export async function shopcarList(options) {
  return await request('/social/shopcarList', options)
}
// 删除购物车接口
export async function delShopcar(options) {
  return await request('/social/delShopcar', options)
}
// 清空全部失效商品
export async function delShopcarFail(options) {
  return await request('/social/shopcarFail', options)
}
// 修改购物车商品数量
export async function selectShopcarNum(url, options) {
  return await request(url, options)
}

//微信支付
export async function callWxPay(options) {
  return await request('/order/member/pay/wechat/jsapi', options)
}
//礼包订单
export async function setGoodsGiftData(options) {
  return await request('/order/member/gift/create', options)
}
//获取礼包列表
export async function getGoodsGiftList(options) {
  return await request('/social/goods/gifts', options)
}
//获取部分礼包列表
export async function goodsGiftsList(options) {
  return await request('/social/goods/gifts/list', options)
}
//通过id 获取礼包信息
export async function giftsDesc(options) {
  return await request('/social/goods/gifts/desc', options)
}
//获取邀请人信息
export async function getInviterInfo(options) {
  return await request('/user/getUserInfoByInvitationCode', options)
}
//获取地区接口
export async function getArea(options) {
  return await request('/user/dict/regions', options)
}
//app获取用户详情
export async function getUserBycustomerId(options) {
  return await request('/user/getUserBycustomerId', options)
}
//用户修改个人资料
export async function updateBycustomer(url, options) {
  return await request(url, options)
}
//上传文档接口
export async function uploadImg(options) {
  return await request("/social/file/uploadImg/base64", options)
}
//请求 搜索词 接口
export async function selectParticiple(options) {
  return await request("/social/es/selectParticiple", options)
}
// 请求 商品列表 接口
export async function queryEsGoodByNameAndSort(options) {
  return await request("/social/es/queryEsGoodByNameAndSort", options)
}
// 请求 商品分类 接口
export async function queryCategorys(options) {
  return await request("/social/goods/categorys", options)
}
// 收藏列表  接口
export async function collections(options) {
  return await request("/social/collections", options)
}
// 删除 收藏列表  接口
export async function delCollection(options) {
  return await request("/social/collection", options)
}
// 批量删除收藏列表  接口
export async function delCollectionAll(collectionIds,options) {
  return await request(`/social/collectionAll?collectionIds=${collectionIds}`, options)
}
// 获取粮票
export async function getCouponList(options) {
  return await request("/activity/member/coupon/list", options)
}
// 批量删除无效粮票
export async function delByUseCouponsId(options) {
  return await request("/order/delByUseCouponsId", options)
}
// 优惠券粮票 兑换
export async function getActivation(options) {
  return await request("/activity/member/coupon/activation", options)
}
//获取消息中心列表
export async function getMessageList(options) {
  return await request("/social/message/list", options)
}
//获取首页未读短信数量
export async function getMessageUnreadCount(options) {
  return await request("/social/message/unreadCount", options)
}

//站内信 按照类型获取消息通知
export async function queryMessagePage(options) {
  return await request("/user/message/queryMessagePage", options)
}
//站内信 获取消息中心的消息内容
export async function queryTop1MessagePage(options) {
  return await request("/user/message/queryTop1MessagePage", options)
}
//站内信 获取消息的小红点
export async function getMsgSpot(options) {
  return await request("/user/message/getMsgSpot", options)
}
//站内信 擦除数字红点
export async function wipeSpot(options) {
  return await request("/user/message/wipeSpot", options)
}

//  TODO我的模块 START

//获取普通用户信息
export async function getUserInfosByUsers(options) {
  return await request('/social/user/getUserInfosByUsers', options)
}
//获取社长用户信息
export async function myUser(options) {
  return await request('/commission/deposit/myUsers', options)
}
//获取订单的个数
export async function statusCount(options) {
  return await request('/order/member/order/statusCount', options)
}

//会员订单
export async function memberOrder(options) {
  return await request('/order/member/order', options)
}

//订单工作流操作统一接口
export async function action(options) {
  return await request('/order/member/action', options)
}

//商品搜索分页 接口
export async function queryEsGoodInfoAndSortAndPaging(options) {
  return await request('/social/es/queryEsGoodInfoAndSortAndPaging', options)
}
//满减折商品搜索分页 接口
export async function getDiscountSkuList(options) {
  return await request('/social/es/act/discount/sku/list', options)
}


//查询佣金状态 接口
export async function getUserCommissionStatus(options) {
  return await request('/commission/user/getUserCommissionStatus', options)
};
// 礼包 查询用户等级
export async function getUserGradeByUserId(options){
    return await request('/user/getUserGradeByUserId',options)
};
// TODO 我的模块 END

// 周分红注册接口--注册
export async function weekDividendRegister(options) {
  return await request('/user/registryByPhone', options)
}
export async function isPhoneRegisterValidate(options) {
  return await request('/user/validatePhoneCertificate', options)
}

//首页  时间轴
export async function getActvListByTimeLineId(options) {
  return await request('/social/actv/getActvListByTimeLineId', options)
};

// 礼包 获取跑马灯 数据
export async function getBroadcast(options) {
  return await request('/commission/broadcast', options)
};
//app 我的店铺列表接口
export async function getUserShopGoodsList(options) {
  return await request('/social/user/shop/getUserShopGoodsList', options)
};
//app 查询用户基本信息
export async function getUserShopByUserId(options) {
  return await request('/social/user/shop/getUserShopByUserId', options)
};
//专题页信息
export async function getTopicTempSearch(topicId,options) {
  return await request(`/social/subject/topicTempSearch/${topicId}`, options)
}
//专题页信息2
export async function getTemplateListById(topicId,options) {
  return await request(`/social/subject/topic/${topicId}`, options)
}

// 专题页信息新版本
export async function getTopicTempSearchTwo(topicId,options) {
  return await request(`/social/subject/topic/temp/search/two/${topicId}`, options)
}
//频道页频道展示
export async function showChannel(options) {
  return await request('/social/channel/showChannel', options)
}
//我的店铺用户头像邀请码
export async function getUserInfoByUserId(options) {
  return await request('/user/getUserInfoByUserId', options)
}


//频道分类商品展示
export async function showCateGoods(options) {
  return await request('/social/channel/showCateGoods', options)
}

//购物车商品数量统计
export async function count(options) {
  return await request('/social/shopcar/count', options)
}
//查询当前优惠券可用商品
export async function getGoodsByUseCouponsId(options) {
  return await request("/order/getGoodsByUseCouponsId", options)
}

//微信配置
export async function config(options) {
  return await request("/order/wechat/share/config", options)
}

//商品分享链接
export async function getShareUrl(options) {
  return await request("/social/share/getShareUrl", options)
}

export async function getRegion(options) {
  return await request("/user/dict/region", options)
}
//文章详情接口
export async function article(options) {
  return await request("/social/article/detail", options)
}

//文章点赞

export async function materialLike(options) {
  return await request("/social/productmaterial/materialLike", options)
}
//发现详情
export async function getProductMaterialInfo(options) {
  return await request("/social/productmaterial/getProductMaterialInfo", options)
}

//发票详情
export async function getInvoiceDetailByOrderSn(options) {
  return await request("/order/invoice/getInvoiceDetailByOrderSn", options)
}
//获取发票下载链接
export async function getInvoiceDownloadUrl(options) {
  return await request("/order/invoice/getInvoiceDownloadUrl", options)
}
//保存发票信息
export async function insertInvoice(options) {
  return await request("/order/invoice/insertInvoice", options)
}

//根据商品id查询商品评论
export async function getCommentsBySku(options) {
  return await request("/social/comment/getCommentsBySku", options)
}
//新增商品评论  myUsers
export async function addComment(options) {
  return await request("/order/comment/addComment", options)
}

//店铺分享链接
export async function getShareUrlByUserShop(options) {
  return await request("/social/share/getShareUrlByUserShop", options)
}
//购物车批量收藏
export async function collectAddList(options) {
  return await request("/social/collection/addList", options)
}
//获取ab礼包佣金
export async function getGiftReward(options) {
  return await request("/commission/commissionConfig/getGiftReward", options)
}
//购物车商品选中
export async function cartIsSelected(options) {
  return await request("/social/shopcar/isSelected", options)
}
//退货商品寄回 物流公司列表
export async function shippings(options) {
  return await request("/social/dict/shippings", options)
}

//礼包替换接口  验证邀请码
export async function getUserInfoByInvitationCode(options) {
  return await request("/commission/user/getUserInfoByInvitationCode", options)
}
//礼包替换接口  通过邀请码获取用户userid
export async function getUserByInvitationCode(options) {
  return await request("/commission/user/getUserByInvitationCode", options)
}
//礼包替换接口  通过userid 获取用户信息
export async function getUserPhotoName(options) {
  return await request("/social/user/get/photo/name", options)
}

//查询前端用户可用红包列表
export async function getRedPacketListByUserId(options) {
  return await request("/order/redPacketReceiptsLog/getRedPacketListByUserId", options)
}



//查询用户红包使用记录列表
export async function hbgetUseListByUserId(options) {
  return await request("/order/redPacketUseLog/getUseListByUserId", options)
}
//查询用户红包使用详情
export async function getUseDetailByOrderSn(options) {
  return await request("/order/redPacketUseLog/getUseDetailByOrderSn", options)
}

//查询店铺商品
export async function shopList(options) {
  return await request("/social/self/support/shop/list", options)
}

//中奖人列表
export async function luckList(options) {
  return await request("/order/insane/luck/list", options)
}

//卖霸等活动列表

export async function queryGoodsSaleInfo(options) {
  return await request("/commission/deposit/queryGoodsSaleInfo", options)
}
export async function queryGoodsSaleInfo11(options) {
  return await request("/commission/deposit/queryGoodsSaleInfo11", options)
}
// 年会盛宴活动数据
export async function queryGoodsSaleInfoForAnnulFeast(options) {
  return await request("/commission/deposit/queryGoodsSaleInfoForOrder", options)
}

//直播地址
export async function getLiveURL(options) {
  return await request("/social/plug/get/play/url", options)
}
//直播广场
export async function getLiveListData(options) {
  return await request("/social/plug/get/play/all/info", options)
}
//我的关注
export async function getMyliveAttention(options) {
  return await request("/social/plug/get/play/attention/info", options)
}
//本场商品
export async function getLiveGoodsList(options) {
  return await request("/social/live/query/goods/all", options)
}
//本场点亮商品
export async function getLiveLightGoods(options) {
  return await request("/social/live/query/goods/lighten", options)
}
//直播点击关注主播
export async function attentionAnchor(options) {
  return await request("/social/fans/play/live/attention", options)
}
//取消关注 主播
export async function cancelAttentionAnchor(options) {
  return await request("/social/fans/play/cancel/live/attention", options)
}
//点赞主播 观看主播
export async function likesAnchor(options) {
  return await request("/social/fans/play/live/like", options)
}
//判断用户是否开通直播
export async function live(options) {
  return await request("/social/open/user/check/live", options)
}
//店主直播主页已播商品列表 主播端
export async function livedList(options) {
  return await request("/social/live/goods/lived/list", options)
}
//店主直播主页已播商品列表 粉丝端
export async function livedListfans(options) {
  return await request("/social/live/goods/lived/fans/list", options)
}
//获取店铺主播粉丝等数据 主播端
export async function liveInfo(options) {
  return await request("/social/host/play/live/info", options)
}


//幸运大转盘 ---- 活动信息
export async function wheelInfo(options) {
  return await request("/activity/lucky/wheel/info", options)
}

//幸运大转盘 ---- 参与抽奖
export async function luckDraw(options) {
  return await request("/activity/lucky/wheel/luck/draw", options)
}

//幸运大转盘 ---- 中奖列表
export async function prizeList(options) {
  return await request("/activity/lucky/wheel/winning/prize/list", options)
}

//幸运大转盘 ---- 获取剩余抽奖次数
export async function drawNum(options) {
  return await request("/activity/lucky/wheel/luck/draw/num", options)
}
//获取店铺主播粉丝等数据 粉丝端
export async function liveInfofans(options) {
  return await request("/social/fans/play/live/info", options)
}
//获取主播的最近开播的直播状态和数量以及是否关注  粉丝端
export async function liveInfoMore(options) {
  return await request("/social/live/goods/live/fans/info", options)
}
//直播 查询开放的功能列表
export async function searchAllInfoLive(options) {
  return await request("/social/setting/search/all/info", options)
}
//通过邀请啊吗 获取昵称
export async function getNickname(options) {
  return await request("/social/user/get/info/code", options)
}

// 获取砍价任务详情--app端
export async function taskDetail(options) {
  return await request("/activity/bargain/goods/task/detail", options)
} 

//商品详情页获取默认地址 --app端 
export async function jdAddressFetch(options) {
  return await request("/order/jd/address/fetch", options)
} 
//校验jd商品库存-code为1000表示请求成功
export async function jdStockCheck(options) {
  return await request("/order/jd/stock/check", options)
} 

// 首单专区、特惠专区商品列表
export async function activityGoodsList(options) {
  return await request("/activity/bargain/goods/html/activity/goods/show", options)
}
// 砍价任务弹窗
export async function chopMissionMsgTips(options) {
  return await request("/activity/bargain/goods/task/show/detail", options)
}
// 获取砍价任务详情/砍价记录/砍价攻略
export async function chopLogs(options) {
  return await request("/activity/bargain/goods/html/get/bagain/detail", options)
}
// 砍价（V）
export async function choping(options) {
  return await request("/activity/bargain/executeBargain", options)
}
//抢券商品详情
export async function cshopList(options) {
  return await request(`/social/bargain/preferential/goods/${options.skuId}`, options)
}
//更多特惠列表
export async function recommend(options) {
  return await request("/social/activity/bargain/marketing/preferential/recommend", options)
}
//更多特惠首图
export async function fristImg(options) {
  return await request(`/activity/bargain/config/banner/url?paramKey=ACTIVITY_BANNER_URL`, options)
}
//卡密兑换红包(app端) 
export async function giveForSecretKey(options) {
  return await request(`/order/redeemCodeDetail/giveForSecretKey`, options)
}
// 红包雨活动 打开红包
export async function openRedPacket(options) {
  return await request(`social/rprain/openRedPacket`, options)
}
// 红包雨活动 结束我的红包雨活动
export async function endRpRainAct(options) {
  return await request(`social/rprain/endRpRainAct`, options)
}
// 红包雨活动 检查用户是否还能参加活动
export async function checkUserCanParti(options) {
  return await request(`social/rprain/checkUserCanParti`, options)
}
// 红包雨活动 参与红包雨活动
export async function partiRpRainAct(options) {
  return await request(`social/rprain/partiRpRainAct`, options)
}
