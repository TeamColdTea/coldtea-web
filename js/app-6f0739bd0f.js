!function(){"use strict";function e(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=0;5>o;o++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}var t={uploadImageUrl:"http://coldtea-img.herokuapp.com/uploadimage",uploadImageUrlLocal:"http://localhost:3000/uploadimage",imageBaseUrl:"https://imageuploaded4coldtea.blob.core.windows.net/fromweb"},o=new SayCheese("#say-cheese-container",{snapshots:!0});o.on("start",function(){$("#action-buttons").fadeIn("fast"),$("#take-snapshot").on("click",function(e){o.takeSnapshot()})}),o.on("error",function(e){var t=$("<div>");t.addClass("alert alert-error").css("margin-top","20px"),t.html("NOT_SUPPORTED"===e?"<strong>:(</strong> your browser doesn't support video yet!":"AUDIO_NOT_SUPPORTED"===e?"<strong>:(</strong> your browser doesn't support audio yet!":"<strong>:(</strong> you have to click 'allow' to try me out!"),$(".say-cheese").prepend(t)}),o.on("snapshot",function(o){var a=$("#take-snapshot").button("loading"),n=document.createElement("img");n.src=o.toDataURL("image/jpeg",.2);var r={base64str:n.src,name:e()+".jpg"};$.post(t.uploadImageUrl,r,function(e){console.log(e);var o=t.imageBaseUrl+"/"+r.name;n.src=o,console.log(o),$("#say-cheese-snapshots").prepend(n),a.button("reset")})}),o.start()}(),function(){"use strict";function e(e){var t=document.createElement("img");$(t).on("load",function(){$("#modalShowResult").html(t)}),t.src=e}var t=document.querySelector("#say-cheese-snapshots"),o=document.querySelector("#face");dragula([t,o],{});var a="http://coldtea.chinacloudapp.cn/Service2.svc/",n={calSim:a+"CalculateSimilar",morphFace:a+"MorphFaceByURL"};$("#compare-button").click(function(){return $("#modalShowResult").html("Please Wait..."),0===t.children.length||0===o.children.length?void $("#modalShowResult").html("Please ensure everyList has at least one snapshot!"):void $.getJSON(n.calSim,{URL1:t.children[0].src,URL2:o.children[0].src},function(e){$("#modalShowResult").html("Simularity: "+e),console.log(e)})}),$("#synthesis-button").click(function(){return $("#modalShowResult").html("Please Wait..."),0===t.children.length||0===o.children.length?void $("#modalShowResult").html("Please ensure everyList has at least one snapshot!"):void $.getJSON(n.morphFace,{URL1:t.children[0].src,URL2:o.children[0].src,Parameter:.5},function(t){console.log(t),e(t[0])})})}();