const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload]
            }
        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true
            }
        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false
            }
        case "GET_SORT_VALUE":
            return {
                ...state,
                sorting_value: action.payload
            }
        case "SORTING_PRODUCTS":
            let newSortData;
            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];
            const sortingProducts = (a, b) => {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }
                if (sorting_value === "highest") {
                    return b.price - a.price;
                }
                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name)
                }
                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name)
                }
            }
            newSortData = tempSortProduct.sort(sortingProducts)
            return {
                ...state,
                filter_products: newSortData
            }
        case "UPDATE_FILTERS_VALUE":
            const { name, value } = action.payload; //name ra value leko
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [name]: value   //name --- text ani value---user le j lekhya
                }
            }
        case "FILTER_PRODUCTS":
            let { all_products } = state;
            //all product bitra api ko sab data cha
            let tempFilterProduct = [...all_products];
            const { text, category, company, color } = state.filters;
            //text ko value change huda yo if chalcha
            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    //name ko basis ma search garne bhaye name leko
                    return curElem.name.toLowerCase().includes(text)
                })
            }
            //category ko value change huda yo chalcha
            if (category !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.category === category
                })
            }
            if (company !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
                );
            }
            if (color !== "all") {  //all nahuda matra chalaune natra all huda kei nagrne
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.colors.includes(color)
                    //total color bhanya --> colors ho 
                    //ani user le select garya color chai color variable ho 
                    //colors ma user ko color cha ki chaina bhanera ek ek gardai include le check garcha 
                )
            }
            return {
                ...state,
                filter_products: tempFilterProduct
                //ani filtered data mathi bata filter method use 
                //bhayera filter_products ma aaucha
            }
        default:
            return state;
    }
}

export default filterReducer
