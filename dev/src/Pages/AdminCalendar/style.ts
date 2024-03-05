import styled from "styled-components";
import { menuHeight } from "../../Components/Menu/Menu";
import { headerHeight } from "../../Components/Header/Header";
import { teamColors } from "../../config";

export const Background = styled.div`
    width: 100vw;
    height: ${window.innerHeight - (menuHeight + headerHeight)}px;
    background-color: ${teamColors[3]};
    display: grid;
    grid-template-rows: 1fr 6fr;
    
   
    @media screen and (max-width: 600px) {
        .calendar-container {
            background-color: ${teamColors[3]};
            overflow: auto;
            width: 100%;
            .column-container {
                box-sizing: border-box;
                margin: 1px;
                background-color: ${teamColors[1]};
                display: grid;
                grid-template-columns: 1fr 10fr;
                .hour {
                    padding: 7px;
                    background-color: ${teamColors[2]};
                }

                .desactive-hour {
                    background-color: ${teamColors[4]};
                }

                .active-hour {
                    background-color: ${teamColors[0]};
                }
            }
        }
    }
`