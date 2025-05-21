'use client'

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useFetchPokemon } from "@/hooks/useFetchPokemon";
import { PokemonI } from "@/types/Pokemon";
import { Loading } from "@/components/loading/Loading";
import { Card } from "@/components/card/Card";
import { Select } from "@/components/select/Select";
import { TypeLabel } from "@/components/typeLabel/TypeLabel";



export const types:Record<string, boolean> = {
  // "all":false,
  "bug":false,
  "normal":false,
  "flying":false,
  "dragon":false,
  "psychic":false,
  "grass":false,
  "fairy":false,
  "steel":false,
  "ice":false,
  "fire":false,
  "dark":false,
  "poison":false,
  "ghost":false,
  "electric":false,
  "rock":false,
  "ground":false,
  "fighting":false,
  "water":false
}


export default function Home() {

  const [pokemons, setPokemons] = useState<PokemonI[]>([])
  const [{page, count}, setIndex] = useState<{page:number, count: number}>({page:0, count:1})
  const {loading, success, error, api:{getAllPokemon, getAllPokemonWFilter}} = useFetchPokemon();
  const [ typeFilter, setTypeFilter ] = useState<Record<string, {}>|string>('all')
  const [ sortFilter, setSortFilter ] = useState<string>('asc')
  const [ sortFilterFocus, setSortFilterFocus ] = useState<boolean>(false)

  const getData = async () => {
    try {
      let data;
      if ( typeFilter=='all') {
        data = await getAllPokemon(page, sortFilter)
      } else {
        
        let filter = Object.keys(typeFilter).filter((s:string)=>(typeFilter as Record<string, boolean>)[s])
        if (filter.length == 0) return setTypeFilter('all')
        data = await getAllPokemonWFilter(page, filter, sortFilter);
      }
      const {pokemonList, count:SCount } = data;
      setPokemons(pokemonList);
      setIndex({page, count: SCount})
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearchPage = (newPage:number) => {
    setIndex(s=>({...s, page: page+ newPage}))
  }

  const handleFilterType = (e:string) => {
    if (e=='all' && typeFilter=='all') return
    setIndex({page:0, count})
    setTypeFilter(s=> 
      e == 'all' ? 'all':
      s=='all'?
        {...types,[e]:true}:
        {...(s as Record<string, boolean>),[e]:!(s as Record<string, boolean>)[e]}
    )
  }

  const handleFilterSort = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    setSortFilter(e.target.value)
    setIndex({page:0, count})
  }

  useEffect(()=> {
    getData()
  },[page, typeFilter, sortFilter])
  


  return (
    <main>
      <section className="pokedex">
        <h1>Pokédex</h1>
        <div className="filters">

          <Select title="Type" value={typeof typeFilter == 'string' ? 'All' : Object.keys(typeFilter).filter((s:string)=>(typeFilter as Record<string, boolean>)[s]).toString()} >
            <div className="options">
                <div key={'all'} onClick={()=>{handleFilterType('all')}}>
                  {/* -value={'all'} */}
                  <CheckboxSVG selected={typeFilter==='all'} />
                  All
                </div>
                {              
                  Object.keys(types).map((s:any)=> (
                  <div key={s} onClick={()=>{handleFilterType(s)}}>
                    <CheckboxSVG selected={(typeFilter as Record<string, boolean>)[s]} />
                    <TypeLabel pType={s} />
                  </div>))
                }
            </div>
          </Select>


          <div>
            <label htmlFor="sort">Sort By</label>
            <select name="sort" id="" value={sortFilter} onChange={handleFilterSort}
              onClick={()=>setSortFilterFocus(s=>!s)}
              onBlur={()=>setSortFilterFocus(false)}
            >
              <option key={'asc'} value={'asc'}>Lowest Number (First)</option>
              <option key={'desc'} value={'desc'}>Highest Number (First)</option>
              <option key={'a-z'} value={'a-z'}>A-Z</option>
              <option key={'z-a'} value={'z-a'}>Z-A</option>
            </select>
            <svg width="24" height="24" className="pokeballIcon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" fill="white" stroke="#313131" strokeWidth="2"/>
              <path d="M1,12 H23" stroke="#313131" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="white" stroke="#313131" strokeWidth="2"/>
            </svg>

            <span className={`${sortFilterFocus&&'selected'}`}>
              <FontAwesomeIcon icon={sortFilterFocus?faChevronDown:faChevronUp} className="fa-solid" />
            </span>
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






const CheckboxSVG = ({selected}:{selected:boolean}) => {
  if (selected) {
    return (
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" fill="#00BFFF"/>
        <circle cx="10" cy="10" r="6" fill="#FFFFFF"/>
        <circle cx="10" cy="10" r="4.5" fill="#00BFFF"/>
      </svg>
    )
  }
  return (
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="#BEBEBE"/>
      <circle cx="10" cy="10" r="6" fill="#FFFFFF"/>
    </svg>
  )
}