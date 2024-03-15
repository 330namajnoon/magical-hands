import store from "../../store";
import { AppState } from "../../Slices/AppSlice";
import { Ins } from "./styles";

export type TranslatorProps = {
    translationKey: string;
    relace?: any;
}


const getTransLation = (key: string, relace: any | undefined) => {
    const { translations } = store.getState().app as AppState;
    let text: string = translations.resources[translations.lng][key];
    let relaceA = Object.entries(relace).map(([key, value]) => ({ key, value }));
    relaceA.forEach(r => {
        text = text.replace(`{{${r.key}}}`, `${r.value}`);
    })
    return text;
}

const Translator = (props: TranslatorProps) => {

    const text = getTransLation(props.translationKey, props.relace ? props.relace : {});

    return (
        <Ins data--trl-id={props.translationKey} >
            {text}
        </Ins>
    );
}
export { getTransLation }
export default Translator;