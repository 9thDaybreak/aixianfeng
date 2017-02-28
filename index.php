<?php
require_once("jssdk.php");
$jssdk = new jssdk("wxb741319102cc3ef2", "ab5b71caaf64c8f659e7e72b94320b88");
$signPackage = $jssdk->GetSignPackage();
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>微信JS-SDK</title>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<style>
		#btn{
			width: 60%;
			height: 5rem;
			border-radius: 0.1389rem;
			background-color: blue;
		}
		img{
			width: 100%
			height: 100%;
		}
		#myAddress{
			width: 60%;
			height: 20rem;
			background: green;
			margin:0 auto;
		}
	</style>
</head>
<body>
	<button id="btn">
		点击拍照!
	</button>
	<img id="img" src="" alt="">
	<button id="myAddress">
		点击获取地址!!
	</button>
</body>
<script type="text/javascript">
	var $=function(id){
		return document.querySelector(id);
	}
	wx.config({
		debug: true,
		appId: '<?php echo $signPackage["appId"] ?>',
		timestamp: <?php echo $signPackage["timestamp"] ?>,
		nonceStr: '<?php echo $signPackage["nonceStr"] ?>',
		signature: '<?php echo $signPackage["signature"] ?>',
		jsApiList:[
		'chooseImage',
		'previewImage',
		'uploadImage',
		'downloadImage',
		'openLocation',
		'getLocation'
		]
	})
	$('#btn').onclick = imgFn;
	function imgFn(){
		wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        $('#img').src = localIds[0];
    }
});
	}
	$('#myAddress').onclick = locol;
	function locol(){
		wx.getLocation({
    	type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    	success: function (res) {
        var mylatitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
        var mylongitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
        var myspeed = res.speed; // 速度，以米/每秒计
        var myaccuracy = res.accuracy; // 位置精度
        wx.openLocation({
    		latitude: mylatitude, // 纬度，浮点数，范围为90 ~ -90
    		longitude: mylongitude, // 经度，浮点数，范围为180 ~ -180。
    		name: '育知同创', // 位置名
    		address: '创业二路', // 地址详情说明
   	 		scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
   	 		infoUrl: 'www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
});
    }

});
	}

</script>
</html>