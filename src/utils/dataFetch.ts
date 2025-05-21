


export const getPokemonDataByURL = async (pokemonUrl:string) => {
    try {
        const resp = await fetch(pokemonUrl)
        const pokeData = await resp.json();
        return pokeData;
    } catch (e) {
    }
}

export const getPokemonDataByID = async (pokemonId:string) => {
    try {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId)
        const pokeData = await resp.json();
        return pokeData;
    } catch (e) {
        console.log(e)
    }
}

export const getPokemonByFilter = async (filter:string) => {
    try {
        const pokemons = await fetch(`https://pokeapi.co/api/v2/type/${filter}`)
        let { pokemon } = await pokemons.json()
        // return pokemon.map((s:any)=>({...s,id: s.pokemon.url.split('/')[6]}));
        return pokemon
    } catch (e) {
        console.log(e)
    }
}