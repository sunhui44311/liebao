<template>
  <view id="choice">
    <u-index-list :scrollTop="scrollTop">
      <view v-for="(item, index) in indexList" :key="index">
        <u-index-anchor :index="item" />
        <view class="list-cell" @click.stop="click(i)" v-for="(i, j) in screen(item)" :key="j">
          {{ i.name }}
        </view>
      </view>
    </u-index-list>
  </view>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "index.scss";
</style>