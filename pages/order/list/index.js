export default {
    data() {
        return {
            list: [{
                name: '待接单',
                count: 2,
                id: 1
            }, {
                name: '待取货',
                id: 2
            }, {
                name: '配送中',
                count: 2,
                id: 3
            }, {
                name: '已完成',
                id: 4
            }, {
                name: '已取消',
                id: '-1'
            }, {
                name: '待支付',
                id: 0
            }],
            current: 0,
            swiperCurrent: 0,
            pageNum: 1,
            pageSize: 10
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
        },
		
		order_Click(){
			uni.navigateTo({
				url:'/pages/order/deliveryOrderDetail'
			})
		},
        // 用于更新一些数据
        async update() {
            // const res = await this.$http.post('', {});
            let params = {
                url: "app/order/list",
                method: "GET",
                data: {
                    status: 1,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                },
                callBack: (res) => {
                    console.warn(res);
                    uni.hideLoading();
                },
            };
            uni.showLoading({
                title: "加载中",
            });
            this.$http.request(params);
        },
        tabsChange(index) {
            this.swiperCurrent = index;
        },
        transition(e) {
            let dx = e.detail.dx;
            this.$refs.uTabs.setDx(dx);
        },
        animationfinish(e) {
            let current = e.detail.current;
            this.$refs.uTabs.setFinishCurrent(current);
            this.swiperCurrent = current;
            this.current = current;
        },
        onreachBottom() {

        }
    },
    // 计算属性
    computed: {},
    // 包含 Vue 实例可用过滤器的哈希表。
    filters: {},
    // 在实例创建完成后被立即调用
    created() { },
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    beforeMount() { },
    // el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
    mounted() {
        this.init();
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
    components: {},
};