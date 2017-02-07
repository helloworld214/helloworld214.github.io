/**
 * Created by sunny on 2017/1/21.
 */

$(function(){

    //最爱和热销商品名称大于15字则截取15字后加省略号
    var goodsTitle = $(".goods-title");
    goodsTitle.each(function(){
        var txt = $(this).attr("title");
        txt && $(this).text(txt.length < 15 ? txt : txt.slice(0, 15) + "...");
    });

});
