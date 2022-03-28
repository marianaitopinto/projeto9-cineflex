import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import styled from 'styled-components'
import { useState, useEffect } from "react";

export default function Session({setSession}) {
    const { sessionId } = useParams();
    const [times, setTimes] = useState("");
    const legends = [
        { text: "Selecionado", background: `#8DD7CF`, border: `#1AAE9E` },
        { text: "Disponível", background: `#C3CFD9`, border: `#7B8B99` },
        { text: "Indisponível", background: `#FBE192`, border: `#F7C52B` }
    ];
    const [selected, setSelected] = useState([]);
    const [assents, setAssents] = useState([]);
    console.log(selected)
    console.log(assents)
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const navigate = useNavigate();

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

    function selectAssent(isAvailable, id, name) {
        if (!isAvailable) {
            alert("Este assento não está disponível.");
            return;
        } else {
            if (!selected.includes(id)) {
                setSelected([...selected, id]);
                setAssents([...assents, name])
                return;
            } else {
                selected.splice(selected.indexOf(id), 1);
                setSelected([...selected]);
                assents.splice(assents.indexOf(name), 1);
                setAssents([...assents])
                return;
            }
        }
    }

    function sentInfos(e) {
        e.preventDefault();
        if (selected.length === 0) {
            alert("Selecione os assentos!")
            return;
        }
        setSession({movie: times.movie.title, day: times.day.weekday, data: times.day.date, time: times.name, name: name, cpf: cpf, assents: [...assents]})
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", 
            {
                ids: [...selected],
                name: {name},
                cpf: {cpf}
            })
        
        promise.then((response) => {
            navigate("/success");
        });

        promise.catch(error => alert("Algo deu errado! Por favor, reinicie o pedido."));
    }

    return (times !== "") ?
        <>
            <SelectSession>Selecione o(s) assento(s)</SelectSession>
            <Seats>
                {times.seats.map(({ id, name, isAvailable }) => {
                    return (
                        <Seat key={id} id={id} isAvailable={isAvailable} selected={selected} name={name} css={
                            !selected.includes(id)
                              ? isAvailable
                                ? {
                                    background: `#C3CFD9`, border: `#7B8B99`,
                                  }
                                : {
                                    background: `#FBE192`, border: `#F7C52B`,
                                  }
                              : { background: `#8DD7CF`, border: `#1AAE9E` }
                          }onClick={() => selectAssent(isAvailable, id, name)}>{name < 10 ? `0${name}` : `${name}`}</Seat>
                    )
                })}
            </Seats>
            <Legends>
                {legends.map(legend => {
                    return (
                        <>
                        <Layout2>
                            <DivLegend>
                                <Legend background={legend.background} border={legend.border}></Legend>
                                <p>{legend.text}</p>
                            </DivLegend>
                        </Layout2>
                        </>
                    )
                })}
            </Legends>

            <form onSubmit={sentInfos}>
                <DivLayout>
                    <Font>Nome do comprador:</Font>
                    <Input minLength="3" placeholder='   Digite seu nome' type='text' onChange={(e) => setName(e.target.value)}
              value={name} required></Input>
                </DivLayout>
                <DivLayout>
                    <Font>CPF do comprador:</Font>
                    <Input pattern="[0-9]{11}" placeholder='   Digite seu CPF' type='text' onChange={(e) => setCpf(e.target.value)}
              value={cpf} required></Input>
                </DivLayout>
                <Layout>
                <Button type="submit">Reservar assento(s)</Button>
                </Layout>
            </form>

            <Footer>
            <img src={times.movie.posterURL} alt={times.movie.title} />
            <div>
            <p>{times.movie.title}</p>
            <p>{times.day.weekday} - {times.name}</p>
            </div>
            </Footer>
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
    background: ${props => props.css.background};
    border: 1px solid ${props => props.css.border};
    box-sizing: border-box;
    border-radius: 12px;
    display: flex;
    justify-content: center;
        :hover{
                cursor: pointer;
                filter: brightness(0.9);
        }
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
margin-bottom: 8px;
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
    height: 72px
    background: #FFFFFF;
    
`

const Layout = styled.div`
display:flex;
justify-content: center;
`

const Layout2 = styled.div`
margin-top: 10px;
margin-bottom: 10px;
display: flex;
margin-left: 42px;`