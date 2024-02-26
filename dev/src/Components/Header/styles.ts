import styled from "styled-components";

export const Background = styled.div<{teamColors: string[]}>`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.teamColors[0]};
    width: 100vw;
    img {
        min-width: 50px;
        max-width: 50px;
        min-height: 50px;
        max-height: 50px;
        margin: 10px;
    }

    h1 {
        font-size: 20px;
        font-weight: 600;
        color: ${(props) => props.teamColors[3]};
        margin-left: 20px;
    }
`;