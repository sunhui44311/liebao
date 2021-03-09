<template>
	<view id="choice">
		<view class="search-box">
			<u-search v-model="keyword" placeholder="搜索" @change="searchChange" :show-action="false"></u-search>
		</view>
		<u-index-list :scrollTop="scrollTop">
			<view v-for="(item, index) in indexList" :key="index">
				<u-index-anchor :index="item" />
				<view class="list-cell" @click.stop="click(i)" v-for="(i, j) in screen(item)" :key="j">
					{{ i.displayName }}
				</view>
			</view>
		</u-index-list>
	</view>
</template>

<script>
	var pinyin = require('../../common/js/pinyin.js')
	export default {
		data() {
			return {
				keyword:'',
				scrollTop: 0,
				indexList: [
				],
				contact: {},
				allContacts:[]
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getContacts()
		},
		methods: {
			click(i) {
				uni.$emit('selectContact', i)
				uni.navigateBack({
					delta: 1
				})
			},
			screen(item) {
				return this.contact[item] ? this.contact[item] : []
			},
			
			searchChange(){
				let tempContacts=this.fuzzyQuery(this.allContacts,this.keyword)
				console.log(tempContacts)
				for (var i = 0; i < tempContacts.length; i++) {
					let contact = tempContacts[i]
					this.$set(contact, 'py', pinyin.pinyin.getFullChars(contact.displayName))
				}
				let contactList = this.data_letter_sort(tempContacts, 'py')
				this.contact = contactList
				this.indexList=[]
				for(var key in this.contact){
					
					this.indexList.push(key)
				}
			},
			
			getContacts: function() {
				let that = this
				// 获取通讯录对象  
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, function(addressbook) {
					// 查找联系人  
					addressbook.find(["displayName", "phoneNumbers"], function(contacts) {
						console.log('获取联系人成功')
						// console.log(contacts)
						that.allContacts=JSON.parse(JSON.stringify(contacts))
						for (var i = 0; i < contacts.length; i++) {
							let contact = contacts[i]
							that.$set(contact, 'py', pinyin.pinyin.getFullChars(contact.displayName))
						}
						let contactList = that.data_letter_sort(contacts, 'py')
						that.contact = contactList
						that.indexList=[]
						for(var key in that.contact){
							that.indexList.push(key)
						}
					}, function() {
						uni.showToast({
							title: '获取联系人失败',
							duration: 2000
						})
					}, {
						multiple: true
					});
				}, function(e) {
					uni.showToast({
						title: '获取通讯录对象失败:' + e.message,
						duration: 2000
					})
				});
			},
			
			fuzzyQuery(list, keyWord) {
				console.log(keyWord)
			    var reg =  new RegExp(keyWord);
			    var arr = [];
			    for (var i = 0; i < list.length; i++) {
			      if (reg.test(list[i].displayName)) {
			        arr.push(list[i]);
			      }
			    }
			    return arr;
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
		}
	}
</script>

<style lang="scss" scoped>
	#choice {
		.list-cell {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			padding: 10px 24rpx;
			overflow: hidden;
			color: #323233;
			font-size: 28upx;
			line-height: 24px;
			background-color: #fff;
			border-bottom: 1px solid #EEEEEE;

			&:last-child {
				border-bottom: none;
			}
		}
	}
	.search-box{
		background-color: white;
		padding: 8px 12px;
	}

	#choice /deep/ {}
</style>
