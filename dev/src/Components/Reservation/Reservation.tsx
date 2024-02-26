import { Background } from "./styles";
import { useSelector } from "react-redux";
import { Store } from "../../store";
import { AppState } from "../../Slices/AppSlice";

const Reservation = () => {
    const appState = useSelector<Store>(state => state.app) as AppState;
    console.log(btoa(JSON.stringify(appState.selectedService)));
    return (
        <Background>
            <h1>Reservacion del servicio</h1>
            <div className="form">

            </div>
        </Background>
    );
}

export default Reservation;