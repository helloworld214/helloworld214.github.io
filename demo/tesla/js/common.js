/**
 * Created by sunny on 2017/1/22.
 */
$(function(){
    (function(){

        //search搜索框提示文字显示隐藏
        $("#search-box").focus(function(){
            $("#search-box-tips").hide();
        }).blur(function(){
            var val = $(this).val();
            if(!val){
                $("#search-box-tips").show();
            }
        });

        //tab切换
        $(".tabSwitch").each(function(){
            var btn = $(this).find(".tabBtn-item"),
                content = $(this).find(".tabContent-item"),
                activeIndex = 0;
            for(var i = 0, l = btn.length; i < l; i++){
                if(btn.eq(i).hasClass("active")){
                    activeIndex = i;
                }
            }
            btn.eq(activeIndex).addClass("active").siblings().removeClass("active");
            content.eq(activeIndex).show();
            btn.click(function(event){
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                content.eq(index).show().siblings().hide();
                event.preventDefault();
            });
        });

        //滚动条滚动300px后显示“回到顶部”按钮
        $(window).scroll(function(){
            $(window).scrollTop() > 300 ? $("#totop").fadeIn(600) : $("#totop").fadeOut(600);
        });

        //回到顶部
        $("#totop").click(function(){
            $("html,body").animate({scrollTop: 0}, 1000);
        });

        //商品预览图效果,有bug
        var preWrap = $(".preview-wrap");
        preWrap.each(function(index,item){
            var bigImg = $(item).find(".big-img").first(),
                smallImgWrap = $(item).find(".smallImg-wrap").first(),
                smallImgs = smallImgWrap.find(".small-img"),
                prev = $(item).find(".prev").first(),
                next = $(item).find(".next").first(),
                visibleWidth = $(item).find(".small-img-lists").first().width(),
                width = smallImgs.first().outerWidth();
            smallImgWrap.width(width * smallImgs.length);
            next.click(function(){
                var left = parseInt(smallImgWrap.css("left")),
                    minLeft = visibleWidth - smallImgWrap.outerWidth();
                console.log(left,minLeft);
                if(left <= minLeft) return;
                move(-width);
            });
            smallImgs.click(function(){
                bigImg.attr("src", $(this).attr("src"));
            });
            prev.click(function(){
                var left = parseInt(smallImgWrap.css("left"));
                if(left >= 0) return;
                move(width);
            });
            function move(w){

                var left = parseInt(smallImgWrap.css("left"));
                //
                // console.log(smallImgWrap,left);
                smallImgWrap.stop().animate({left: left + w}, 500);
            }
        });


        //注册与登录
        $("#register-btn").click(function(){
            createMask(template.registerHTML);
        });
        $("#login-btn").click(function(){
            createMask(template.loginHTML);
            $("#toRegister").click(function(){
                removeMask();
                createMask(template.registerHTML);
            });
        });

        function createMask(innerHTML, callback){
            if(typeof innerHTML === "function"){
                callback = innerHTML;
                innerHTML = undefined;
            }
            var mask = $("<div id='mask'></div>");
            $("body").append(mask);
            mask.html(innerHTML).slideDown("slow");
            switchPlaceholder();
            clickCheckbox();
            callback && typeof callback === "function" && callback(mask);
            $(".closer").click(removeMask);
        }
        function removeMask(){
            $("#mask").slideUp("slow",function(){
                $("#mask").remove();
            });
        }

        //placeholder显示隐藏
        function switchPlaceholder(){
            var placeholder = $(".placeholder");
            placeholder.each(function(){
                var that = $(this);
                that.siblings("input").focus(function(){
                    that.hide();
                }).blur(function(){
                    $(this).val() ? that.hide() : that.show();
                });
            });
        }

        //自定义checkbox点击效果
        function clickCheckbox(){
            var checkbox = $(".checkbox-group-label");
            console.log("checkbox: %o", checkbox);
            $(".checkbox-group-input").click(function(){
                var insider = checkbox.find(".insider")[0];
                console.log("insider: %o", insider);
                insider.style.display = this.checked ?  "block" : "none";
                console.log("insider.style.display: %o", insider.style.display);
            });
        }


    })();


});
