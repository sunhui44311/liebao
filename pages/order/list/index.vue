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
    <mescroll-uni
      ref="mescrollRef"
      :top="listTop"
      :bottom="-64"
      @down="downCallback"
      :up="upOption"
      @init="mescrollInit"
      @up="upCallback"
    >
      <view class="order-list">
        <view
          class="order"
          v-for="(item, index) in list"
          :key="index"
          @click.stop="order_Click(item.id)"
        >
          <view class="head">
            <view class="title">订单编号：#{{ item.orderSn }}</view>
            <view class="state">{{ item.deliveryStatus | statetext }}</view>
          </view>
          <view class="order-info">
            <view class="piece-info">
              <view class="sou">
                <view class="icon-box">
                  <image src="@/static/image/sou.png" class="icon" />
                </view>
                <view class="user-info">
                  <view class="address">
                    {{ item.receiptAddress }}
                  </view>
                  <view style="display: flex">
                    <view class="user-name">{{ item.receiptContactName }}</view>
                    <view class="phone">{{ item.receiptPhone }}</view>
                  </view>
                </view>
              </view>
              <view class="fa">
                <view class="icon-box">
                  <image src="@/static/image/fa.png" class="icon" />
                </view>
                <view class="user-info">
                  <view class="address">
                    {{ item.sendAddress }}
                  </view>
                  <view style="display: flex">
                    <view class="user-name">{{ item.sendContactName }}</view>
                    <view class="phone">{{ item.sendPhone }}</view>
                  </view>
                </view>
              </view>
            </view>
            <view class="operation">
              <view class="time">{{ item.createTime }}</view>
              <view class="btn-box">
                <template
                  v-if="
                    item.deliveryStatus != 4 &&
                    item.deliveryStatus != 3 &&
                    item.deliveryStatus != -1
                  "
                >
                  <u-button
                    class="btn"
                    size="mini"
                    plain
                    shape="circle"
                    @click.stop="cancelDd(item)"
                    >取消订单</u-button
                  >
                  <u-button
                    class="btn"
                    size="mini"
                    shape="circle"
                    v-if="!item.useTip"
                    @click.stop="usertip"
                    >加小费</u-button
                  >
                </template>
              </view>
            </view>
            <view class="news">
              <image :src="item.logo" class="icon" />
              <view class="text">{{
                item.deliveryName ? item.deliveryName : "全网推单中..."
              }}</view>
              <view class="price">
                <view class="label">￥</view>
                {{ item.totalAmount }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </mescroll-uni>
    <order-status ref="orderStatus"></order-status>
    <u-modal
      v-model="show"
      title="确定放弃吗？"
      show-cancel-button
      @confirm="qrcancel"
    >
      <view class="slot-content" v-if="order"> 您确定要放弃下单吗 </view>
    </u-modal>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" >
@import "index.scss";
</style>