{
    // selection function to set cookie when user selects a pokemon
    function pokemon_selection(card) {
        let card_id = {
            name: card.target.id,
            color: card.target.alt,
        };
        Cookies.set('card_selection', JSON.stringify(card_id));
        // I used this because I added all changes to be in the 
        // conditional statement and pulled from cookie 
        location.reload(true);
    }

    // function to clear cookie and refresh page
    function clear_cookie_function() {
        Cookies.remove('card_selection');
        location.reload(true);
    }

    // conditional statement to show choice
    if (Cookies.get('card_selection') !== undefined) {

        // title message to be changed upon selection
        let title_message = document.getElementById('titleMessage');
        title_message.innerText = "You have selected a Pokemon!";

        // card selection
        let card_from_cookie = JSON.parse(Cookies.get('card_selection'));

        // create p tag to show selection
        let selection_message = document.createElement('p');
        selection_message.innerText = "You choose: " + card_from_cookie.name.toUpperCase();
        title_message.appendChild(selection_message);

        // change background color to represent selection
        document.body.style.backgroundColor = card_from_cookie.color;

        // create a tag to take me to the next page
        let begin_battle = document.createElement('a');
        begin_battle.href = "/pages/selection.html";
        begin_battle.innerText = "Lets BATTLE!";
        title_message.appendChild(begin_battle);

        // create tag to clear cookies and make new selection
        let clear_cookie = document.createElement('p');
        clear_cookie.innerText = "Clear SELECTION";
        clear_cookie.addEventListener('click', clear_cookie_function);
        title_message.appendChild(clear_cookie);
    }

    // assigned pikachu variable
    let pikachu = document.getElementById('Pikachu');
    pikachu.addEventListener('click', pokemon_selection);
    // hidden color
    pikachu.alt = "yellow";

    // assigned charmander variable
    let charmander = document.getElementById('Charmander');
    charmander.addEventListener('click', pokemon_selection);
    // hidden color
    charmander.alt = "red";

    // assigned squirtle variable
    let squirtle = document.getElementById('Squirtle');
    squirtle.addEventListener('click', pokemon_selection);
    // hidden color
    squirtle.alt = "blue";

    // assigned bulbasaur variable
    let bulbasaur = document.getElementById('Bulbasaur');
    bulbasaur.addEventListener('click', pokemon_selection);
    // hidden color
    bulbasaur.alt = "green";
}