import { useEffect, useState } from "react"
import Header from "../components/pokedex/Header"
import { useParams } from "react-router-dom"
import axios from "axios"

const PokemonId = () => {
  const bordersByType = {
    grass: "border-green-500",
    fire: "border-red-500",
    water: "border-blue-700",
    bug: "border-green-600",
    normal: "border-amber-800",
    poison: "border-violet-900",
    electric: "border-blue-900",
    ground: "border-amber-800",
    fairy: "border-pink-600",
    fighting: "border-orange-900",
    psychic: "border-fuchsia-950",
    rock: "border-stone-500",
    ghost: "border-cyan-950",
    ice: "border-cyan-400",
    dragon: "border-cyan-800",
    dark: "border-black",
    steel: "border-teal-900",
  }

  const backgroundByType = {
    grass: "from-green-500 to-yellow-100",
    fire: "from-red-500 to-yellow-200",
    water: "from-blue-700 to-blue-500",
    bug: "from-green-600 to-green-500",
    normal: "from-amber-800 to-amber-700",
    poison: "from-violet-800 to-violet-500",
    electric: "from-blue-900 to-blue-700",
    ground: "from-amber-800 to-amber-700",
    fairy: "from-pink-600 to-pink-400",
    fighting: "from-orange-900 to-orange-800",
    psychic: "from-fuchsia-950 to-fuchsia-800",
    rock: "from-stone-500 to-stone-300",
    ghost: "from-cyan-950 to-cyan-800",
    ice: "from-cyan-400 to-cyan-200",
    dragon: "from-cyan-800 to-cyan-600",
    dark: "from-black to-zinc-700",
    steel: "from-teal-900 to-teal-600"
  }
  const [pokemon, setPokemon] = useState()
  //console.log(pokemon)
  const {id} = useParams()
  //console.log(id)
  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

    axios.get(URL)
         .then((res) => setPokemon(res.data))
         .catch((err) => console.log(err))
  }, [])


  const getPercentStatBar = (stat_base) => {
    const percentBarProgress = Math.floor(stat_base * 100)/255
    return `${percentBarProgress}%`
  }

  return (
    <section>
      <Header />
      <section className='px-2 py-14'>
        <article className="max-w-[900px] mx-auto shadow-xl p-2">
          {/* seccion superior */}
          <section className={`max-w-[900px] mx-auto shadow-xl p-2 text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
          <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
            <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img src={pokemon?.sprites.other["official-artwork"].front_default} alt=""></img>
            </div>
          </section>
          </section>
          {/*info general*/}
          <div>
            <h3>#{pokemon?.id}</h3>
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <hr />
            <h2 className="capitalize font-bold">{pokemon?.name}</h2>
            <hr />
          </div>
          <div className="flex justify-center gap-10 text-center">
            <div>
              <h5>Weight</h5>
              <span>{pokemon?.weight}</span>
            </div>
            <div>
              <h5>Height</h5>
              <span>{pokemon?.height}</span>
            </div>
          </div>
          <section className="grid sm:grid-cols-2 gap-4">
            {/* tipos */}
            <section className="text-center">
            <h3 className="">types</h3>
            <section className="grid grid-cols-2 gap-4">
              {
                pokemon?.types.map(type => <article className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} p-2 px-8 border-[1px] border-gray-300 mt-4 capitalize`} key={type.type.name}> {type.type.name}</article>)
              }
            </section>
            </section>
            {/* habiliddes */}
            <section className="text-center">
            <h3>abilities</h3>
            <section className="grid grid-cols-2 gap-4">
              {
                pokemon?.abilities.map(ability => <article className="p-2 px-8 border-[1px] border-gray-300 mt-4 capitalize truncate" key={ability.ability.name}> {ability.ability.name}</article>)
              }
            </section>
            </section>
          </section>
          <section>
            <h3>stats</h3>
          </section>
         {
          pokemon?.stats.map(stat => (
            <article key={stat.stat.name}>
              <section className="flex justify-between">
                <h5 className="capitalize">{stat.stat.name}</h5>
                <span>{stat.base_stat}/255</span>
              </section>
              <div className="bg-gray-100 h-6 rounded-sm">
              <div style={{"width": getPercentStatBar(stat.base_stat)}} className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
              </div>
              
            </article>
          ))
         }
        </article>
      </section>
    </section>
  )
}

export default PokemonId