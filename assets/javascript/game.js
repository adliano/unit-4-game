/*
Adriano Alves
Mar 18 2019
Berkely Bootcamp 
JS file to hold all JQuery code used for RPG game
*/

$(document).ready(function () {
    // 1)  get all images belong to it parrent 
    // 2)  to know witch on as select we can remove a special class name and get all the children using class name
    // 3)  load all the other img to second row and change it to bg-danger

    // Flags (Booleans) used to control when user selects the Attacker and defender
    var isAttackerSelected = false;
    var isEnemySelected = false;

    ///////////////////////////////////////////////////////////////////////////////////
    // onclick event added using class selector (attackerImage) for every image
    // this will be the first event listener to be called, inside we will remove 
    // the sector to void this listener be called until game is reflesh
    //////////////////////////////////////////////////////////////////////////////////
    $(".attackerImage").on("click", function (event) {
        // ----- debugging ----- //
        //console.log("clicked on image");
        //$(this).removeClass("bg-success");

        // Get Array[] with attackers images
        var topImages = $("#attackerImgsColumn").children();
        // Get Array[] with enemy images
        var bottonImages = $("#enemyImgsColumn").children();
        // Get the index of the clicked (Selected) character image
        var index = Array.from(topImages).indexOf(event.target);
        // ------ debugging ----- //
        //console.log(index);

        // using map to interate 
        topImages.map((i, element) => {
            let currentCharacter = $(element);

            // remove this onclick event 
            currentCharacter.removeClass("attackerImage");

            // Finding the selected Attacker
            if(i == index){
                // ----- debugging ----- //
                //console.log(element);

                // // remove this onclick event to the selected attacker
                // // currentCharacter.removeClass("attackerImage");

                // and add the selectedAttacker class into it
                currentCharacter.addClass("selectedAttacker");
            }
            // for all others (not selected) characters will go to next row dow
            // and nwe class will be added to make the next onclick handler
            else 
            {
                // ----- debugging ------ //
                //console.log(`clicked at index ${i}`);

                // hidde the images not selected from the first col by 
                // removing the show-element class
                // TODO: currentCharacter.removeClass("show-elemen");
                // adding hidden-element class to hidden element
                currentCharacter.addClass("hidden-element");
                // removing hidden-element class from the others characters
                $(bottonImages[i]).removeClass("hidden-element");
                // add class to display then
                $(bottonImages[i]).addClass("show-elemen");
                // add a class to make the next event be handle by the next event listener
                //$(bottonImages[i]).addClass("enemyImage");     
            } 
        });

    }); // :::: end of attackerImage event listener ::::

    /////////////////////////////////////////////////////////////////////////
    // enemyImage event listner, this event will handle the enyme selection 
    // by user
    /////////////////////////////////////////////////////////////////////////
    // TODO: NOT WORKIG
    $(".enemyImage").on("click", function (event) {
        // ------ debugging ------- //
        console.log("inside enemyEvent");
        
    });

    ///////////////////////////////////////////
    // add onclick event to Attack button
    //////////////////////////////////////////
    $("#btn-attack").on("click", function () {
        // debugging
        console.log("works!");
    });

    ////////////////////////////////////////////
    // onclick listener to handle page relod
    ////////////////////////////////////////////
    $("#relod-attack").on("click", function(){
        location.reload();
        console.log("reload page");
    });

});