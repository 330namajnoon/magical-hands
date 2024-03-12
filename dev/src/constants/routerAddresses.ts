import { serverParam } from "../config";

const routerAddresses = {
    HOME: `${serverParam}/home`,
    SERVICES: `${serverParam}/services`,
    CONTACT: `${serverParam}/contact`,
    RESERVATION_INFO: `${serverParam}/services/reservationInfo`,
    ADMIN: `${serverParam}/admin`,
    ADMIN_RESERVATIONS: `${serverParam}/admin/reservations`,
    ADMIN_CALENDAR: `${serverParam}/admin/calendar`,
}

export default routerAddresses;