import { createContext, useContext } from "react";
import { useProductContext } from "./productcontext";
import { useReducer } from "react";
import { useEffect } from "react";
import reducer from "../Reducer/filterReducer";

//context
const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: false,
    sorting_value: "lowest"
}

//provider
export const FilterContextProvider = ({ children }) => {
    const { product } = useProductContext();
    const [state, dispatch] = useReducer(reducer, initialState);  //add
    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    }
    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    }

    //sorting -- yo function eta context ma defined cha bhane koi katai bata eslai call garna sakcha
    const sorting = (e) => {  //user le select gareko option eta bata select garne
        let userValue = e.target.value;
        dispatch({ type: "GET_SORT_VALUE", payload: userValue });
    }
    useEffect(() => {
        dispatch({ type: "SORTING_PRODUCTS", payload: product })
    }, [state.sorting_value])

    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: product }) //kam assign garne ani product pass garne
    }, [product])

    return (
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting }}>{children}</FilterContext.Provider>
    )
}

//customhook
export const useFilterContext = () => {
    return useContext(FilterContext)
}
