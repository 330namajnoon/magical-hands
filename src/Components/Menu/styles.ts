import styled from "styled-components";

export const Background = styled.div`
    display: flex;
    padding: 10px;
    border-bottom: solid 3px #CDB404;
    width: 100%;
    height: 60px;
    padding-right: 40px;
    align-items: center;
    background-color: #E5E5E5;
    img {
        width: 40px;
        height: 40px;
        border-radius: 25px;
        margin: 10px;
    }

    .options {
        width: 100px;
        display: flex;
        align-items: center;
        transition: all 0.5s;

        .selected {
            margin-left: 20px;
            font-size: 20px;
            color: #CDB404;
            cursor: pointer;
            transition: all 0.5s;
            font-weight: 600;
        }

        .notSelected {
            margin-left: 20px;
            font-size: 20px;
            color: white;
            cursor: pointer;
            transition: all 0.5s;
            font-weight: 500;
        }
    }

    @media screen and (max-width: 600px) {
       
    }
`;