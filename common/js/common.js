const onPreviewImg = function(current, urls) {
	return new Promise((resolve, reject) => {
		uni.previewImage({
			current,
			urls
		}).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}

const validateName = (rule, value, callback) => {
	let reg = /^[\u2E80-\u9FFF]+$/;
	if (value && value.length > 0) {
		if (!reg.test(value)) {
			callback([new Error('姓名输入不合法')]);
		} else {
			callback();
		}
	} else if (value.length == 0) {
		callback();
	} else {
		callback(new Error('姓名输入不合法'));
	}
}

const write2cloudStroge = function(cloudPath, paramAblum) {
	const Ablum = []
	if(paramAblum.length != 0) {
		return new Promise((resolve, reject) => {
			paramAblum.forEach(item => {
				const ext = item.substr(item.lastIndexOf('.'))
				const fileName = Date.now() + '-' + (Math.random() * 1000 * 1000).toFixed(0) + ext
				wx.cloud.uploadFile({
					cloudPath: cloudPath + fileName,
					filePath: item
				}).then(res => {
					Ablum.push(res.fileID)
					if (Ablum.length === paramAblum.length) {
						resolve(Ablum)
					}
				})
			})
		})
	}else {
		return Promise.resolve(Ablum)
	}
}

const getUserInfo = function() {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success(res) {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserInfo({
						success: function(res) {
							resolve(res.userInfo)
						}
					})
				}else {
					resolve('')
				}
			}
		})
	})
}

const getUserInfoFromCloud = function() {
	return new Promise((resolve, reject) => {
		wx.cloud.callFunction({
			name: 'login'
		}).then(res => {
			resolve(res.result)
		}).catch(err => {
			console.log(err)
		})
	})
}

const isIdentified = function(openid) {
	const db = wx.cloud.database()
	return new Promise((resolve, reject) => {
		db.collection('user').where({
			_openid: openid
		}).get().then(res => {
			resolve(res.data.length)
		}).catch(err => {
			reject.log(err)
		})
	})
}

const translateToBase64 = function(ablum) {
	const base64Img = []
	if(ablum.length) {
		ablum.forEach(item => {
			base64Img.push(uni.getFileSystemManager().readFileSync(item, "base64"))
		})
		return base64Img
	}
}

export {
	onPreviewImg,
	validateName,
	write2cloudStroge,
	getUserInfo,
	getUserInfoFromCloud,
	isIdentified,
	translateToBase64
}
