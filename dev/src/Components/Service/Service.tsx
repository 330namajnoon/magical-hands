import { Background, Categories, EditorContainer } from "./styles";
import { AppState, Service, updateServiceById } from "../../Slices/AppSlice";
import { useEffect, useRef, useState } from "react";
import { serverURL, teamColors } from "../../config";
import { useLocation, useNavigate } from "react-router-dom";
import { setSearchQuerys } from "../../Utils/setSearchQuerys";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../store";
import { AdminState } from "../../Slices/AdminSlice";
import TextInput from "../TextInput";
import Button from "../Button";

const ServiceComponent = (props: Service) => {
    const navegate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const fileInput = useRef<HTMLInputElement>(null);
    const [imageIsLoaded, setImageIsLoaded] = useState<boolean>(false);
    const [serviceEditing, setServiceEditing] = useState<boolean>(false);
    const [editProps, setEditProps] = useState<Service>(props);
    const { adminPromission } = useSelector<Store>((state) => state.admin) as AdminState;
    const { categories } = useSelector<Store>((state) => state.app) as AppState;
    const { name, imageURL, price, id } = props;

    const categoryOptions = [{id: "", name: "Añadir"},...categories.filter(c => !editProps.category.find(c_ => c_ === c.id))]

    const onClick = () => {
        navegate(`?${setSearchQuerys("serviceId", id, location.search)}`);
    }

    const fileInputOnchange = () => {
        const files = fileInput.current?.files as any
        const file = files[0] as File;
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setEditProps({...editProps, imageURL: e.target?.result as string});
        })
        reader.readAsDataURL(file);

    }

    const onChange = (key: string, value: string | number) => {
        setEditProps({...editProps, [key]: value});
    }

    const categoriesOnChange = (id: string) => {
        if (id !== "") {
            setEditProps({...editProps, category: [...editProps.category, id]});
        }
    }

    const deleteCategoryById = (id: string) => {
        setEditProps({...editProps, category: [...editProps.category.filter(c => c !== id)]});
    }

    const saveChange = () => {
        const files = fileInput.current?.files;
        const file = files && files?.length > 0 ? files[0] : undefined;
        setServiceEditing(false);
        dispatch(updateServiceById({status: "UPDATE", service: {...editProps, imageURL: props.imageURL}, file}) as any);
    }

    const deleteService = () => {
        setServiceEditing(false);
        dispatch(updateServiceById({status: "DELETE", service: editProps}) as any);
    }

    useEffect(() => {
        const image = new Image();
        image.src = serverURL + imageURL;
        image.onload = () => {
            setImageIsLoaded(true);
        }
    }, [])

    return !serviceEditing ? (
            <Background teamColors={teamColors}>
                { adminPromission && <div  className="admin-edit"><span onClick={() => setServiceEditing(true)} className="material-symbols-outlined" >edit</span></div> }
                {imageIsLoaded ? (
                    <img src={serverURL + imageURL} />
                ) : (
                    <img src={serverURL + "/images/loading2.gif"} />
                )}
                <div className="detail">
                    <h3>{name}</h3>
                    <h4>{price}€</h4>
                    <button onClick={onClick} >Reservar</button>
                </div>
            </Background>
        )
        :
        (
            <EditorContainer>
                <input onChange={fileInputOnchange} style={{display: "none"}} ref={fileInput} type="file" accept="image/*" />
                {imageIsLoaded ? (
                    <img onClick={() => fileInput.current?.click()} src={editProps.imageURL.length > 100 ? (editProps.imageURL) : (serverURL + editProps.imageURL)} />
                ) : (
                    <img src={serverURL + "/images/loading2.gif"} />
                )}
                <TextInput
                    isValid={true}
                    label="Nombre"
                    name="name"
                    placeholder="Nombre de servicio"
                    validationError=""
                    value={editProps.name}
                    onChange={onChange}
                />
                <TextInput
                    isValid={true}
                    label="Titulo"
                    name="title"
                    placeholder="Titulo de servicio"
                    validationError=""
                    value={editProps.title}
                    onChange={onChange}
                />
                <TextInput
                    isValid={true}
                    label="Descripcion"
                    name="description"
                    placeholder="Descripcion"
                    validationError=""
                    value={editProps.description}
                    onChange={onChange}
                />
                <TextInput
                    isValid={true}
                    label="Tiempo"
                    name="time"
                    placeholder="Tiempo"
                    validationError=""
                    value={editProps.time + ""}
                    onChange={onChange}
                />
                <TextInput
                    isValid={true}
                    label="Precio"
                    name="price"
                    placeholder="Precio de servicio"
                    validationError=""
                    value={editProps.price + ""}
                    onChange={onChange}
                />
                <Categories>
                    <label>Categorias</label>
                    <div className="categories-list">
                        { editProps.category.map((c, index) => (
                            <a onClick={() => deleteCategoryById(c)} key={index}>#{categories.find(c_ => c_.id === c)?.name}</a>
                        ))}
                    </div>
                    <select onChange={(e) => categoriesOnChange(e.target.value)} >
                        { categoryOptions.map((c, index) => (
                           <option key={index} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </Categories>
                <div>
                    <Button 
                        value="Guardar"
                        onClick={saveChange}
                        style={{margin: "10px"}}
                    />
                    <Button 
                        value="Borrar"
                        onClick={deleteService}
                        style={{margin: "10px", backgroundColor: "red"}}
                    />
                </div>
            </EditorContainer>
        );
}

export default ServiceComponent;