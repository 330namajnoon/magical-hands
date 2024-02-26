import styled from "styled-components";

export const Background = styled.div<{ teamColors: string[] }>`
    width: 200px;
    height: 300px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
    background-color: ${(props) => props.teamColors[0]};
    img {
        width: 190px;
        min-height: 150px;
        max-height: 150px;
        object-fit: cover;
        margin: 5px 0px 5px 0px;
        border-radius: 20px;
    }
    .detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 40%;

        h3 {
            color: ${(props) => props.teamColors[2]};
            font-weight: 500;
            font-size: 15px;
            width: 170px;
            padding: 5px;
        }
    
        h4 {
            font-size: 20px;
            margin: 10px;
            color: ${(props) => props.teamColors[2]};
            font-weight: 500;
            width: 100%;
        }

        button {
            width: 120px;
            height: 35px;
            background-color: ${(props) => props.teamColors[1]};
            color: ${(props) => props.teamColors[3]};
            border: solid 0px grey;
            border-radius: 5px;
            font-size: 15px;
            box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.356);
            font-weight: 600;
        }
    }

    @media screen and (max-width: 600px) {
        width: 80%;
        height: 400px;
        img {
            width: 97%;
            min-height: 200px;
            max-height: 200px;
        }
        .detail {
            height: 35%;
            h3 {
                font-size: 5vw;
                width: 100%;
            }
        
            h4 {
                font-size: 6vw;
                width: 100%;
            }

            button {
                background-color: ${(props) => props.teamColors[1]};
                color: ${(props) => props.teamColors[3]};
                width: 200px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: solid 0px grey;
                border-radius: 5px;
                font-size: 12px;
                box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.356);
            }
        }
    }
`;