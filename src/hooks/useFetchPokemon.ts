import { useState } from "react";
import { PokemonI } from "../app/page"


interface StatusI {
    loading:boolean; 
    success:boolean; 
    error:boolean; 
}





export function useFetchPokemon() {
    const [{loading, success, error}, setStatus ] = useState<StatusI>({
        loading:false,
        success:false,
        error: false
    })

    const getAllPokemon = async (page:number): Promise<{pokemonList:PokemonI[], end: number, start: number}> => {
        try {
            setStatus(s=>({...s, loading:true}));
            const end = (50*page)+1;
            const start = end-50;
            let promises:any = []
            for (let i = start; i < end; i++) {
                promises.push(fetch('https://pokeapi.co/api/v2/pokemon/'+i))
            }
    
            promises = (await Promise.all(promises)).map(snap => snap.json())
            const pokemonList: PokemonI[] = (await Promise.all(promises)).map(({id, name, sprites:{front_default}, types}:any)=>({id, name, sprite:front_default, types}))
    
            setStatus(s=>({...s, loading:false, success: true}));
            return {pokemonList, end, start:page}
        } catch (e) {
            setStatus(s=>({...s, loading:false, error: true}));
            return {pokemonList:[], end:0, start:0}
        }
    }
    
    
    
    
    const getPokemonData = async (pokemonId:string) => {
        try {
            setStatus(s=>({...s, loading:true}));
            const resp = await fetch('https://pokeapi.co/api/v2/pokemon/'+pokemonId)
            const pokeData = await resp.json();
            setStatus(s=>({...s, loading:false, success: true}));
            return pokeData;
        } catch (e) {
            setStatus(s=>({...s, loading:false, error: true}));
        }
    }

    return {loading, success, error, api:{getAllPokemon, getPokemonData}}

}