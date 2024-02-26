import { Background } from "./styles";
import { Service } from "../../Slices/AppSlice";
import { useEffect, useState } from "react";
import { serverURL, teamColors } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchQuerys } from "../../Utils/setSearchQuerys";

const ServiceComponent = (props: Service) => {
    const navegate = useNavigate();
    const location = useLocation();
    const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

    const { name, imageURL, price, id } = props;

    const onClick = () => {
        navegate(`?${setSearchQuerys("serviceId", id, location.search)}`);
    }

    useEffect(() => {
        const image = new Image();
        image.src = serverURL + imageURL;
        image.onload = () => {
            setImageIsLoaded(true);
        }
    }, [])

    return (
        <Background teamColors={teamColors}>
            {imageIsLoaded ? (
                <img src={serverURL + imageURL} />
            ) : (
                <img src={serverURL + "/images/loading2.gif"} />
            )}
            <div className="detail">
                <h3>{name}</h3>
                <h4>{price}€</h4>
                <button onClick={onClick} >Reservar</button>
            </div>
        </Background>
    );
}

export default ServiceComponent;