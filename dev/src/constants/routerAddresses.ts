import { clientParam } from "../config";

const routerAddresses = {
    HOME: `${clientParam}/home`,
    SERVICES: `${clientParam}/services`,
    CONTACT: `${clientParam}/contact`,
    RESERVATION_INFO: `${clientParam}/services/reservationInfo`,
    ADMIN: `${clientParam}/admin`,
    ADMIN_RESERVATIONS: `${clientParam}/admin/reservations`,
    ADMIN_CALENDAR: `${clientParam}/admin/calendar`,
}

export default routerAddresses;