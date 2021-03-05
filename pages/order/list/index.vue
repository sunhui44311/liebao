<template>
  <view id="list">
    <view class="nav">
      <view class="title">订单</view>
      <image src="@/static/image/sousuo.png" class="icon" />
    </view>
    <u-tabs-swiper
      ref="uTabs"
      :list="tabs"
      :current="current"
      @change="tabsChange"
      :is-scroll="true"
      active-color="#FA6F06"
      inactive-color="#9EA7B7"
    ></u-tabs-swiper>
    <swiper
      :current="swiperCurrent"
      @transition="transition"
      @animationfinish="animationfinish"
      style="flex: 1"
    >
      <swiper-item v-for="(item, index) in tabs" :key="index">
        <scroll-view scroll-y @scrolltolower="onreachBottom">
          <view class="order-list" v-if="current == 0">
            <view class="order" @click.stop="order_Click">
              <view class="head">
                <view class="title">订单编号：#{{ swiperCurrent }}</view>
                <view class="state">{{ item.name }}</view>
              </view>
              <view class="order-info">
                <view class="piece-info">
                  <view class="sou">
                    <view class="icon-box">
                      <image src="@/static/image/sou.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        上海安慧里1区88号楼1单元州001
                      </view>
                      <view style="display: flex">
                        <view class="user-name">闪先生</view>
                        <view class="phone">18015469999</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        上海安慧里1区88号楼1单元州001
                      </view>
                      <view style="display: flex">
                        <view class="user-name">闪先生</view>
                        <view class="phone">18015469999</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button class="btn" size="mini" plain shape="circle"
                      >取消订单</u-button
                    >
                    <u-button class="btn" size="mini" shape="circle"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    6.00
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" >
@import "index.scss";
</style>