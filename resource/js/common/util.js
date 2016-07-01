define(function(require, exports, modules) {
	var $ = require('jquery');
	require('showLoading');
	var util = {};

	util.ajax = function(opt) {
		var $body = $('body', window.top.document);
		$body.showLoading({
			overlayWidth : $('html', window.top.document).width(),
			overlayHeight : $('html', window.top.document).height()
		});
		return $.ajax($.extend({
			dataType : 'json'
		}, opt)).done(function(data) {
			$body.hideLoading();
			if (data.code * 1 == -1) {
				util.alert(data.message);
			} else if (data.code * 1 == 1008) {
				
				if(!!window.isCLose){
					//alert("身份丢失，请从新登录！");
				}else{
					window.isCLose=true;
					alert("身份丢失，请从新登录！");
				}
				if (window.location.href.indexOf('/alp/admin/route/') > -1) {
					parent.window.location.href = "/alp/admin/route/n/index";
				} else if (window.location.href.indexOf('/alp/user/route/') > -1) {
					parent.window.location.href = "/alp/user/route/n/index";
				} else {
					parent.window.location.href = "/";
				}
			}

		}).fail(function(XMLHttpRequest, textStatus, errorThrown) {
			$body.hideLoading();
			if (XMLHttpRequest.status == 500) {
				console.log('服务器异常，请重试或者联系管理员');
			} else if (XMLHttpRequest.status == 404) {
				console.log('请求路径找不到，请重试或者联系管理员');
			} else if (XMLHttpRequest.status == 403) {
				console.log('用戶没有权限进行这个操作！');
			} else if (XMLHttpRequest.status == 401) {
				if (!!window.isNoAuth) {
					window.location.href = "/index.html";
				} else {
					window.isNoAuth = true;
					util.alert('身份丢失，请重新登录！');
					window.location.href = "/index.html";
				}
			} else if (XMLHttpRequest.status == 0) {
				console.log('服务器已停止，请重试或者联系管理员');
			} else {
				console.log('请求异常，请重试或者联系管理员');
			}
		});
	};
	
	return util;
});
