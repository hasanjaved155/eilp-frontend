import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (params?.slug) getProductByCat();
    }, [params?.slug])

    const getProductByCat = async () => {
        try {

            const { data } = await axios.get(`/product/product-category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category);

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container mt-3">
                <h4 className="text-center">
                    Category - {category?.name}
                </h4>
                <h6 className="text-center">
                    {products?.length} results found
                </h6>
                <div className="row">
                    <div className='col-md-9 offset-1'>
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (

                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img
                                        src={p?.photo}
                                        className="card-img-top"
                                        alt={p?.name}
                                        style={{ height: "13rem", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p?.name}</h5>
                                        <p className="card-text">{p?.description.substring(0, 30)}</p>
                                        <p className="card-text">$ {p?.price}</p>
                                        <button className="btn btn-primary ms-1"
                                            onClick={() => navigate(`/product/${p?.slug}`)}>
                                            More Details
                                        </button>
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
