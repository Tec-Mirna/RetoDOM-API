const divBody = document.querySelector("#app");

divBody.innerHTML = `


  <section class="container">
    <div class="row" id="characters-cards"></div>
  </section>
`
/* METODO DE  BÚSQUEDA
const botonEnviar = document.querySelector("#BotonBuscar");
botonEnviar.addEventListener('click', buscarPokemon);

async function buscarPokemon() {
  try {
    const pokemonInput = document.querySelector('#nameInput').value.toLowerCase();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`);
    if (!response.ok) {
      throw new Error('No se encontraron resultados para el Pokémon ingresado.');
    }

    const data = await response.json();

    const pokemonDetails = {
      nombre: data.name,
      imagen: data.sprites.front_default,
      tipos: data.types.map(type => type.type.name).join(', ')
    };

    divBody.innerHTML = `
      <h2>${pokemonDetails.nombre}</h2>
      <img src="${pokemonDetails.imagen}" alt="${pokemonDetails.nombre}">
      <p><strong>Tipo:</strong> ${pokemonDetails.tipos}</p>
      <button id="BotonVolver">Volver</button>
      <section class="container">
        <div class="row" id="characters-cards"></div>
      </section>
    `;
    
    const VolverButton = document.querySelector("#BotonVolver");
    VolverButton.addEventListener('click', () => { location.reload(); });

  } catch (error) {
    divBody.innerHTML = `
      <p>${error.message}</p>
      <button id="BotonVolver">Volver</button>
    `;
  }
} */

const getCharacters = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await response.json();

    data.results.map(async (character) => {
      try {
        const characterResponse = await fetch(character.url);
        const characterData = await characterResponse.json();

        const characterCard = document.createElement('div');
        characterCard.classList.add('col-sm-12', 'col-md-4');

        const imageUrl = characterData.sprites.other['official-artwork'].front_default;

        characterCard.innerHTML = `
          <div class="card m-3" style="width: 18rem;">
            <img src="${imageUrl}" alt="${characterData.name}">
            <div class="card-body">
              <h5 class="card-title">${characterData.name}</h5>
            </div>
          </div>
        `;

        document.querySelector('#characters-cards').appendChild(characterCard);
      } catch (error) {
        console.log(`Ha ocurrido un error al obtener el personaje: ${error}`);
      }
    });
  } catch (error) {
    console.log(`Ha ocurrido un error al obtener la lista de personajes: ${error}`);
  }
}

getCharacters();