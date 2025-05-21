import '@testing-library/jest-dom'
import { cleanup, render, waitFor } from '@testing-library/react'
import { PokemonIndexI } from '@/types/Pokemon'
import { Card } from '@/components/card/Card'

const fetchMock = {
            
    "height": 17,
    "id": 6,
    "name": "charizard",
    "order": 7,
    "sprites": {
        "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
        "back_female": null,
        "back_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png",
        "back_shiny_female": null,
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
        "front_female": null,
        "front_shiny": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
        "front_shiny_female": null,
        
    },
    "stats": [
        {
            "base_stat": 78,
            "effort": 0,
            "stat": {
                "name": "hp",
                "url": "https://pokeapi.co/api/v2/stat/1/"
            }
        },
        {
            "base_stat": 84,
            "effort": 0,
            "stat": {
                "name": "attack",
                "url": "https://pokeapi.co/api/v2/stat/2/"
            }
        },
        {
            "base_stat": 78,
            "effort": 0,
            "stat": {
                "name": "defense",
                "url": "https://pokeapi.co/api/v2/stat/3/"
            }
        },
        {
            "base_stat": 109,
            "effort": 3,
            "stat": {
                "name": "special-attack",
                "url": "https://pokeapi.co/api/v2/stat/4/"
            }
        },
        {
            "base_stat": 85,
            "effort": 0,
            "stat": {
                "name": "special-defense",
                "url": "https://pokeapi.co/api/v2/stat/5/"
            }
        },
        {
            "base_stat": 100,
            "effort": 0,
            "stat": {
                "name": "speed",
                "url": "https://pokeapi.co/api/v2/stat/6/"
            }
        }
    ],
    "types": [
        {
            "slot": 1,
            "type": {
                "name": "fire",
                "url": "https://pokeapi.co/api/v2/type/10/"
            }
        },
        {
            "slot": 2,
            "type": {
                "name": "flying",
                "url": "https://pokeapi.co/api/v2/type/3/"
            }
        }
    ],
    "weight": 905

}


global.fetch = require('jest-fetch-mock');

describe('Card Test', () => {
    const mockResponse = {
        name:"charmander",
        url:"https://pokeapi.co/api/v2/pokemon/4/"
    }



    test('Render <Card />', async () => {

        fetch.mockResponseOnce(JSON.stringify(fetchMock))

        const { debug, getByText, getByTestId } = render(<Card {...mockResponse} />);
        await waitFor(() => getByText('charizard'))
    })



    test('Renders pokemon name', async () => {
        fetch.mockResponseOnce(JSON.stringify(fetchMock))

        const { debug, getByText, getByTestId } = render(<Card {...mockResponse} />);
        await waitFor(() => getByText(fetchMock.name))

    })


    test('Render pokemon types', async () => {
        fetch.mockResponseOnce(JSON.stringify(fetchMock))

        const { debug, getByText } = render(<Card {...mockResponse} />);
        await waitFor(() => getByText(fetchMock.types[0].type.name))
        await waitFor(() => getByText(fetchMock.types[1].type.name))
    })

    
    test('Img loads sprite src', async () => {
        fetch.mockResponseOnce(JSON.stringify(fetchMock))

        const { getByTestId } = render(<Card {...mockResponse} />);
        await waitFor(() => expect(getByTestId('sprite').getAttribute('src',)).toMatch(fetchMock.sprites.front_default.replaceAll('/','%2F').replaceAll(':','%3A')))


    })
})





