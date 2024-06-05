import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
// import { Prices } from '../components/Routes/Prices';
import { Prices } from './../../components/Routes/Prices';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    // get all products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts();
        else filterProduct();
    }, [checked, radio]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/product/product-filters', { checked, radio })
            setProducts(data?.products);
        } catch (error) {
            console.log(error)
        }
    }

    // get all category
    const getAllCategory = async () => {
        try {

            const { data } = await axios.get('/category/get-category')
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotal()
    }, [])

    // get total
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };


    //load more
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (page === 1) return;
        loadMore();
        // eslint-disable-next-line
    }, [page]);

    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    }

    return (
        <Layout title={"All Products - Best Offers"}>
            <div className="row">
                <div className="col-md-2">
                    {/* category filter */}
                    <h4 className="text-center">Filter By Category</h4>
                    <div className="d-flex flex-wrap">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c?.name}
                            </Checkbox>
                        ))}
                    </div>

                    {/* price filter */}
                    <h4 className="text-center mt-4">Filter By Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p?.array}>
                                        {p?.name}
                                    </Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                </div>
                <div className="col-md-9">
                    {JSON.stringify(radio, null, 4)}
                    <h1 className='text-center'>All Products</h1>
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
                                    <p className="card-text">{p?.description}</p>
                                    <p className="card-text">$ {p?.price}</p>
                                    <button className="btn btn-primary ms-1">More Details</button>
                                    <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button
                                className="btn btn-warning"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1);
                                }}
                            >
                                {loading ? "Loading ..." : "Loadmore"}
                            </button>
                        )}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
