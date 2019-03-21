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

    // ******** Global Variables ******** \\
    // Flags (Booleans) used to control when
    // user selects the Attacker and defender
    var isAttackerSelected = false;
    var isEnemySelected = false;
    // ********************************* //

    /////////////////////////////////// ONCLICK //////////////////////////////////////////
    //// onclick event added using class selector $(".setCharacter") for every image  ////
    //// this will be the first event listener to be called, inside we will use some  ////
    //// flags (Bollean) to void user click on selected character twice               ////
    //////////////////////////////////////////////////////////////////////////////////////
    $(".setCharacter").on("click", function (event) {
        // Check if user selected the Attacker
        if(!isAttackerSelected){
            // Get all elements except the one user selected
            let _siblings = $(this).siblings();
            // Remove the green backgroung color (Bootstrap)
            _siblings.removeClass("bg-success");
            // Add a Yellow background color (Bootstrap)
            _siblings.addClass("bg-warning");
            // Append all elements to the Enemy Column 
            // *** (except the selected element) ***
            $("#enemiesImgsColumn").append(_siblings);
            // Change the satus of the flag
            isAttackerSelected = !isAttackerSelected;
        }
        // Check if user selected the Enemy
        else if(!isEnemySelected){
            // Get Selected enemy
            let _enemy = $(this);
            // Remove the yellow bacground (Bootstrap)
            _enemy.removeClass("bg-warning");
            // Add a Red background (Bootstrap)
            _enemy.addClass("bg-danger");
            // Add the selected enemy to enemyColumn
            $("#enemyColumn").append(_enemy);
            // Change the satus of the flag
            isEnemySelected = !isEnemySelected;
        } 
        else{
            console.log("May The Force Be With You!");
        }
    }); // :::: end of setCharacter onclick event listener ::::

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