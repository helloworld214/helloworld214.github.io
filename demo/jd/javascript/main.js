$(function(){
	/*1F 衣服鞋包tab选项卡切换效果开始*/
	$(".rtit li").first().children("span").css("display","none");
	$(".rtit li").mouseover(function(){
		var n=$(this).index();
		$(this).addClass("select").siblings().removeClass("select");
		$(this).children("a").css("color","#c81623").end().siblings().children().css("color","#666");
		$(this).children("span").css("display","none").end().siblings().children("span").css("display","inline-block");
		if(n>0){
			$(this).siblings().eq(n-1).children("span").css("display","none");
		}
	})
	/*1F 衣服鞋包tab选项卡切换效果结束*/

	/*1Ftab切换*/
	// $(".floor_c_r .qiehuan").hide();
	// $(".floor_c_r .qiehuan").first().show();
	// $("#f1-title li").click(function(){
	// 	$(".floor_c_r .qiehuan").eq($(this).index()).show().siblings().hide();
	// });

	/*右边栏点击弹出，再点击收回*/
	var i=1;
	$("#mylove div").click(function(){
		i++;
		if(i%2==0){
			$("#fixed-slide").animate({right:'0'});

		}
		else {
			$("#fixed-slide").animate({right:'-300px'});
			i=1;
		}
		// alert(i);
		$("#fixed-slide-right div").eq($(this).index()).show().siblings().hide();
	});

	/*左侧楼层导航定位*/
	var x=($(window).width()-1210)/2-$("#fixed-floor").width()+"px";
	$("#fixed-floor").css("left",x);
	$(window).resize(function(){
		var j=($(window).width()-1210)/2-$("#fixed-floor").width()+"px";
		$("#fixed-floor").css("left",j);
	});

	/*楼层效果不行，需要改进*/
	var arr=["服饰","美妆","手机"];
	var arr1=["1F","2F","3F"]
	$("#fixed-floor li").hover(function(){
		// $(this).addClass("none").siblings().removeClass("none");
		var index=$(this).index();
		// alert(index);
		$(this).children().html(arr[index]).css({"background":"red","color":"#fff"});
	},function(){
		var index=$(this).index();
		$(this).html(arr1[index]).css({"background":"#fff","color":"#625351"});
	})



	/*轮播图效果*/
	/*设置当前图片的索引值*/
	var now=0;

	/*获取单张图片的宽度值*/
	var imgwith=parseInt($(".flash_images li").first().css("width"));

	/*复制第一张图片、并根据原有图片数量建立控制圆点按钮*/
	var clone=$(".flash_images li").first().clone();
	$(".flash_images").append(clone);
	var size=$(".flash_images li").size();
	$(".flash_images").css({width:size*imgwith});

	/*焦点轮播图圆点控制按钮*/
	for(var i=0;i<size-1;i++){
		$("#flash_btn").append("<span>"+(i+1)+"</span>");
	}
	$("#flash_btn span").first().addClass("flash-active");

	/*轮播控制按钮水平居中*/
	var w=($(".flash").width()-$("#flash_btn").width())/2+'px';
	$("#flash_btn").css("right",w);

	/*轮播控制按钮鼠标移入效果*/
	$("#flash_btn span").mouseover(function(){
		var index=$(this).index();
		now=index;
		$(this).addClass("flash-active").siblings().removeClass("flash-active");
		$(".flash_images").stop().animate({left:-index*imgwith},500);
	});

	/*prve左箭头点击效果*/
	$("#prev").click(function(){
		now--;
		move();
	})

	/*next右箭头点击效果*/
	$("#next").click(function(){
		now++;
		move();
	})

	/*左右箭头点击切换核心运动函数*/
	function move(){
		if(now==size){
			$(".flash_images").css({left:0});
			now=1;
		}
		if(now==-1){
			$(".flash_images").css({left:-(size-1)*imgwith});
			now=size-2;
		}
		$(".flash_images").stop().animate({left:-now*imgwith},500);
		if(now==size-1){
			$("#flash_btn span").eq(0).addClass("flash-active").siblings().removeClass("flash-active");
		}else{
			$("#flash_btn span").eq(now).addClass("flash-active").siblings().removeClass("flash-active");
		}
	}

	/*自动播放*/
	var timer=setInterval(function(){
		now++;
		move();
	},2500);


	/*鼠标移入移出开关定时器*/
	$(".flash").hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(function(){
		now++;
		move();
	},2500);
	});


	/*左右箭头显示隐藏*/
	$(".flash").hover(function(){
		$("#prev").show();
		$("#next").show();
	},function(){
		$("#prev").hide();
		$("#next").hide();
	});

	/*tab切换效果*/
	/*设置初始状态*/
	$("#huafei").show();
	$(".leixing").first().show();
	$("#select div").first().css("display","inline-block");
	$("#buchong span").first().show();
	$(".hot a").first().show();
	$(".hot2 a").show();
	$(".chongzhi .sanjiao").eq(0).children("a").addClass("a-on");
	$(".jipiao-tit .sanjiao").eq(0).children("a").addClass("a-on");
	$(".dianying-tit .sanjiao").eq(0).children("a").addClass("a-on");
	$(".youxi-tit .sanjiao").eq(0).children("a").addClass("a-on");
	$(".chongzhi .sanjiao").eq(0).children("span").css("color","#b61d1d");
	$(".jipiao-tit .sanjiao").eq(0).children("span").css("color","#b61d1d");
	$(".dianying-tit .sanjiao").eq(0).children("span").css("color","#b61d1d");
	$(".youxi-tit .sanjiao").eq(0).children("span").css("color","#b61d1d");

	/*话费标签下：话费充值、流量充值、套餐变更鼠标移入效果及其他的对应切换*/
	$(".chongzhi .sanjiao").mouseover(function(){
		$(this).children("a").addClass("a-on").end().siblings().children("a").removeClass("a-on");
		$(this).children("span").css("color","#b61d1d").end().siblings().children("span").css("color","#fff");
		$("#leixing span").eq($(this).index()).show().siblings().hide();
		$("#select div").eq($(this).index()).css("display","inline-block").siblings().css("display","none");
		$("#buchong span").eq($(this).index()).show().siblings().hide();
		$(".hot a").eq($(this).index()).show().siblings().hide();
		$(".sanjiao span").eq($(this).index());
	});

	$(".jipiao-tit .sanjiao").mouseover(function(){
		var i=$(this).index();
		$(this).children("a").addClass("a-on").end().siblings().children("a").removeClass("a-on");
		$(this).children("span").css("color","#b61d1d").end().siblings().children("span").css("color","#fff");
		$(".jpcte").stop().animate({left:-i*240},500);
	});

	$(".dianying-tit .sanjiao").mouseover(function(){
		var i=$(this).index();
		$(this).children("a").addClass("a-on").end().siblings().children("a").removeClass("a-on");
		$(this).children("span").css("color","#b61d1d").end().siblings().children("span").css("color","#fff");
		$(".dybox").stop().animate({left:-i*240},500);
	});

	$(".youxi-tit .sanjiao").mouseover(function(){
		var i=$(this).index();
		$(this).children("a").addClass("a-on").end().siblings().children("a").removeClass("a-on");
		$(this).children("span").css("color","#b61d1d").end().siblings().children("span").css("color","#fff");
		$("#yx-cont").stop().animate({left:-i*240},500);
	});

	/*select根据选择不同的option改变不同价格或套餐的显示*/
	$("#rmb").change(function(){
		var txt=["¥9.8-¥11.0","¥19.6-¥21.0","¥29.4-¥31.0","¥49.0-¥50.0","¥98.0-¥100.0","¥196.0-¥200.0","¥294.0-¥300.0","¥490.0-¥500.0"];
		var i=$('#rmb option:selected').index();
		$("#buchong span").text(txt[i]);
	});
	$("#liuliang").change(function(){
		var txt=["¥7.5-¥11.0","¥9.95-¥20.0","¥19.9-¥20.5","¥29.0-¥29.9","¥49.0-¥50.0"];
		var i=$('#liuliang option:selected').index();
		$("#buchong span").text(txt[i]);
	});
	$("#yuefei").change(function(){
		var txt=["50分钟，300M流量","50分钟，500M流量","100分钟，500M流量","220分钟，700M流量","500分钟，1G流量",
				 "500分钟，2G流量","1000分钟，2G流量","1000分钟，3G流量","2000分钟，3G流量","4000分钟，6G流量",];
		var i=$('#yuefei option:selected').index();
		$("#buchong span").text(txt[i]);
	});

	/*Tab标题切换效果*/
	$(".service_tab li").first().children().css({color:"red",background:"#fff",borderTop:"2px solid red",borderBottom:"none",paddingTop:"0"});
	$(".service_tab li").mouseover(function(){
		$(this).children().css({color:"red",background:"#fff",borderTop:"2px solid red",borderBottom:"none",paddingTop:"0"});
		$(this).siblings().children().css({color:"#666",background:"#fff",borderTop:"none",borderBottom:"1px solid #c4c4c4",paddingTop:"2px"});
		$(".service-cont").children("div").eq($(this).index()).show().siblings().hide();
	});


	/*判断单选框选中*/
	$("#FC1").hide();
	$("#FC2").show();
	$("#WF1").click(function(){
		$("#FC1").show();
	});
	$("#DC1").click(function(){
		$("#FC1").hide();
	});
	$("#WF2").click(function(){
		$("#FC2").show();
	});
	$("#DC2").click(function(){
		$("#FC2").hide();
	});

	/*1.今日推荐轮播图效果*/
	var i_next=0;
	var LiWidth=parseInt($(".recommend_right li").first().css("width"));
	var LiCopy=$(".recommend_right li").first().clone();
	$(".recommend_right ul").append(LiCopy);
	var LiSize=$(".recommend_right ul li").size();
	$(".recommend_right ul").css({width:LiSize*LiWidth});
	$("#recommend_next").click(function(){
		i_next++;
		if(i_next==LiSize){
			$(".recommend_right ul").css({left:0});
			i_next=1;
		}
		$(".recommend_right ul").stop().animate({left:-i_next*LiWidth},500);
	});
	$("#recommend_prev").click(function(){
		i_next--;
		if(i_next==-1){
			$(".recommend_right ul").css({left:-(LiSize-1)*LiWidth});
			i_next=LiSize-2;
		}
		$(".recommend_right ul").stop().animate({left:-i_next*LiWidth},500);
	});

	setInterval(function(){
		$("#recommend_next").click();
	}, 3500);

	$(".recommend_right").hover(function(){
		$("#recommend_next").show();
		$("#recommend_prev").show();
	},function(){
		$("#recommend_next").hide();
		$("#recommend_prev").hide();
	});




	$(".floor_c_r>div").first().show();
	$("#f1-title li").mouseover(function(){
		$(".floor_c_r>div").eq($(this).index()).show().siblings().hide();
	});

	/*商品导航鼠标移入显示子菜单*/
	$(".goodslist li").mouseenter(function(){
		$("#detailed").show();
		$("#detailed>div").eq($(this).index()).show().siblings().hide();
	});
	$(".banner").mouseleave(function(){
		$("#detailed").hide();
	});







})