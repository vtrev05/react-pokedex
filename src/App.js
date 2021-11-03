import './App.css';
import axios from "axios";
import {useState} from "react";

const App = () => {
  const [pokemonName, setPokemon] = useState('');
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemonInfo] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemonInfo({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemon(event.target.value);
          }}
          value={pokemonName.toLowerCase()}
        />
        <div>
          {pokemonName && <button onClick={searchPokemon}>Search Pokémon</button>}
        </div>
      </div>
      <div className="card">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Number: <span>#{pokemon.number}</span> </h3>
            <h3>Species: <span>{pokemon.species}</span> </h3>
            <h3>Type: <span>{pokemon.type}</span> </h3>
            <h3>Hp: <span>{pokemon.hp}</span> </h3>
            <h3>Attack: <span>{pokemon.attack}</span> </h3>
            <h3>Defense: <span>{pokemon.defense}</span> </h3>
            <h3>Speed: <span>{pokemon.speed}</span> </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
