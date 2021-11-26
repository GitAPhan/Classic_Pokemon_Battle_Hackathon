// function to automatically save current game status after each turn
function save_game() {
    var new_cookie = {
        userHealthPots: heal_potion_quantity,
        userCurrentHealth: user_current_health,
        computerCurrentHealth: computer_current_health,
        userPokemonSelection: chosen_pokemon.name,
        computerPokemonSelection: opponent_pokemon.name,
        userCurrentMana: user_mana,
        computerCurrentMana: computer_mana
    };
    Cookies.set('game_status', JSON.stringify(new_cookie));
}

// function to filter computer's attack
function attack_only(e) {
    if (e.alt > 0) {
        return true;
    } else {
        return false;
    }
}

// function to clear pokemon selection cookie
function clear_cookie() {
    Cookies.remove('card_selection');
}

// function to clear saved game
function clear_saved_game() {
    Cookies.remove('game_status');
}

// function to filter out conputer's attack that doesn't have enough mana
function computer_mana_check(e) {
    if (e.value <= computer_mana) {
        return true;
    } else {
        return false;
    }
}

// function for user mana check
function user_mana_check() {
    // disable button if there isn't enough MANA
    // conditional statement for the first button
    if (user_mana < attack_one_button.value) {
        attack_one_button.style.pointerEvents = "none";
        attack_one_button.style.backgroundColor = "red";
    } else {
        attack_one_button.style.pointerEvents = "auto";
        attack_one_button.style.backgroundColor = "#EFEFEF";
    };
    // conditional statement for the second button
    if (user_mana < attack_two_button.value) {
        attack_two_button.style.pointerEvents = "none";
        attack_two_button.style.backgroundColor = "red";
    } else {
        attack_two_button.style.pointerEvents = "auto";
        attack_two_button.style.backgroundColor = "#EFEFEF";
    };
};



// function to toggle attack animation class for computer's pokemon
function computer_attack_animation() {
    computer_pokemon_image.classList.toggle('computer_attack_animation');
}

// function to toggle heal animation class for computer's pokemon
function computer_heal_animation() {
    computer_pokemon_image.classList.toggle('heal_animation');
}

// function for computer attack sequence
function computer_attack_sequence() {
    // conditional to add healing options only if the opponent pokemon is below -20
    if (computer_current_health >= (opponent_pokemon.health - 20)) {

        var opponent_attack_array = opponent_attack.filter(attack_only);
        opponent_attack_array = opponent_attack_array.filter(computer_mana_check);
        var computer_attack = opponent_attack_array[Math.floor(Math.random() * opponent_attack_array.length)]

    } else {
        // computer selects attack method
        var opponent_attack_array = opponent_attack.filter(computer_mana_check);
        var computer_attack = opponent_attack_array[Math.floor(Math.random() * opponent_attack_array.length)];
    }

    // conditional statement to determine in the move is an attack on the user of computer heals self
    if (computer_attack.alt > 0) {
        // computer attacks user
        user_current_health = user_current_health - computer_attack.alt;
        // innerText of user health updated and health bar width updated to reflect health remaining
        user_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;
        user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

        // computer attack animation
        computer_attack_animation();
        setTimeout(computer_attack_animation, 1500);

    } else {
        // computer heals self
        computer_current_health = Math.min(opponent_pokemon.health, (computer_current_health - computer_attack.alt));
        // innerText of computer health and health bar width updated to reflect health remaining
        computer_pokemon_health_status.innerText = computer_current_health + "/" + opponent_pokemon.health;
        computer_health_bar.style.width = `calc((${computer_current_health}/${opponent_pokemon.health}) * 100%)`;

        // computer heal animation
        computer_heal_animation();
        setTimeout(computer_heal_animation, 1500);
    }

    // update computer mana counter
    computer_mana = computer_mana - computer_attack.value;

    // conditional to display battle log
    if (computer_attack.alt > 0) {
        battle_log_header.innerText = "opponent " + opponent_pokemon.name + " attacks with " + computer_attack.innerText;
        battle_log_description.style.opacity = "0";
        // function to delay attack description text
        function delay_text() {
            battle_log_description.style.opacity = "1";
            battle_log_description.innerText = chosen_pokemon.name + " took " + computer_attack.alt + " damage";
        }
        setTimeout(delay_text, 1000);
    } else if (computer_attack.innerText == "wild berry") {
        battle_log_header.innerText = "opponent " + opponent_pokemon.name + " ate a " + computer_attack.innerText;
        battle_log_description.style.opacity = "0";
        // function to delay heal sequence
        function delay_heal_text() {
            battle_log_description.style.opacity = "1";
            battle_log_description.innerText = "opponent " + opponent_pokemon.name + " healed by " + computer_attack.alt * -1 + "hp";
        }
        setTimeout(delay_heal_text, 1000);
    } else {
        battle_log_header.innerText = "opponent " + opponent_pokemon.name + " heals with " + computer_attack.innerText;
        battle_log_description.style.opacity = "0";
        // function to delay heal sequence
        function delay_heal_text() {
            battle_log_description.style.opacity = "1";
            battle_log_description.innerText = "opponent " + opponent_pokemon.name + " healed by " + computer_attack.alt * -1 + "hp";
        }
        setTimeout(delay_heal_text, 1000);
    }

    // random mana (0-2) to be added for the next round
    computer_mana = computer_mana + Math.floor(Math.random() * 3)
}

