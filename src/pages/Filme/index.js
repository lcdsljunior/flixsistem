import { useEffect, useState } from "react";
import { useParams, useNavigate, json } from "react-router-dom";
import './filme.css';
import api from '../../services/api';
import { toast} from 'react-toastify';

function Filme() {

    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: 'f114d1bd5a6a037d03d24678af9a3741'
                }
            })

                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })

                .catch(() => {
                    console.log("Filme Não Encontrado");
                    navigate("/", { replace: true });
                    return;
                })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado")
        }

    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@netflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if (hasFilme){
            toast.warn("Filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@netflix",JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso!");

    }



    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando informação do filme</h1>
            </div>
        )
    }

    return (
        <div className="filme-info">

            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse do Filme</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>
            <strong>Qtd de votos: {filme.vote_count}</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} filme`}>
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}


export default Filme;
