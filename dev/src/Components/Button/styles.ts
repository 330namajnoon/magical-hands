import styled from "styled-components";
import { teamColors } from "../../config";

export const Background = styled.div`
    display: flex;
    flex-direction: row;
    input {
        min-width: 230px;
        max-width: 250px;
        padding: 10px;
        border-radius: 5px;
        border: solid 0.5px rgba(138, 138, 138, 0.596);
        font-size: 15px;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
        color: ${teamColors[4]};
    }

    @media screen and (max-width: 600px) {
        justify-content: center;
        input {
            min-width: 36vw;
            max-width: 36vw;
            font-size: 4vw;
            height: 10vw;
        }
    }
    
`;