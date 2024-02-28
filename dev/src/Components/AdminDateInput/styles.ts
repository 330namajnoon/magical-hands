import styled from "styled-components";
import { teamColors } from "../../config";

export const Background = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;

    label {
        font-weight: 500;
        margin-left: 5px;
        color: ${teamColors[0]};
    }

    input {
        min-width: 230px;
        max-width: 250px;
        padding: 10px;
        border-radius: 5px;
        border: solid 0.5px rgba(138, 138, 138, 0.596);
        font-size: 15px;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
    }

    @media screen and (max-width: 600px) {
        label {
            font-size: 4vw;
        }
        input {
            min-width: 43vw;
            max-width: 43vw;
            font-size: 4vw;
            height: 9vw;
        }
    }
`;