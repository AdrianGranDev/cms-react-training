export type PokemonIndexI = {
    name: string;
    url:string;
  }
  
export type PokemonI = {
    order: number;
    id: number;
    name: string;
    types: Array<any>;
    sprites: {front_default:string, front_shiny:string};
  }
