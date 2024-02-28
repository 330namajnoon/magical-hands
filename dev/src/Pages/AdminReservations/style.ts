import styled from "styled-components";
import { menuHeight } from "../../Components/Menu/Menu";
import { headerHeight } from "../../Components/Header/Header";
import { teamColors } from "../../config";

export const Background = styled.div`
    width: 100vw;
    height: ${window.innerHeight - (menuHeight + headerHeight)}px;
    background-color: ${teamColors[3]};
    display: grid;
    grid-template-rows: 0.1fr 0.1fr 1fr;

    .dates-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .reservations-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
    }
    @media screen and (max-width: 600px) {
     
    }
`