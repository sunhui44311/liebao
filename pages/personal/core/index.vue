<template>
  <view id="core">
    <view class="head-back"> </view>
    <view class="user-core">
      <view class="nav">
        <view class="title">我的</view>
        <image src="~static/image/nl.png" class="icon"></image>
      </view>
      <view class="user-box">
        <view class="user-info">
          <view class="head">
            <image
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F07%2F20200607222012_lwusd.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616221777&t=7ee684e6ab371150ee6573252602e74a"
              class="img"
            ></image>
          </view>
          <view class="info">
            <view class="name">猎豹科技 <view class="label">商家</view></view>
            <view class="qm">欢迎你，来到猎豹Ai商家版</view>
          </view>
          <view class="icon">
            <image src="~static/image/fj2.png" class="img"></image>
          </view>
        </view>
        <view class="wallet">
          <view class="total">
            <view class="title"> 钱包余额 </view>
            <view class="num"> 0.00 </view>
          </view>
          <view class="recharge">
            <div class="btn">
              去充值
              <image src="~static/image/cz.png" class="icon"></image>
            </div>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>