<template>
  <view id="list">
    <view class="nav">
      <view class="title">订单</view>
      <image src="@/static/image/sousuo.png" class="icon" />
    </view>
    <u-tabs-swiper
	  :is-fixed="true"
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
      :bottom="-20"
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
    <u-popup
      v-model="show"
      mode="bottom"
      border-radius="14"
      :mask-close-able="false"
      :closeable="false"
    >
      <view class="pop-nav">
        <view class="pop-tlt">取消订单</view>
        <text class="cancel" @click.stop="handletouchstart">取消</text>
      </view>
      <view class="menu-list">
        <u-row gutter="30">
          <u-col span="6">
            <view
              :class="['cell', { 'select-cell': cancelReason == '无骑手接单' }]"
              @click="cancelReason = '无骑手接单'"
              >无骑手接单</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '骑手接单后不取货' },
              ]"
              @click="cancelReason = '骑手接单后不取货'"
              >骑手接单后不取货</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '骑手电车装载不下' },
              ]"
              @click="cancelReason = '骑手电车装载不下'"
              >骑手电车装载不下</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '骑手服务态度恶劣' },
              ]"
              @click="cancelReason = '骑手服务态度恶劣'"
              >骑手服务态度恶劣</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '骑手要求取消订单' },
              ]"
              @click="cancelReason = '骑手要求取消订单'"
              >骑手要求取消订单</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '信息填写错误' },
              ]"
              @click="cancelReason = '信息填写错误'"
              >信息填写错误</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="[
                'cell',
                { 'select-cell': cancelReason == '计划有变,不需要配送' },
              ]"
              @click="cancelReason = '计划有变,不需要配送'"
              >计划有变,不需要配送</view
            >
          </u-col>
          <u-col span="6">
            <view
              :class="['cell', { 'select-cell': cancelReason == '其他原因' }]"
              @click="cancelReason = '其他原因'"
              >其他原因</view
            >
          </u-col>
        </u-row>
      </view>
      <textarea
        class="txtarea"
        v-model="cancelReason2"
        placeholder="请输入其他原因"
      ></textarea>
      <view class="submit" @click="qrcancel">提交</view>
    </u-popup>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" >
@import "index.scss";
</style>