$(document).ready(function(){
    // 1)  get all images belong to it parrent 
    // 2)  to know witch on as select we can remove a special class name and get all the children using class name
    // 3)  load all the other img to second row and change it to bg-danger

    $(".CharacterImage").on("click", function(){
        console.log("clicked on image");
        
        $(this).removeClass("bg-success");
    });

    // add onclick event to button
    $("#btn-attack").on("click", function(){
        console.log("works!");
    });
    
});
