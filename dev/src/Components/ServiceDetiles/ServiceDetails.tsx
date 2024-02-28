import { useDispatch, useSelector } from "react-redux";
import { Background } from "./styles";
import { Store } from "../../store";
import { clientURL, serverURL, teamColors } from "../../config";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AppState, setLoading, setSelectedService } from "../../Slices/AppSlice";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import { ReservationState, getStripeSession, reservationStatuses, sendReservationInfoEmail, sendReservationRequest, setCurrentStatus, setLastReservation } from "../../Slices/ReservationSlice";
import { decode, encode } from "../../Utils/createTokenBase";
import { UserState } from "../../Slices/UserSlice";
import { setSearchQuerys } from "../../Utils/setSearchQuerys";

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
        unChangeCount: number;
    }
}

const ServiceDetails = () => {
    const { selectedService, services } = useSelector<Store>((state) => state.app) as AppState;
    const { userInfo } = useSelector<Store>((state) => state.user) as UserState;
    const { loading, lastReservation, spriteSession, currentStatus } = useSelector<Store>((state) => state.reservation) as ReservationState;
    const [search, setSearch] = useSearchParams();
    const location = useLocation();
    const [reservation, setReservation] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navegate = useNavigate();
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
            unChangeCount: 0,
        }
    });



    const back = (e: any) => {
        if (e.target.id === "backPromise") {
            dispatch(setSelectedService(null));
            navegate("/magicalHends/services");
            setReservation(false);
        }
    }

    const orderFormValidation = (): boolean => {
        const { name, lastName1, lastName2, email, phoneNumber, date, unChangeCount } = order.status;
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
        if (unChangeCount <= 0)
            return false;
        return true;
    }

    const emailValidation = (email: string): boolean => {
        return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ? true : false;
    }

    const phoneNumberValidation = (phoneNumber: string): boolean => {
        return phoneNumber.match(/^[0-9]{9}/) ? true : false;
    }

    const onChange = (name: string, value: string) => {
        switch (name) {
            case "name":
                setOrder({ ...order, name: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase(), status: { ...order.status, name: value !== "" ? true : false, unChangeCount: order.status.unChangeCount + 1 } });
                break;
            case "lastName1":
                setOrder({ ...order, lastName1: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase(), status: { ...order.status, lastName1: value !== "" ? true : false, unChangeCount: order.status.unChangeCount + 1 } });
                break;
            case "lastName2":
                setOrder({ ...order, lastName2: value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase(), status: { ...order.status, unChangeCount: order.status.unChangeCount + 1 } });
                break;
            case "email":
                setOrder({ ...order, email: value.toLowerCase(), status: { ...order.status, email: emailValidation(value), unChangeCount: order.status.unChangeCount + 1 } });
                break;
            case "phoneNumber":
                if (value !== "" ? ("0123456789".includes(value[value.length - 1]) && value.length < 10) : true)
                    setOrder({ ...order, phoneNumber: value, status: { ...order.status, phoneNumber: phoneNumberValidation(value), unChangeCount: order.status.unChangeCount + 1 } });
                break;
            case "date":
                setOrder({ ...order, date: value, status: { ...order.status, date: value !== "" ? true : false, unChangeCount: order.status.unChangeCount + 1 } });
                break;
            default:
                break;
        }
    }

    const onClick = () => {
        setReservation(true);
    }

    const sendStripeSessionRequest = () => {
        const paramValue = encode(JSON.stringify({ ...order, serviceId: selectedService?.id, status: undefined }));
        const newSearchString = setSearchQuerys("reservationForm", paramValue, location.search);
        if (selectedService)
            dispatch(getStripeSession({ email: order.email, price: selectedService?.price, service: selectedService.name, description: selectedService.title, successURL: `${clientURL}${location.pathname}?${newSearchString}`, cancelURL: "http://localhost:5173/magicalHends/services" }) as any);
    }

    useEffect(() => {
        if (!selectedService)
            dispatch(setSelectedService(search.get("serviceId")));
    })

    useEffect(() => {
        if (order.status.unChangeCount > 0) {
            const paramValue = encode(JSON.stringify({ name: order.name, lastName1: order.lastName1, lastName2: order.lastName2, email: order.email, phoneNumber: order.phoneNumber }));
            setSearch(setSearchQuerys("user", paramValue, location.search));
        }
    }, [order])

    useEffect(() => {
        const user: any = search.get("user") ? JSON.parse(decode(search.get("user") as string)) : userInfo as any;
        if (user)
            setOrder({
                ...order,
                ...user,
                status: { ...order.status, email: true, lastName1: true, lastName2: true, name: true, phoneNumber: true }
            });
        if (search.get("reservationForm")) {
            dispatch(setLoading(true));
            const { name, date, lastName1, email, lastName2, phoneNumber, serviceId } = JSON.parse(decode(search.get("reservationForm") as string));
            dispatch(sendReservationRequest({
                name: name,
                email: email,
                lastName1: lastName1,
                lastName2: lastName2,
                date: date.split(" ")[0],
                startTime: date.split(" ")[1],
                endTime: date.split(" ")[2],
                phoneNumber: phoneNumber,
                serviceId: serviceId,
            }) as any);
        }
    }, [])

    useEffect(() => {
        dispatch(setLoading(loading));
    }, [loading])

    useEffect(() => {
        switch (currentStatus) {
            case reservationStatuses.SENDED_STRIPE_SESSION:
                open(spriteSession.url);
                break;
            case reservationStatuses.SENDED_RESERVATION_REQUEST:
                if (lastReservation) {
                    const serviceId = search.get("serviceId");
                    let service = null;
                    if (selectedService) service = selectedService;
                    else if (serviceId)
                        service = services.find((service => service.id === serviceId));
                    if (service)
                        dispatch(sendReservationInfoEmail({
                            date: lastReservation.date.replace(/-/g, "/"),
                            duration: service.time + "m",
                            email: lastReservation.email,
                            lastName1: lastReservation.lastName1,
                            lastName2: lastReservation.lastName2,
                            name: lastReservation.name,
                            service: service.name,
                            startTime: lastReservation.startTime
                        }) as any);
                }
                break;
            case reservationStatuses.SENDED_EMAIL:
                setReservation(false);
                dispatch(setLastReservation(null));
                dispatch(setSelectedService(null));
                dispatch(setCurrentStatus(reservationStatuses.RESERVATION_FORM));
                dispatch(setLoading(false));
                navegate("/magicalHends/services/reservationInfo");
                break;
            default:
                break;
        }
    }, [currentStatus, services])


    return selectedService && (
        <Background id="backPromise" imageurl={serverURL + selectedService.imageURL} teamColors={teamColors} onClick={(e: any) => back(e)}>
            <div  className="backButton">
                <span id="backPromise" className="material-symbols-outlined" onClick={(e: any) => back(e)}>reply</span>
            </div>
            <div className="details">
                <h1>{selectedService.name}</h1>
                <h3>{selectedService.title}</h3>
                <h2>{selectedService.description}</h2>
                <h4>{selectedService.time}Min</h4>
                <h4>{selectedService.price}€</h4>
                <div className={reservation || search.get("user") ? "reservationForm active" : "reservationForm"}>
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
                    <button className={orderFormValidation() ? "reservationButtonActive" : "reservationButton"} disabled={!orderFormValidation()} onClick={sendStripeSessionRequest}>Reserva tu cita</button>
                    <button style={{ visibility: "hidden" }}></button>

                </div>
                {(search.get("user") ? false : (!reservation ? true : false)) && <button onClick={onClick}>Reserva tu cita</button>}
            </div>
        </Background>
    );
}

export default ServiceDetails;