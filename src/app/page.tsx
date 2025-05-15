'use client'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useFetchPokemon } from "@/hooks/useFetchPokemon";
import { PokemonI, PokemonIndexI } from "@/types/Pokemon";
import { Loading } from "@/components/loading/Loading";
import { Card } from "@/components/card/Card";



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

  const [pokemons, setPokemons] = useState<PokemonIndexI[]>([])
  const [{page, count}, setIndex] = useState<{page:number, count: number}>({page:0, count:1})
  const {loading, success, error, api:{getAllPokemon, getAllPokemonWFilter}} = useFetchPokemon();
  const [ typeFilter, setTypeFilter ] = useState<string>('all')
  const [ sortFilter, setSortFilter ] = useState<string>('asc')

  const getData = async () => {
    try {
      const {pokemonList, count:SCount } = typeFilter=='all'? await getAllPokemon(page, sortFilter=='asc'):await getAllPokemonWFilter(page, typeFilter, sortFilter=='asc');
      setPokemons(pokemonList);
      setIndex({page, count: SCount})
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearchPage = (newPage:number) => {
    setIndex(s=>({...s, page: page+ newPage}))
  }

  const handleFilterType = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setIndex({page:0, count})
    setTypeFilter(e.target.value)
  }

  const handleFilterSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSortFilter(e.target.value)
  }

  useEffect(()=> {
    getData()
  },[page, typeFilter, sortFilter])
  
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
            loading&&<Loading />
          }
          {
            success&&pokemons.map((pokemon, i) => <Card {...pokemon} key={i} />)
          }
          {
            error&&<div className="error">Error loading data</div>
          }
          
        </div>
      </section>
      <div className="paginator">
        <button disabled={page==0} onClick={()=>handleSearchPage(-1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleLeft} className="fa-solid fa-angle-left" /></button>
        <span>{(page*50)+1} - {count<((page+1)*50)+1?count:((page+1)*50)+1} of {count}</span>
        <button disabled={((page+1)*50)+1>count} onClick={()=>handleSearchPage(1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleRight} className="fa-solid fa-angle-right" /></button>
      </div>
    </main>
  );
}






