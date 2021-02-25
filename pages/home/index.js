import globalData from '@/common/js/globalData.js'
export default {
    data() {
        return {
            windowHeight: 500,
			windowWidth:375,
			statusH:0,
			scrollTop:0
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
			console.log(2222)
			console.log(globalData)
			let titleHeight=64
			let statusBarHeight=22
			let naviBarHeight=44
			const res = uni.getSystemInfoSync()
			const system = res.platform
			statusBarHeight = res.statusBarHeight
			if (system === 'android') {
			titleHeight = (48 + statusBarHeight)
			} else if (system === 'ios') {
			titleHeight = (44 + statusBarHeight)
			}
			else if(system==='devtools'){
				titleHeight = (44 + statusBarHeight)
			}
			naviBarHeight=titleHeight-statusBarHeight
			globalData.statusBarHeight=statusBarHeight
			globalData.naviBarHeight=naviBarHeight
			globalData.titleHeight=titleHeight
			globalData.windowHeight=res.windowHeight
			globalData.windowWidth=res.windowWidth
			globalData.iphoneX=res.screenHeight>=812?true:false
            this.windowHeight = globalData.windowHeight
			this.windowWidth=globalData.windowWidth
			this.statusH=globalData.statusBarHeight
			console.log(this.windowHeight)
            this.update();
        },
		
		scroll(e){
			console.log(e)
			this.scrollTop = e.detail.scrollTop+60
			console.log(this.scrollTop)
		},
        // 用于更新一些数据
        async update() {
            // const res = await this.$http.post('', {});
        },
        go(url) {
            uni.navigateTo({
                url: url
            });
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