// function to move home button to the middle of the screen
function move_home_button() {
    var home_button = document.getElementById('home_button');
    home_button.classList.add('home');
}

// function to determine if the match has ended
function death_check() {
    // conditional for if both pokemon dies
    if (user_current_health <= 0 && computer_current_health <= 0) {
        user_battle_window.innerText = "Looks like you both";
        computer_battle_window.innerText = "have been defeated";

        var complete_msg = "DRAW!";
        move_home_button();

        return complete_msg;
        // conditional for if the user pokemon's health goes below 0
    } else if (user_current_health <= 0) {
        user_battle_window.innerText = "Your pokemon has been defeated!";
        computer_battle_window.innerText = "WINNER!";
        // image of winning Pokemon
        var winner = document.createElement('img');
        winner.src = `/images/${opponent_pokemon.name}.gif`;
        computer_battle_window.appendChild(winner);

        var complete_msg = "Yay " + opponent_pokemon.name + "!";
        move_home_button();

        return complete_msg;

        // conditional for if the computer pokemon's health goes below 0
    } else if (computer_current_health <= 0) {
        computer_battle_window.innerText = "Your opponent has been defeated!";
        user_battle_window.innerText = "WINNER!";
        // image of winning Pokemon
        var winner = document.createElement('img');
        winner.src = `/images/${chosen_pokemon.name}.gif`;
        user_battle_window.appendChild(winner);

        var complete_msg = "Yay " + chosen_pokemon.name + "!";
        move_home_button();

        return complete_msg;

    } else {
        return true;
    }


}

// function to enable buttons
function enable_buttons() {
    var all_buttons = document.getElementsByTagName('button');
    // loop
    for (var i = 0; i < all_buttons.length; i++) {
        all_buttons[i].style.pointerEvents = 'auto';
    }
}


// function to have battle simulation message to disappear
function battle_message_disappear() {

    // user mana check
    if (user_current_health <= 0 || computer_current_health <= 0) {

        user_mana_display.innerText = death_check();
        clear_saved_game();
        clear_cookie();
    } else {

        // random mana (0-2) to be added for the next round
        var mana_up = Math.floor(Math.random() * 3);
        user_mana = user_mana + mana_up;

        //  display Mana message and end of round message
        battle_log_header.innerText = "round has completed";
        battle_log_description.innerText = "you've just received " + mana_up + " mana points";
        user_mana_display.innerText = "Mana: " + user_mana;

        // save game to cookie
        save_game();

        user_mana_check();
    }

    // battle message disappear
    var battle_message = document.getElementById('battleMessage');
    battle_message.style.opacity = '0';
}

// function to toggle attack animation class for user's pokemon
function user_attack_animation() {
    user_pokemon_image.classList.toggle('attack_animation');
}

// function to toggle heal animation class
function user_heal_animation() {
    user_pokemon_image.classList.toggle('heal_animation');
}


