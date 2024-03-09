import { useEffect } from "react";
import { Background } from "./style";
import { useDispatch } from "react-redux";
import { getCategories, getServices } from "../../Slices/AppSlice";

const Home = () => {
    const dispach = useDispatch();

    useEffect(() => {
        dispach(getServices() as any);
        dispach(getCategories() as any);
    }, [])

    return (
        <Background>
            Home
        </Background>
    );
}

export default Home;