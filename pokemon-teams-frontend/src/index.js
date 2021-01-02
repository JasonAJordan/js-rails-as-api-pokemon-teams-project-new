const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//console.log("asdf")

/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div>  */


// DOM ELEMENTS 

const body = document.querySelector(`body > main`)
//console.log(body)


//EVENT FUNCTION 

function trainerEdit(event){

    let id = (event.target.parentElement.dataset.id)

    let data = {
        trainer_id_: id
     } 
     console.log(data)

             // species: "Test",
        // nickname: "Testtt",

    if (event.target.innerHTML === 'Add Pokemon'){
            fetch(POKEMONS_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(pokemonObj => renderPokemon(pokemonObj))
    }

    if (event.target.innerHTML === 'Release'){

        // console.log(event.target.dataset)
        //console.log(event.target.dataset.pokemonId)

        let pokeId = event.target.dataset.pokemonId

                fetch(`http://localhost:3000/pokemons/${pokeId}`, {
            method: 'DELETE',
        });
        body.innerHTML = ''
        getTrainers();
        sleep(20);
        getPokemons();

    }

    
}


// Render 

function renderTrainer(trainerObj){

 body.innerHTML += `<div class="card" data-id=${trainerObj.id}><p>${trainerObj.name}</p>
    <button data-trainer-id=${trainerObj.id}>Add Pokemon</button>
    <ul>
    </ul>
    </div>`

    // console.log(trainerObj.pokemons)
    addbutton = body.querySelector('.card')
    addbutton.addEventListener("click", trainerEdit)

}

function renderPokemon(pokemon){

    console.log(pokemon)
    test = document.querySelector(`body > main > div:nth-child(${pokemon.trainer_id}) > ul`)
    //console.log(test)

    cardul = document.querySelector(`body > main > div:nth-child(${pokemon.trainer_id}) > ul`)
    cardul.innerHTML += `<li> ${pokemon.nickname} (${pokemon.species}) 
    <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
   
}


// ADV FUNCS

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

// FETCH 

function getPokemons(){

    fetch(POKEMONS_URL)  
    .then(response => response.json())
    .then(pokemons => pokemons.forEach( pokemon => renderPokemon(pokemon)))
}

function getTrainers(){
   
    fetch(TRAINERS_URL)  
    .then(response => response.json())
    .then(trainers => trainers.forEach( trainer => renderTrainer(trainer)))  

}


getTrainers()
getPokemons()

