import React from 'react'
import { Pokemon } from '../app/page'
import { TypeLabel } from './TypeLabel'
import pokeballPng from '../../assets/pokeballBackground.png'
import Image from 'next/image'
import Link from 'next/link'

export const Card = (pokemon:Pokemon) => {
  // console.log(pokemon)

  return (
    <Link className='card link' key={pokemon.id} href={`/pokemon/${pokemon.id}`} >
      <h1>{pokemon.name}</h1>
      <div className='typeContainer'>
        {pokemon.types.map(({type:{name}}, i) => (<TypeLabel pType={name} key={i} />))}
      </div>
      <Image className='pokeballBackground' 
        src={pokeballPng}
        alt=''
        width={120}
        height={120}
      />
      <Image className='stripeContainer' src={pokemon.sprite}
        loading='lazy'
        alt={pokemon.name}
        width={100}
        height={100}
        />
      <span>#{`0000${pokemon.id}`.substr(-4,7)}</span>
    </Link>
  )
}
