/**
 * @author zhengbiao
 */
define(function(require, exports, module) {
	var $ = require('jquery');
	var Pager = function(opts) {
		opts = $.extend(true, {
			btn : 'a[page]',
			frist : true,
			last : true,
			previous : true,
			next : true,
			anchor : 'javascript:;',
			text : {
				frist : '首页',
				last : '末页',
				previous : '上一页',
				next : '下一页'
			},
			className : {
				frist : 'page first',
				last : 'page last',
				previous : 'page prev',
				next : 'page next'
			},
			pages : {
				perPage : 10
			},
			range : 3,
			getHtml : function(type, i, pages) {
				if (type == '...') {
					return '<li><a href="javascript:;">...</a></li>';
				}
				if (type == 'previous' && i > 1) {
					return '<li><a page="' + i + '" href="javascript:;">'+this.text['previous']+'</a></li>';
				} else if (type == 'previous') {
					return '<li><a page="1" href="javascript:;">'+this.text['previous']+'</a></li>';
				}
				if (type == 'next' && i > pages.count) {
					return '<li><a href="javascript:;">'+this.text['next']+'</a></li>';
				} else if (type == 'next') {
					return '<li><a href="javascript:;"  page="' + i + '">'+this.text['next']+'</a></li>';
				}

				if (type == 'frist') {//&& pages.current == 1
					if (i == pages.current) {
						return '<li class="active"><a href="javascript:;">' + i + '</a></li>';
					} else {
						return '<li><a href="javascript:;"  page="' + i + '">' + i + '</a></li>';
					}
				}

				if (type == 'last') {//&& pages.current == pages.count
					if (i == pages.current) {
						return '<li class="active"><a href="javascript:;">' + i + '</a></li>';
					} else {
						return '<li><a href="javascript:;"  page="' + i + '">' + i + '</a></li>';
					}
				}
				if (i > 1 && i < pages.count) {
					if (i == pages.current) {
						return '<li class="active"><a href="javascript:;">' + i + '</a></li>';
					} else {
						return '<li><a href="javascript:;"  page="' + i + '">' + i + '</a></li>';
					}
				}
				//return '<li><a page="' + (i || "") + '" ' + ' class="' + (type == 'current' ? 'page se' : 'page') + '"' + ' href="' + (type == 'current' ? 'javascript:;' : (pages.anchor || this.anchor || '#')) + '">' + (this.text[type] || i) + '</a></li>';
			},
			callback : false //function (pages,$elm)
		}, opts);

		function _init(elm) {
			var _pages = $.extend({}, opts.pages);
			var _$elm = $(elm);
			var _status = 'init';
			var _page = {
				clear : function(pages) {
					_pages = $.extend({}, opts.pages, pages);
					_$elm.html('');
				},
				refresh : function(pages) {
					if (_status == 'init') {
						_$elm.delegate(opts.btn, "click", function() {
							var $elm = $(this);
							_pages.current = parseInt($elm.attr('page'), 10);
							if (opts.callback) {
								opts.callback(_pages, $elm);
							}
							_page.refresh(_pages);
						});
						_status = 'show';
					}
					$.extend(_pages, pages);

					if (_pages.count <= 1) {
						_$elm.html('');
						return;
					}

					var range = opts.range / 2 >> 0;
					var html = [];
					html.push("<ul>");
					if (opts.previous) {
						html.push(opts.getHtml('previous', _pages.current - 1, _pages));
					}
					if (opts.frist) {
						html.push(opts.getHtml('frist', 1, _pages));
					}
					var flag = true;
					for (var i = 1, len = _pages.count; i <= len; i++) {
						if (i == _pages.current) {
							flag = true;
							html.push(opts.getHtml('current', i, _pages));
						} else if (i == 1 || i == len) {
							flag = true;
							html.push(opts.getHtml('item', i, _pages));
						} else if (Math.abs(i - _pages.current) <= range) {
							flag = true;
							html.push(opts.getHtml('item', i, _pages));
						} else {
							if (flag == true) {
								flag = false;
								html.push(opts.getHtml('...', '...', _pages));
							}
						}
					}

					if (opts.last) {
						html.push(opts.getHtml('last', _pages.count, _pages));
					}
					if (opts.next) {
						html.push(opts.getHtml('next', _pages.current + 1, _pages));
					}
					html.push("</ul>");
					_$elm.html(html.join('')).show();
				}
			};
			_$elm.data('tweetPager', _page);
			return _page;
		}


		$(opts.selector).each(function() {
			_init(this);
		});
		return {
			refresh : function(selector, pages) {
				if (arguments.length == 1) {
					pages = selector;
					selector = opts.selector;
				}
				$(selector).each(function() {
					var pager = $(this).data('tweetPager');
					if (!!pager) {
						pager.refresh(pages);
					} else {
						_init(this).refresh(pages);
					}
				});
				return this;
			},
			clear : function(selector, pages) {
				if (arguments.length < 2) {
					pages = selector || {};
					selector = opts.selector;
				}
				$(selector).each(function() {
					var pager = $(this).data('tweetPager');
					if (!!pager) {
						pager.clear(pages);
					} else {
						_init(this).clear(pages);
					}
				});
				return this;
			}
		};
	};
	return Pager;
});
