import { useEffect } from "react";
import AdminDateInput from "../../Components/AdminDateInput";
import Button from "../../Components/Button";
import { teamColors } from "../../config";
import { Background } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AdminState, getAdminReservationsByDate } from "../../Slices/AdminSlice";
import { Store } from "../../store";
import { setLoading } from "../../Slices/AppSlice";
import AdminReservation from "../../Components/AdminReservation";

const AdminReservations = () => {
    const dispatch = useDispatch();
    const { isLoading, dateInputsValue, reservations } = useSelector<Store>((state) => state.admin) as AdminState;

    const search = () => {
        dispatch(getAdminReservationsByDate(dateInputsValue) as any);
    }

    useEffect(() => {
        dispatch(getAdminReservationsByDate(dateInputsValue) as any);
    }, [])

    useEffect(() => {
        dispatch(setLoading(isLoading));
    }, [isLoading])

    return (
        <Background>
            <div className="dates-container">
                <AdminDateInput
                    label="Fecha inicio"
                    name="startDate"
                />
                <AdminDateInput
                    label="Fecha final"
                    name="endDate"
                />
            </div>
            <Button onClick={search} value="Buscar" style={{ backgroundColor: teamColors[0], color: teamColors[3] }} />
            <div className="reservations-container">
                { reservations.map((reservation, index) => (
                    <AdminReservation key={index} {...reservation} />
                ))}
            </div>
        </Background>
    );
}

export default AdminReservations;