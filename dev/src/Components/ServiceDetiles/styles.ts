import styled from "styled-components";
import { menuHeight } from "../Menu/Menu";
import { headerHeight } from "../Header/Header";
import { teamColors } from "../../config";

export const Background = styled.div<{ imageurl: string, teamColors: string[] }>`
    position: absolute;
    width: 100vw;
    height: ${window.innerHeight - (menuHeight + headerHeight)}px;
    background-color: #0000002f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${(props: any) => props.imageurl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .backButton {
        position: absolute;
        top: 0px;
        width: 100%;
        span {
            color: ${(props) => props.teamColors[3]};
            padding: 8px;
            font-size: 18px;
            margin: 10px;
            border-radius: 10vw;
            background-color: ${(props) => props.teamColors[1] + 90};
        }
    }

    .details {
        margin-top: 30px;
        position: relative;
        width: 600px;
        background-color: ${(props) => props.teamColors[1] + 90};
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        color: #ffffff;
        padding: 30px;
        max-height: 80%;
        overflow-y: auto;
        box-sizing: content-box;
        h1 {
            font-weight: 600;
            margin-bottom: 20px;
            ${(props) => props.teamColors[3]};
         

        }

        h3 {
            font-weight: 500;
            margin-bottom: 15px;
            ${(props) => props.teamColors[3]};
        }

        h2 {
            font-weight: 400;
            margin-bottom: 15px;
            ${(props) => props.teamColors[3]};
        }

        h4 {
            font-weight: 700;
            margin-bottom: 15px;
            font-size: 30px;
            position: relative;
            width: auto;
            div {
                position: absolute;
                width: 20%;
                min-height: 5px;
                top: 15px;
                background-color: ${teamColors[4]};
                transform: rotate(25deg);
            }
        }

        button {
            width: 200px;
            padding: 10px;
            background-color: #ffffff;
            border: 0px;
            border-radius: 10px;
            box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
            font-size: 15px;
            margin-top: 10px;
            background-color: ${(props) => props.teamColors[3]};
            font-weight: 400;
            color: ${(props) => props.teamColors[0]};
        }

        .reservationButton {
            width: 200px;
            padding: 10px;
            background-color: #ffffff;
            border: 0px;
            border-radius: 10px;
            box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
            font-size: 15px;
            margin-top: 10px;
            background-color: ${(props) => props.teamColors[3] + 99};
            font-weight: 400;
            color: ${(props) => props.teamColors[0]};
        }

        .reservationButtonActive {
            width: 200px;
            padding: 10px;
            background-color: #ffffff;
            border: 0px;
            border-radius: 10px;
            box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
            font-size: 15px;
            margin-top: 10px;
            background-color: ${(props) => props.teamColors[3]};
            font-weight: 400;
            color: ${(props) => props.teamColors[0]};
        }


        .reservationForm {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            height: 0px;
            transition: all 0.5s;
            align-items: center;
            justify-content: center;
            visibility: hidden;
        }

        .active {
            height: 100%;
            transition: all 0.5s;
            padding: 20px;
            display: flex;
            visibility: visible;
            button {
                margin-top: 20px;
            }
        }
    }

    @media screen and (max-width: 600px) {
        justify-content: flex-start;
        .backButton {
            position: relative;
            top: 0px;
            left: 0px;
            width: 100%;
            span {
                padding: 8px;
                font-size: 18px;
                margin: 10px;
                border-radius: 10vw;
                background-color: ${(props) => props.teamColors[1] + 90};
            }
        }
        .details {
            overflow-y: auto;
            box-sizing: content-box;
            position: relative;
            width: 75%;
            height: 80%;
            margin: 0;
        }
    }
`;