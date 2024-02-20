import { Background } from "./styles";
import { Service } from "../../Slices/AppSlice";
import { useEffect, useState } from "react";
import { serverURL } from "../../config";
import { useNavigate } from "react-router-dom";

const ServiceComponent = (props: Service) => {
    const navegate = useNavigate();

    const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);

    const { name, imageURL, price } = props;

    const onClick = () => {
        navegate(props.id);
    }

    useEffect(() => {
        const image = new Image();
        image.src = serverURL + imageURL;
        image.onload = () => {
            setImageIsLoaded(true);
        }
    }, [])

    return (
        <Background>
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