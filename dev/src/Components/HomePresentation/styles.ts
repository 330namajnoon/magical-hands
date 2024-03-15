import styled from "styled-components";
import { teamColors } from "../../config";
import { ButtonStyled } from "../Button/styles";

export const Background = styled.div`
    background-color: ${teamColors[3]};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
    padding-top: 20px;
    box-sizing: border-box;
`;

export const Title = styled.h1`
    color: ${teamColors[0]};
    font-weight: 600;
    font-size: 6vw;
    margin: 10px;
`

export const Presentation = styled.p`
    color: ${teamColors[4]};
    padding: 25px;
    font-size: 5vw;
    font-weight: 400;
`

export const Information = styled.p`
    color: ${teamColors[4]};
    padding: 25px;
    font-size: 5vw;
    font-weight: 400;
`

export const ReservationButton = styled(ButtonStyled)`
    background-color: ${teamColors[0]};
    color: ${teamColors[3]};
    font-size: 4vw;
    margin: 20px;
`

export const Image = styled.img`

    @media screen and (max-width: 600px) {
        width: 100vw;
        margin-bottom: 20px;
    }
`