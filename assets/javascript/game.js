/*
Adriano Alves
Mar 18 2019
Berkely Bootcamp 
JS file to hold all JQuery code used for RPG game
*/

$(function () {

    // ******** Global Variables ******** \\
    // Flags (Booleans) used to control when
    // user selects the Attacker and Enemy
    var isAttackerSelected = false;
    var isEnemySelected = false;
    // Attacker and Enemy State
    var currentAttacker;
    var currentEnemy;
    // Attacker and Enemy attack rates
    var userAttackRate = 0;
    var enemyAttackRate = 0;
    // Attacker and Enemy HP rate
    var attackerHealth = 0;
    var enemyHealth = 0;
    // Attacker and Enemy name
    //var attackerName = "";
    //var enemyName = "";

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
    $("#imagesContainer").on("click",".setCharacter", function (event) {
        // Check if user selected the Attacker
        if(!isAttackerSelected){
            currentAttacker = $(event.currentTarget);
            // Remove the class used to trig the onclick event,
            // by removing the onclick will not be called again
            currentAttacker.removeClass("setCharacter");
            // Another Approach to Remove the onclick event from attacker \\
            // ***** $(currentAttacker).prop("onclick",null).off("click"); **** \\

            // Get all elements except the one user selected
            let _siblings = $(this).siblings();
            // Remove the green backgroung color (Bootstrap)
            _siblings.children(".card").removeClass("bg-success"); /////////////
            // Add a Yellow background color (Bootstrap)
            _siblings.children(".card").addClass("bg-warning"); ///////////
            // Append all elements to the Enemy Column 
            // *** (except the selected element) ***
            $("#enemiesRow").append(_siblings);
            // Display Enemy header
            $("#enemiesHeader").removeClass("invisible");
            // Change Attacker Header Text
            $("#attackerHeader").text("Your Attacker");
            // get attacker name
            // attackerName = $(currentAttacker).find(".getCharacterName").text();
            // alert(attackerName);
            // Generate the Attack rate for user
            userAttackRate = rand(5,15);
            // Get Attacker Health
            attackerHealth = $(currentAttacker).find(".HPRate").text();
            // Change the satus of the flag
            isAttackerSelected = !isAttackerSelected;
            /////------- DEBUGGING ------\\\\\\
        }
        // Check if user selected the Enemy
        else if(!isEnemySelected){
            // Get Selected enemy
            currentEnemy = $(event.currentTarget);
            // Remove the yellow bacground (Bootstrap)
            currentEnemy.children(".card").removeClass("bg-warning");
            // Add a Red background (Bootstrap)
            currentEnemy.children(".card").addClass("bg-danger");
            // Add the selected enemy to enemyRow
            $("#enemyRow").append(currentEnemy);
            // Display Fight Header
            $("#fightHeader").removeClass("invisible");
            // Display Enemy Header
            $("#enemyHeader").removeClass("invisible");
            // Display Attack Button
            $("#btn-attack").removeClass("invisible");
            // get enemy name
            let _enemyName = $(currentEnemy).find(".getCharacterName").text();
            // set enemy name to fightInfoRow
            $(".setEnemyName").html(_enemyName);
            // Generate enemy attack rate
            enemyAttackRate = rand(5,25);
            // Remove the onclick event from enemy
            //$(currentEnemy).prop("onclick",null).off("click");
            currentEnemy.removeClass("setCharacter");
            // Get enemy health
            //enemyHealth = $(currentEnemy).attr("data-health");
            enemyHealth = $(currentEnemy).find(".HPRate").text();
            //console.log(`enemyHealth : ${enemyHealth}`);
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

        console.log(`attackerHealth : ${attackerHealth}`);
        console.log(`enemyAttackRate : ${enemyAttackRate}`);

        attackerHealth = attackerHealth - enemyAttackRate;

        // Display updated Attacker HPRate
        $(currentAttacker).find(".HPRate").html(attackerHealth);

        console.log(`total : ${attackerHealth}`);
        

        enemyHealth = enemyHealth - userAttackRate;
        // Display Updated Enemy HPRate
        $(currentEnemy).find(".HPRate").html(enemyHealth);
        // Display attacker rate
        $("#attackerHit").html(userAttackRate);
        // Display enemy attack rate
        $("#enemyHit").html(enemyAttackRate);
        // Increase Attacker HP by 15% of his attack rate 
        // each time attack happen
        userAttackRate += Math.round(userAttackRate * 15 / 100 );
        // Display Fight Info after Attach button clicked
        $("#fightInfoRow").removeClass("invisible");
    });

    ////////////////////////////////////////////
    // onclick listener to handle page relod
    ////////////////////////////////////////////
    $("#relod-attack").on("click", function(){
        location.reload();
        console.log("reload page");
    });
});