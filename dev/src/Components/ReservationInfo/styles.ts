import styled from "styled-components";

export const Background = styled.div<{teamColors: string[]}>`
    position: absolute;
    width: 100vw;
    height: ${window.innerHeight - 110}px;
    bachground-color: rgba(206, 206, 206, 0.288);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.teamColors[3]};
    h1 {
        font-size: 30px;
        margin: 20px;
        font-weight: 600;
        color: ${(props) => props.teamColors[0]};
    }

    h2 {
        width: 85%;
        text-align: center;
        font-size: 15px;
        font-weight: 400;
    }

    button {
        width: 180px;
        padding: 13px;
        border-radius: 5px;
        border: 0px;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
        margin: 30px;
        font-weight: 400;
        background-color: ${(props) => props.teamColors[0]};
        color: ${(props) => props.teamColors[3]};
    }
    @media screen and (max-width: 600px) {
       
    }
`;