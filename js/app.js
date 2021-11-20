{
    // selection function to set cookie when user selects a pokemon
    function pokemon_selection(card) {
        let card_id = card.target.id;
        Cookies.set('card_selection', JSON.stringify(card_id));
        console.log(this);
        location.reload(true);
    }

    // conditional statement to show choice
    if (Cookies.get('card_selection') !== undefined) {

        // title message to be changed upon selection
        let title_message = document.getElementById('titleMessage');
        title_message.innerText = "You have selected a Pokemon!";

        // create p tag to show selection
        let selection_message = document.createElement('p');
        selection_message.innerText = "You choose: " + JSON.parse(Cookies.get('card_selection'));
        title_message.appendChild(selection_message);

        // create a tag to take me to the next page
        let begin_battle = document.createElement('a');
        begin_battle.href = "/pages/selection.html";
        begin_battle.innerText = "Lets BATTLE!";
        title_message.appendChild(begin_battle);
    }

    // assigned pikachu variable
    let pikachu = document.getElementById('pikachu');
    pikachu.addEventListener('click', pokemon_selection);

    // assigned charmander variable
    let charmander = document.getElementById('charmander');
    charmander.addEventListener('click', pokemon_selection);

    // assigned squirtle variable
    let squirtle = document.getElementById('squirtle');
    squirtle.addEventListener('click', pokemon_selection);

    // assigned bulbasaur variable
    let bulbasaur = document.getElementById('bulbasaur');
    bulbasaur.addEventListener('click', pokemon_selection);
}