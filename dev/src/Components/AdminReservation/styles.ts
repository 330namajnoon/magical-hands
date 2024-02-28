import styled from "styled-components";
import { teamColors } from "../../config";

export const Background = styled.div`
        
    @media screen and (max-width: 600px) {
        width: 95%;
        box-shadow: 3px 3px 10px gray;
        margin-top: 6px;
        .min-info-button {
            width: 100%;

            .min-info {
                background-color: ${teamColors[2] + 90};
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px;
                box-sizing: border-box;
                align-items: center;

                h1 {
                    font-size: 20px;
                    font-weight: 400;
                    color: ${teamColors[0]};
                }

                h6 {
                    text-align: center;
                    font-size: 10px;
                    font-weight: 400;
                    color: ${teamColors[4]};
                }

            }
        }
    }
`;