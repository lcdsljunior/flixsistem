import './favoritos.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify'

function Favoritos() {

    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem("@netflix")
        setFilmes(JSON.parse(minhaLista) || [])
    }, [])

    function excluirFilmes(id){
        let filtroFilmes = filmes.filter((filme) => {
            return (filme.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@netflix", JSON.stringify(filtroFilmes))
        toast.success("Filme removido com sucesso");
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Favoritos</h1>
            {filmes.length === 0 && <span>Você não possui filmes favoritos :(</span>}
            <ul>
                {filmes.map((filme) => {
                    return (
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}> Ver Detalhes</Link>
                                <button onClick={() => excluirFilmes(filme.id)}>Deletar</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


export default Favoritos;