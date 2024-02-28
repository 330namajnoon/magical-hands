import { Background } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AdminState, DateInputsValue, setDateInputsValue } from "../../Slices/AdminSlice";
import { Store } from "../../store";

export type DateInputProps = {
    name: keyof DateInputsValue;
    label: string;
}

const AdminDateInput = (props: DateInputProps) => {
    const { name, label } = props;

    const dispatch = useDispatch();
    const { dateInputsValue } = useSelector<Store>((state) => state.admin) as AdminState;

    const inputOnChange = (value: string) => {
        dispatch(setDateInputsValue({ key: name, value: value}));
    }

    return (
        <Background>
            <label>{label}</label>
            <input value={dateInputsValue[name]} onChange={(e) => inputOnChange(e.target.value)} type="date" />
        </Background>
    );
}

export default AdminDateInput;