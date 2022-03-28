import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'
import { useState, useEffect } from "react";

export default function Movie() {
    const { movieId } = useParams();
    const [sessions, setSessions] = useState({ days: [] });

    useEffect(() => {
        console.log(movieId)
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieId}/showtimes`);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setSessions(data);
        })
        promise.catch(err => console.log(err.response));
    }, []);

    return (
        <>
            <SelectSession>Selecione o horário</SelectSession>
            <Session>
                {sessions.days.map(({ weekday, date, id, showtimes }) => {
                    return (
                        <>
                            <Days key={id} >
                                <p>{weekday} - {date}</p>
                            </Days>
                            <MovieTime>
                                {showtimes.map(({ name, id }) => {
                                    return (
                                        <Link to={`/session/${id}`}>
                                            <Time key={id}>{name}</Time>
                                        </Link>
                                    )
                                })}
                            </MovieTime>
                        </>
                    )
                }
                )}
            </Session>
            <Footer>
                <img src={sessions.posterURL} alt={sessions.title} />
                <p>{sessions.title}</p>
            </Footer>
        </>
    )
}

const SelectSession = styled.div`
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
`

const Days = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    margin-left: 23px;

    color: #293845;
`

const Session = styled.div`
    color:blue;
`

const Time = styled.div`
    width: 83px;
    height: 43px;
    color: #FFFFFF;
    background: #E8833A;
    border-radius: 3px;
    display:flex;
    justify-content:center;
    align-items: center;
`

const MovieTime = styled.div`
    display:flex;
    gap: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 23px;
    `

    const Footer = styled.div`
    width: 375px;
    height: 117px;
    border: 1px solid #9EADBA;
    background: #DFE6ED;
    display:flex;
    align-items: center;
    margin-top: 30px;
    
    p{
        margin-left: 15px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        display: flex;
        align-items: center;
    
        color: #293845;
    }
    
    img {
        margin-left: 25px;
        width: 48px; 
        height: 72px;
        background: #FFFFFF;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }
`