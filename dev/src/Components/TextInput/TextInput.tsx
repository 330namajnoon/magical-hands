import { useState } from "react";
import { Background } from "./styles";
import { teamColors } from "../../config";

export type TextInputProps = {
    name: string;
    value: string;
    placeholder: string;
    label: string;
    validationError: string;
    isValid: boolean | null;
    onChange: (name: string, value: string) => void;
}

const TextInput = (props: TextInputProps) => {
    const [isBlur, setIsBlur] = useState<boolean>(false);

    const { name, value, placeholder, label, validationError, isValid, onChange } = props;

    const inputOnChange = (value: string) => {
        setIsBlur(false);
        onChange(name, value);
    }

    return (
        <Background isValid={isValid !== null ? (!isValid && isBlur) : false} teamColors={teamColors}>
            <label>{label}</label>
            <input onChange={(e) => inputOnChange(e.target.value)} onBlur={() => setIsBlur(true)} type="text" value={value} placeholder={placeholder}/>
            { (isValid !== null ? (!isValid && isBlur) : false) &&  <span className="errorText">{validationError}</span> }
        </Background>
    );
}

export default TextInput;