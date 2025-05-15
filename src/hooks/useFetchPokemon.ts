import { useState } from "react";
import { StatusI } from "@/types/Status";
import { PokemonIndexI } from "@/types/Pokemon";


const x = `
1= normal
`
const getOffset = (page:number) => {
    return (page)*50
}
export function useFetchPokemon() {
    const initialState = {
        loading:false,
        success:false,
        error: false
    }
    const [{loading, success, error}, setStatus ] = useState<StatusI>(initialState)

    const getAllPokemon = async (page:number, sortAsc: boolean): Promise<{pokemonList:PokemonIndexI[], count:number}> => {
        try {
            setStatus(s=>({...initialState, loading:true}));
            let pokemons = sortAsc ? 
                await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${getOffset(page)}`) :
                await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page==26?2:50}&offset=${getOffset(25-page)+2}`)
            let {results, count} = await pokemons.json();

            setStatus(s=>({...s, loading:false, success: true}));
            return {pokemonList:sortAsc?results:results.reverse(), count}
        } catch (e) {
            setStatus(s=>({...s, loading:false, error: true}));
            return {pokemonList:[], count:0}
        }
    }

    
    const getAllPokemonWFilter = async (page:number, filter: string, sortAsc: boolean): Promise<{pokemonList:PokemonIndexI[], count:number}> => {
        try {
            setStatus(s=>({...initialState, loading:true}));

            const pokemons = await fetch(`https://pokeapi.co/api/v2/type/${filter}`)
            let { pokemon } = await pokemons.json()
            setStatus(s=>({...s, loading:false, success: true}));
            if (sortAsc) {
                return {count:pokemon.length, pokemonList:pokemon?.splice(page*50,50).map(({pokemon}:any)=> (pokemon))}
            }
            return {count:pokemon.length, pokemonList:pokemon?.reverse().splice(page*50,50).map(({pokemon}:any)=> (pokemon))}
        } catch (e) {
            setStatus(s=>({...s, loading:false, error: true}));
            return {pokemonList:[], count:0}
        }
    }
    
    
    const getPokemonData = async (pokemonUrl:string) => {
        try {
            setStatus(s=>({...initialState, loading:true}));
            const resp = await fetch(pokemonUrl)
            const pokeData = await resp.json();
            setStatus(s=>({...s, loading:false, success: true}));
            return pokeData;
        } catch (e) {
            setStatus(s=>({...s, loading:false, error: true}));
        }
    }

    return {loading, success, error, api:{getAllPokemon, getPokemonData, getAllPokemonWFilter}}

}