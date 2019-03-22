/*
Adriano Alves
Mar 18 2019
Berkely Bootcamp 
JS file to hold all JQuery code used for RPG game
*/

$(document).ready(function () {

    // ******** Global Variables ******** \\
    // Flags (Booleans) used to control when
    // user selects the Attacker and Enemy
    var isAttackerSelected = false;
    var isEnemySelected = false;
    // Attacker and Enemy attack rates
    //var userAttackRate = 0;
    //var enemyAttackRate = 0;
    // Attacker and Enemy HP rate
    //var userHealth = 0;
    //var enemyHealth = 0;
    // ********************************* //

    /******************************************************************************/ 
    /* * * * * * * * * * * * * * * * * * rand() * * * * * * * * * * * * * * * * * */ 
    /******************************************************************************/ 
    // Function that generate random number                                          
    // this will return a number beteween the provided range                         
    // Math.random() return number between 0 (inclusive) and 1 (exclusive)           
    // in this case, The maximum is inclusive and the minimum is inclusive
    // it will be used to generate a random attack number           
    function rand(min, max) {                                                        
        min = Math.ceil(min);                                                        
        max = Math.floor(max);                                                       
        return Math.floor(Math.random() * (max - min + 1)) + min;                    
    } 

    /////////////////////////////////// ONCLICK //////////////////////////////////////////
    //// onclick event added using class selector $(".setCharacter") for every image  ////
    //// this will be the first event listener to be called, inside we will use some  ////
    //// flags (Bollean) to void user click on selected character twice               ////
    //////////////////////////////////////////////////////////////////////////////////////
    $(".setCharacter").not(document.getElementById("test")).on("click", function (event) {
        
        // Remove the onclick event from attacker
        //$(this).off("click");
        // Check if user selected the Attacker
        if(!isAttackerSelected){

            let _currentCharacter = $(event.currentTarget);
            _currentCharacter.removeClass("setCharacter");
            _currentCharacter.attr('id','test');
            console.dir(event.currentTarget);



            // Get all elements except the one user selected
            let _siblings = $(this).siblings();
            // Remove the green backgroung color (Bootstrap)
            _siblings.children(".card").removeClass("bg-success"); /////////////
            // Add a Yellow background color (Bootstrap)
            _siblings.children(".card").addClass("bg-warning"); ///////////
            // Append all elements to the Enemy Column 
            // *** (except the selected element) ***
            $("#enemiesRow").append(_siblings);
            //Display header
            $("#enemiesHeader").removeClass("invisible");
            // Change Attacker Header Text
            $("#attackerHeader").text("Your Attacker");
            // Generate the Attack rate for user
            userAttackRate = rand(5,25);
            // Get Attacker Health
            //userHealth = $(this).attr("data-health");
            /////------- DEBUGGING ------\\\\\\
            //console.log(userHealth);
            // Change the satus of the flag
            isAttackerSelected = true;
            /////------- DEBUGGING ------\\\\\\
            console.log(isAttackerSelected);
            
        }
        // Check if user selected the Enemy
        else if(!isEnemySelected){
            // Get Selected enemy
            let _enemy = $(this);
            // Remove the yellow bacground (Bootstrap)
            _enemy.children(".card").removeClass("bg-warning");
            // Add a Red background (Bootstrap)
            _enemy.children(".card").addClass("bg-danger");
            // Add the selected enemy to enemyRow
            $("#enemyRow").append(_enemy);
            // Display Fight Header
            $("#fightHeader").removeClass("invisible");
            // Display Enemy Header
            $("#enemyHeader").removeClass("invisible");
            // Display Attack Button
            $("#btn-attack").removeClass("invisible");
            // Generate enemy attack rate
            enemyAttackRate = rand(5,25);
            // Remove the onclick event from enemy
            //_enemy.off("click");
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
        isEnemySelected = false;
    });

    ////////////////////////////////////////////
    // onclick listener to handle page relod
    ////////////////////////////////////////////
    $("#relod-attack").on("click", function(){
        location.reload();
        console.log("reload page");
    });

});