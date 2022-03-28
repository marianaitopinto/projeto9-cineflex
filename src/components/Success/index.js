import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

export default function Success({ session }) {
    const navigate = useNavigate();
    console.log(session);
    return (session.length !== 0) ? (
        <>
            <Title>
                <p>Pedido realizado com sucesso!</p>
            </Title>

            <Infos>
                <p>Filme e sessão:</p>
                <Info>{session.movie}</Info>
                <Info>{session.day}</Info>
                <Info>{session.data} {session.time}</Info>
                <p>Ingressos:</p>
                {session.assents.map(assent => {
                    return (
                        <Info>
                            <h2>Assento: {assent}</h2>
                        </Info>
                    )
                })}
            </Infos>

            <Infos>
                <p>Comprador:</p>
                <Info>Nome: {session.name}</Info>
                <Info>CPF: {session.cpf}</Info>
            </Infos>
            <Layout>
                <Button onClick={() => {
                    navigate("/");
                }}>Voltar para home</Button>
            </Layout>
        </>
    ) :
        (<Loading>Carregando...</Loading>)
}

const Info = styled.div`
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 18px;
line-height: 26px;
display: flex;
align-items: center;
letter-spacing: 0.04em;
margin-left: 15px;
color: #293845;
`

const Infos = styled.div`
p {
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 28px;
display: flex;
align-items: center;
letter-spacing: 0.04em;
margin-top: 20px;
margin-left: 15px;

color: #293845;
}
`

const Title = styled.h1`
    display:flex;
    justify-content:center;
    margin-top: 15px;
    margin-bottom: 25px;

p {
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 18px;
line-height: 28px;
display: flex;
align-items: center;
text-align: center;
letter-spacing: 0.04em;

color: #E8833A;
}
`
const Layout = styled.div`
display:flex;
justify-content: center;
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

const Loading = styled.div`
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