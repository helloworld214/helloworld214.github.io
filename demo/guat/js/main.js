
$(function(){
	/*设置当前图片的索引值*/
	var i=0;

	/*获取单张图片的宽度值*/
	var imgwith = parseInt($("#imgbox li").first().css("width"));

	/*复制第一张图片、并根据原有图片数量建立控制圆点按钮*/
	var clone = $("#imgbox li").first().clone();
	$("#imgbox").append(clone);
	var size = $("#imgbox li").size();
	$("#imgbox").css({
		width: size * imgwith
	});

	/*兼容IE6/7/8*使用图片代替圆角*/
	var Src="img/btn"+".png";
	var Src_active="img/btn-active"+".png";

	/*判断是否为IE6/7/8*/
	if(!$.support.leadingWhitespace){
		$("#tab_btn").append("<ul></ul>");
		for(var i=0;i<size-1;i++){
			$("#tab_btn ul").append("<li><img/></li>");
		}
		$("#tab_btn ul li img").attr("src",Src);
		$("#tab_btn ul li").first().children().attr("src",Src_active);
	}else{
		/*标准浏览器直接使用圆角*/
		for(var i=0;i<size-1;i++){
		$("#tab_btn").append("<span></span>");
	}
		$("#tab_btn span").first().addClass("tab_btn_active");
	}

	/*轮播控制按钮水平居中*/
	var BtnLeft=($(".img_show").width()-$("#tab_btn").width())/2+"px";
	$("#tab_btn").css("left",BtnLeft);

	/*鼠标滑入控制圆点效果*/
	$("#tab_btn span,#tab_btn ul li").hover(function(){
		var index=$(this).index();
		i=index;
		$("#imgbox").stop().animate({left:-index*imgwith},500);
		$("#tab_btn span").eq(index).addClass("tab_btn_active").siblings().removeClass("tab_btn_active");
		$("#tab_btn ul li").eq(index).children().attr("src",Src_active).end().siblings().children().attr("src",Src);

	})

	/*向左按钮点击效果*/
	$("#prev").click(function(){
		i--;
		move();
	})

	/*向右按钮点击效果*/
	$("#next").click(function(){
		i++;
		move();
	})

	/*左右箭头点击切换核心运动函数*/
	function move(){
		if(i==size){
			$("#imgbox").css({left:0});
			i=1;
		}
		if(i==-1){
			$("#imgbox").css({left:-(size-1)*imgwith});
			i=size-2;
		}
		$("#imgbox").stop().animate({left:-i*imgwith},500);
		if(i==size-1){
			$("#tab_btn span").eq(0).addClass("tab_btn_active").siblings().removeClass("tab_btn_active");
			$("#tab_btn ul li").eq(0).children().attr("src",Src_active).end().siblings().children().attr("src",Src);
		}else{
			$("#tab_btn span").eq(i).addClass("tab_btn_active").siblings().removeClass("tab_btn_active");
			$("#tab_btn ul li").eq(i).children().attr("src",Src_active).end().siblings().children().attr("src",Src);
		}
	}

	/*自动播放*/
	var timer=setInterval(function(){
		i++;
		move();
	},2500);

	/*鼠标移入移出开关定时器*/
	$(".img_show").hover(function(){
		clearInterval(timer);
	},function(){
		timer=setInterval(function(){
		i++;
		move();
	},2500);
	});

	/*左右箭头显示隐藏*/
	$(".img_show").hover(function(){
		$("#prev").show();
		$("#next").show();
	},function(){
		$("#prev").hide();
		$("#next").hide();
	});

	/*新闻选项卡切换*/
	$(".left_title ul li").first().css({"backgroundColor":"#fff"});
	$(".left_title ul li").first().children().css({"color":"#000"});
	$(".right_title ul li").first().css({"backgroundColor":"#fff"});
	$(".right_title ul li").first().children().css({"color":"#000"});
	$(".mid_title ul li").first().css({"backgroundColor":"#fff"});
	$(".mid_title ul li").first().children().css({"color":"#000"});
	$(".left_title ul li").mouseover(function(){
		$(this).css({"backgroundColor":"#fff"}).siblings().css({"backgroundColor":"#0068b7"});
		$(this).children().css({"color":"#000"});
		$(this).siblings().children().css({"color":"#fff"});
		$(".leftcontent ul").eq($(this).index()).show().siblings().hide();
	})
	$(".right_title ul li").mouseover(function(){
		$(this).css({"backgroundColor":"#fff"}).siblings().css({"backgroundColor":"#0068b7"});
		$(this).children().css({"color":"#000"});
		$(this).siblings().children().css({"color":"#fff"});
		$(".rightcontent ul").eq($(this).index()).show().siblings().hide();
	})
	$(".mid_title ul li").mouseover(function(){
		$(this).css({"backgroundColor":"#fff"}).siblings().css({"backgroundColor":"#0068b7"});
		$(this).children().css({"color":"#000"});
		$(this).siblings().children().css({"color":"#fff"});
		$(".mid_right ul").eq($(this).index()).show().siblings().hide();
	})

	/*新闻轮播图*/
	var j=0;
	var copy=$(".small_flash ul li").first().clone();
		$(".small_flash ul").append(copy);
	var	n=$(".small_flash ul li").size(),
		LiWith=parseInt($(".small_flash ul li").first().css("width"));
	$(".small_flash ul").css({width:LiWith*n});
	$(".explain p").first().css({"display":"block"});
	$(".small_flash_btn span").click(function(){
		var i=$(this).index();
		$(this).css({"backgroundColor":"#0068b7"}).siblings().css({"backgroundColor":"#515151"});
		$(".explain p").eq($(this).index()).show().siblings().hide();
		$(".small_flash ul").stop().animate({left:-i*LiWith},500);
	})

		function move2(){
		if(j==n){
			$(".small_flash ul").css({left:0});
			j=1;
		}
		if(j==-1){
			$(".small_flash ul").css({left:-(n-1)*LiWith});
			j=n-2;
		}
		$(".small_flash ul").stop().animate({left:-j*LiWith},500);
		if(j==n-1){
			$(".small_flash_btn span").eq(0).css({"backgroundColor":"#0068b7"}).siblings().css({"backgroundColor":"#515151"});
			$(".explain p").eq(0).show().siblings().hide();
		}else{
			$(".small_flash_btn span").eq(j).css({"backgroundColor":"#0068b7"}).siblings().css({"backgroundColor":"#515151"});
			$(".explain p").eq(j).show().siblings().hide();
		}
	}

	var timer2=setInterval(function(){
		j++;
		move2();
	},3000);

	/*鼠标移入移出开关定时器*/
	$(".small_flash").hover(function(){
		clearInterval(timer2);
	},function(){
		timer2=setInterval(function(){
		j++;
		move2();
	},3000);
	});

	$(".second").hover(function(){
		$(this).parent().css({"backgroundColor":"#515151"});
	},function(){
		$(this).parent().css({"backgroundColor":"#313131"});
	})
	$(".third").hover(function(){
		$(this).parent().css({"backgroundColor":"#0068b7"});
	},function(){
		$(this).parent().css({"backgroundColor":"#515151"});
	})

	/*搜索框输入默认文字消失*/
	$("#input_txt").bind({focus:function(){
		if(this.value==this.defaultValue){
			this.value="";
		}
	},blur:function(){
		if(this.value==""){
			this.value=this.defaultValue;
		}
	}})

	/*新闻列表前的小图变色标效果*/
	$(".notice li a,.info_public li a,.mid_right li a").hover(function(){
		$(this).parent().addClass("bule").siblings().removeClass("bule");
	},function(){
		$(this).parent().removeClass("bule");
	});



	/*加入更多功能*/



})


