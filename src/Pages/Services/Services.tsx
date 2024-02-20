import { useEffect } from "react";
import { Background } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getCategories, getServices } from "../../Slices/AppSlice";
import Search from "../../Components/Search";
import ServiceComponent from "../../Components/Service";
import ServiceDetails from "../../Components/ServiceDetiles/ServiceDetails";

const Services = () => {
    const dispach = useDispatch();
    const state = useSelector<{app: AppState}>(state => state.app) as AppState;

    useEffect(() => {
        dispach(getServices() as any);
        dispach(getCategories() as any);
    }, [])

    return (
        <Background>
            <Search/>
            <div className="services">
                {state.servicesSearched.map((service, index) => (
                    <ServiceComponent key={index} {...service}  />
                ))}
            </div>
            <ServiceDetails />
        </Background>
    );
}

export default Services;