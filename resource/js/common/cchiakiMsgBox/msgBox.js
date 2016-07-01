/**
 * @author zhengbiao
 * 弹框组件
 *
 */

define(function(require, exports, module) {
	var $ = require("jquery");
	var T = require('template');
	var ObjProto = Object.prototype, toString = ObjProto.toString, isFunction = function(obj) {
		return toString.call(obj) == '[object Function]';
	}, isNumber = function(obj) {
		return toString.call(obj) == '[object Number]';
	}, isElement = function(obj) {
		return !!(obj && obj.nodeType == 1);
	};
	var MsgBox = function(opt) {
		this.id = "model_" + new Date().getTime();
		this.element = $('<div class="modal fade in" data-id="' + this.id + '" style="display:block;"></div>');
		this.msgBoxTemplate = ['<div class="modal-dialog">', '<div class="modal-content clearFix">', '<% if (isHaveTitle) {%>', '<div class="modal-header">', '<button type="button" class="close modal-close-x">&times;</button>', '<h4 class="modal-title"><%=title%></h4>', ' </div>', '<%}%>', '<div class="modal-body">', '<%=content%>', '</div>', '<% if (isHaveBtn) {%>', '<div class="modal-footer">', '<% if (isHaveCloseBtn) {%>', '<button type="button" class="btn btn-default modal-close"><%=cancel_txt%></button>', '<%}%>', '<% if (isHaveOkBtn) {%>', '<button type="button" class="btn btn-primary modal-ok"><%=ok_txt%></button>', '<%}%>', '</div>', '<%}%>', '</div>', '</div>'].join('');
		this.option = $.extend({
			title : "标题",
			content : "内容",
			ok_txt : "确认",
			cancel_txt : "取消",
			isHaveTitle : true,
			isHaveBtn : true,
			isHaveCloseBtn : true,
			isHaveOkBtn : true,
			closeElement : ".modal-close-x"
		}, opt);
	};
	MsgBox.prototype.render = function() {
		var self = this;
		this.mark = $('<div class="modal-backdrop fade in"></div>');
		if ($('body').find('.modal-backdrop').length == 0) {
			$('body').append(this.mark);
			$('body').addClass('modal-open');
		}
		$('body').append(this.element);
		$(this.element).delegate(this.option.closeElement, 'click', function() {
			self.close();
		});
	};
	MsgBox.prototype.close = function() {
		$(this.element).remove();
		$(this.mark).remove();
		if ($('body').find('.modal-backdrop').length == 0) {
			$('body').removeClass('modal-open');
		}

	};
	MsgBox.prototype.setContent = function(htmlObj) {
		if (isElement(htmlObj.content)) {
			var ele = htmlObj.content;
			htmlObj.content = "";
		}
		var html = T.template(this.msgBoxTemplate, $.extend(this.option, htmlObj));
		$(this.element).html(html);
		var width = $('.modal-body').width() + 40;

		var top = window.screen.height / 2 - $('.modal-dialog').height() / 2-100;
		
		if (top < 0) {
			top = 10;
		}
		if (width < 200) {
			var left = window.screen.width / 2 - 200 / 2;
		} else {
			var left = window.screen.width / 2 - width / 2;
		}

		$('.modal-dialog').css({
			top : top,
			left : left,
			width : width < 200 ? 200 : width
		});
	};
	MsgBox.prototype.alert = function(title, content, fn) {
		var self = this;
		this.render();
		this.setContent({
			title : title || "提示信息",
			content : content || "",
			isHaveCloseBtn : false
		});

		var self = this;
		if (isFunction(fn)) {
			this.ok = function() {
				if (fn() !== false) {
					self.close();
				}
			};
			$(this.element).undelegate(".modal-ok", "click");
			$(this.element).delegate(".modal-ok", "click", this.ok);
		}
		return this;
	};

	MsgBox.prototype.confirm = function(title, content, fn_ok, fn_close) {
		var self = this;
		this.render();
		this.setContent({
			title : title || "确认信息",
			content : content || ""
		});
		var self = this;
		if (isFunction(fn_ok)) {
			this.ok = function() {
				if (fn_ok() !== false) {
					self.close();
				}
			};
			$(this.element).undelegate(".modal-ok", "click");
			$(this.element).delegate(".modal-ok", "click", this.ok);
		}
		if (isFunction(fn_close)) {
			this._close = function() {
				if (fn_close() !== false) {
					self.close();
				}
			};
			$(this.element).delegate(".modal-close", "click", this._close);
		}
	};
	MsgBox.prototype.tip = function(title, content, t, fn) {
		var that = this;
		this.render();
		this.setContent({
			title : title || "提示信息",
			content : content || "",
			isHaveCloseBtn : false
		});
		if (isFunction(fn)) {
			// $(this.element).undelegate(".modal-ok", "click");
			// $(this.element).delegate(".modal-ok", "click", fn);
			this.ok = function() {
				if (fn() !== false) {
					that.close();
				}
			};
			$(this.element).undelegate(".modal-ok", "click");
			$(this.element).delegate(".modal-ok", "click", this.ok);
		}
		var delay = function(func, wait) {
			var args = Array.prototype.slice.call(arguments, 2);
			return setTimeout(function() {
				return func.apply(func, args);
			}, wait);
		}, range = function(start, stop, step) {
			if (arguments.length <= 1) {
				stop = start || 0;
				start = 0;
			}
			step = arguments[2] || 1;
			var len = Math.max(Math.ceil((stop - start) / step), 0);
			var idx = 0;
			var range = new Array(len);

			while (idx < len) {
				range[idx++] = start;
				start += step;
			}

			return range;
		};
		if (isNumber(t)) {
			t = Math.round(t);
			var T = range(t);
			var Ttimer;
			var title = $(".modal-ok").html();
			var slef = this;
			var tt;
			$(this.element).delegate(".modal-ok", "click", function() {
				clearTimeout(tt);
				$(".modal-ok").html(title.replace(/\(\d{0,3}\)/, ''));
			});
			(function() {
				Ttimer = arguments.callee;
				tt = delay(function(t) {
					var i;
					if ( i = T.pop()) {
						$(".modal-ok").html(title + "(" + i + ")");
						Ttimer();
					} else {
						t.close();
					}

				}, 1000, slef);
			})();
		}
	};
	return MsgBox;
});
