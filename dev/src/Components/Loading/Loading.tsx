import { Background } from "./styles";
import { useSelector } from "react-redux";
import { Store } from "../../store";
import { AppState } from "../../Slices/AppSlice";
import { serverURL } from "../../config";

const Loading = () => {
    const appState = useSelector<Store>(state => state.app) as AppState;

    return appState.isLoading && (
        <Background>
            <img src={serverURL + "/images/loading2.gif"} />
        </Background>
    );
}

export default Loading;