/**
 * Created by eamiear on 2016/2/15.
 */
require.config({
    //基路经（依赖模块都在同一个基目录下）
    baseUrl: 'assets',
    //paths指定模块的加载路径
    paths: {
        "jquery": "jquery/dist/jquery",
        "layer" : "layer/layer",
        "bootstrap" : "bootstrap/dist/bootstrap",
        "sweetalert" : "sweetalert/dist/sweetalert.min",
        "underscore": "underscore/underscore-min",

        //如果定义的js不在指定的基路经下，则需要跳出该基路经
        "alink" : "../src/scripts/modules/alink",
        "menu" : "../src/scripts/modules/menu",
        "copy" : "../src/scripts/modules/endcopy",
        "top" : "../src/scripts/modules/back2top"
    },

    // shim属性用来配置不兼容的模块（即不适遵循AMD规范的库）
    // exports: 输出的变量名，表示该模块外部调用时的名称
    // deps: 数组，表明该模块的依赖性
    shim: {
        "underscore": {
            exports: "_"
        },

        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

/*
require(['menu','top'],function(menu,top){
    menu.init();
    top.init();

});*/
