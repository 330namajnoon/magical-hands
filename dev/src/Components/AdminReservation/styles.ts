import styled from "styled-components";
import { teamColors } from "../../config";

export const Background = styled.div`
        
    @media screen and (max-width: 600px) {
        width: 95%;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.322);
        margin-top: 6px;

        .info-container {
            width: 100%;
            transition: all 0.5s;
            .min-info-button {
                width: 100%;
                box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.322);
                .min-info {
                    background-color: ${teamColors[2] + 90};
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 10px;
                    box-sizing: border-box;
                    align-items: center;
    
                    h1 {
                        font-size: 20px;
                        font-weight: 400;
                        color: ${teamColors[0]};
                    }
    
                    h6 {
                        text-align: center;
                        font-size: 10px;
                        font-weight: 400;
                        color: ${teamColors[4]};
                    }
    
                }
            }
            
            .info-all {
                width: 100%;
                height: 0px;
                overflow-y: auto;
                display: grid;
                gap: 2px;
                color: ${teamColors[4]};

                h1 {
                    font-size: 20px;
                    font-weight: 400;
                }
                
                h2 {
                    font-size: 15px;
                    font-weight: 300;
                }
                .contact {
                    width: 100%;
                    background-color: ${teamColors[3]};
                    padding: 10px;
                    h3 {
                        margin-top: 5px;
                        font-size: 18px;
                    }
                }
            }
            .info-all::-webkit-scrollbar {
                width: 0px;
            }
        }

        .active {
            .info-all {
                padding: 5px;
                box-sizing: border-box;
                height: auto;
            }
        }
    }
`;