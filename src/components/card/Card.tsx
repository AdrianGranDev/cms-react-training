
import React, { useEffect, useState } from 'react'
import pokeballPng from '../../../assets/pokeballBackground.png'
import Image from 'next/image'
import styles from './card.module.css'
import Link from 'next/link'
import { useFetchPokemon } from '@/hooks/useFetchPokemon'
import { PokemonI } from '@/types/Pokemon'
import { TypeLabel } from '../typeLabel/TypeLabel'
import { Loading } from '../loading/Loading'

export const Card = (pokemon:{name:string, url:string}) => {

  const {loading, success, error, api:{getPokemonData}} = useFetchPokemon();
  const [{id, name, types, sprite}, setPokemonData] = useState<PokemonI>({} as PokemonI)

  const handleGetData = async () => {
    const pokeData = await getPokemonData(pokemon.url);
    setPokemonData({types:pokeData.types, id: pokeData.id, sprite:pokeData.sprites.front_default, name: pokeData.name})
  }
  useEffect(()=>{
    handleGetData()
  },[])
  
  return (
    <Link className='card link' key={id} href={`/pokemon/${id}`} >
      
      {
        loading&&<Loading />
      }
      {
        success&&(
          <>
            <h1>{name}</h1>
            <div className='typeContainer'>
              {types?.map(({type:{name}}, i) => (<TypeLabel pType={name} key={i} />))}
            </div>
            <Image className='pokeballBackground' 
              src={pokeballPng}
              alt=''
              width={120}
              height={120}
            />
            <Image className='stripeContainer' src={sprite}
              loading='lazy'
              alt={name}
              width={100}
              height={100}
              />
            <span>#{`0000${id}`.substr(-4,7)}</span>
          </>



        )
      }
      {
        error&&<div className="error">Error loading data</div>
      }
    </Link>
  )
}
