import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Components/Menu";
import Contact from "./Pages/Contact";
import Loading from "./Components/Loading";
import Services from "./Pages/Services";
import ServiceDetiles from "./Components/ServiceDetiles";
import Header from "./Components/Header";
import ReservationInfo from "./Components/ReservationInfo"; 
import Admin from "./Pages/Admin";
import AdminReservations from "./Pages/AdminReservations";
import AdminCalendar from "./Pages/AdminCalendar";
import routerAddresses from "./constants/routerAddresses";
import { clientParam, clientURL } from "./config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getTranslations } from "./Slices/AppSlice";
import { Store } from "./store";
import { setAdminPromission } from "./Slices/AdminSlice";

const App = () => {
    
    const dispach = useDispatch();
    const { translations } = useSelector<Store>((state) => state.app) as AppState;

    useEffect(() => {
        if (window.location.href.includes("admin")) {
            const password =  prompt("Password:");
            if (password === "angel")
                dispach(setAdminPromission(true));
            else
                window.location.href = clientURL;
        }
        dispach(getTranslations() as any);
    }, [])

    return (
        <BrowserRouter>
            { translations.resources && 
                <>
                    <Header />
                    <Menu/>
                    <Routes>
                        <Route path={clientParam} element={<Home/>} />
                        <Route path={routerAddresses.HOME} element={<Home/>} />
                        <Route path={routerAddresses.SERVICES} element={<Services />} >
                            <Route path=":serviceID" element={<ServiceDetiles />} />
                        </Route>
                        <Route path={routerAddresses.RESERVATION_INFO} element={<ReservationInfo />} />
                        <Route path={routerAddresses.CONTACT} element={<Contact/>} />
                        <Route path={routerAddresses.ADMIN} element={<Admin/>} />
                        <Route path={routerAddresses.ADMIN_RESERVATIONS} element={<AdminReservations/>} />
                        <Route path={routerAddresses.ADMIN_CALENDAR} element={<AdminCalendar/>} />
                    </Routes>
                </>
            }
            <Loading/>
        </BrowserRouter>
    );
}

export default App;