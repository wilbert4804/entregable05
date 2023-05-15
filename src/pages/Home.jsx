import {useDispatch} from "react-redux"
import Footer from "../components/Footer"
import { setNameTrainer } from "../store/slices/nameTrainer.slice"
import { useNavigate } from "react-router-dom"

const Home = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()

    const handLeSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

  return (
    <section className='min-h-screen grid grid-rows-[1fr_auto]'>
        <section>
            <article>
                
                <div className="mx-auto absolute left-1/2 -translate-x-1/2 top-52">
                    <img src="/images/pokedex.png" alt="" />
                </div>
                <div className="mx-auto absolute left-1/2 -translate-x-1/2 top-80">
                <h2 className="text-rose-600 font-bold text-center">¡HELLO COACH!</h2>
                <p className="text-center">To start, give me your name</p>
                <form onSubmit={handLeSubmit}>
                    <input className="border-2 border-stone-950 shadow-md shadow-black" id="nameTrainer" type='text' placeholder='Tu nombre...'/>
                    <button className="bg-red-500 w-[100px] border-2 border-red-500 text-white shadow-md shadow-black">BEGIN</button>
                </form>
                </div>
        
            </article>
        </section>
        {/* footer*/}
        <Footer />
    </section>
  )
}

export default Home