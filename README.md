web-frontend
========

web-frontend
## 介绍
web-frontend 一个基于seajs的前端框架




##目录介绍
```dart
-----------------------------
--common 插件目录
-----autocomplete
-----blockUI
-----charts
-----cookie
-----dataPicker
-----dataSheet
-----dialog
-----expression
-----form
-----linkage
-----Location
-----MsgBox
-----page
-----pop
-----swfupload
-----template
-----timepickerAddon
--libs 基本库
-----backbone
-----d3
-----Highcharts
-----html5
-----jquery
-----json
-----seajs
-----underscore
--models 页面逻辑
-----
--test 测试页面
------
```

##框架的使用
```js
<script src="http://xxxx.com/app/libs/seajs/sea2.0.0.js"></script>
<script>
    seajs.use("http://xxxx.com/app/router.js", function(route) {
        route.load("cookie#, test/index");
    });
</script>
```

```js
<script type="text/javascript" src="http://xxxxx.com/app/libs/seajs/sea2.0.0.js" data-main="http://xxxxx.com/app/router.js"></script>
```

##组件介绍
详细的组件使用介绍，请参考各个组件的git