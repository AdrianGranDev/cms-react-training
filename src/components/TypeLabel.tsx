import React from 'react'
import { pokemonTypeColor } from '../utils/dataFetch'

export const TypeLabel = ({pType}:{pType:string}) => {
  return (
    <span className={`typeLabel`}
      style={pokemonTypeColor[pType]}>
        {pType}
    </span>
  )
}
