const productReducer = (state, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "API_ERROR":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        case "SET_API_DATA":
            const featureData = action.payload.filter((curElem) => {
                return curElem.featured === true;
            })

            return {
                ...state,
                isLoading: false,
                product: action.payload,  //product paila empty thyo  initial state ma
                //aba sabai data haru add bhayo action.payload le garda
                //with the help of reducer func product ma sab api ko data aaisakyo
                featureProducts: featureData   //aba featureProducts ma ni filtered out bhayera aako featureData add hune bhayo 
            }
            
        case "SET_SINGLE_LOADING":
            return {
                ...state,
                isSingleLoading: false,
            }
        case "SET_SINGLE_PRODUCT":
            return {
                ...state,
                isSingleLoading: false,
                singleProduct: action.payload,
            }
        case "SET_SINGLE_ERROR":
            return {
                ...state,
                isSingleLoading: false,
                isError: true
            }
        default:
            return state;
    }
    return state;

}
export default productReducer;