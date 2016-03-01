/**
 * Created by eamiear on 2016/2/15.
 */
define(["jquery"], function ($) {
    //初始化 回到顶部按钮
    var _init = function () {
        $(window).scroll(function (e) {
            $(this).scrollTop() > 0 ? ($(".btn_scroll_up").is(":hidden") ? $(".btn_scroll_up").click(function () {
                $("body,html").stop().animate({
                    scrollTop: 0
                }, 500);
            }).show() : 0) : $(".btn_scroll_up").hide().unload();
        });
    };


    return {
        init: _init
    };
});