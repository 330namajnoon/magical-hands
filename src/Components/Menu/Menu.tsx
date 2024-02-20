import { useLocation, useNavigate } from "react-router-dom";
import { Background } from "./styles";
import { useState } from "react";
import { serverURL } from "../../config";

export type MenuOption = {name: string; path: string, isSelected: boolean};

const Menu = () => {
    const navegate = useNavigate();
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

    const onClick = (option: MenuOption) => {
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
        <Background>
            <img src={serverURL + "/images/menu-icon.png"} />
            <div className="options">
                { options.map((option, index) => (
                    <h1 className={option.isSelected ? "selected" : "notSelected"} key={index} onClick={() => onClick(option)} >{option.name}</h1>
                ))}
            </div>
        </Background>
    );
}

export default Menu;