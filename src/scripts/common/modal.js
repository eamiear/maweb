/**
 * Created by eamiear on 2016/2/16.
 */
define(['bootstrap'],function () {
    var showModal = function(scope){
        $(scope || ".btn-group").find("button").on("click",function(evt){

            var id = $(evt.target).data("target"),url = $(evt.target).data("url"),textAreaId = '';

            if(id.lastIndexOf("HTML")!= -1){
                textAreaId = 'doc_html_v_1';
            }else if(id.lastIndexOf("SASS") != -1){
                textAreaId = 'doc_sass_v_1';
            }else if(id.lastIndexOf("CSS") != -1){
                textAreaId = 'doc_css_v_1';
            }else if(id.lastIndexOf("JS") != -1){
                textAreaId = 'doc_js_v_1';
            }else{
                textAreaId = 'doc_v_1';
            }

            $(".modal").attr("id",id).end().find(".unexplain").attr("id",textAreaId);

            $("#"+id).modal();
            $("#"+textAreaId).load(url || "");
        });
    };
    return {
        showModal : showModal
    };
});