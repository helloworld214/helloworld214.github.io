/**
 * Created by sunny on 2017/1/17.
 */


$(document).ready(function(){

    //banner轮播图
    createBanner("focus-picture", getBannerData());

    var activeIndex = 0,
        bannerPics = $(".banner-lists li"),
        bannerBtns = $(".banner-btnsbar span"),
        prevBtn = $("#prev"),
        nextBtn = $("#next");

    changePic();

    $.each(bannerBtns, function(index,item){
        $(item).hover(function(){
            activeIndex = index;
            changePic(activeIndex);
        },function(){});
    });

    prevBtn.click(function(event){
        activeIndex = activeIndex <= 0 ? bannerBtns.length - 1 : activeIndex - 1;
        changePic(activeIndex);
        event.preventDefault();
    });

    nextBtn.click(function(event){
        activeIndex = activeIndex >= bannerBtns.length - 1 ? 0 : activeIndex + 1;
        changePic(activeIndex);
        event.preventDefault();
    });

    var bannerTimer = setInterval(function(){
        nextBtn.click();
    },3000);

    $("#focus-picture").hover(function(){
        clearInterval(bannerTimer);
    },function(){
        bannerTimer = setInterval(function(){
            nextBtn.click();
        },3000);
    });

    $(window).resize(function(){
        setStyleLeft($("#focus-picture .banner-btnsbar").first());
    });


    function createBanner(containerId, response){
        var box = $("#" + containerId),
            data = response.data,   //response.data是一个数组
            lists = "",
            spans = "";

        for(var i = 0, l = data.length; i < l; i++){
            lists += [
                "<li style='background: url(",
                data[i].image,
                ") top center no-repeat'><a href='",
                data[i].link,
                "'></a></li>"
            ].join("");
            spans += "<span></span>";
        }
        box.find(".banner-lists").first().html(lists);
        box.find(".banner-btnsbar").first().html(spans);
        setStyleLeft(box.find(".banner-btnsbar").first());
    }

    function setStyleLeft(element){
        var left = (element.parent().width() - element.width()) / 2;
        element.css("left", left);
    }

    function changePic(index){
        index = index || 0;
        bannerPics.eq(index).stop().fadeIn(600).siblings().hide();
        bannerBtns.eq(index).addClass("active").siblings().removeClass("active");
    }

    showProducts("recommend", getRecommendProducts().data);
    showProducts("choice", getChoiceProducts().data);
    showProducts("all-match", getAllMatch().data);
    showProducts("discount", getDiscount().data);
    //今日推荐
    function showProducts(containerId, response){
        var ul = $("<ul class='float-clear'></ul>"),
            tmp = [
                "<li class='products-list'>",
                    "<a href='' class='product-link' target='_blank'>",
                        "<img src='' alt=''>",
                    "</a>",
                    "<a href='' class='describe'>",
                        "<span></span>",
                    "</a>",
                "</li>"
            ].join("");
        var hasBiggerImg = false, biggerIndex = null;
        for(var i = 0, l = response.length; i < l; i++){
            var li = $(tmp),
                imgSize = response[i].imgSize;
            if(imgSize && imgSize === "bigger"){
                hasBiggerImg = true;
                biggerIndex = i;
                li.addClass("products-list-bigger");
            }
            li.find("a").attr("href", response[i].link + "?pid=" + response[i].pid);
            li.find(".product-link img").attr({src: response[i].imgPath, alt: response[i].name});
            li.find("a.describe span").text(response[i].name);
            ul.append(li);
        }
        if(hasBiggerImg){
            if(biggerIndex !== 1){
                ul.find("li").eq(0).after(ul.find("li").eq(biggerIndex));
            }
            ul.find("li").eq(2).add(ul.find("li").eq(6)).addClass("clear-margin-right");
        }else{
            ul.find("li").eq(3).addClass("clear-margin-right");
        }
        if(containerId === "discount"){
            ul.find("li").addClass("products-list-lower").eq(2).addClass("clear-margin-right");
        }
        $("#" + containerId).append(ul);
    }


});




