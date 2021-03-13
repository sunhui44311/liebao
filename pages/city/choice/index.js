import {
		area
	} from '../../../common/js/city.js'
var pinyin = require('@/common/js/pinyin.js')
export default {
    data() {
        return {
			cityList:[],
            scrollTop: 0,
            indexList: [],
        };
    },
    methods: {
        // 用于初始化一些数据
        init() {
            this.update();
			let tempCityList=[]
			for(var i=0;i<area.length;i++){
				let childs=area[i].childs
				for(var j=0;j<childs.length;j++){
					let city=childs[j]
					let dic={
						'name':city.name,
						'id':city.id,
						'py':pinyin.pinyin.getFullChars(city.name)
					}
					tempCityList.push(dic)
				}
			}
			let cityList = this.data_letter_sort(tempCityList, 'py')
			this.cityList=cityList
			for(var key in this.cityList){
				this.indexList.push(key)
			}
        },
		click(i){
			uni.$emit('selectCity',i)
			uni.navigateBack({
				delta:1
			})
		},
        // 用于更新一些数据
        async update() {
            // const res = await this.$http.post('', {});
        },
		screen(item) {
			return this.cityList[item] ? this.cityList[item] : []
		},
		data_letter_sort(data, field) {
			var letter_reg = /^[A-Z]$/;
			var list = new Array();
			for (var i = 0; i < data.length; i++) {
				// 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
				list['#'] = new Array();
				// 首字母 转 大写英文
				let letter = (data[i][field]).substr(0, 1).toUpperCase();
				// 是否 大写 英文 字母
				if (!letter_reg.test(letter)) {
					letter = '#';
				}
				// 创建 字母 分组
				if (!(letter in list)) {
					list[letter] = new Array();
				}
				// 字母 分组 添加 数据
				list[letter].push(data[i]);
			}
			// 转换 格式 进行 排序；
			var resault = new Array();
			for (var key in list) {
				resault.push({
					letter: key,
					list: list[key]
				});
			}
			resault.sort(function(x, y) {
				return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
			});
			// # 号分组 放最后
			var last_arr = resault[0];
			resault.splice(0, 1);
			resault.push(last_arr);
		
			// 转换 数据 格式
			var json_sort = {}
			for (var i = 0; i < resault.length; i++) {
				json_sort[resault[i].letter] = resault[i].list;
			}
		
			return json_sort;
		}
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
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