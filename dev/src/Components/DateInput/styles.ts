import styled from "styled-components";

export const Background = styled.div<{isValid: boolean, teamColors: string[]}>`
    display: flex;
    flex-direction: column;
    margin: 10px;

    label {
        font-weight: 500;
        margin-left: 5px;
        color: ${(props) => props.teamColors[3]};

    }

    input {
        min-width: 230px;
        max-width: 250px;
        padding: 10px;
        border-radius: 5px;
        border: solid 0.5px ${(props) => !props.isValid ? "rgba(138, 138, 138, 0.596)" : "red"};
        font-size: 15px;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
    }

    select {
        min-width: 200px;
        max-width: 250px;
        padding: 10px;
        border-radius: 5px;
        border: solid 0.5px ${(props) => !props.isValid ? "rgba(138, 138, 138, 0.596)" : "red"};
        font-size: 15px;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
        margin-top: 20px;
        color: ${(props) => props.teamColors[4]};
    }

    span {
        color: red;
        font-size: 15px;
        margin: 5px 0px 0px 5px;
    }

    @media screen and (max-width: 600px) {
       
        
    }
`;