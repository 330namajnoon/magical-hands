import styled from "styled-components";
import { teamColors } from "../../config";

export const Background = styled.div<{ teamColors: string[] }>`
    position: relative;
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

    .admin-edit {
        width: 100%;
        position: absolute;

        span {
            color: ${teamColors[0]};
            background-color: ${teamColors[3] + 90};
            border-radius: 30px;
            padding: 5px;
            margin: 10px;
        }
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

export const EditorContainer = styled.div`
    position: relative;
    width: 200px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
    background-color: ${teamColors[0]};
    padding-bottom: 30px;

    img {
        width: 190px;
        min-height: 150px;
        max-height: 150px;
        object-fit: cover;
        margin: 5px 0px 5px 0px;
        border-radius: 20px;
    }
    
    @media screen and (max-width: 600px) {
        width: 100%;
        img {
            width: 97%;
            min-height: 200px;
            max-height: 200px;
        }
        textarea {
            width: 70%;
            height: 200px;
            border-radius: 10px;
            box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.356);
            padding: 10px;
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
`

export const Categories = styled.div`
    @media screen and (max-width: 600px) {
        label {
            color: ${teamColors[3]};
            font-weight: 500;
            margin-left: 5px;
        }

        .categories-list {
            display: flex;
            flex-direction: column;

            a {
                margin: 4px;
                font-size: 5vw;
                text-decoration: underline;
                color: ${teamColors[1]};
                display: flex;
                text-wrap: nowrap;
            }
        }


        select {
            width: 230px;
            padding: 8px;
            font-size: 4vw;
            border-radius: 7px;
            margin-bottom: 10px;
        }
    }
`