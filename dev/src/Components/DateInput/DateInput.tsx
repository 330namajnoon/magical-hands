import { useEffect, useRef, useState } from "react";
import { Background } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ReservationState, getAvailableHoursByDate } from "../../Slices/ReservationSlice";
import { Store } from "../../store";
import { AppState, setLoading } from "../../Slices/AppSlice";
import { teamColors } from "../../config";

export type DateInputProps = {
    name: string;
    value: string;
    label: string;
    validationError: string;
    isValid: boolean | null;
    onChange: (name: string, value: string) => void;
}

const DateInput = (props: DateInputProps) => {
    const dispatch = useDispatch();

    const input = useRef(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [isBlur, setIsBlur] = useState<boolean>(false);

    const { name, label, validationError, isValid, onChange } = props;
    const { loading, error, reservatonesBySelectedDate, availableHours} = useSelector<Store>(state => state.reservation) as ReservationState;
    const { selectedService } = useSelector<Store>(state => state.app) as AppState;



    const inputOnChange = (value: string) => {
        dispatch(getAvailableHoursByDate(value) as any);
        setIsBlur(false);
        setInputValue(value);
    }

    const timeOnChange = (time: string) => {
        const endTime = new Date(inputValue + " " + time);
        if (selectedService)
            endTime.setMinutes(endTime.getMinutes() + selectedService.time);
        onChange(name, time !== "" ? (inputValue + " " + time + " " + (endTime.getHours() < 10 ? "0" : "") + endTime.getHours() + ":" + (endTime.getMinutes() < 10 ? "0" : "") + endTime.getMinutes()) : "");
    }

    useEffect(() => {
        if (input.current) {
            const dateInput = input.current as HTMLInputElement;
            const date = new Date();
            dateInput.setAttribute("min", "" + date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? "0" : "") + date.getDate() + "");
        }
    }, [])

    useEffect(() => {
        if (loading)
            dispatch(setLoading(true));
        if (reservatonesBySelectedDate) {
            dispatch(setLoading(false));
        }
    }, [error, loading])
    console.log(availableHours)
    return (
        <Background isValid={isValid !== null ? (!isValid && isBlur) : false} teamColors={teamColors} >
            <label>{label}</label>
            <input ref={input} onChange={(e) => inputOnChange(e.target.value)} type="date" />
            <select onChange={(e) => timeOnChange(e.target.value)}>
                <option selected value="">Seleccionar la hora</option>
                { availableHours.map((rt, index) => (
                    <option key={index} value={rt}>{rt}</option>
                ))}
            </select>
            { (isValid !== null ? (!isValid && isBlur) : false) &&  <span>{validationError}</span> }
        </Background>
    );
}

export default DateInput;