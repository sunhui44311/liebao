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
        <scroll-view
          style="height: 100%"
          scroll-y
          @scrolltolower="onreachBottom"
        >
          <view class="order-list" v-if="item.id == 1">
            <view
              class="order"
              v-for="(i, j) in wait.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="order-list" v-if="item.id == 2">
            <view
              class="order"
              v-for="(i, j) in take.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="order-list" v-if="item.id == 3">
            <view
              class="order"
              v-for="(i, j) in delivery.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="order-list" v-if="item.id == 4">
            <view
              class="order"
              v-for="(i, j) in completed.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="order-list" v-if="item.id == '-1'">
            <view
              class="order"
              v-for="(i, j) in cancel.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="order-list" v-if="item.id == 0">
            <view
              class="order"
              v-for="(i, j) in staypay.list"
              :key="j"
              @click.stop="order_Click(i.id)"
            >
              <view class="head">
                <view class="title">订单编号：#{{ i.orderSn }}</view>
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
                        {{ i.receiptAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{
                          i.receiptContactName
                        }}</view>
                        <view class="phone">{{ i.receiptPhone }}</view>
                      </view>
                    </view>
                  </view>
                  <view class="fa">
                    <view class="icon-box">
                      <image src="@/static/image/fa.png" class="icon" />
                    </view>
                    <view class="user-info">
                      <view class="address">
                        {{ i.sendAddress }}
                      </view>
                      <view style="display: flex">
                        <view class="user-name">{{ i.sendContactName }}</view>
                        <view class="phone">{{ i.sendPhone }}</view>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="operation">
                  <view class="time">2021-01-25 20:30:05</view>
                  <view class="btn-box">
                    <u-button
                      class="btn"
                      size="mini"
                      plain
                      shape="circle"
                      @click="cancelDd(i)"
                      >取消订单</u-button
                    >
                    <u-button
                      class="btn"
                      size="mini"
                      shape="circle"
                      v-if="!i.useTip"
                      >加小费</u-button
                    >
                  </view>
                </view>
                <view class="news">
                  <image src="@/static/image/news.png" class="icon" />
                  <view class="text">全网推单中...</view>
                  <view class="price">
                    <view class="label">￥</view>
                    {{ i.totalAmount }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
    <u-modal v-model="show" show-cancel-button @confirm="qrcancel">
      <view class="slot-content" v-if="order">
        取消编号 {{ order.orderSn }} 的订单？
      </view>
    </u-modal>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" >
@import "index.scss";
</style>