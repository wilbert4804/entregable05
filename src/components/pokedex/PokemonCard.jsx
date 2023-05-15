import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const PokemonCard = ({pokemonUrl}) => {

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

    const [pokemon, setpokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
             .then((res) => setpokemon(res.data))
             .catch((err) => console.log(err))
    },[])
  return (
    
    <Link to={`/pokedex/${pokemon?.id}`} className={`max-w-[900px] mx-auto shadow-xl p-1 text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
      <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
        <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-10 ">
          <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
        </div>
      </section>
      <section>
          <h3>{pokemon?.name}</h3>
          <h4>{types}</h4>
          <span>type</span>
          <hr />
          <section className="grid grid-cols-3 gap-2 p-2">
            {
              pokemon?.stats.map(stat => (
                <div key={stat.stat.name}>
                  <h5>{stat.stat.name}</h5>
                  <span>{stat.base_stat}</span>
                </div>
              ))
            }
          </section>
      </section>
    </Link>
  
  )
}

export default PokemonCard