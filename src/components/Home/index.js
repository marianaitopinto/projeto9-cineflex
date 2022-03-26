import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function Home() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setMovies(data);
        })
        promise.catch(err => console.log(err.response));
    }, []);


    return ((movies.length > 0) ?
        <>
            <SelectMovie>Selecione o filme</SelectMovie>
            <Movies>
                {movies.map(({ id, posterURL, title}) => {
                    return (
                        <Movie key={id}>
                            <Link to={`/movie/${id}`}>
                                <img src={posterURL} alt={title} />
                            </Link>
                        </Movie>
                    )
                }
                )}
            </Movies>
        </>

        :

        <SelectMovie>Carregando...</SelectMovie>
    )

}

const Movies = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width: 375px;
    justify-content: center;
    align-itens:center;
    row-gap: 11px;
    column-gap: 30px;
`;

const Movie = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    width: 145px;
    height: 209px;

    img {
        width: 129px;
        height: 193px;
        margin-top: 8px;
        margin-left: 8px;
    }

    :hover{
        cursor: pointer;
    }
}
`

const SelectMovie = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #293845;
    display: flex;
    justify-content: center;
    padding: 20px;
`;