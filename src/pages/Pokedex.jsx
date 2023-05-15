import { useSelector } from "react-redux"
import Header from "../components/pokedex/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import PokemonCard from "../components/pokedex/PokemonCard"

const Pokedex = () => {
    //array de pokemos antes de filtrar
    const [pokemons, setPokemons] = useState([])

    //string para filtrar los pokemos por nombre
    const [pokemonName, setPokemonName] = useState("")

    //string de tipos de pokemon posible
    const [types, setTypes] = useState([])

    //string del tipo de pokemon actual, cmbia de acuerdo al select
    const [currentType, setCurrentType] = useState("")

    //pagina actual
    const [currentPage, setCurrentPage] = useState(1)

    //estado actual donde se almacena el nombre del usuario
    const nameTrainer = useSelector((store) => store.nameTrainer)

    const handLeSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonByName = pokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))
    const paginationLogic = () => {
        //cantidad de pokemos por pagina
        const POKEMON_PER_PAGE = 12

        const sliceStart = (currentPage - 1) * POKEMON_PER_PAGE
        const sliceEnd = sliceStart + POKEMON_PER_PAGE
        const pokemonInPage = pokemonByName.slice(sliceStart, sliceEnd)
        // ultima pagina
       const lastPage = Math.ceil(pokemonByName.length / POKEMON_PER_PAGE) || 1
       //bloque actual
       const PAGES_PER_BLOCK = 3
       const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

       //paginas que se mostrarn en el bloque actual

       const pagesInBlock = []
       const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
       const maxPage = actualBlock * PAGES_PER_BLOCK
       for(let i = minPage; i <= maxPage; i++){
        if(i <= lastPage){
        pagesInBlock.push(i)
    }
       }
       return {pokemonInPage, lastPage, pagesInBlock}
    }

    const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()
    //console.log(lastPage, pagesInBlock, pokemonInPage)
    //console.log({pagesInBlock})
    const handLeClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage >= 1){
            setCurrentPage(newCurrentPage)
        }
        
    }

    const handLeClickNexPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage){
            setCurrentPage(newCurrentPage)
        }
    }
    useEffect(() => {
        if(!currentType){
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

            axios.get(URL)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err))
        }
    }, [currentType]);
    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"
        axios.get(URL)
             .then((res) => { 
                const newTypes = res.data.results.map((type) => type.name)
            
                setTypes(newTypes)
            })
             .catch((err) => console.log(err))
    }, [])

    
    useEffect(() => {
        if(currentType){
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`
        axios.get(URL)
        .then((res) => {
        const pokemonsByType = res.data.pokemon.map((pokemon) => pokemon.pokemon)
        setPokemons(pokemonsByType)
        })
        .catch((err) => console.log(err))
        }
        
    }, [currentType])

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemonName, currentType])
  return (
    <section className="min-h-[screen]">
        
        <Header />
        <section className="py-6 px-2">
            <h3 className="text-red-600 flex absolute left-2 top-40 text-lg gap-1">Welcome {nameTrainer}, <p className="text-black">here you can find your favorite pokemon</p></h3>
            <div className="mx-auto absolute left-1/2 -translate-x-1/2 top-56">
        <form onSubmit={handLeSubmit}>
            <section>
            
                <input className=" border-2 border-stone-950 shadow-md shadow-black" id="pokemonName" type="text" placeholder="search your pokemon"/>
                <button className="bg-red-500 w-[100px] border-2 border-red-500 text-white shadow-md shadow-black">Search</button>
               
            <select className="border-2 border-stone-950 shadow-md shadow-black" onChange={(e) => setCurrentType(e.target.value)}>
                <option>All POKEMOS</option>
               {
                types.map(type => <option className="capitalize" value={type} key={type}>{type}</option>)
               }
            </select>
        
            </section>
        </form>
        </div>
        </section>
        {/* paginacion */}
        <div className="mx-auto absolute left-1/2 -translate-x-1/2 top-72 p-2  min-w-full">
        <ul className="flex gap-2 justify-center p-6 flex-wrap">
        <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>
            <li onClick={handLeClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded cursor-pointer">{"<"}</li>
            {
                pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded cursor-pointer ${numberPage === currentPage && "bg-red-400"} `} key={numberPage}>{numberPage}</li>)
            }
            <li onClick={handLeClickNexPage} className="p-3 bg-red-600 font-bold text-white rounded cursor-pointer">{">"}</li>
            <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
        </ul>
        </div>
       {/* seccion lista de pokemon */}
       
       <div className="mx-auto absolute left-1/2 -translate-x-1/2 top-96 p-4 min-w-full">
        <section className="px2 grid gap-6 lg:grid-cols-4">
            {
                pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>)
            }
        </section>
        </div>
    </section>
  )
}

export default Pokedex