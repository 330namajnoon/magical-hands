import styled from "styled-components";
import { menuHeight } from "../../Components/Menu/Menu";
import { headerHeight } from "../../Components/Header/Header";

export const Background = styled.div<{teamColors: string[]}>`
    width: 100vw;
    height: ${window.innerHeight - (menuHeight + headerHeight)}px;
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
        max-height: 100%;
        overflow-y: auto;
    }

    @media screen and (max-width: 600px) {
     
    }
`