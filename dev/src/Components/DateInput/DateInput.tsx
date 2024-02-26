import { useEffect, useRef, useState } from "react";
import { Background } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ReservationState, getReservationesByDate } from "../../Slices/ReservationSlice";
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
    const [reservableTimes, setReservableTimes] = useState<string[]>([]);

    const { name, label, validationError, isValid, onChange } = props;
    const { loading, error, reservatonesBySelectedDate} = useSelector<Store>(state => state.reservation) as ReservationState;
    const { selectedService } = useSelector<Store>(state => state.app) as AppState;



    const inputOnChange = (value: string) => {
        dispatch(getReservationesByDate(value) as any);
        setIsBlur(false);
        setInputValue(value);
    }

    const timeOnChange = (time: string) => {
        const endTime = new Date(inputValue + " " + time);
        if (selectedService)
            endTime.setMinutes(endTime.getMinutes() + selectedService.time);
        onChange(name, time !== "" ? (inputValue + " " + time + " " + (endTime.getHours() < 10 ? "0" : "") + endTime.getHours() + ":" + (endTime.getMinutes() < 10 ? "0" : "") + endTime.getMinutes()) : "");
    }

    const getreservableTimes = (start: number, end: number, renge: number) => {
        let times:string[] = [];
        let newTimes: string[] = [];
        for (let index = start; index < end; index++){
            for (let index1 = 0; index1 < 60; index1++) {
                if (index1 % renge === 0)
                    times.push("" + (index < 10 ? "0" : "") + index + ":" + (index1 < 10 ? "0" : "") + index1);
            }
        }
        times.forEach(time => {
            let find = reservatonesBySelectedDate?.find(res => {
                let time_ = new Date(inputValue + " " + time);
                let startTime = new Date(inputValue + " " + res.startTime);
                if (selectedService)
                    startTime.setMinutes(startTime.getMinutes() - selectedService.time);
                let endTime = new Date(inputValue + " " + res.endTime);
                if ((time_ >= startTime && time_ <= endTime))
                    return time;
                return null;
            });
            if (!find)
                newTimes.push(time);
        })
        setReservableTimes(newTimes);
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
        if (reservatonesBySelectedDate)
            dispatch(setLoading(false));
        if (!error && reservatonesBySelectedDate) {
            getreservableTimes(8, 17, 15);
        }
    }, [error, loading, reservatonesBySelectedDate])

    return (
        <Background isValid={isValid !== null ? (!isValid && isBlur) : false} teamColors={teamColors} >
            <label>{label}</label>
            <input ref={input} onChange={(e) => inputOnChange(e.target.value)} type="date" />
            <select onChange={(e) => timeOnChange(e.target.value)}>
                <option selected value="">Seleccionar la hora</option>
                { reservableTimes.map((rt, index) => (
                    <option key={index} value={rt}>{rt}</option>
                ))}
            </select>
            { (isValid !== null ? (!isValid && isBlur) : false) &&  <span>{validationError}</span> }
        </Background>
    );
}

export default DateInput;