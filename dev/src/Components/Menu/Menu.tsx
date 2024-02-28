import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "./styles";
import { useState } from "react";
import { teamColors } from "../../config";

export type MenuOption = { name: string; path: string, isSelected: boolean };

export const menuHeight = 40;

const Menu = () => {
    const navegate = useNavigate();
    const location = useLocation();
    const { pathname } = useLocation();

    const [options, setOptions] = useState<MenuOption[]>([
        {
            name: "Inicio",
            path: "/magicalHends/home",
            isSelected: pathname.includes("/magicalHends/home") ? true : false,
        },
        {
            name: "Servicios",
            path: "/magicalHends/services",
            isSelected: pathname.includes("/magicalHends/services") ? true : false,
        },
        {
            name: "Contacto",
            path: "/magicalHends/contact",
            isSelected: pathname.includes("/magicalHends/contact") ? true : false,
        },
    ]);

    const [adminOptions, setAdminOptions] = useState<MenuOption[]>([
        {
            name: "Inicio",
            path: "/magicalHends/admin",
            isSelected: pathname.includes("/magicalHends/admin") ? true : false,
        },
        {
            name: "Reservaciones",
            path: "/magicalHends/admin/reservations",
            isSelected: pathname.includes("/magicalHends/admin/reservations") ? true : false,
        },
    ]);


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