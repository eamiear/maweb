/**
 * Created by eamiear on 2016/2/15.
 */
define(["jquery","layer"], function ($) {

    var animating = false,
        speed = 100,
        defaults = {
            selector: ".bsMenu", //选择器
            hasNavHeader: false,
            beforeClick: function () {
                return true;
            }, //单击之前回调
            itemClick: function () {
            } //点击每项回调
        };

    var _init = function (option) {
        var options = $.extend(defaults, option);
        var obj = $(options.selector);
        obj.addClass("bsMenu");
        obj.find("li ul").addClass("submenu well");
        obj.find(".active").parents("ul").addClass("open");
        obj.find("li a").mouseup(function () {
            _toggleItem($(this));
        });
        obj.find("li a[data-ajax='true']").click(function () {
            return false;
        });

        //初始化mini
        _mini();
    };

    var _toggleItem = function (item) {
        if (!animating) {
            var parent = item.parent("li"); //获得父li
            var submenu = parent.find(">ul.submenu"); //获得子菜单

            if (submenu[0]) {
                animating = true;
                if (parent.hasClass("open")) {
                    parent.removeClass("open");
                    submenu.slideUp(speed, function () {
                        animating = false;
                    });
                } else {
                    parent.addClass("open").siblings("li.open").removeClass("open").find("ul.submenu").slideUp(speed);
                    submenu.slideDown(speed, function () {
                        animating = false;
                    });
                }
            } else {
                $(".bsMenu a.active").removeClass("active");
                item.addClass("active").parents("li.open").find("a:first").addClass("active"); //选中点击的a标签  同时选中 根标签
                $(".sbMenu li.open").removeClass("open").find("ul.submenu").slideUp(speed);
            }
            var bool = defaults.beforeClick(item);
            bool = (bool == null) ? true : bool; //如果没有返回值，默认true
            if (bool) { //返回 false 不继续执行
                var href = item.attr("href");
                var reg = /javascript|[^\w]/;
                if (href && reg.test(href)) { //判断是否合法
                    var index = layer.load(null, 0); //打开loading
                    $(".main_content").hide();
                    $(".main_content").load(href, function (response, status, xhr) { //ajax页面加载
                        layer.close(index); //关闭loading
                        $(".main_content").show();
                    });
                }
            }
            defaults.itemClick(item); //点击回调
        }
    };
    var _selectItem = function (url) {
        this.toggleItem($(".bsMenu a[href='" + url + "']"));
    };

    var _mini = function () {
        $(".bsMenu_collapse a").click(function () {
            if (!$(".sidebar").hasClass("bsMenu_mini")) {
                $(".sidebar").addClass("bsMenu_mini");
                //绑定鼠标移开事件
                $(".bsMenu > li").mouseenter(function () {
                    $(this).addClass("open").find(">.submenu").css("display", "block");
                }).mouseleave(function () {
                    $("li.open").removeClass("open").find(">.submenu").css("display", "none");
                });
            } else {
                $(".sidebar").removeClass("bsMenu_mini");
                $(".bsMenu > li").unbind(); //移除事件
            }
        });
    };

    var _navbarHightLight = function (option) {
        var options = $.extend(this.defaults, option);
        if (options.hasNavHeader) {
            var parent = $(".navbar-menu");
            var item = parent.find('li');
            var obj = $(options.selector);
            item.find('a').click(function () {
                $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                //obj.find('ul li:first-child').mouseup();
            });
        }
    };

    return {
        init: _init

    };
});