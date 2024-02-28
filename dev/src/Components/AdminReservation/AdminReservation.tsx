import { AdminReservationData } from "../../Slices/AdminSlice";
import { Background } from "./styles";

const AdminReservation = (props: AdminReservationData) => {
    const { name, startTime, endTime, date, lastName1, lastName2 } = props;
    return (
        <Background>
            <div className="min-info-button">
                <div className="min-info">
                    <h1>{name} {lastName1} {lastName2}</h1>
                    <h6>{`${date.replace(/\-/g, "/")} | ${startTime}-${endTime}`}</h6>
                </div>
            </div>
        </Background>
    );
}

export default AdminReservation;