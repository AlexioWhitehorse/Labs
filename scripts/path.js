$(document).ready(function () {
    var $div, tab1, tab2, tab3, tab, macLocal, winLocal, path;
    
    macLocal = false;
    winLocal = false;
    
    if(macLocal){
        path = "file:///Applications/Brackets.app/Contents/samples/root/Labs/";
    }else if(winLocal){
        path = "file:///C:/Users/Alex/Documents/Programs/Labs/";
    }else{
        path = "http://cobweb.cs.uga.edu/~alex/Labs/";
    }

    tab1 = "<ul class='nav nav-tabs'><li role='presentation'><a href='"+path+"index.html'>Home</a></li>";
    tab2 = "<li role='presentation'><a href='"+path+"indexSheet.html'>Cheat Sheet</a></li>";
    tab3 = "<li role='presentation'><a href='"+path+"indexInfo.html'>Info</a></li></ul>";

    var tab = parseInt(document.getElementById('tabs').getAttribute('data-value'));

    switch(tab){
        case 1:
            tab1 = "<ul class='nav nav-tabs'>" + "<li role='presentation' class='active'><a href='#'>Home</a></li>";
            break;
        case 2:
            tab2 = "<li role='presentation' class='active'><a href='#'>Cheat Sheet</a></li>";
            break;
        case 3:
            tab3 = "<li role='presentation' class='active'><a href='#'>Info</a></li></ul>";
            break;
        default:
            console.log('default switch');
    }
    
    $div = $(tab1+tab2+tab3);
    $("#tabs").append($div);
});
