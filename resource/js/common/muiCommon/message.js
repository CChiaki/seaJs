define(function(require, exports, modules) {
	var mui = require('mui');
	var message = function(fn) {
		this.getData = [];
		this.index = 0;
		this._init(fn);
	};
	message.prototype = {
		_init: function(fn) {
			var $this = this;
			var messageArray;
			var $userId = localStorage.getItem("userId");
			var $relativePath = "_documents/";
			plus.io.resolveLocalFileSystemURL($relativePath, function(entry) {
				entry.getDirectory("userId_" + $userId, {
					create: true,
					exclusive: false
				}, function(entryChild) {
					entryChild.getFile('message.txt', {
						create: true,
						exclusive: false
					}, function(entryTxt) {
						entryTxt.file(function(file) {
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, 'utf-8');
							fileReader.onloadend = function(evt) {
								if (!evt.target.result) {
									messageArray = [];
								} else {
									messageArray = JSON.parse(evt.target.result);
								}
								$this.getData = messageArray;
								!!fn && fn.call($this);
							}
						});
					}, function() {
						mui.toast("获取子目录内容失败！");
					});
				}, function() {
					mui.toast("获取子目录文件夹失败！");
				});
			}, function() {
				mui.toast("获取主目录文件夹失败！");
			});

		},
		changeMessageList: function() {
			var $messageIndex = plus.webview.getWebviewById("message-main");
			mui.fire($messageIndex, "mesReload");
		},
		findOne: function(data) {
			var flag = -1;
			for (var i = 0; i < this.getData.length; i++) {
				if (this.getData[i]['toTeamId'] == data['toTeamId'] && this.getData[i]['toUserId'] == data['toUserId']) {
					//更新数据结构
					flag = i;
				}
			}
			return flag;
		},
		addOne: function(data) {
			var flag = this.findOne(data);
			data['isDelete'] = false;
			data['num'] = 0;
			if (flag == -1) {
				this.getData.push(data);
				this.index = this.getData.length-1;
			} else {
				this.getData[flag] = data;
				this.index = flag;
			}
			return this;
		},
		deleteOne: function(id) {
			if (!!id) {
				this.getData[id]['isDelete'] == true;
			}
			return this;
		},
		_toString: function() {
			return JSON.stringify(this.getData);
		},
		_end: function(refresh, fn) {
			var $this = this;
			var $userId = localStorage.getItem("userId");
			var $relativePath = "_documents/";
			plus.io.resolveLocalFileSystemURL($relativePath, function(entry) {
				entry.getDirectory("userId_" + $userId, {
					create: true,
					exclusive: false
				}, function(entryChild) {
					entryChild.getFile('message.txt', {
						create: true,
						exclusive: false
					}, function(entryTxt) {
						entryTxt.createWriter(function(write) {
							write.onwrite = function() {
								if (refresh == true) {
									$this.changeMessageList();
								};
								!!fn && fn();
							}
							write.onerror = function(e) {
								mui.toast("写入本地缓存失败！");
							}
							write.write($this._toString());
						}, function(error) {
							mui.toast("写入本地缓存失败！");
						});
					}, function() {
						mui.toast("获取子目录内容失败！");
					});
				}, function() {
					mui.toast("获取子目录文件夹失败！");
				});
			}, function() {
				mui.toast("获取主目录文件夹失败！");
			});
		},
		endNoRefresh: function(fn) {
			this._end(false, fn);
		},
		end: function(fn) {
			this._end(true, fn);
		},
		readMessage: function(id, fn) {
			var $this = this;
			var messageArray;
			var $userId = localStorage.getItem("userId");
			var $relativePath = "_documents/";
			plus.io.resolveLocalFileSystemURL($relativePath, function(entry) {
				entry.getDirectory("userId_" + $userId, {
					create: true,
					exclusive: false
				}, function(entryChild) {
					entryChild.getFile('message_' + id + '.txt', {
						create: true,
						exclusive: false
					}, function(entryTxt) {
						entryTxt.file(function(file) {
							var fileReader = new plus.io.FileReader();
							fileReader.readAsText(file, 'utf-8');
							fileReader.onloadend = function(evt) {
								if (!evt.target.result) {
									messageArray = [];
								} else {
									messageArray = JSON.parse(evt.target.result);
								};
								!!fn && fn(messageArray, entryTxt);
							}
						});
					}, function() {
						mui.toast("获取子目录内容失败！");
					});
				}, function() {
					mui.toast("获取子目录文件夹失败！");
				});
			}, function() {
				mui.toast("获取主目录文件夹失败！");
			});
		},
		writeMessage: function(id, data) {
			this.readMessage(id, function(message, entryTxt) {
				message.push(data);
				entryTxt.createWriter(function(write) {
					write.onwrite = function() {

					}
					write.onerror = function(e) {
						mui.toast("写入本地缓存失败！");
					}
					write.write(JSON.stringify(message));
				}, function(error) {
					mui.toast("写入本地缓存失败！");
				});
			})
		}
	}

	return message;
});