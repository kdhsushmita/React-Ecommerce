import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/productReducer";

const AppContext = createContext();

const initialState = {
    loading: false,
    isError: false,
    product: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {}
}

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const getProducts = async () => {
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(`https://api.pujakaitem.com/api/products`);
            const product = await res.data;
            dispatch({ type: "SET_API_DATA", payload: product });
            console.log(product);
        } catch (error) {
            console.log(error)
            dispatch({ type: "API_ERROR" });
        }
    }
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct })
        }
        catch (e) {
            console.log(e)
            dispatch({ type: "SET_SINGLE_ERROR" });
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    return <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
}

const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };