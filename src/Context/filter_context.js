import { createContext, useContext } from "react";
import { useProductContext } from "./productcontext";
import { useReducer } from "react";
import { useEffect } from "react";
import reducer from "../Reducer/filterReducer";

//productContext ma initialState ma product ma sab api bata product ko data rakhisakyo
//ani aba filterContext ma tyo value access garne

//create a context
const FilterContext = createContext();

const initialState = {
    filter_products: [],  //esma ni sab data cha, esma change hudai search sorting anusar kam bhayo 
    all_products: [], //esma ni sab data cha , esma for categories colors anusar data dekhauna
    grid_view: true,  //grid view ra list view ko lagi
    sorting_value: "lowest",  //sort garna ko lagi ani by default lowest rakne
    filters: {
        text: "",
        category: "all", //by default all huncha
        company: "all",
        color: "all"
    },
}

//provider
export const FilterContextProvider = ({ children }) => {
    //arko context bata custom hooks ko help le use garya ani 
    //eslai state variable ma add garne
    const { product } = useProductContext(); //yo products ko data filter_products ma add garne ho
    const [state, dispatch] = useReducer(reducer, initialState);  //add
    //these 2 functions for setting grid and list view
    const setGridView = () => {
        //yo dispatch type le uta filterReducer ko action trigger garcha 
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

    const updateFilterValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } })
        //search garera result dekhauna suruma yo ani tespachi tala ko useeffect bhitra ko
    }

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" })
        dispatch({ type: "SORTING_PRODUCTS" })
    }, [product, state.sorting_value, state.filters])
    //jaba jaba sorting value change huncha yo useeffect chalcha
    //mathi sorting ma kun option leko cha get garne ani useEffect call garne--state.sorting_value

    //to load product for grid and list view
    useEffect(() => {
        dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: product }) //kam assign garne ani product pass garne
        //productcontext bata product liney ani teslai mathi ko filter_products ma add garne
    }, [product])

    return (
        //...state bhanya sab initalstates haru pass garya
        //children bhanya wrap garisakesi ko app component
        <FilterContext.Provider value={{ ...state, setGridView, setListView, sorting, updateFilterValue }}>{children}</FilterContext.Provider>
    )
}

//customhook
export const useFilterContext = () => {
    return useContext(FilterContext)
}
