import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';
import AdminMenu from './../../components/Layout/AdminMenu';

const AdminOrders = () => {
    const [status, setStaus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"])
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get('/auth/all-orders')
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders()
    }, [auth?.token])

    return (
        <Layout title={'Admin Orders'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Date</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.creteAt).fromNow()}</td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {o?.products?.map((p) => (
                                                <div className="row mb-2 p-3 card flex-row">
                                                    <div className='col-md-4'>
                                                        <img
                                                            src={p?.photo}
                                                            className="card-img-top"
                                                            alt={p?.name}
                                                            width='100px'
                                                            height={'100px'}
                                                        />
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <p>{p?.name}</p>
                                                        <p>Price : {p.price}</p>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders
