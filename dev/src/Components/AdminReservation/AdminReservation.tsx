import { MouseEvent, useState } from "react";
import { AdminReservationData } from "../../Slices/AdminSlice";
import { Background } from "./styles";

const AdminReservation = (props: AdminReservationData) => {
    const { name, startTime, endTime, date, lastName1, lastName2, serviceName, serviceTitle, email, phoneNumber, price } = props;


    const [isActive, setIsActive] = useState<boolean>(false);

    const onClick = () => {
        setIsActive(!isActive);
    }

    return (
        <Background>
            <div onClick={onClick} className={isActive ? "info-container active" : "info-container"}>
                <div className="min-info-button">
                    <div  className="min-info">
                        <h1>{name} {lastName1} {lastName2}</h1>
                        <h6>{`${date.replace(/\-/g, "/")} | ${startTime}-${endTime}`}</h6>
                    </div>
                </div>

                <div className="info-all">
                    <h1>{serviceName}</h1>
                    <h2>{serviceTitle}</h2>
                    <h1>{price}€</h1>
                    <div className="contact">
                        <h3>
                            Email: <a href={email}>{email}</a>
                        </h3>
                        <h3>
                        Numero de contacto: <a href={phoneNumber}>{phoneNumber}</a>
                        </h3>
                    </div>
                </div>
            </div>
        </Background>
    );
}

export default AdminReservation;