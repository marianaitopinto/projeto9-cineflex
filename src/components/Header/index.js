import styled from 'styled-components';

export default function Header() {
    return (
        <HeaderStyle>
            <p>CINEFLEX</p>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #E8833A;

    width: 375px;
    height: 67px;
    background: #C3CFD9;

    display: flex;
    justify-content: center;
`;