import { useEffect } from "react";
import { Background } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getCategories, getServices } from "../../Slices/AppSlice";
import Search from "../../Components/Search";
import ServiceComponent from "../../Components/Service";
import ServiceDetails from "../../Components/ServiceDetiles/ServiceDetails";
import { teamColors } from "../../config";

const Services = () => {
    const dispach = useDispatch();
    const { servicesSearched } = useSelector<{ app: AppState }>(state => state.app) as AppState;

    useEffect(() => {
        dispach(getServices() as any);
        dispach(getCategories() as any);
    }, [])

    return (
        <Background teamColors={teamColors}>
            <Search />
            <div className="services">
                {
                    servicesSearched.map((service, index) => (
                        <ServiceComponent key={index} {...service} />
                    ))
                }
            </div>
            <ServiceDetails />
        </Background>
    );
}

export default Services;