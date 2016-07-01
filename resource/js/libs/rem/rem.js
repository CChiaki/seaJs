(function(doc, win) {
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth)
					return;
				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
				//关闭页面载入
				doc.documentElement.style.webkitTouchCallout = "none"; //禁止弹出菜单
				doc.documentElement.style.webkitUserSelect = "none"; //禁止选中
			};
		if (!doc.addEventListener)
			return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);