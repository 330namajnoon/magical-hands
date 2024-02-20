import { useEffect } from "react";
import { Background } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getCategories, getServices } from "../../Slices/AppSlice";

const Home = () => {
    const dispach = useDispatch();
    const state = useSelector<{app: AppState}>(state => state.app) as AppState;
    console.log(state);
    useEffect(() => {
        dispach(getServices() as any);
        dispach(getCategories() as any);
    }, [])

    return (
        <Background>
            
        </Background>
    );
}

export default Home;