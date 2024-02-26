import { Background } from "./styles";
import { teamColors } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

export type MenuOption = { name: string; path: string, isSelected: boolean };

const Menu = () => {
    const navigate = useNavigate();
    const params = useParams();

    console.log(params);

    return (
        <Background teamColors={teamColors}>
            <h1>¡Reserva Confirmada!</h1>
            <h2>
                    Pronto recibirás un correo electrónico con todos los detalles de tu reserva. ¡Gracias por elegirnos!
            </h2>
            <button onClick={() => navigate("/magicalHends/services")}>Continuar</button>
        </Background>
    );
}

export default Menu;