import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/productReducer";

const AppContext = createContext();

const initialState = {
    loading: false,
    isError: false,
    product: [],  //ya bhitra complete data add garne
    featureProducts: [], //ya bbhitra feature true bhako data haru matra add garne
    isSingleLoading: false,
    singleProduct: {} //object because euta page ma dekhaune singleProduct
}

//children is app component as it has been wrapped by AppProvider in index.js
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //async and await to handle promises
    const getProducts = async () => {
        //suru ma loading huncha
        dispatch({ type: "SET_LOADING" });
        try {
            const res = await axios.get(`https://api.pujakaitem.com/api/products`);
            const product = await res.data;
            //dispatch type bhanya kaam ani payload bhanya tyo kam garna k data chaincha
            dispatch({ type: "SET_API_DATA", payload: product });
            //dispatch aauna bitikai action method of reducer call huncha ani kaam huncha
        } catch (error) {
            console.log(error)
            //error throw garne
            dispatch({ type: "API_ERROR" });
        }
    }
    const getSingleProduct = async (url) => {
        dispatch({ type: "SET_SINGLE_LOADING" });
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            console.log(singleProduct)
            //singleProduct ma sab single data set bhayo
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
    //yo value bhitra ko data lai yeta app ma jasle ni jati bela ni use garna milcha jata pani
    //...state bhayesi initial states haru sabai aaucha 
    //... -> spread operator
    return <AppContext.Provider value={{ ...state, getSingleProduct }}>{children}</AppContext.Provider>
}
//with the help of useProductContext sabai initial states haru lai gain garera 
//use garna milcha 
const useProductContext = () => {
    return useContext(AppContext);
}

export { AppProvider, AppContext, useProductContext };