import React, { useEffect, useState } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

const Products = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/product/get-product');
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Products List</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p) => (
                            <Link key={p?._id} to={`/dashboard/admin/product/${p?.slug}`} className='product-link'>
                                <div className="card m-2" style={{ width: '18rem' }}>
                                    <img
                                        src={p?.photo}
                                        className="card-img-top"
                                        alt={p?.name}
                                        style={{ height: "13rem", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p?.name}</h5>
                                        <p className="card-text">{p?.description}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Products;
