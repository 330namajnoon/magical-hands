import { Background } from "./styles";
import { serverURL, teamColors } from "../../config";

export const headerHeight = 60;

const Loading = () => {

    return (
        <Background height={headerHeight} teamColors={teamColors}>
            <img src={`${serverURL}/images/logo.png`} alt="" />
            <h1>
                MAGICAL HANDS 362
            </h1>
        </Background>
    );
}

export default Loading;