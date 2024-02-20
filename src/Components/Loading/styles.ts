import styled from "styled-components";

export const Background = styled.div`
    z-index: 1000;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
    top: 0px;
    left: 0px;
    img {
        width: 200px;
        height: 200px;
        border-radius: 25px;
        margin: 10px;
    }
`;