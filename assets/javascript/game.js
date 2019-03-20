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

    // TODO: If no use remove
    // Flags (Booleans) used to control when user selects the Attacker and defender
    var isAttackerSelected = false;
    var isEnemySelected = false;

    ////////////////////////////////////////////////////////////////////////////////////
    //// onclick event added using class selector $(".setAttacker") for every image ////
    //// this will be the first event listener to be called, inside we will remove  ////
    //// the selector to void this listener be called until game is reload          ////
    ////////////////////////////////////////////////////////////////////////////////////
    $(".setAttacker").on("click", function (event) {
        // ----- debugging ----- //
        //console.log("clicked on image");
        //$(this).removeClass("bg-success");

        // Get Array[] with attackers images
        let topImages = $("#attackerImgsColumn").children();
        // Get Array[] with enemy images
        let bottonImages = $("#enemyImgsColumn").children();
        // Get the index of the clicked (Selected) character image
        let attackerIndex = Array.from(topImages).indexOf(event.target);
        // ------ debugging ----- //
        //console.log(attackerIndex);

        // using map to interate 
        topImages.map((i, element) => {
            let currentCharacter = $(element);

            // remove this onclick event from img to void user click on it again
            currentCharacter.removeClass("setAttacker");

            // Finding the selected Attacker
            if(i == attackerIndex){
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
                // adding hidden-element class to hidden character
                currentCharacter.addClass("hidden-element");
                // removing hidden-element class from the others characters on second row
                // this will display enemy to be selected by user
                // the second row event will be handle by another function below $(".setEnemy")...
                $(bottonImages[i]).removeClass("hidden-element");
                //    add class to display then
                //    $(bottonImages[i]).addClass("show");
                //    add a class to make the next event be handle by the next event listener
                //    $(bottonImages[i]).addClass("setEnemy");     
            } 
        });

    }); // :::: end of attackerImage event listener ::::

    /////////////////////////////////////////////////////////////////////////
    // enemyImage event listner, this event will handle the enyme selection 
    // by user
    /////////////////////////////////////////////////////////////////////////
    $(".setEnemy").on("click", function (event) {
        // ------ debugging ------- //
        // console.log("inside enemyEvent");
        
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