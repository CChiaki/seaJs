define(function(require, exports, modules) {

	var webstocket = function(data) {
		this.data = {
			ip: data.ip,
			port: data.port,
			openCallback: data.openCallback,
			closeCallBack: data.closeCallBack,
			receiveCallBack: data.receiveCallBack
		};
		this.webStocket = null;
		this._init(this.data);
	};
	webstocket.prototype = {
		_init: function(data) {
			ws = new window.WebSocket("ws://" + data.ip + ":" + data.port);

			ws.onopen = function() {
				!!data.openCallback && data.openCallback();
			};
			ws.onmessage = function(e) {
				!!data.receiveCallBack && data.receiveCallBack(e.data);
			};
			ws.onclose = function() {
				!!data.closeCallBack && data.closeCallBack();
			};
			ws.onerror = function(e) {
				ws.onclose();
			};
			this.webStocket = ws;
		}

	}

	return webstocket;
});