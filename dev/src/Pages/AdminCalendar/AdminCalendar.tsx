import { MouseEvent, useEffect, useState } from "react";
import AdminDateInput from "../../Components/AdminDateInput";
import { Background } from "./style";
import { AdminHour, AdminState, getAdminHoursByDate, setIsAvailableHour } from "../../Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store";
import { setLoading } from "../../Slices/AppSlice";


const AdminCalendar = () => {
    const { adminHours, isLoading, dateInputsValue, error } = useSelector<Store>((state) => state.admin) as AdminState;
    const [index, setIndex] = useState<number | null>(null);
    const dispatch = useDispatch();

    const getAllIndexs = (start: number, end: number): number[] => {
        const ns = [];
        if (start < end) {
            for (let index = start; index <= end; index++)
                ns.push(index);
        } 
        if (end < start) {
            for (let index = end; index >= start; index--)
                ns.push(index);
        }
        console.log(ns)
        return ns;
    }

    const onClich = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as any;
        if (index === null) {
            dispatch(setIsAvailableHour([parseInt(target.id)]));
            setIndex(parseInt(target.id));
        } else {
            dispatch(setIsAvailableHour(getAllIndexs(index, parseInt(target.id))));
            setIndex(null);
        }
    }

    useEffect(() => {
        dispatch(getAdminHoursByDate(dateInputsValue.calendar) as any);
    }, [])

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading])

    console.log(error)

    return (
        <Background>
            <AdminDateInput
                label="Fecha"
                name="calendar"
            />
            <div className="calendar-container">
                {adminHours.map((hour, index) => (
                    <div key={index} className="column-container">
                        <div className="hour">{hour.hour}</div>
                        <div id={index + ""} onClick={onClich} className={hour.isAvailable ? "active-hour" : "desactive-hour"}></div>
                    </div>
                ))}
            </div>
        </Background>
    );
}

export default AdminCalendar;