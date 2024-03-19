import { teamColors } from "../../config";
import { Background } from "./styles";


const Discount = () => {

    return (
        <Background style={{backgroundColor: teamColors[Math.floor(Math.random() * 3)]}}>
            
        </Background>
    );
}

export default Discount;