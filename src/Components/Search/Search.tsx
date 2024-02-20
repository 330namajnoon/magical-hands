import { Background } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store";
import { AppState, Category, searchForServices } from "../../Slices/AppSlice";
import { useEffect, useState } from "react";

const Search = () => {
    const setCategories = (categories: Category[]): {isSelected: boolean, id: string, name: string}[] => {
        return categories.map((category, index) => {
            let category_: any = {};
            category_.id = category.id;
            category_.name = category.name;
            category_.isSelected = index === 0 ? true : false;
            return category_;
        })
    }
    const [value, setValue] = useState<string>("");
    const appStore = useSelector<Store>(state => state.app) as AppState;
    const [categories, setCategoriesState] = useState<{isSelected: boolean, id: string, name: string}[]>([]);

    const dispach = useDispatch();

    const onChange = (value: string) => {
        setValue(value);
        dispach(searchForServices(value));
    };

    const onClick = (value: string) => {
        setCategoriesState(categories.map(cat => {
            const cat_ = cat;
            if (cat_.id === value)
                cat_.isSelected = true;
            else
                cat_.isSelected = false;
            return cat_
        }));
        dispach(searchForServices(value));
    }

    useEffect(() => {
        setCategoriesState(setCategories(appStore.categories));
    }, [appStore.categories])

    useEffect(() => {
        if (appStore.categories.length > 0)
            dispach(searchForServices(appStore.categories[0].id));
    }, [appStore.categories])

    return (
        <Background>
            <div className="searchBox">
                <input onChange={(e) => onChange(e.target.value)} type="text" placeholder="Buscar" value={value}/>
                <span className="material-symbols-outlined">search</span>
            </div>
            <div className="categories">
                { categories.map((category ,index) => (
                    <h3 className={category.isSelected ?  "category selected" : "category"} onClick={() => onClick(category.id)} key={index} >{category.name}</h3>
                ))}
            </div>
        </Background>
    );
}

export default Search;