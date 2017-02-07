/**
 * Created by Tesla on 2017/2/5.
 */


(function(win, doc, $, ChineseDistricts){

    if(!ChineseDistricts){
        throw new Error("The file 'city-picker.data.js' must be included first!");
    }

    var template = [
        "<div class='cityPick-wrap'>",
            "<div class='cityPick-tab'>",
                "<ul>",
                    "<li class='active'>省份</li>",
                    "<li>城市</li>",
                    "<li>区(县)</li>",
                "</ul>",
            "</div>",
            "<div class='cityPick-contents'>",
                "<div class='cityPick-content-item province'></div>",
                "<div class='cityPick-content-item city'>",
                    "<dl>",
                        "<dd>请先选择省份</dd>",
                    "</dl>",
                "</div>",
                "<div class='cityPick-content-item county'>",
                    "<dl>",
                        "<dd>请先选择城市</dd>",
                    "</dl>",
                "</div>",
            "</div>",
        "</div>"
    ].join("");

    var othersHTML = [
        "<div class='cityPick-content-item others'>",
            "<dl>",
                "<dt style='float: left;width: 7.5em;'>当前已选择地址:</dt>",
                "<dd style='margin-left: 8em;'>",
                    "<span class='cityPick-selectedAddress'></span>",
                    "<span class='cityPick-supplementaryAddress'></span>",
                "</dd>",
            "</dl>",
            "<dl>",
                "<dt>请输入详细地址:</dt>",
                "<textarea rows='5'></textarea>",
            "</dl>",
            "<dl>",
                "<dd>",
                    "<a href='javascript:;' class='cityPick-ok'>确 定</a>",
                    "<a href='javascript:;' class='cityPick-cancel'>取 消</a>",
                "</dd>",
            "</dl>",
        "</div>"
    ].join("");


    function CityPicker(containerId, toggleBtnId, options){

        var $container = $("#" + containerId),
            $toggleBtn = $("#" + toggleBtnId),
            $panel = $(template),
            $tabBtnsWrap = $panel.find(".cityPick-tab > ul"),
            $tabContentsWrap = $panel.find(".cityPick-contents");

        this.defaults = $.extend({}, {
            canInput: true,
            tabDelay: 200,
            autoNext: true,
            onChange: null,
            onCancel: null
        }, options);

        this.getDom = function(){
            return {
                container: $container,
                toggleBtn: $toggleBtn,
                tabBtnsWrap: $tabBtnsWrap,
                tabContentsWrap: $tabContentsWrap,
                panel: $panel
            }
        };

        this.init();
        this.render();
        this.toggle();
        this.tab();
        this.select();
    }

    CityPicker.prototype = {
        constructor: CityPicker,

        init: function(){
            this.address = {
                province: "",
                city: "",
                county: "",
                others: "",
                fullAddress: ""
            };
            var dom = this.getDom(),
                con = dom.tabContentsWrap,
                pro = con.find(".province"),
                cit = con.find(".city"),
                cou = con.find(".county"),
                oth = con.find(".others");

            pro.find("span.active").removeClass("active");
            cit.find("dd").html("请先选择省份");
            cou.find("dd").html("请先选择城市");
            oth.find("textarea").val("").blur();
            oth.find(".cityPick-selectedAddress").text("");
            oth.find(".cityPick-supplementaryAddress").text("");
        },

        render: function(){
            var dom = this.getDom(),
                box = dom.container,
                panel = dom.panel,
                ul = dom.tabBtnsWrap,
                tabCon = dom.tabContentsWrap;
            box.append(panel);

            if(this.defaults.canInput){
                ul.append($("<li>输入</li>"));
                tabCon.append($(othersHTML));
            }

            var w;
            w = ul.width() + 1;
            if(panel.css("display") === "none"){
                panel.show();
                w = ul.width() + 1;
                panel.hide();
            }
            var lis = ul.find("li");
            ul.width(w);
            lis.width(w / lis.length);
        },

        toggle: function(speed){
            var that = this;
            this.getDom().toggleBtn.click(function(){
                that.getDom().panel.css("display") === "block" ? that.off(speed) : that.on(speed);
                that.init();
            });
        },

        on: function(speed){
            var dom = this.getDom();
            dom.panel.slideDown(speed);
            dom.tabBtnsWrap.find("li").first().click();
        },

        off: function(speed){
            this.getDom().panel.slideUp(speed);
        },

        tab: function(){
            var dom = this.getDom(),
                btns = dom.tabBtnsWrap.find("li"),
                cons = dom.tabContentsWrap.find(".cityPick-content-item");
            cons.first().show();
            btns.click(function(){
                var index = $(this).index();
                $(this).addClass("active").siblings().removeClass("active");
                cons.eq(index).show().siblings().hide();
            });
        },

        select: function(){

            var dom = this.getDom(),
                con = dom.tabContentsWrap,
                pro = con.find(".province"),
                cit = con.find(".city"),
                cou = con.find(".county"),
                oth = con.find(".others"),
                ul  = dom.tabBtnsWrap;

            var that = this;

            pro.html(_getProvinces());
            pro.add(cit).add(cou).on("click", "span", function(){
                var li = ul.find("li.active"),
                    txt = $(this).text(),
                    isPro = $(this).parents(".province").length > 0,
                    isCit = $(this).parents(".city").length > 0,
                    isCou = $(this).parents(".county").length > 0;

                if(isPro){
                    that.address.province = txt;
                    cit.find("dd").html(_getCities($(this).attr("province-code")));
                }

                if(isCit){
                    var p = $(this).attr("province-code"),
                        c = $(this).attr("city-code");
                    that.address.city = txt;
                    cou.find("dd").html(_getCounties(p, c));
                }

                if(isCou){
                    that.address.county = txt;
                }

                $(this).addClass("active").siblings().removeClass("active");
                $(this).parents("dl").siblings().find("span").removeClass("active");
                that.address.fullAddress = _getFullAddress(that.address);
                oth.find(".cityPick-selectedAddress").text(_getSelectedAddress(that.address));
                typeof that.defaults.onChange === "function" && that.defaults.onChange(that.address);

                if(that.defaults.autoNext){
                    var delay = Number(that.defaults.tabDelay) ? Number(that.defaults.tabDelay) : 0;
                    setTimeout(function(){
                        li.next("li").click();
                    }, delay);
                }
            });

            oth.on("input", "textarea", function(){
                that.address.others = $(this).val();
                that.address.fullAddress = _getFullAddress(that.address);
                oth.find(".cityPick-supplementaryAddress").text(that.address.others);
                typeof that.defaults.onChange === "function" && that.defaults.onChange(that.address);
            });

            oth.on("click", "a", function(){
                if($(this).hasClass("cityPick-cancel")){
                    that.init();
                    typeof that.defaults.onChange === "function" && that.defaults.onChange(that.address);
                    typeof that.defaults.onCancel === "function" && that.defaults.onCancel(that.address);
                }

                that.off();
            });



        }

    }

    function _getFullAddress(address){
        return [address.province, address.city, address.county, address.others].join("");
    }

    function _getSelectedAddress(address){
        return [
            address.province,
            " / ",
            address.city,
            " / ",
            address.county,
            " / "
        ].join("");
    }

    function _getProvinces(){
        var data = ChineseDistricts["86"],
            html = "";
        for(var key in data){
            var lists = "";
            for(var i = 0, l = data[key].length; i < l; i++){
                lists += "<span province-code='" + data[key][i].code + "'>" + data[key][i].address + "</span>";
            }
            html += [
                "<dl class='",
                key.toLowerCase(),
                "'><dt>",
                key,
                "</dt><dd>",
                lists,
                "</dd></dl>"
            ].join("");
        }
        return html;
    }

    function _getCities(provinceCode){
        var data = ChineseDistricts[provinceCode],
            html = "";
        for(var code in data){
            html += "<span province-code='" + provinceCode + "' city-code='" +
                code + "'>" + data[code] + "</span>";
        }
        return html;
    }

    function _getCounties(provinceCode, cityCode){
        var data = ChineseDistricts[cityCode],
            html = "";
        for(var code in data){
            html += "<span province-code='" + provinceCode + "' city-code='" + cityCode +
                "' county-code='"+ code + "'>" + data[code] + "</span>";
        }
        return html;
    }

    win.CityPicker = CityPicker;

})(window, document, jQuery, ChineseDistricts);