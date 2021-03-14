import MescrollMixin from "../../../components/mescroll-uni/mescroll-mixins.js"
import MescrollUni from "../../../components/mescroll-uni/mescroll-uni.vue"
export default {
    mixins: [MescrollMixin],
    data() {
        return {
            tabs: [{
                name: '待接单',
                id: 1
            }, {
                name: '待取货',
                id: 2
            }, {
                name: '配送中',
                id: 3
            }, {
                name: '已完成',
                id: 4
            }, {
                name: '已取消',
                id: -1
            }, {
                name: '待支付',
                id: 0
            }],
            cancelReason: '',
            cancelReason2: '',
            current: 0,
            show: false,
            showAmount: false,
            selectAmount2: '',
            showAmountInput: false,
            selectAmount: '',
            amounts: [
                {
                    label: '1元',
                    value: 1
                },
                {
                    label: '2元',
                    value: 2
                },
                {
                    label: '5元',
                    value: 5
                },
                {
                    label: '10元',
                    value: 10
                },
                {
                    label: '15元',
                    value: 15
                },
                {
                    label: '20元',
                    value: 20
                },
                {
                    label: '30元',
                    value: 30
                },
                {
                    label: '50元',
                    value: 50
                },
                {
                    label: '其他金额',
                    value: '其他'
                }
            ],
            order: null,
            listTop: 210,
            query: {
                pageNum: 1,
                pageSize: 10,
            },
            upOption: {
                page: {
                    num: 0,
                    size: 10 // 每页数据的数量
                },
                isBounce: true,
                textNoMore: '没有更多数据',
                noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
                empty: {
                    use: true,
                    icon: '../'
                }
            },
            list: []

        };
    },
    onBackPress(){
        console.warn(111);
    },
    methods: {
        downCallback() {
            this.reset_updata()
        },
        upCallback() {
            this.updata()
        },
        // 用于初始化一些数据
        init() {
            let dlzt = uni.getStorageSync('token') ? true : false
            if (!dlzt) {
                uni.navigateTo({
                    url: '/pages/login/loginHome'
                });
            } else {
                this.http_marker()
            }
            if(this.mescroll){
                this.mescroll.resetUpScroll()
            }
        },
        order_Click(id) {
            uni.navigateTo({
                url: `/pages/order/deliveryOrderDetail?id=${id}`
            })
        },
        // 用于更新一些数据
        updata() {
            let params = {
                url: "app/order/list",
                method: "GET",
                data: {
                    status: this.tabs[this.current].id,
                    pageNum: this.query.pageNum,
                    pageSize: this.query.pageSize
                },
                callBack: (res) => {
                    this.list = [...this.list, ...res.data.data]
                    this.mescroll.endSuccess(res.data.data.length);
                    this.query.pageNum++
                },
                errCallBack: (error) => {
                    this.mescroll.endErr();
                }
            };
            this.$http.request(params);
        },
        tabsChange(index) {
            this.current = index;
            this.reset_updata()
        },
        cancelDd(item) {
            this.show = true
            this.order = item
        },
        qrcancel() {
            let params = {
                url: "app/order/cancel",
                method: "POST",
                data: {
                    orderId: this.order.id,
                    cancelReason: this.cancelReason == '其他原因' ? this.cancelReason2 : this.cancelReason
                },
                callBack: (res) => {
                    if (res.code == 200) {
                        uni.showToast({
                            title: "取消订单成功",
                            icon: "none",
                        });
                        this.handletouchstart()
                        this.reset_updata()
                    }
                },
            };
            uni.showLoading({
                title: "取消订单中",
                mask: true,
            });
            this.$http.request(params);
        },
        handletouchstart() {
            this.cancelReason = ''
            this.cancelReason2 = ''
            this.show = false
        },
        reset_updata() {
            this.query.pageNum = 1
            this.list = []
            this.updata()
        },
        http_marker() {
            let params = {
                url: "app/order/marker",
                method: "GET",
                data: {
                },
                callBack: (res) => {
                    let arr = [{
                        name: '待接单',
                        count: res.data.toBeReceivedNum,
                        id: 1
                    }, {
                        name: '待取货',
                        count: res.data.toBePickedNum,
                        id: 2
                    }, {
                        name: '配送中',
                        count: res.data.inDeliveryNum,
                        id: 3
                    }, {
                        name: '已完成',
                        count: res.data.completedNum,
                        id: 4
                    }, {
                        name: '已取消',
                        count: res.data.cancelNum,
                        id: '-1'
                    }, {
                        name: '待支付',
                        count: res.data.toBePaid,
                        id: 0
                    }]
                    this.tabs = arr
                },
            };
            this.$http.request(params);
        },
        usertip(item) {
            this.showAmount = true
            this.order = item
        },
        confirm_tip() {
            let params = {
                url: "app/order/tips",
                method: "POST",
                data: {
                    orderId: this.order.id,
                    cancelReason: this.selectAmount == '其他' ? this.selectAmount2 : this.selectAmount
                },
                callBack: (res) => {
                    if (res.code == 200) {
                        uni.showToast({
                            title: "加小费成功",
                            icon: "none",
                        });
                        this.handletouchstart()
                        this.reset_updata()
                    }
                },
            };
            uni.showLoading({
                title: "加小费中",
                mask: true,
            });
            this.$http.request(params);
        },
        minute_Click(item) {
            this.selectAmount = item.value
            if (item.value == '其他') {
                this.showAmountInput = true
            } else {
                this.showAmountInput = false
            }
        },
        cancelxf() {
            this.showAmount = false
            this.showAmountInput = false
            this.selectAmount = ''
            this.selectAmount2 = ''
        }
    },
    onShow() {
        this.init();
    },
    // 计算属性
    computed: {},
    // 包含 Vue 实例可用过滤器的哈希表。
    filters: {
        statetext(e) {
            let arr = [{
                key: 1,
                title: '待接单'
            }, {
                key: 2,
                title: '待取货'
            }, {
                key: 3,
                title: '配送中'
            }, {
                key: 4,
                title: '已完成'
            }, {
                key: '-1',
                title: '已取消'
            }, {
                key: 0,
                title: '待支付'
            },]
            if (!e) return ''
            let obj = arr.find(i => i.key == e)
            return obj.title
        }
    },
    // 在实例创建完成后被立即调用
    created() { },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() { },
    // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
    mounted() {
        this.$nextTick(() => { });
    },
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。
    beforeUpdate() { },
    // keep-alive 组件激活时调用。
    activated() { },
    // keep-alive 组件停用时调用。
    deactivated() { },
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    beforeDestroy() { },
    //Vue 实例销毁后调用。
    destroyed() { },
    // 当捕获一个来自子孙组件的错误时被调用。
    errorCaptured() { },
    // 包含 Vue 实例可用指令的哈希表。
    directives: {},
    // 一个对象，键是需要观察的表达式，值是对应回调函数。
    watch: {},
    // 组件列表
    components: {
        MescrollUni,
    },
};