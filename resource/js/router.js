var _version = "20160606";
//加载样式文件
/**
 * 1:加载样式文件
 * 方案一：所有样式文件合并为一个文件，直接写死在preload 中
 * 方案二：一个页面一个样式文件，preload 中加载
 * 
 * 2:插件的加载
 * 加载插件的时候  一并加载插件需要的样式文件(默认样式文件)
 * 当有插件样式文件迭代的时候 需要在require(插件)过后在 require(新插件样式)
 * 
 * 3：版本号的管理
 * 通过map去映射 版本号，
 * 页面上只会有：cssReset seajs
 * 
 * 
 * 4：页面载入的时候实现loading 效果
 * 将需要载入的loading 效果实现在css Reset 中html结点中，具体参考css-reset-mobile.css
 * PC端的话 可以不用这个效果。 
 * 效果具体有css3 实现
 * 
 * 
 * 5：关于有的项目需要配置文件  有的项目 要配置测试接口 UAT 接口 这是环境接口。
 * 建议这块在：config 之前就配置好。
 * 可以放在preload 中。
 * */

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

	//方案一：preload: [document.all ? 'libs/json/json' : "", 'css/pages/index.css'],
	
	//方案二：preload: [document.all ? 'libs/json/json' : "", (function() {
	//	var pageName = location.pathname.match(/\/([0-9a-zA-Z]*).html/)[1];
	//	return 'css/pages/' + pageName + '.css';
	//})()],
	
	preload: [document.all ? 'libs/json/ ' : "", (function() {
		var pageName = location.pathname.match(/\/([0-9a-zA-Z\-\_]*).html/)[1];
		return 'css/pages/' + pageName + '.css';
	})()],

	debug: false,

	base: '/SeaJs/resource/',//根据项目配置对应的请求路劲

	charset: 'utf-8'
});