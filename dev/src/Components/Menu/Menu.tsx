import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "./styles";
import { useEffect, useState } from "react";
import { teamColors } from "../../config";
import routerAddresses from "../../constants/routerAddresses";
import Translator from "../Translator";

export type MenuOption = { name: any, path: string, isSelected: boolean };

export const menuHeight = 40;

const Menu = () => {
    const navegate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();

    const [options, setOptions] = useState<MenuOption[]>(getInitialOptions());

    const [adminOptions, setAdminOptions] = useState<MenuOption[]>(getAdminInitialOptions());

    function getInitialOptions() {
        return [
            {
                name: <Translator translationKey="menuHomeOptionText" />,
                path: routerAddresses.HOME,
                isSelected: pathname.includes(routerAddresses.HOME) ? true : false,
            },
            {
                name: <Translator translationKey="menuServicesOptionText" />,
                path: routerAddresses.SERVICES,
                isSelected: pathname.includes(routerAddresses.SERVICES) ? true : false,
            },
            {
                name: <Translator translationKey="menuContactOptionText" />,
                path: routerAddresses.CONTACT,
                isSelected: pathname.includes(routerAddresses.CONTACT) ? true : false,
            },
        ];
    }

    function getAdminInitialOptions() {
        return [
            {
                name: <Translator translationKey="menuAdminHomeOptionText" />,
                path: routerAddresses.ADMIN,
                isSelected: pathname.includes(routerAddresses.ADMIN) ? true : false,
            },
            {
                name: <Translator translationKey="menuAdminReservationsOptionText" />,
                path: routerAddresses.ADMIN_RESERVATIONS,
                isSelected: pathname.includes(routerAddresses.ADMIN_RESERVATIONS) ? true : false,
            },
            {
                name: <Translator translationKey="menuAdminCalendarOptionText" />,
                path: routerAddresses.ADMIN_CALENDAR,
                isSelected: pathname.includes(routerAddresses.ADMIN_CALENDAR) ? true : false,
            },
    
        ];
    }

    const onClick = (option: MenuOption) => {
        if (location.pathname.includes("admin"))
            setAdminOptions(adminOptions.map(option_ => {
                const option__ = option_;
                if (option__.name === option.name)
                    option__.isSelected = true;
                else
                    option__.isSelected = false;
                return option_;
            }))
        else
            setOptions(options.map(option_ => {
                const option__ = option_;
                if (option__.name === option.name)
                    option__.isSelected = true;
                else
                    option__.isSelected = false;
                return option_;
            }))
        navegate(option.path);
    }

    useEffect(() => {
        setOptions(getInitialOptions());
        setAdminOptions(getAdminInitialOptions());
    }, [pathname])

    return (
        <Background height={menuHeight} teamColors={teamColors}>
            <div className="options">
                {location.pathname.includes("admin") ?
                    adminOptions.map((option, index) => (
                        <h1 className={option.isSelected ? "selected" : "notSelected"} key={index} onClick={() => onClick(option)} >{option.name}</h1>
                    ))
                    :
                    options.map((option, index) => (
                        <h1 className={option.isSelected ? "selected" : "notSelected"} key={index} onClick={() => onClick(option)} >{option.name}</h1>
                    ))}
            </div>
        </Background>
    );
}

export default Menu;