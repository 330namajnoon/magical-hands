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

const App = () => {

  
    return (
        <BrowserRouter>
        <Header />
            <Menu/>
            <Loading/>
            <Routes>
                <Route path="/magicalHends" element={<Home/>} />
                <Route path="/magicalHends/home" element={<Home/>} />
                <Route path="/magicalHends/services" element={<Services />} >
                    <Route path=":serviceID" element={<ServiceDetiles />} />
                </Route>
                <Route path="/magicalHends/services/reservationInfo" element={<ReservationInfo />} />
                <Route path="/magicalHends/contact" element={<Contact/>} />
                <Route path="/magicalHends/admin" element={<Admin/>} />
                <Route path="/magicalHends/admin/reservations" element={<AdminReservations/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;