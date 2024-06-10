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


// import React, { useState, useEffect } from 'react'
// import Layout from './../components/Layout/Layout';
// import { useCart } from '../context/cart';
// import { useAuth } from '../context/auth';
// import { useNavigate } from 'react-router-dom';

// import DropIn from "braintree-web-drop-in-react";
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const CartPage = () => {
//     const [auth, setAuth] = useAuth();
//     const [cart, setCart] = useCart();
//     const [clientToken, setClientToken] = useState("");
//     const [instance, setInstance] = useState("");
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate()

//     const totalPrize = () => {
//         try {

//             let total = 0;
//             cart?.map((item) => {
//                 total = total + item?.price
//             });
//             return total.toLocaleString('en-US', {
//                 style: 'currency',
//                 currency: "USD",
//             })

//         } catch (error) {
//             console.log(error)
//         }
//     }


//     const removeCartItem = (pid) => {
//         try {

//             let myCart = [...cart]
//             let index = myCart.findIndex(item => item._id === pid)
//             myCart.splice(index, 1);
//             setCart(myCart)
//             localStorage.setItem('cart', JSON.stringify(myCart));

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     //get payment gateway token
//     const getToken = async () => {
//         try {
//             const { data } = await axios.get('/product/braintree/token')
//             setClientToken(data?.clientToken)

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         getToken()
//     }, [auth?.token])

//     const handlePayment = async () => {
//         try {
//             setLoading(true)
//             const { nonce } = await instance.requestPaymentMethod();
//             const { data } = await axios.post('/product/braintree/payment', { cart, nonce })
//             setLoading(false)
//             localStorage.removeItem('cart');
//             setCart([]);
//             navigate('/dashboard/user/orders')
//             toast.success('payment successfully completed')
//         } catch (error) {
//             console.log(error)
//             setLoading(false)
//         }

//     }

//     return (
//         <Layout>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <h1 className="text-center bg-light p-2 mb-1">
//                             {`Hello ${auth?.token && auth?.user?.name}`}
//                         </h1>
//                         <h4 className="text-center">
//                             {cart?.length ?
//                                 `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login To Checkout"}`
//                                 : "your Cart Is Empty"}
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-8">
//                         {cart?.map((p) => (
//                             <div className="row mb-2 p-3 card flex-row">
//                                 <div className='col-md-4'>
//                                     <img
//                                         src={p?.photo}
//                                         className="card-img-top"
//                                         alt={p?.name}
//                                         width='100px'
//                                         height={'100px'}
//                                     />
//                                 </div>
//                                 <div className='col-md-8'>
//                                     <p>{p?.name}</p>
//                                     <p>Price : {p.price}</p>
//                                     <button className='btn btn-danger' onClick={() => { removeCartItem(p._id) }}>Remove</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div className="col-md-4 text-center">
//                         <h2>Cart Summary</h2>
//                         <p>Checkout | Payment</p>
//                         <hr />
//                         <h4>Total : {totalPrize()}</h4>

//                         {auth?.user?.address ? (
//                             <>
//                                 <div className="mb-3">
//                                     <h4>Current Address</h4>
//                                     <h5>{auth?.user?.address}</h5>
//                                     <button className='btn btn-outline-warning'
//                                         onClick={() => navigate('/dashboard/user/profile')}>
//                                         Update Address
//                                     </button>
//                                 </div>
//                             </>
//                         ) : (

//                             <div className="mb-3">
//                                 {auth?.token ? (
//                                     <button className='btn btn-outline-warning'
//                                         onClick={() => navigate('/dashboard/user/profile')}>
//                                         Update Address
//                                     </button>
//                                 ) : (
//                                     <button className='btn btn-outline-warning'
//                                         onClick={() => navigate('/login', {
//                                             state: '/cart',
//                                         })}>
//                                         Please Login To Checkout
//                                     </button>
//                                 )}
//                             </div>
//                         )}

//                         <div className="mt-2">
//                             {!clientToken || !cart?.length ? ("") : (
//                                 <>
//                                     <DropIn
//                                         options={{
//                                             authorization: clientToken,
//                                             paypal: {
//                                                 flow: 'valut'
//                                             }
//                                         }}

//                                         onInstance={instanse => setInstance(instanse)}
//                                     />
//                                     <button className='btn btn-primary' onClick={handlePayment}
//                                         disabled={loading || !instance || !auth?.user?.address}>
//                                         {loading ? "Processing ....." : "Make Payment"}
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default CartPage