// function for attack sequence
function attack_sequence(button) {

    // battle simulation in progress message
    var battle_message = document.getElementById('battleMessage');
    battle_message.style.opacity = '1';

    // disable button while simulation in progress
    var all_buttons = document.getElementsByTagName('button');
    // loop
    for (var i = 0; i < all_buttons.length; i++) {
        all_buttons[i].style.pointerEvents = 'none';
    }

    // conditional statement to determine if move is attack on computer or heal self or healing potion
    if (button.target.alt > 0) {
        // user attacks computer and affects current health
        computer_current_health = computer_current_health - button.target.alt;
        // innerText of computer health updated and health bar width updated to reflect health remaining
        computer_pokemon_health_status.innerText = computer_current_health + "/" + opponent_pokemon.health;
        computer_health_bar.style.width = `calc((${computer_current_health}/${opponent_pokemon.health}) * 100%)`;

        // attack animation
        user_attack_animation();
        setTimeout(user_attack_animation, 1500);

        // heal with potion
    } else if (button.target.innerText == 'Potion') {
        // reduced health potion quantity
        heal_potion_quantity = heal_potion_quantity - 1;
        heal_potion_description.innerText = `Heal: 10
    Cost: ${heal_potion_quantity}/3`;
        if (heal_potion_quantity < 1) {
            heal_potion_button.removeEventListener('click', attack_sequence);
            heal_potion_button.style.backgroundColor = "red";
            heal_potion_description.innerText = `no more
        potions`;
        }
        // user heals self using potion
        user_current_health = Math.min((user_current_health - button.target.alt), chosen_pokemon.health);
        // innerText of user health and health bar width updated to reflect health remaining
        user_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;
        user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

        // heal animation
        user_heal_animation();
        setTimeout(user_heal_animation, 2000);

    } else {
        // user heals self
        user_current_health = Math.min((user_current_health - button.target.alt), chosen_pokemon.health);
        // innerText of user health and health bar width updated to reflect health remaining
        user_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;
        user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

        // heal animation
        user_heal_animation();
        setTimeout(user_heal_animation, 2000);
    }

    // update mana counter for user
    user_mana = user_mana - button.target.value;

    // delayed death check 1
    setTimeout(death_check, 1500);

    // conditional to display battle log
    var pokemon_move_damage = button.target.alt
    if (button.target.alt > 0) {
        battle_log_header.innerText = chosen_pokemon.name + " attacks with " + button.target.innerText;
        battle_log_description.style.opacity = "0";
        // function to delay attack description text
        function delay_text() {
            battle_log_description.style.opacity = "1";
            battle_log_description.innerText = "opponent " + opponent_pokemon.name + " took " + pokemon_move_damage + " damage";
        }
        setTimeout(delay_text, 1000);
    } else {
        battle_log_header.innerText = chosen_pokemon.name + " heals with " + button.target.innerText;
        battle_log_description.style.opacity = "0";
        // function to delay heal sequence
        function delay_heal_text() {
            battle_log_description.style.opacity = "1";
            battle_log_description.innerText = chosen_pokemon.name + " healed by " + pokemon_move_damage * -1 + "hp";
        }
        setTimeout(delay_heal_text, 1000);
    }

    // delayed death check 2
    setTimeout(death_check, 3000);

    // to only run if no one has died
    if (computer_current_health > 0) {
        // delayed computer response
        setTimeout(computer_attack_sequence, 1500);
    }

    // enable the buttons
    setTimeout(enable_buttons, 3000);

    // end of battle simulation
    setTimeout(battle_message_disappear, 3500);

    console.log(this);
}

// Pikachu statistics
var Pikachu = {
    name: 'Pikachu',
    health: 90,
    attack_name: 'Corkscrew Punch',
    attack_damage: 20,
    attack_mana: 2,
    sec_attack_name: 'Coffee Break',
    sec_attack_damage: 'h20',
    sec_attack_mana: 1,
};

// Bulbasour statistics
var Bulbasaur = {
    name: 'Bulbasaur',
    health: 70,
    attack_name: 'Ram',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Vine Whip',
    sec_attack_damage: 50,
    sec_attack_mana: 3,
};

// Charmander statistics
var Charmander = {
    name: 'Charmander',
    health: 70,
    attack_name: 'Gnaw',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Flare',
    sec_attack_damage: 20,
    sec_attack_mana: 2,
};

