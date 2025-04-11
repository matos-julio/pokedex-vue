// Criado pra deixar o PokemonsList mais enxuto, e dividir o codigo em partes menores

// pokemons = array retorno da api | input = texto barra de pesquisa
export function filtrarPokemons(pokemons, input) {
  // se tiver vazio, retorna os pokemons pra lista
  if (!input || !pokemons || pokemons.length === 0) return pokemons;

  const inputNormalizado = input.trim().toLowerCase();
  const isNumber = !isNaN(Number(inputNormalizado));

  // filtro principal
  const filtrados = pokemons.filter(pokemon => {
    if (isNumber && pokemon.id === Number(inputNormalizado)) return true;

    if (pokemon.name.toLowerCase().includes(inputNormalizado)) return true;

    const tipos = pokemon.types.map(t => t.type.name.toLowerCase());
    if (tipos.includes(inputNormalizado)) return true;

    if (pokemon.speciesData?.name?.toLowerCase().includes(inputNormalizado)) return true;

    return false;
  });

  return filtrados;
}
