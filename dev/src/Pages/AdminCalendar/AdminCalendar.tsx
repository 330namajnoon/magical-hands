import { MouseEvent, useEffect, useState } from "react";
import AdminDateInput from "../../Components/AdminDateInput";
import { Background } from "./style";
import { AdminState, getAdminHoursByDate, saveAdminHoursByDate, setIsAvailableHour } from "../../Slices/AdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store";
import { setLoading } from "../../Slices/AppSlice";


const AdminCalendar = () => {
    const { adminHours, isLoading, dateInputsValue, error } = useSelector<Store>((state) => state.admin) as AdminState;
    const [index, setIndex] = useState<number | null>(null);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const dispatch = useDispatch();

    const getAllIndexs = (start: number, end: number): number[] => {
        const ns = [];
        if (start < end) {
            for (let index = start; index <= end; index++)
                ns.push(index);
        }
        if (end < start) {
            for (let index = start; index >= end; index--)
                ns.push(index);
        }
        return ns;
    }

    const onClich = (e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as any;
        if (index === null) {
            dispatch(setIsAvailableHour({ hours: [parseInt(target.id)], isAvailable: null }));
            setStatus(adminHours.hours[parseInt(target.id)].isAvailable)
            setIndex(parseInt(target.id));
        } else {
            dispatch(setIsAvailableHour({ hours: getAllIndexs(index, parseInt(target.id)), isAvailable: !status }));
            setIndex(null);
            setIsSaved(true);
        }
    }

    useEffect(() => {
        dispatch(getAdminHoursByDate(dateInputsValue.calendar) as any);
    }, [])

    useEffect(() => {
        dispatch(getAdminHoursByDate(dateInputsValue.calendar) as any);
    }, [dateInputsValue.calendar]);

    useEffect(() => {
        if (isSaved) {
            dispatch(saveAdminHoursByDate(adminHours) as any);
            setIsSaved(false);
        }
    }, [adminHours])

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading])

    return (
        <Background>
            <AdminDateInput
                label="Fecha"
                name="calendar"
            />
            <div className="calendar-container">
                {adminHours.hours.map((hour, index) => (
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