/**
 * Created by eamiear on 2016/2/15.
 */
define(["jquery"], function ($) {
    var _isIE = function () {//是否IE
        if(/msie/.test(navigator.userAgent.toLowerCase())){
            return true;
        }else return false;
    };

    return {
        isIE : _isIE
    };
});