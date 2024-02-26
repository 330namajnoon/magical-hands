import styled from "styled-components";

export const Background = styled.div<{teamColors: string[]}>`
    display: flex;
    padding: 10px;
    border-bottom: solid 5px ${(props) => props.teamColors[0]};
    width: 100%;
    height: 60px;
    padding-right: 40px;
    align-items: center;
    background-color: ${(props) => props.teamColors[1]};

    .options {
        width: 100px;
        display: flex;
        align-items: center;
        transition: all 0.5s;

        .selected {
            margin-right: 20px;
            font-size: 20px;
            color: ${(props) => props.teamColors[3]};
            cursor: pointer;
            transition: all 0.5s;
            font-weight: 600;
        }

        .notSelected {
            margin-right: 20px;
            font-size: 20px;
            color: ${(props) => props.teamColors[2]};
            cursor: pointer;
            transition: all 0.5s;
            font-weight: 500;
        }
    }

    @media screen and (max-width: 600px) {
       
    }
`;