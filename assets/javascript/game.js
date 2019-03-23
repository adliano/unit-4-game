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
    // Attackerand Enemy Name(String)
    var attackerName = "";
    var enemyName = "";
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
    var rand = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    /*******************************************************************************/
    /* * * * * * * * * * * * * * * * hideElement() * * * * * * * * * * * * * * * * */
    /*******************************************************************************/
    var hideElements = function(...elements){
        for(element of elements){
            $(element).addClass("invisible");
        }
    }
    /*******************************************************************************/
    /* * * * * * * * * * * * * * * * showElement() * * * * * * * * * * * * * * * * */
    /*******************************************************************************/
    var showElements = function(...elements){
        for(element of elements){
            $(element).removeClass("invisible");
        }
    }; // TODO: Ask about this ';' do we need it ?
    /******************************************************************************/
    /* * * * * * * * * * * * * * * * initAttacker() * * * * * * * * * * * * * * * */
    /******************************************************************************/
    // Function to initiate attacker
    var initAttacker = function (attacker) {
        // Remove the class used to trig the onclick event,
        // by removing the onclick will not be called again
        attacker.removeClass("setCharacter");
        // Another Approach to Remove the onclick event from attacker \\
        // ***** $(attacker).prop("onclick",null).off("click"); **** \\
        // Get all elements except the one user selected
        let _siblings = attacker.siblings();
        // Remove the green backgroung color (Bootstrap)
        _siblings.children(".card").removeClass("bg-success"); /////////////
        // Add a Yellow background color (Bootstrap)
        _siblings.children(".card").addClass("bg-warning"); ///////////
        // Append all elements to the Enemy Column 
        // *** (except the selected element) ***
        $("#enemiesRow").append(_siblings);
        // $("#enemiesHeader").removeClass("invisible");
        // Change Attacker Header Text
        $("#attackerHeader").text("Your Attacker");
        // Generate the Attack rate for user
        userAttackRate = rand(5, 15);
        // Get Attacker Health
        attackerHealth = $(attacker).find(".HPRate").text();
    };
    /*****************************************************************************/
    /* * * * * * * * * * * * * * * * initEnemy() * * * * * * * * * * * * * * * * */
    /*****************************************************************************/
    // function to initiate enemy
    var initEnemy = function (enemy) {
        // Remove the yellow bacground (Bootstrap)
        enemy.children(".card").removeClass("bg-warning");
        // Add a Red background (Bootstrap)
        enemy.children(".card").addClass("bg-danger");
        // Add the selected enemy to enemyRow
        $("#enemyRow").append(enemy);
        // get enemy name
        enemyName = $(enemy).find(".getCharacterName").text();
        // set enemy name to fightInfoRow
        //************* */$(".setEnemyName").html(_enemyName);
        // Generate enemy attack rate
        enemyAttackRate = rand(5, 25);
        // Remove the onclick event from enemy
        //$(enemy).prop("onclick",null).off("click");
        enemy.removeClass("setCharacter");
        // Get enemy health
        //enemyHealth = $(enemy).attr("data-health");
        enemyHealth = $(enemy).find(".HPRate").text();
        //console.log(`enemyHealth : ${enemyHealth}`);
    };
    /////////////////////////////////// ONCLICK //////////////////////////////////////////
    //// onclick event added using class selector $(".setCharacter") for every image  ////
    //// this will be the first event listener to be called, inside we will use some  ////
    //// flags (Bollean) to void user click on selected character twice               ////
    //////////////////////////////////////////////////////////////////////////////////////
    $("#imagesContainer").on("click", ".setCharacter", function (event) {
        // Check if user selected the Attacker
        if (!isAttackerSelected) {
            currentAttacker = $(event.currentTarget);
            initAttacker(currentAttacker);
            // Display Enemy header
            showElements($("#enemiesHeader"));
            // Change the satus of the flag
            isAttackerSelected = !isAttackerSelected;
        }
        // Check if user selected the Enemy
        else if (!isEnemySelected) {
            // Get Selected enemy
            currentEnemy = $(event.currentTarget);
            initEnemy(currentEnemy);
            // Display Fight Header
            //$("#fightHeader").removeClass("invisible");
            // Display Enemy Header
            //$("#enemyHeader").removeClass("invisible");
            // Display Attack Button
            //$("#btn-attack").removeClass("invisible");
            showElements($("#fightHeader"),$("#enemyHeader"),$("#btn-attack"));
            // Hide the Available enemy row to have a clear view
            $("#enemiesRow").addClass("invisible");
            // Change the satus of the flag
            isEnemySelected = !isEnemySelected;
        }
        else {
            console.log("May The Force Be With You!");
        }
    }); // :::: end of setCharacter onclick event listener ::::

    ///////////////////////////////////////////
    // add onclick event to Attack button
    //////////////////////////////////////////
    $("#btn-attack").on("click", function () {
        let _fightInfo = "";
        // TODO: What about hide the attack button?
        if (!isEnemySelected) {
            // Check if have any enemy selected
            _fightInfo = `Select an enemy`;
        }
        else {
            attackerHealth = attackerHealth - enemyAttackRate;
            // Display updated Attacker HPRate
            $(currentAttacker).find(".HPRate").html(attackerHealth < 0 ? "0" : attackerHealth);
            // update enemy HPRate        
            enemyHealth = enemyHealth - userAttackRate;
            // Display Updated Enemy HPRate
            $(currentEnemy).find(".HPRate").html(enemyHealth < 0 ? "0" : enemyHealth);
            // Display attacker rate
            //******************* */$("#attackerHit").html(userAttackRate);
            // Display enemy attack rate
            // ***************** $("#enemyHit").html(enemyAttackRate);
            // Increase Attacker HP by 10% of his attack rate 
            // each time attack happen
            userAttackRate += Math.round(userAttackRate * 10 / 100);
            // Display Fight Info after Attach button clicked
            // ******************* $("#fightInfoRow").removeClass("invisible");
            _fightInfo = `You Attack ${enemyName} by : ${userAttackRate} <br> ${enemyName} attack you by : ${enemyAttackRate}`;
            // Check if got Game Over

            if (enemyHealth < 1) {
                // Means Attacker won the fight
                _fightInfo = `You Defeat ${enemyName} <br> You can Choose another enemy`;
                $(currentEnemy).addClass("invisible");
                $("#enemiesRow").removeClass("invisible");
                isEnemySelected = !isEnemySelected;
            }
            else if (attackerHealth < 1) {
                // You Loose, Enemy Won
                _fightInfo = `You been defeated. <br> GAME OVER!`;
                $("#relod-attack").removeClass("invisible");
            }
        }

        $("#fightInfoRow").html(`<h4>${_fightInfo}</h4>`);

    });
    ////////////////////////////////////////////
    // onclick listener to handle page relod
    ////////////////////////////////////////////
    $("#relod-attack").on("click", function () {
        location.reload();
        //console.log("reload page");
    });
});