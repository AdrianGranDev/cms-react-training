
import React from 'react'
import pokeballPng from '../../../assets/pokeballBackground.png'
import Image from 'next/image'
import Link from 'next/link'
import { PokemonI } from '@/types/Pokemon'
import { TypeLabel } from '../typeLabel/TypeLabel'

export const Card = ({id, name, types, sprites:{front_default}}:PokemonI) => {
  return (
    <Link className='card link' key={id} href={`/pokemon/${id}`} >
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
      <Image className='stripeContainer' src={front_default}
        loading='lazy'
        alt={name}
        width={100}
        height={100}
        />
      <span>#{id>9999?id:`0000${id}`.substr(-4,7)}</span>
    </Link>
  )
}
