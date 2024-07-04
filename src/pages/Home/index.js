import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

//URL DA API: /movie/now_playing?api_key=f114d1bd5a6a037d03d24678af9a3741

function Home() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'f114d1bd5a6a037d03d24678af9a3741',
                    language: 'pt-BR',
                    page: 1,
                    include_adult: false,
                    include_video: false,
                    region: 'BR'
                }
            })

            // console.log(response.data.results.slice(0,10));
            setFilmes(response.data.results.slice(0, 20));
            setLoading(false);

        }

        loadFilmes();

    }, [])

    if (loading) {
        return (
            <div className='loading'>
                <h2>Carregando...</h2>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.id} - {filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}


export default Home;