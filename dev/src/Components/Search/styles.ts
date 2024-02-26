import styled from "styled-components";

export const Background = styled.div<{teamColors: string[]}>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .searchBox {
        margin: 10px;
        width: 400px;
        height: 45px;
        border-radius: 25px;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.356);
        input {
            background-color: transparent;
            padding: 0px 20px 0px 20px;
            width: 80%;
            font-size: 15px;
            border: 0px;
            outline: none;
        }

        span {
            color: rgba(0, 0, 0, 0.356);
            font-size: 30px;
        }
    }

    .categories {
        display: flex;
        .category {
            margin: 10px;
            padding: 15px;
            border-radius: 30px;
            font-size: 15px;
            background-color: ${(props) => props.teamColors[0] + 99};
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.356);
            cursor: pointer;
            transition: all 0.5s;
            color: ${(props) => props.teamColors[3]};
            font-weight: 400;
        }

        .selected {
            background-color: ${(props) => props.teamColors[0]};
            box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.356);
        }
    }

    @media screen and (max-width: 600px) {
        .searchBox {
            margin: 10px;
            width: 80%;
            height: 45px;
            border-radius: 25px;
            background-color: #ffffff;
            display: flex;
            align-items: center;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.356);
            input {
                background-color: transparent;
                padding: 0px 20px 0px 20px;
                width: 85%;
                font-size: 15px;
                border: 0px;
                outline: none;
            }
        }

        .categories {
            display: flex;
            width: 100%;
            overflow-x: auto;
            display: flex;
            justify-content: center;
            padding-left: 20px;
            padding-bottom: 20px;
            box-sizing: border-box;
            .category {
                height: 25px;
                display: flex;
                align-items: center;
                text-wrap: nowrap;
                margin: 10px;
                padding: 1wh 0.3vw;
                border-radius: 30px;
                font-size: 3vw;
                background-color: #ffffff;
                background-color: ${(props) => props.teamColors[0] + 99};
                box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.356);
                cursor: pointer;
                transition: all 0.5s;
            }

            .selected {
                background-color: ${(props) => props.teamColors[0]};
                box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.356);
            }
        }   
    }
`;