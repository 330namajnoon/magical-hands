import { CSSProperties } from "react";
import { ButtonStyled } from "./styles";

export type ButtonProps = {
    value?: string;
    style?: CSSProperties;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {

    const { value, style, onClick } = props;

    return (

        <ButtonStyled style={style} onClick={onClick}>
            {value}
        </ButtonStyled>

    );
}

export default Button;