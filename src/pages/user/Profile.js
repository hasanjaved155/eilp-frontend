import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import axios from 'axios';

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user
        setName(name);
        setPhone(phone);
        setEmail(email)
        setAddress(address)
    }, [auth?.user])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.put('/auth/profile', { name, email, password, phone, address })

            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = JSON.parse(localStorage.getItem('auth'))
                ls.user = data?.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success("Profile Updated Successfully")
            }
        } catch (error) {
            toast.error("something went wrong")
        }
    }
    return (
        <Layout title={'All Orders'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className='form-container'>
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <input type="text" placeholder='Enter your Name' value={name} className="form-control" id="exampleInputEmail1" onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" placeholder='Email id' value={email} className="form-control" id="exampleInputEmail1" disabled onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" placeholder='Phone No' value={phone} className="form-control" id="exampleInputEmail1" onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="password" placeholder='Password' value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" placeholder='Address' value={address} className="form-control" id="exampleInputEmail1" onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