// Squirtle statistics
var Squirtle = {
    name: "Squirtle",
    health: 70,
    attack_name: 'Tackle',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Rain Splash',
    sec_attack_damage: 20,
    sec_attack_mana: 2,
}

// variables for the battle space/arena
var battle_window = document.getElementById('battleWindow');
var user_battle_window = document.getElementById('userBattleWindow');
var computer_battle_window = document.getElementById('computerBattleWindow');

// add event listeners to the two game buttons
var clear_selection_button = document.getElementById('clear_selection');
clear_selection_button.addEventListener('click', clear_cookie);
var clear_saved_game_button = document.getElementById('clear_saved_game');
clear_saved_game_button.addEventListener('click', clear_saved_game);

// condition to run if there is a saved game
if (Cookies.get('game_status') !== undefined) {
    var current_game_status = JSON.parse(Cookies.get('game_status'));

    // using cookie to grab preassigned global variable with the same name
    var chosen_pokemon = window[current_game_status.userPokemonSelection];

    // grabbing gif of chosen pokemon
    var user_pokemon_image = document.createElement('img');
    user_pokemon_image.src = `/images/${current_game_status.userPokemonSelection}.gif`;
    user_pokemon_image.style.transform = "translate(0)";
    user_battle_window.appendChild(user_pokemon_image);

    // health variable to change during battle
    var user_current_health = current_game_status.userCurrentHealth;

    // pokemon health status
    var user_pokemon_health_status = document.createElement('p');
    user_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;

    // health status visual indicator bar
    var user_health_bar = document.createElement('div');
    user_health_bar.classList.add('healthStatus');
    // using the width to represent percent on health
    user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

    // user health status
    var user_health = document.getElementById('userHealth');
    user_health.appendChild(user_pokemon_health_status);
    user_health.appendChild(user_health_bar);

    // create area to contain attack options;
    var user_attack_options = document.createElement('div');
    user_attack_options.classList.add('attackOptions');
    user_battle_window.appendChild(user_attack_options);

    // display mana that the user has
    var user_mana = current_game_status.userCurrentMana;

    //   display mana information
    var user_mana_display = document.getElementById('userManaPoints');
    user_mana_display.innerText = "Mana: " + user_mana;

    // user pokemon battle options
    var attack_one = document.createElement('div');
    // button with attack name
    var attack_one_button = document.createElement('button');
    attack_one_button.innerText = chosen_pokemon.attack_name;
    // hidden mana cost in value tag
    attack_one_button.value = Number(chosen_pokemon.attack_mana);
    // hidden damage value in alt tag
    attack_one_button.alt = Number(chosen_pokemon.attack_damage);
    attack_one_button.addEventListener('click', attack_sequence);

    // attack info
    var attack_one_description = document.createElement('p');
    attack_one_description.innerText = `Damage: ${chosen_pokemon.attack_damage}
Mana Cost: ${chosen_pokemon.attack_mana}`;

    // appending time
    attack_one.appendChild(attack_one_button);
    attack_one.appendChild(attack_one_description);
    user_attack_options.appendChild(attack_one);

    // heal by potion for user
    var heal_potion_container = document.createElement('div');
    var heal_potion_button = document.createElement('button');
    heal_potion_button.innerText = "Potion";
    heal_potion_button.alt = Number(-10);
    heal_potion_button.addEventListener('click', attack_sequence);
    var heal_potion_description = document.createElement('p');
    var heal_potion_quantity = Number(3);
    heal_potion_description.innerText = `Heal: 10
Cost: ${heal_potion_quantity}/3`;
    heal_potion_button.value = current_game_status.userHealthPots;

    heal_potion_container.appendChild(heal_potion_button);
    heal_potion_container.appendChild(heal_potion_description);
    user_attack_options.appendChild(heal_potion_container);

    // add in throw rock option (in case the user or computer runs out of mana)
    var throw_rock_container = document.createElement('div');
    var throw_rock = document.createElement('button');
    throw_rock.value = 0; //require no mana to execute
    throw_rock.alt = 5; //minimal damage
    throw_rock.innerText = "Throw Rock";
    var throw_rock_description = document.createElement('p');
    throw_rock_description.innerText = `unlimited
quantity`;
    throw_rock.addEventListener('click', attack_sequence);

    throw_rock_container.appendChild(throw_rock);
    throw_rock_container.appendChild(throw_rock_description);
    user_attack_options.appendChild(throw_rock_container);



    // user pokemon battle options
    var attack_two = document.createElement('div');
    // button with attack name
    var attack_two_button = document.createElement('button');
    attack_two_button.innerText = chosen_pokemon.sec_attack_name;
    // attack info
    var attack_two_description = document.createElement('p');
    // hidden mana cost in value
    attack_two_button.value = Number(chosen_pokemon.sec_attack_mana);
    // add event to button
    attack_two_button.addEventListener('click', attack_sequence);

    // conditional statement to see if the move is a heal
    if (typeof (chosen_pokemon.sec_attack_damage) === "string") {
        attack_two_button.alt = Number(-chosen_pokemon.sec_attack_damage.substring(1));
        attack_two_description.innerText = `Heal: ${chosen_pokemon.sec_attack_damage.substring(1)}
Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
        console.log('true');
    } else {
        attack_two_button.alt = Number(chosen_pokemon.sec_attack_damage);
        attack_two_description.innerText = `Damage: ${chosen_pokemon.sec_attack_damage}
Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
    }

    // appending time
    attack_two.appendChild(attack_two_button);
    attack_two.appendChild(attack_two_description);
    user_attack_options.appendChild(attack_two);

    // disable button if there isn't enough MANA
    user_mana_check();

    // ///////////////////// ################################## /////////////////////////// //

    var opponent_pokemon = window[current_game_status.computerPokemonSelection];

    // grabbing gif of opponent pokemon
    var computer_pokemon_image = document.createElement('img');
    computer_pokemon_image.src = `/images/${current_game_status.computerPokemonSelection}.gif`;
    computer_battle_window.appendChild(computer_pokemon_image);

    // health variable to change during battle
    var computer_current_health = current_game_status.computerCurrentHealth;

    // pokemon health status
    var computer_pokemon_health_status = document.createElement('p');
    computer_pokemon_health_status.innerText = computer_current_health + "/" + opponent_pokemon.health;

    // health status visual indicator bar
    var computer_health_bar = document.createElement('div');
    computer_health_bar.classList.add('healthStatus');
    // using the width to represent percent on health
    computer_health_bar.style.width = `calc((${computer_current_health}/${opponent_pokemon.health}) * 100%)`;

    // computer health status
    var computer_health = document.getElementById('computerHealth');
    computer_health.appendChild(computer_pokemon_health_status);
    computer_health.appendChild(computer_health_bar);

    // create area to contain event log;
    var battle_log = document.createElement('div');
    battle_log.classList.add('battleLog');
    computer_battle_window.appendChild(battle_log);

    // battle log 
    var battle_log_header = document.createElement('h3');
    battle_log.appendChild(battle_log_header);

    var battle_log_description = document.createElement('p');
    battle_log.appendChild(battle_log_description);

    // variables containing computer attack info
    var computer_attack_one_button = document.createElement('h3');
    computer_attack_one_button.innerText = opponent_pokemon.attack_name;
    // hidden attack value in alt
    computer_attack_one_button.alt = Number(opponent_pokemon.attack_damage);
    // hidden mana requirement in value
    computer_attack_one_button.value = Number(opponent_pokemon.attack_mana);

    // display mana that the computer has
    var computer_mana = current_game_status.computerCurrentMana;

    // computer pokemon battle options
    var computer_attack_two_button = document.createElement('h3');
    computer_attack_two_button.innerText = opponent_pokemon.sec_attack_name;
    // attack info
    var computer_attack_two_description = document.createElement('p');

    // conditional statement to see if the move is a heal
    if (typeof (opponent_pokemon.sec_attack_damage) === "string") {
        computer_attack_two_button.alt = Number(-opponent_pokemon.sec_attack_damage.substring(1));
        console.log('true');
    } else {
        computer_attack_two_button.alt = Number(opponent_pokemon.sec_attack_damage);
    };
    // hidden mana requirement in value
    computer_attack_two_button.value = Number(opponent_pokemon.sec_attack_mana);

    // computer heal potion
    var heal_potion = document.createElement('h3');
    heal_potion.innerText = "wild berry";
    heal_potion.alt = Number(-10);
    heal_potion.value = 0;


    // array for computer to choose random attack from
    var opponent_attack = [computer_attack_one_button, computer_attack_two_button, heal_potion, throw_rock];




    console.log(this);
} else {
    // conditional statement to display chosen pokemon 
    if (Cookies.get('card_selection') !== undefined) {

        // array to select random pokemon from
        var opponent_pokemon_chooser = { 0: Pikachu, 1: Bulbasaur, 2: Charmander, 3: Squirtle };

        // using cookie to grab preassigned global variable with the same name
        var chosen_pokemon = window[JSON.parse(Cookies.get('card_selection')).name];

        // grabbing gif of chosen pokemon
        var user_pokemon_image = document.createElement('img');
        user_pokemon_image.src = `/images/${JSON.parse(Cookies.get('card_selection')).name}.gif`;
        user_pokemon_image.style.transform = "translate(0)";
        user_battle_window.appendChild(user_pokemon_image);

        // health variable to change during battle
        var user_current_health = chosen_pokemon.health;

        // pokemon health status
        var user_pokemon_health_status = document.createElement('p');
        user_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;

        // health status visual indicator bar
        var user_health_bar = document.createElement('div');
        user_health_bar.classList.add('healthStatus');
        // using the width to represent percent on health
        user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

        // user health status
        var user_health = document.getElementById('userHealth');
        user_health.appendChild(user_pokemon_health_status);
        user_health.appendChild(user_health_bar);

        // create area to contain attack options;
        var user_attack_options = document.createElement('div');
        user_attack_options.classList.add('attackOptions');
        user_battle_window.appendChild(user_attack_options);

        // display mana that the user has
        // all pokemon to start with a random number from 1-2
        var user_mana = Math.floor((Math.random() * 2) + 1);
        //   display mana information
        var user_mana_display = document.getElementById('userManaPoints');
        user_mana_display.innerText = "Mana: " + user_mana;

        // user pokemon battle options
        var attack_one = document.createElement('div');
        // button with attack name
        var attack_one_button = document.createElement('button');
        attack_one_button.innerText = chosen_pokemon.attack_name;
        // hidden mana cost in value tag
        attack_one_button.value = Number(chosen_pokemon.attack_mana);
        // hidden damage value in alt tag
        attack_one_button.alt = Number(chosen_pokemon.attack_damage);
        attack_one_button.addEventListener('click', attack_sequence);

        // attack info
        var attack_one_description = document.createElement('p');
        attack_one_description.innerText = `Damage: ${chosen_pokemon.attack_damage}
    Mana Cost: ${chosen_pokemon.attack_mana}`;

        // appending time
        attack_one.appendChild(attack_one_button);
        attack_one.appendChild(attack_one_description);
        user_attack_options.appendChild(attack_one);

        // heal by potion for user
        var heal_potion_container = document.createElement('div');
        var heal_potion_button = document.createElement('button');
        heal_potion_button.innerText = "Potion";
        heal_potion_button.alt = Number(-10);
        heal_potion_button.addEventListener('click', attack_sequence);
        var heal_potion_description = document.createElement('p');
        var heal_potion_quantity = Number(3);
        heal_potion_description.innerText = `Heal: 10
    Cost: ${heal_potion_quantity}/3`;
        heal_potion_button.value = 0;

        heal_potion_container.appendChild(heal_potion_button);
        heal_potion_container.appendChild(heal_potion_description);
        user_attack_options.appendChild(heal_potion_container);

        // add in throw rock option (in case the user or computer runs out of mana)
        var throw_rock_container = document.createElement('div');
        var throw_rock = document.createElement('button');
        throw_rock.value = 0; //require no mana to execute
        throw_rock.alt = 5; //minimal damage
        throw_rock.innerText = "Throw Rock";
        var throw_rock_description = document.createElement('p');
        throw_rock_description.innerText = `unlimited
    quantity`;
        throw_rock.addEventListener('click', attack_sequence);

        throw_rock_container.appendChild(throw_rock);
        throw_rock_container.appendChild(throw_rock_description);
        user_attack_options.appendChild(throw_rock_container);



        // user pokemon battle options
        var attack_two = document.createElement('div');
        // button with attack name
        var attack_two_button = document.createElement('button');
        attack_two_button.innerText = chosen_pokemon.sec_attack_name;
        // attack info
        var attack_two_description = document.createElement('p');
        // hidden mana cost in value
        attack_two_button.value = Number(chosen_pokemon.sec_attack_mana);
        // add event to button
        attack_two_button.addEventListener('click', attack_sequence);

        // conditional statement to see if the move is a heal
        if (typeof (chosen_pokemon.sec_attack_damage) === "string") {
            attack_two_button.alt = Number(-chosen_pokemon.sec_attack_damage.substring(1));
            attack_two_description.innerText = `Heal: ${chosen_pokemon.sec_attack_damage.substring(1)}
    Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
            console.log('true');
        } else {
            attack_two_button.alt = Number(chosen_pokemon.sec_attack_damage);
            attack_two_description.innerText = `Damage: ${chosen_pokemon.sec_attack_damage}
    Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
        }

        // appending time
        attack_two.appendChild(attack_two_button);
        attack_two.appendChild(attack_two_description);
        user_attack_options.appendChild(attack_two);

        // disable button if there isn't enough MANA
        user_mana_check();


        // ################################################################## //

        // random opponent pokemon
        var opponent_pokemon = opponent_pokemon_chooser[Math.floor(Math.random() * 4)];

        // grabbing gif of opponent pokemon
        var computer_pokemon_image = document.createElement('img');
        computer_pokemon_image.src = `/images/${opponent_pokemon.name}.gif`;
        computer_battle_window.appendChild(computer_pokemon_image);

        // health variable to change during battle
        var computer_current_health = opponent_pokemon.health;

        // pokemon health status
        var computer_pokemon_health_status = document.createElement('p');
        computer_pokemon_health_status.innerText = computer_current_health + "/" + opponent_pokemon.health;

        // health status visual indicator bar
        var computer_health_bar = document.createElement('div');
        computer_health_bar.classList.add('healthStatus');
        // using the width to represent percent on health
        computer_health_bar.style.width = `calc((${computer_current_health}/${opponent_pokemon.health}) * 100%)`;

        // computer health status
        var computer_health = document.getElementById('computerHealth');
        computer_health.appendChild(computer_pokemon_health_status);
        computer_health.appendChild(computer_health_bar);

        // create area to contain event log;
        var battle_log = document.createElement('div');
        battle_log.classList.add('battleLog');
        computer_battle_window.appendChild(battle_log);

        // battle log 
        var battle_log_header = document.createElement('h3');
        battle_log.appendChild(battle_log_header);

        var battle_log_description = document.createElement('p');
        battle_log.appendChild(battle_log_description);

        // variables containing computer attack info
        var computer_attack_one_button = document.createElement('h3');
        computer_attack_one_button.innerText = opponent_pokemon.attack_name;
        // hidden attack value in alt
        computer_attack_one_button.alt = Number(opponent_pokemon.attack_damage);
        // hidden mana requirement in value
        computer_attack_one_button.value = Number(opponent_pokemon.attack_mana);

        // display mana that the computer has
        // all pokemon to start with a random number from 1-2
        var computer_mana = Math.floor((Math.random() * 2) + 1);

        // computer pokemon battle options
        var computer_attack_two_button = document.createElement('h3');
        computer_attack_two_button.innerText = opponent_pokemon.sec_attack_name;
        // attack info
        var computer_attack_two_description = document.createElement('p');

        // conditional statement to see if the move is a heal
        if (typeof (opponent_pokemon.sec_attack_damage) === "string") {
            computer_attack_two_button.alt = Number(-opponent_pokemon.sec_attack_damage.substring(1));
            console.log('true');
        } else {
            computer_attack_two_button.alt = Number(opponent_pokemon.sec_attack_damage);
        };
        // hidden mana requirement in value
        computer_attack_two_button.value = Number(opponent_pokemon.sec_attack_mana);

        // computer heal potion
        var heal_potion = document.createElement('h3');
        heal_potion.innerText = "wild berry";
        heal_potion.alt = Number(-10);
        heal_potion.value = 0;


        // array for computer to choose random attack from
        var opponent_attack = [computer_attack_one_button, computer_attack_two_button, heal_potion, throw_rock];
    } else {
        battle_window.innerText = "Please choose a pokemon!";
    }
    save_game();
}



// for debugging
console.log(this);








