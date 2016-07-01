define(function(require, exports, modules) {
	var $ = require('jquery');
	var active = {
		init: function(fn) {
			!!fn & fn();
		}
	};
	active.init(function() {
		$('body').css('min-height',$('html').height());
		$('body').show();
	});

})