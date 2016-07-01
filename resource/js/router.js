var _version = "20160701";

seajs.config({

	alias: {
		"jquery": "js/libs/jquery/jquery-1.7.2-min",
		"unslider": "js/common/unslider/unslider",
	},

	paths: {
		'gallery': ''
	},

	map: [
		['.js', '.js?v=' + _version],
		['.css', '.css?v=' + _version]
	],

	plugins: [''],

	preload: [document.all ? 'libs/json/ ' : "", "css/pages/index.css"],

	debug: false,

	base: '/seaJs/seaJs/resource/',//根据项目配置对应的请求路劲

	charset: 'utf-8'
});