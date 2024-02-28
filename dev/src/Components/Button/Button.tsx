import { CSSProperties } from "react";
import { Background } from "./styles";

export type ButtonProps = {
    value: string;
    style: undefined | CSSProperties;
    onClick: () => void;
}

const Button = (props: ButtonProps) => {

    const { value, style, onClick } = props;

    return (
        <Background>
            <input style={style} onClick={onClick} type="button" value={value}/>
        </Background>
    );
}

export default Button;