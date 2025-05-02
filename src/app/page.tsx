'use client'

import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useFetchPokemon } from "@/hooks/useFetchPokemon";


export interface PokemonI {
  id: number;
  name: string;
  types: Array<any>;
  sprite: string;
}
const types = [
  "bug",
  "fairy",
  "dragon",
  "fire",
  "ghost",
  "ground",
  "normal",
  "psychic",
  "steel",
  "dark",
  "electric",
  "fighting",
  "flying",
  "grass",
  "ice",
  "poison",
  "rock",
  "water"
  ]

const pokemonTypeCheck = (pokemon:PokemonI, checkType:string) => {
  console.log(pokemon)
  console.log(pokemon.types.some((s)=> s.type == checkType))
  return pokemon.types.some((s)=> s.type.name == checkType)
}

export default function Home() {

  const [pokemons, setPokemons] = useState<PokemonI[]>([])
  const [{end, start}, setIndex] = useState<{end:number, start: number}>({end:0, start:1})
  const {loading, success, error, api:{getAllPokemon}} = useFetchPokemon();
  const [ typeFilter, setTypeFilter ] = useState<string>('all')
  const [ sortFilter, setSortFilter ] = useState<string>('asc')

  const getData = async () => {
    const {pokemonList, ...index} = await getAllPokemon(start);
    // if ()
    // setPokemons(typeFilter=='all'? pokemonList: pokemonList.filter((s)=>(pokemonTypeCheck(s, typeFilter))))
    setPokemons(sortFilter=='asc'? pokemonList: pokemonList.reverse())
    setIndex(index)
  }

  const handleSearchPage = (newPage:number) => {
    setIndex(s=>({...s, start: start+ newPage}))
  }

  const handleFilterType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setTypeFilter(e.target.value)
  }

  const handleFilterSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSortFilter(e.target.value)
    setPokemons(s=>s.reverse())
  }

  useEffect(()=> {
    getData()
  },[start])
  
  return (
    <main>
      <section className="pokedex">
        <h1>Pokédex</h1>
        <div className="filters">
          <div>
            <label htmlFor="type">Type</label>
            <select name="type" id="" value={typeFilter} onChange={handleFilterType} >
              <option key={'black'} value={'all'}>All</option>
              {              
                types.map((s:any)=> (<option key={s} value={s}>{s}</option>))
              }
            </select>
          </div>
          <div>
            <label htmlFor="sort">Sort By</label>
            <select name="sort" id="" value={sortFilter} onChange={handleFilterSort} >
              <option key={'asc'} value={'asc'}>Lowest Number</option>
              <option key={'desc'} value={'desc'}>Highest Number</option>
            </select>
          </div>
        </div>
        <div className="pokelist">
          {
            loading&&<div>loading</div>
          }
          {
            success&&
            typeFilter=='all'? pokemons.map((pokemon, i) => <Card {...pokemon} key={i} />):
            pokemons.filter((s)=>(pokemonTypeCheck(s, typeFilter))).map((pokemon, i) => <Card {...pokemon} key={i} />)
          }
          {
            error&&<div className="error">Error loading data</div>
          }
          
        </div>
      </section>
      <div className="paginator">
        <button disabled={start==1} onClick={()=>handleSearchPage(-1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleLeft} className="fa-solid fa-angle-left" /></button>
        <span>{start} - {end} of 1008</span>
        <button disabled={end>1000} onClick={()=>handleSearchPage(1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleRight} className="fa-solid fa-angle-right" /></button>
      </div>
    </main>
  );
}






