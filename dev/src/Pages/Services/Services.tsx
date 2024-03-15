import { useEffect } from "react";
import { Background } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AppState, createNewService, getCategories, getServices } from "../../Slices/AppSlice";
import Search from "../../Components/Search";
import ServiceComponent from "../../Components/Service";
import ServiceDetails from "../../Components/ServiceDetiles/ServiceDetails";
import { teamColors } from "../../config";
import Button from "../../Components/Button";
import { Store } from "../../store";
import { AdminState } from "../../Slices/AdminSlice";

const Services = () => {
    const dispach = useDispatch();
    const { servicesSearched, services } = useSelector<Store>(state => state.app) as AppState;
    const { adminPromission } = useSelector<Store>(state => state.admin) as AdminState;

    useEffect(() => {
        dispach(getServices() as any);
        dispach(getCategories() as any);
    }, [])

    return (
        <Background teamColors={teamColors}>
            <Search />
            { adminPromission ? (
                <>
                    <div className="services">
                        {
                            services.map((service, index) => (
                                <ServiceComponent key={index} {...service} />
                            ))
                        }
                    </div>
                    <Button 
                        style={{margin: "10px"}}
                        onClick={() => dispach(createNewService() as any)}
                        value="Añadir nuevo servicio"
                    />
                </>
            )
            :
            (       
                <div className="services">
                    {
                        servicesSearched.map((service, index) => (
                            <ServiceComponent key={index} {...service} />
                        ))
                    }
                </div>
            )
            }
            <ServiceDetails />
        </Background>
    );
}

export default Services;