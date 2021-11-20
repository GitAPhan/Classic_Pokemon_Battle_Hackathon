
// Pikachu statistics
var pikachu = {
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
var bulbasaur = {
    name: 'bulbasaur',
    health: 70,
    attack_name: 'Ram',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Vine Whip',
    sec_attack_damage: 50,
    sec_attack_mana: 3,
};

// Charmander statistics
var charmander = {
    name: 'charmander',
    health: 70,
    attack_name: 'Gnaw',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Flare',
    sec_attack_damage: 20,
    sec_attack_mana: 2,
};

// Squirtle statistics
var squirtle = {
    name: "squirtle",
    health: 70,
    attack_name: 'Tackle',
    attack_damage: 10,
    attack_mana: 1,
    sec_attack_name: 'Rain Splash',
    sec_attack_damage: 20,
    sec_attack_mana: 2,
}

// array to select random pokemon from
var opponent_pokemon_chooser = { 0: pikachu, 1: bulbasaur, 2: charmander, 3: squirtle };

// variables for the battle space/arena
var battle_window = document.getElementById('battleWindow');
var user_battle_window = document.getElementById('userBattleWindow');
var computer_battle_window = document.getElementById('computerBattleWindow');
// var user_attack_options = document.getElementById('userAttack');
// var computer_attack_options = document.getElementById('computerAttack');


// conditional statement to display chosen pokemon 
if (Cookies.get('card_selection') !== undefined) {

    // using cookie to grab preassigned global variable with the same name
    var chosen_pokemon = window[JSON.parse(Cookies.get('card_selection'))];

    // grabbing png of chosen pokemon
    var chosen_pokemon_image = document.createElement('img');
    chosen_pokemon_image.src = `/images/${JSON.parse(Cookies.get('card_selection'))}.png`;
    user_battle_window.appendChild(chosen_pokemon_image);

    // health variable to change during battle
    var user_current_health = chosen_pokemon.health;

    // pokemon health status
    var chosen_pokemon_health_status = document.createElement('p');
    chosen_pokemon_health_status.innerText = user_current_health + "/" + chosen_pokemon.health;

    // health status visual indicator bar
    var user_health_bar = document.createElement('div');
    user_health_bar.classList.add('healthStatus');
    // using the width to represent percent on health
    user_health_bar.style.width = `calc((${user_current_health}/${chosen_pokemon.health}) * 100%)`;

    // user health status
    var user_health = document.getElementById('userHealth');
    user_health.appendChild(chosen_pokemon_health_status);
    user_health.appendChild(user_health_bar);

    // create area to contain attack options;
    var user_attack_options = document.createElement('div');
    user_attack_options.classList.add('attackOptions');
    user_battle_window.appendChild(user_attack_options);

    // user pokemon battle options
    var attack_one = document.createElement('div');
    // button with attack name
    var attack_one_button = document.createElement('button');
    attack_one_button.innerText = chosen_pokemon.attack_name;
    // attack info
    var attack_one_description = document.createElement('p');
    attack_one_description.innerText = `Damage: ${chosen_pokemon.attack_damage}
    Mana Cost: ${chosen_pokemon.attack_mana}`;

    // appending time
    attack_one.appendChild(attack_one_button);
    attack_one.appendChild(attack_one_description);
    user_attack_options.appendChild(attack_one);

    // display mana that the user has
    // all pokemon to start with 2 mana and to be increased by 1 each round
    var user_mana = 2;
    var user_mana_display = document.createElement('p');
    user_mana_display.innerText = "Mana: " + user_mana;
    user_attack_options.appendChild(user_mana_display);

    // user pokemon battle options
    var attack_two = document.createElement('div');
    // button with attack name
    var attack_two_button = document.createElement('button');
    attack_two_button.innerText = chosen_pokemon.sec_attack_name;
    // attack info
    var attack_two_description = document.createElement('p');

    // conditional statement to see if the move is a heal
    if (typeof(chosen_pokemon.sec_attack_damage) === "string") {
        attack_two_description.innerText = `Heal: ${chosen_pokemon.sec_attack_damage.substring(1)}
    Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
        console.log('true');
    } else {
        attack_two_description.innerText = `Damage: ${chosen_pokemon.sec_attack_damage}
    Mana Cost: ${chosen_pokemon.sec_attack_mana}`;
    }


    // appending time
    attack_two.appendChild(attack_two_button);
    attack_two.appendChild(attack_two_description);
    user_attack_options.appendChild(attack_two);



    // ################################################################## //

    // random opponent pokemon
    var opponent_pokemon = opponent_pokemon_chooser[Math.floor(Math.random()*4)];

    // grabbing png of opponent pokemon
    var computer_pokemon_image = document.createElement('img');
    computer_pokemon_image.src = `/images/${opponent_pokemon.name}.png`;
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

    // user health status
    var computer_health = document.getElementById('computerHealth');
    computer_health.appendChild(computer_pokemon_health_status);
    computer_health.appendChild(computer_health_bar);

    // create area to contain attack options;
    var computer_attack_options = document.createElement('div');
    computer_attack_options.classList.add('attackOptions');
    computer_battle_window.appendChild(computer_attack_options);

    // user pokemon battle options
    var computer_attack_one = document.createElement('div');
    // button with attack name
    var computer_attack_one_button = document.createElement('button');
    computer_attack_one_button.innerText = opponent_pokemon.attack_name;
    // attack info
    var computer_attack_one_description = document.createElement('p');
    computer_attack_one_description.innerText = `Damage: ${opponent_pokemon.attack_damage}
    Mana Cost: ${opponent_pokemon.attack_mana}`;

    // appending time
    computer_attack_one.appendChild(computer_attack_one_button);
    computer_attack_one.appendChild(computer_attack_one_description);
    computer_attack_options.appendChild(computer_attack_one);

    // display mana that the user has
    // all pokemon to start with 2 mana and to be increased by 1 each round
    var computer_mana = 2;
    var computer_mana_display = document.createElement('p');
    computer_mana_display.innerText = "Mana: " + user_mana;
    computer_attack_options.appendChild(computer_mana_display);

    // user pokemon battle options
    var computer_attack_two = document.createElement('div');
    // button with attack name
    var computer_attack_two_button = document.createElement('button');
    computer_attack_two_button.innerText = opponent_pokemon.sec_attack_name;
    // attack info
    var computer_attack_two_description = document.createElement('p');

    // conditional statement to see if the move is a heal
    if (typeof(opponent_pokemon.sec_attack_damage) === "string") {
        computer_attack_two_description.innerText = `Heal: ${opponent_pokemon.sec_attack_damage.substring(1)}
    Mana Cost: ${opponent_pokemon.sec_attack_mana}`;
        console.log('true');
    } else {
        computer_attack_two_description.innerText = `Damage: ${opponent_pokemon.sec_attack_damage}
    Mana Cost: ${opponent_pokemon.sec_attack_mana}`;
    };

    // appending time
    computer_attack_two.appendChild(computer_attack_two_button);
    computer_attack_two.appendChild(computer_attack_two_description);
    computer_attack_options.appendChild(computer_attack_two);

    // for debugging
    console.log(this);
} else {
    battle_window.innerText = "Please choose a pokemon!";
}











