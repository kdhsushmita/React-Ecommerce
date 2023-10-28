import React from 'react'
import { useFilterContext } from '../Context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
    const { filter_products, grid_view } = useFilterContext();  //sab data eta aairacha
    if (grid_view === true) {
        return <GridView products={filter_products} />
    }
    if (grid_view === false) {
        return <ListView products={filter_products} />
    }
    return (
        <div>
            productlist
        </div>
    )
}

export default ProductList
