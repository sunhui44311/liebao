<template>
  <view>
    <view class="box">
      <view class="tlt">重置密码</view>
      <view class="cell">
        <text class="pre">+86</text>
        <input v-model="mobile" style="flex: 1" placeholder="请输入手机号" />
      </view>
      <view class="cell">
        <input v-model="code" style="flex: 1" placeholder="请输入验证码" />
        <view class="send" @click.stop="send" v-if="show"> 获取验证码 </view>
        <view class="send" v-else> {{ count }}s </view>
      </view>
      <view class="cell">
        <input v-model="newPassword" style="flex: 1" placeholder="请输入密码" />
      </view>
      <view class="login" :style="{'opacity':enableLogin?1:0.5}" @click="submit">完成</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      newPassword: "",
      code: "",
      show: true,
      count: 0,
    }
  },
  computed:{
  	enableLogin(){
  		return this.mobile&&this.code&&this.newPassword
  	}
  },
  methods: {
    // 用于初始化一些数据
    init() {
      this.update();
    },

    // 用于更新一些数据
    async update() {
      // const res = await this.$http.post('', {});
    },
    send() {
      if (this.mobile == "") {
        uni.showToast({
          title: "手机号不能为空",
          icon: "none",
        });
        return;
      }
      let params = {
        url: "app/login/send/sms",
        method: "POST",
        data: {
          mobile: this.mobile,
          type: 2,
        },
        callBack: (res) => {
          this.show = false;
          this.count = 59;
          this.timer = setInterval(() => {
            this.count--;
            if (this.count <= 0) {
              this.show = true;
              clearInterval(this.timer);
            }
          }, 1000);
          uni.hideLoading();
        },
      };
      uni.showLoading({
        title: "正在发送",
      });
      this.$http.request(params);
    },
    submit() {
      if (this.code == "") {
        uni.showToast({
          title: "验证码不能为空",
          icon: "none",
        });
        return;
      }
      if (this.newPassword == "") {
        uni.showToast({
          title: "新密码不能为空",
          icon: "none",
        });
        return;
      }
      let params = {
        url: "app/login/password/change",
        method: "POST",
        data: {
          mobile: this.mobile,
          code: this.code,
          newPassword: this.newPassword,
        },
        callBack: (res) => {
          uni.showToast({
            title: "修改成功",
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
          uni.hideLoading();
          clearInterval(this.timer);
        },
      };
      uni.showLoading({
        title: "正在修改",
      });
      this.$http.request(params);
    },
  },
  // 计算属性
  computed: {},
  // 包含 Vue 实例可用过滤器的哈希表。
  filters: {},
  // 在实例创建完成后被立即调用
  created() {},
  // 在挂载开始之前被调用：相关的 render 函数首次被调用。
  beforeMount() {},
  // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.init();
    this.$nextTick(() => {});
  },
  // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
  beforeUpdate() {},
  // keep-alive 组件激活时调用。
  activated() {},
  // keep-alive 组件停用时调用。
  deactivated() {},
  // 实例销毁之前调用。在这一步，实例仍然完全可用。
  beforeDestroy() {},
  //Vue 实例销毁后调用。
  destroyed() {},
  // 当捕获一个来自子孙组件的错误时被调用。
  errorCaptured() {},
  // 包含 Vue 实例可用指令的哈希表。
  directives: {},
  // 一个对象，键是需要观察的表达式，值是对应回调函数。
  watch: {},
  // 组件列表
  components: {},
};
</script>

<style lang="scss" scoped>
.box {
  margin: 30px 24px;
}
.tlt {
  color: #0d1c40;
  font-size: 20px;
  margin-bottom: 30px;
}
.cell {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: solid 1px #cccccc60;
  .pre {
    color: #0d1c40;
    margin-right: 25px;
  }
}
.send {
  color: #e95008;
  font-size: 14px;
  margin-right: 40px;
}

.tip {
  color: #9ea7b7;
  font-size: 12px;
}
.login {
  height: 45px;
  background-color: #e95008;
  line-height: 45px;
  text-align: center;
  border-radius: 45px;
  color: white;
  font-size: 16px;
  margin: 40px 20px 12px 20px;
  opacity: 0.5;
}
</style>
