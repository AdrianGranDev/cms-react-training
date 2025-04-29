'use client'

import { useEffect, useState } from "react";
import { getAllPokemon } from "../utils/dataFetch";
import { Card } from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


export interface Pokemon {
  id: number;
  name: string;
  types: Array<any>;
  sprite: string;
}

export default function Home() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [{end, start}, setIndex] = useState<{end:number, start: number}>({end:0, start:1})

  const getData = async () => {
    const {pokemonList, ...index} = await getAllPokemon(start);
    setPokemons(pokemonList)
    setIndex(index)
  }

  const handleSearchPage = (newPage:number) => {
    setIndex(s=>({...s, start: start+ newPage}))
  }

  useEffect(()=> {
    getData()
  },[start])

  return (
    <section className="pokedex">
      <h1>Pokédex</h1>
      <div className="filters">
        <div>
          <label htmlFor="type">Type</label>
          <select name="type" id="" />
        </div>
        <div>
          <label htmlFor="sort">Type</label>
          <select name="sort" id="" />
        </div>
      </div>
      <div className="pokelist">
        {pokemons.map((pokemon, i) => <Card {...pokemon} key={i} />)}
      </div>
      <div className="paginator">
        <button disabled={start==1} onClick={()=>handleSearchPage(-1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleLeft} className="fa-solid fa-angle-left" /></button>
        <span>{start} - {end} of x</span>
        <button disabled={end>1000} onClick={()=>handleSearchPage(1)} className="arrowBtn"><FontAwesomeIcon icon={faAngleRight} className="fa-solid fa-angle-right" /></button>
      </div>
    </section>
  );
}




