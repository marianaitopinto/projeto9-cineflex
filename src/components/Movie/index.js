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
                                        <Time key={id}>{name}</Time>
                                    )
                                })}
                            </MovieTime> 
                        </>
            )
                }
                )}
        </Session>
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