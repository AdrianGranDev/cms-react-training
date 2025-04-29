import { getPokemonData } from "@/utils/dataFetch";
import Image from "next/image";
import pokeballPng from '../../../../assets/pokeballBackground.png'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { TypeLabel } from "@/components/TypeLabel";


export default async function page({params: {pokemonId},}:{
  params: {
    pokemonId:string;
  }
}) {

  const pokeData = await getPokemonData(pokemonId);
  return (
    <section className="pokemonSection">
      <div className="details">
        <Link href={'/'} className="link">
          <FontAwesomeIcon icon={faAngleLeft} className="fa-solid fa-angle-left backBtn" />
          <span >Back</span>
        </Link>
        {/* {pokeData} */}
        <h1>{pokeData.name}</h1>
        <div className='typeContainer'>
          {pokeData.types.map(({type:{name}}:any, i:number) => (<TypeLabel pType={name} key={i} />))}
        </div>
        <span>#{`0000${pokemonId}`.substr(-4,7)}</span>
        <Image className='pokeballBackground' 
          src={pokeballPng}
          alt=''
          width={120}
          height={120}
        />
        <Image className='detailSprite' src={pokeData.sprites.front_shiny}
          loading='lazy'
          alt={pokeData.name}
          width={270}
          height={270}
        />
      </div>
        <div className="pokemonStats">
          <div>
            Height
          </div>
        </div>
    </section>
  )
}