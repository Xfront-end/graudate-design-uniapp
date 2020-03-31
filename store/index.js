import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const userInfo = {
	isLogin: false,
	_id: '',
	_openid: '',
	avatarUrl: '',
	department: '',
	gender: '',
	major: '',
	nickName: '',
	userName: ''
}

const newReply= {
	reply: []
}

const state = {
	userInfo,
	newReply
}
const store = new Vuex.Store({
	state,
	mutations: {
		login(state, userInfo) {
			state.userInfo = {
				isLogin: true,
				_id: userInfo._id,
				_openid: userInfo._openid,
				avatarUrl: userInfo.avatarUrl,
				department: userInfo.department,
				gender: userInfo.gender,
				major: userInfo.major,
				nickName: userInfo.nickName,
				userName: userInfo.userName
			}
		},
		
		pushNewReply(state, replyDetail) {
			state.newReply.reply.push(replyDetail)
		}
	},
	getters: {
		isLogin: state => state.userInfo.isLogin
	}
})

export default store
