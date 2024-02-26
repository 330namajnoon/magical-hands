import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Menu from "./Components/Menu";
import Contact from "./Pages/Contact";
import Loading from "./Components/Loading";
import Services from "./Pages/Services";
import ServiceDetiles from "./Components/ServiceDetiles";
import Reservation from "./Components/Reservation";
import Header from "./Components/Header";
import ReservationInfo from "./Components/ReservationInfo";

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
                <Route path="/magicalHends/Services/reservationInfo" element={<ReservationInfo />} />
                <Route path="/magicalHends/reservation" element={<Reservation />} />
                <Route path="/magicalHends/contact" element={<Contact/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;