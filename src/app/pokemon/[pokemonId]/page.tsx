import Image from "next/image";
import pokeballPng from '../../../../assets/pokeballBackground.png'
import shadowPokemon from '../../../../assets/shadow.png'
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { TypeLabel } from "@/components/typeLabel/TypeLabel";
import { getPokemonDataByID } from "@/utils/dataFetch";


export default async function page({params: {pokemonId},}:{
  params: {
    pokemonId:string;
  }
}) {

  const {name, stats, sprites, types, height, weight} = await getPokemonDataByID(pokemonId);
  return (
    <main className="pokemonMain">
      <section className="pokemonSection">
        <div className="details">
          <Link href={'/'} className="link">
            <FontAwesomeIcon icon={faAngleLeft} className="fa-solid fa-angle-left backBtn" />
            <span >Back</span>
          </Link>
          {/* { */}
          <h1>{name}</h1>
          <div className='typeContainer'>
            {types.map(({type:{name}}:any, i:number) => (<TypeLabel pType={name} key={i} />))}
          </div>
          <span>#{`0000${pokemonId}`.substr(-4,7)}</span>
          <Image className='pokeballBackground' 
            src={pokeballPng}
            alt=''
            width={120}
            height={120}
          />
          <Image className='detailSprite' src={sprites.front_shiny||sprites.front_default||shadowPokemon}
            loading='lazy'
            alt={name}
            width={270}
            height={270}
          />
        </div>
          <div className="pokemonStats">

            <div>
              <div>
                <label>
                  Height
                </label>
                <label>
                  Weight
                </label>
              </div>
              <div>
                <label>
                  {height}
                </label>
                <label>
                {weight}lbs
                </label>
              </div>
            </div>

            <div>

              <div>
                <label>
                  HP
                </label>
                <label>
                  Attack
                </label>
                <label>
                  Special Attack
                </label>
                <label>
                  Special Defense
                </label>
                <label>
                  Speed
                </label>
              </div>
              <div>
                <label>
                {stats[0].base_stat}
                </label>
                <label>
                {stats[1].base_stat}
                </label>
                <label>
                {stats[2].base_stat}
                </label>
                <label>
                {stats[3].base_stat}
                </label>
                <label>
                {stats[4].base_stat}
                </label>
              </div>
            </div>
          </div>
      </section>
    </main>
  )
}