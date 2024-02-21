import { useDispatch, useSelector } from "react-redux";
import { Background } from "./styles";
import { Store } from "../../store";
import { serverURL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppState, setLoading, setSelectedService } from "../../Slices/AppSlice";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import { ReservationState, sendReservationRequest } from "../../Slices/ReservationSlice";

export type Order = {
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phoneNumber: string;
    date: string;
    status: {
        name: boolean;
        lastName1: boolean;
        lastName2: boolean;
        email: boolean;
        phoneNumber: boolean;
        date: boolean;
    }
}

const ServiceDetails = () => {
    const [reservation, setReservation] = useState<boolean>(false);
    const [order, setOrder] = useState<Order>({
        name: "",
        lastName1: "",
        lastName2: "",
        email: "",
        phoneNumber: "",
        date: "",
        status: {
            name: false,
            lastName1: false,
            lastName2: true,
            email: false,
            phoneNumber: false,
            date: false,
        }
    });

    const dispatch = useDispatch();
    const navegate = useNavigate();

    const { selectedService } = useSelector<Store>((state) => state.app) as AppState;
    const { loading, lastReservation } = useSelector<Store>((state) => state.reservation) as ReservationState;
    const { serviceID } = useParams();

    const back = (e: any) => {
        if (e.target.id === "backPromise") {
            dispatch(setSelectedService(null));
            navegate("/magicalHends/services");
            setReservation(false);
        }
    }

    const orderFormValidation = (): boolean => {
        const { name, lastName1, lastName2, email, phoneNumber, date } = order.status;
        if (!name)
            return false;
        if (!lastName1)
            return false;
        if (!lastName2)
            return false;
        if (!email)
            return false;
        if (!phoneNumber)
            return false;
        if (!date)
            return false;
        return true;
    }

    useEffect(() => {
        if (!selectedService)
            dispatch(setSelectedService(serviceID));
    })

    useEffect(() => {
        dispatch(setLoading(loading));
        if (lastReservation) {
            setOrder({
                name: "",
                lastName1: "",
                lastName2: "",
                email: "",
                phoneNumber: "",
                date: "",
                status: {
                    name: false,
                    lastName1: false,
                    lastName2: true,
                    email: false,
                    phoneNumber: false,
                    date: false,
                }
            })
            alert("Reservacion se ha hecho correctamente!!");
            navegate("/magicalHends/services");
        }
    }, [loading, lastReservation])

    const emailValidation = (email: string): boolean => {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;
    }

    const phoneNumberValidation = (phoneNumber: string): boolean => {
        return phoneNumber.match(/^[0-9]{9}/) ? true : false;
    }

    const onChange = (name: string, value: string) => {
        switch (name) {
            case "name":
                setOrder({ ...order, name: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase(), status: { ...order.status, name: value !== "" ? true : false } });
                break;
            case "lastName1":
                setOrder({ ...order, lastName1: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase(), status: { ...order.status, lastName1: value !== "" ? true : false } });
                break;
            case "lastName2":
                setOrder({ ...order, lastName2: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase() });
                break;
            case "email":
                setOrder({ ...order, email: value, status: { ...order.status, email: emailValidation(value) } });
                break;
            case "phoneNumber":
                if (value !== "" ? ("0123456789".includes(value[value.length - 1]) && value.length < 10) : true)
                    setOrder({ ...order, phoneNumber: value, status: { ...order.status, phoneNumber: phoneNumberValidation(value) } });
                break;
            case "date":
                setOrder({ ...order, date: value, status: { ...order.status, date: value !== "" ? true : false } });
                break;
            default:
                break;
        }
    }

    const onClick = () => {
        setReservation(true);
    }

    const sendReservation = () => {
        dispatch(sendReservationRequest({
            name: order.name,
            email: order.email,
            lastName1: order.lastName1,
            lastName2: order.lastName2,
            date: order.date,
            phoneNumber: order.phoneNumber
        }) as any);
    }

    return selectedService && (
        <Background id="backPromise" imageurl={serverURL + selectedService.imageURL} onClick={(e: any) => back(e)}>
            <span id="backPromise" className="material-symbols-outlined backButton" onClick={(e: any) => back(e)}>reply</span>
            <div className="details">
                <h1>{selectedService.name}</h1>
                <h3>{selectedService.title}</h3>
                <h2>{selectedService.description}</h2>
                <h4>{selectedService.time}Min</h4>
                <h4>{selectedService.price}€</h4>
                <div className={reservation ? "reservationForm active" : "reservationForm"}>
                    <DateInput
                        name="date"
                        label="Fecha de reservacion"
                        value={order.date}
                        onChange={onChange}
                        validationError="Tienes qie elegir una fecha valida"
                        isValid={order.status.date}
                    />
                    <TextInput
                        name="name"
                        label="Nombre"
                        placeholder="Escribe tu nombre"
                        value={order.name}
                        onChange={onChange}
                        validationError="Escribe tu nombre por favor."
                        isValid={order.name !== ""}
                    />
                    <TextInput
                        name="lastName1"
                        label="Primer apellido"
                        placeholder="Escribe tu primer apellido"
                        value={order.lastName1}
                        onChange={onChange}
                        validationError="No puedes dejar vacio este campo."
                        isValid={order.lastName1 !== ""}
                    />
                    <TextInput
                        name="lastName2"
                        label="Segundo apellido (opcional)"
                        placeholder="Escribe tu segundo apellido (Opcional)"
                        value={order.lastName2}
                        onChange={onChange}
                        validationError="No puedes dejar vacio este campo."
                        isValid={null}
                    />
                    <TextInput
                        name="email"
                        label="Correo electronico"
                        placeholder="Escribe tu correo electronico"
                        value={order.email}
                        onChange={onChange}
                        validationError="No puedes dejar vacio este campo."
                        isValid={order.status.email}
                    />
                    <TextInput
                        name="phoneNumber"
                        label="Numero de telefono"
                        placeholder="Escribe tu numero de telefono"
                        value={order.phoneNumber}
                        onChange={onChange}
                        validationError="No puedes dejar vacio este campo."
                        isValid={order.status.phoneNumber}
                    />
                    <button disabled={!orderFormValidation()} onClick={sendReservation}>Reserva tu cita</button>
                    <button style={{visibility: "hidden"}}></button>
                    
                </div>
                {!reservation && <button onClick={onClick}>Reserva tu cita</button>}
            </div>
        </Background>
    );
}

export default ServiceDetails;