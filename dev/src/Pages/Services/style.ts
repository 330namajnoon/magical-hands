import styled from "styled-components";

export const Background = styled.div<{teamColors: string[]}>`
    width: 100vw;
    height: 100vh;
    background-color: ${(props) => props.teamColors[3]};
    display: flex;
    flex-direction: column;
    align-items: center;

    .services {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        max-height: 100vh;
        overflow-y: auto;
    }

    @media screen and (max-width: 600px) {
        
    }
`