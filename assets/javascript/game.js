$(document).ready(function () {
    // 1)  get all images belong to it parrent 
    // 2)  to know witch on as select we can remove a special class name and get all the children using class name
    // 3)  load all the other img to second row and change it to bg-danger

    $(".CharacterImage").on("click", function (event) {
        // ----- debugging ----- //
        //console.log("clicked on image");
        //$(this).removeClass("bg-success");

        // Get Array[] with available images
        var topImages = $("#topImgColumn").children();
        // Get Array[] with images on botton
        var bottonImages = $("#bottonImgColumn").children();
        // Get the index of the clicked image
        var index = Array.from(topImages).indexOf(event.target);
        // ------ debugging ----- //
        //console.log(index);

        // using map to interate 
        topImages.map((i, element) => {
            if(i !== index){
                console.log(element);
                // hidde the images not selected from the first col by 
                // removing the show-element class
                $(element).removeClass("show-elemen");
                // adding hidden-element 
                $(element).addClass("hidden-element");
                $(bottonImages[i]).removeClass("hidden-element");
                $(bottonImages[i]).addClass("show-elemen");
                
            }
            else
            {
                console.log(`clicked at index ${i}`);
            } 
        });

    });

    // add onclick event to button
    $("#btn-attack").on("click", function () {
        console.log("works!");
    });

});