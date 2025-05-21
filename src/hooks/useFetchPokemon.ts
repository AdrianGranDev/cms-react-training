import { useState } from "react";
import { StatusI } from "@/types/Status";
import { PokemonI, PokemonIndexI } from "@/types/Pokemon";
import { getPokemonByFilter, getPokemonDataByURL } from "@/utils/dataFetch";



const compZA = (snapA:any, snapB:any) => {
  if (snapA.name > snapB.name) {
    return -1;
  }
  if (snapA.name < snapB.name) {
    return 1;
  }
  return 0;
}

const compAZ = (snapA:any, snapB:any) => {
  if (snapA.name > snapB.name) {
    return 1;
  }
  if (snapA.name < snapB.name) {
    return -1;
  }
  return 0;
}

const getOffset = (page: number) => {
  return (page) * 50
}
export function useFetchPokemon() {
  const initialState = {
    loading: false,
    success: false,
    error: false
  }
  const [{ loading, success, error }, setStatus] = useState<StatusI>(initialState)

  const getAllPokemon = async (page: number, sort: string): Promise<{ pokemonList: PokemonI[], count: number }> => {
    try {
      setStatus(s => ({ ...initialState, loading: true }));
      let pokemons
      if (sort == 'asc' || sort == 'desc') {
        if (sort == 'asc') {
          pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${getOffset(page)}`);
          pokemons = await pokemons.json();
        }
        else {
          pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page == 26 ? 2 : 50}&offset=${getOffset(25 - page) + 2}`)
          pokemons = await pokemons.json();
          pokemons.results = pokemons.results.reverse()
        }
      } else {
        pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
        pokemons = await pokemons.json();
        pokemons.results = pokemons.results.sort(sort == 'a-z'?compAZ:compZA).splice(page * 50, 50);
      }

      let { results, count } = pokemons;
      const pokesData = await Promise.all(results.map(async (snap: PokemonIndexI) => (await getPokemonDataByURL(snap.url))))

      setStatus(s => ({ ...s, loading: false, success: true }));
      return { pokemonList: pokesData, count }
    } catch (e) {
      setStatus(s => ({ ...s, loading: false, error: true }));
      return { pokemonList: [], count: 0 }
    }
  }


  const getAllPokemonWFilter = async (page: number, filter: string[], sort: string): Promise<{ pokemonList: PokemonI[], count: number }> => {
    try {

      setStatus(s => ({ ...initialState, loading: true }));
      let firstFilter = filter.pop()

      let pokemons = await getPokemonByFilter(firstFilter || '')
      let pokesData: PokemonI[] = await Promise.all(pokemons.map(async ({ pokemon }: { pokemon: PokemonIndexI }) => (await getPokemonDataByURL(pokemon.url))));

      if (!!filter.length) {
        for (let f of filter) {
          pokesData = pokesData.filter(snap => snap.types.some(({ type }) => (type.name == f)))
        }
      }

      const count = pokesData.length

      switch (sort) {
        case 'asc':
          pokesData = pokesData?.splice(page * 50, 50)
          break;
        case 'desc':
          pokesData = pokesData?.reverse().splice(page * 50, 50)
          break;
        case 'a-z':
          pokesData = pokesData?.sort(compAZ).splice(page * 50, 50)
          break;
        case 'z-a':
          pokesData = pokesData?.sort(compZA).splice(page * 50, 50)
          break;
        default:
          pokesData = []
          break;
      }
        


      setStatus(s => ({ ...s, loading: false, success: true }));
      return { count, pokemonList: pokesData }
    } catch (e) {
      setStatus(s => ({ ...s, loading: false, error: true }));
      return { pokemonList: [], count: 0 }
    }
  }




  return { loading, success, error, api: { getAllPokemon, getAllPokemonWFilter } }

}