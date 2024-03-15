import { Background } from "./styles";
import { teamColors } from "../../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedService } from "../../Slices/AppSlice";
import { setLastReservation } from "../../Slices/ReservationSlice";
import { useEffect } from "react";
import routerAddresses from "../../constants/routerAddresses";

export type MenuOption = { name: string; path: string, isSelected: boolean };

const Menu = () => {
    const navigate = useNavigate();
    const dispach = useDispatch();
    const [search, setSearch] = useSearchParams();

    useEffect(() => {
        if (search)
            setSearch("");
    }, [])

    const onClick = () => {
        dispach(setSelectedService(null));
        dispach(setLastReservation(null));
        navigate(routerAddresses.SERVICES);
    }

    return (
        <Background teamColors={teamColors}>
            <h1>¡Reserva Confirmada!</h1>
            <h2>
                Pronto recibirás un correo electrónico con todos los detalles de tu reserva. ¡Gracias por elegirnos!
            </h2>
            <button onClick={onClick}>Continuar</button>
        </Background>
    );
}

export default Menu;