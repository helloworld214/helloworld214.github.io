
	var Golf = {
		switchPic: function(){
			var bigImg = $(".big-img img"),
				smImg = $(".sm-img .tab-pic"),
				btnPrev = $("#prev"),
				btnNext = $("#next");
				
			btnPrev.on("click",function(){
				var src0 = smImg.eq(0).find("img").attr("src"),
					src1 = smImg.eq(1).find("img").attr("src"),
					src2 = smImg.eq(2).find("img").attr("src");
				smImg.eq(0).find("img").attr("src",src1);
				smImg.eq(1).find("img").attr("src",src2);
				smImg.eq(2).find("img").attr("src",src0);
				bigImg.attr("src",smImg.eq(1).find("img").attr("src"));
			});
			btnNext.on("click",function(){
				var src0 = smImg.eq(0).find("img").attr("src"),
					src1 = smImg.eq(1).find("img").attr("src"),
					src2 = smImg.eq(2).find("img").attr("src");
				smImg.eq(0).find("img").attr("src",src2);
				smImg.eq(1).find("img").attr("src",src0);
				smImg.eq(2).find("img").attr("src",src1);
				bigImg.attr("src",smImg.eq(1).find("img").attr("src"));
			});
			bigImg.attr("src",smImg.eq(1).find("img").attr("src"));
		},
		setVerticalCenter: function(){
			var txt = $(".introduce-left").add($(".introduce-right"));
			$.each(txt, function() {
				var h1 = $(this).parent().height(),
					h2 = $(this).height(),
					h = (h1-h2) / 2;
				$(this).css("margin-top",h);
				if($(this).hasClass("last")){
					$(this).css("margin-top",h-80);
				}
			});
//			for(var i=0; i<txt.length; i++){
//				var h1 = $(txt[i]).parent().height(),
//					h2 = $(txt[i]).height(),
//					h = (h1-h2) / 2;
//				$(txt[i]).css("margin-top",h);
//			}
		}
		
	}

