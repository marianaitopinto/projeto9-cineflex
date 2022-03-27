import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'
import { useState, useEffect } from "react";

export default function Session() {
    const { sessionId } = useParams();
    const [times, setTimes] = useState("");
    const legends = [
        { text: "Selecionado", background: `#8DD7CF`, border: `#1AAE9E` },
        { text: "Disponível", background: `#C3CFD9`, border: `#7B8B99` },
        { text: "Indisponível", background: `#FBE192`, border: `#F7C52B` }
    ];

    useEffect(() => {
        console.log(sessionId)
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setTimes(data);
        })
        promise.catch(err => console.log(err.response));
    }, []);

    return (times !== "") ?
        <>
            <SelectSession>Selecione o(s) assento(s)</SelectSession>
            <Seats>
                {times.seats.map(({ id, name, isAvailable }) => {
                    return (
                        <Seat isAvailable={isAvailable}>{name < 10 ? `0${name}` : `${name}`}</Seat>
                    )
                })}
            </Seats>
            <Legends>
                {legends.map(legend => {
                    return (
                        <>
                            <DivLegend>
                                <Legend background={legend.background} border={legend.border}></Legend>
                                <p>{legend.text}</p>
                            </DivLegend>
                        </>
                    )
                })}
            </Legends>

            <form>
                <DivLayout>
                    <Font>Nome do comprador:</Font>
                    <Input placeholder='   Digite seu nome' type='text'></Input>
                </DivLayout>
                <DivLayout>
                    <Font>CPF do comprador:</Font>
                    <Input placeholder='   Digite seu CPF' type='text'></Input>
                </DivLayout>
                <Button>Reservar assento(s)</Button>

            </form>
        </>
        :
        (<SelectSession>Carregando...</SelectSession>)
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

const Seat = styled.div`
    width: 26px;
    height: 26px;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.04em;

    color: #000000;
    background: ${props => props.isAvailable === true ? "#C3CFD9" : "#FBE192"};
    border: ${props => props.isAvailable === true ? "1px solid #808F9D" : "1px solid #F7C52B"};
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    justify-content: center;
`

const Seats = styled.div`
    display:flex;
    max-width: 375px;
    flex-wrap: wrap;
    row-gap: 18px;
    column-gap: 8px;
    padding: 20px;
`

const Legends = styled.div`
    display:flex;
    gap: 15px
    justify-content: space-evenly;

    p{
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        letter-spacing: -0.013em;

        color: #4E5A65;

    }

`

const DivLegend = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom:30px;
`

const Legend = styled.div`
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    background: ${props => props.background};
    border: 1px solid ${props => props.border};
    border-radius: 17px;
`

const Button = styled.button`
    width: 225px;
    height: 42px;
    color: #FFFFFF;
    background: #E8833A;
    border-radius: 3px;
    border:none;
    display:flex;
    justify-content:center;
    align-items: center;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    text-align: center;
    letter-spacing: 0.04em;
    margin-top: 30px;
`

const Font = styled.p`
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 21px;
display: flex;
align-items: center;
color: #293845;   
`

const Input = styled.input`
width: 327px;
height: 51px;
font-size: 18px;
line-height: 21px;
display: flex;

color: #AFAFAF;
border: 1px solid #D4D4D4;
background: #FFFFFF;
border: 1px solid #D5D5D5;
box-sizing: border-box;
border-radius: 3px;`

const DivLayout = styled.div`
display:flex;
flex-direction: column;
margin-left: 15px;
gap:10px;
margin-bottom: 10px;
`