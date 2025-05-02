import { PokemonI } from "../app/page"

const pokemonTypeColor:Record<string, {}> = {
    bug:{backgroundColor:"#729F3F", color:"#FFFFFF"},
    fairy:{backgroundColor:"#FDB9E9"},
    dragon: {background:"linear-gradient(to top, #F16E57 50%, #53A4CF 50%)", color:"#FFFFFF"},
    fire:{backgroundColor:"#FD7D24", color:"#FFFFFF"},
    ghost:{backgroundColor:"#7B62A3", color:"#FFFFFF"},
    ground: {background:"linear-gradient(to top, #AB9842 50%, #F7DE3F 50%)"},
    normal:{backgroundColor:"#A4ACAF"},
    psychic:{backgroundColor:"#F366B9", color:"#FFFFFF"},
    steel:{backgroundColor:"#9EB7B8"},
    dark:{backgroundColor:"#707070", color:"#FFFFFF"},
    electric:{backgroundColor:"#EED535"},
    fighting:{backgroundColor:"#D56723", color:"#FFFFFF"},
    flying: {background:"linear-gradient(to top, #3DC7EF 50%, #BDB9B8 50%)"},
    grass:{backgroundColor:"#9BCC50"},
    ice:{backgroundColor:"#51C4E7"},
    poison:{backgroundColor:"#B97FC9", color:"#FFFFFF"},
    rock:{backgroundColor:"#A38C21", color:"#FFFFFF"},
    water:{backgroundColor:"#4592C4", color:"#FFFFFF"},
}


export const getAllPokemon = async (page:number): Promise<{pokemonList:PokemonI[], end: number, start: number}> => {
    try { 
        const end = (50*page)+1;
        const start = end-50;
        let promises:any = []
        for (let i = start; i < end; i++) {
            promises.push(fetch('https://pokeapi.co/api/v2/pokemon/'+i))
        }

        promises = (await Promise.all(promises)).map(snap => snap.json())
        const pokemonList: PokemonI[] = (await Promise.all(promises)).map(({id, name, sprites:{front_default}, types}:any)=>({id, name, sprite:front_default, types}))

        return {pokemonList, end, start:page}
    } catch (e) {
        console.log(e)
        return {pokemonList:[], end:0, start:0}
    }
}




export const getPokemonData = async (pokemonId:string) => {
    try {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId)
        const pokeData = await resp.json();
        return pokeData;
    } catch (e) {
        console.log(e)
    }
}