import styled from "styled-components";

export const Background = styled.div<{ imageurl: string }>`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #0000002f;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url(${(props: any) => props.imageurl});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    span {
        position: absolute;
        top: 0px;
        width: 95%;
        color: #ffffff;
        font-size: 30px;
        padding: 5px;
        width: 50px;
        left: 850px;
        
    }

    .details {
        margin-top: 30px;
        position: relative;
        width: 600px;
        background-color: #ccbf5c67;
        box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.356);
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        color: #ffffff;
        padding: 30px;
        h1 {
            font-weight: 600;
            margin-bottom: 20px;
        }

        h3 {
            font-weight: 500;
            margin-bottom: 15px;
        }

        h2 {
            font-weight: 400;
            margin-bottom: 15px;
        }

        h4 {
            font-weight: 700;
            margin-bottom: 15px;
            font-size: 30px;
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
            width: 93%;
        }
        .details {
            overflow-y: auto;
            box-sizing: content-box;
            position: relative;
            width: 75%;
            height: 75%;
            margin: 0;
        }
    }
`;