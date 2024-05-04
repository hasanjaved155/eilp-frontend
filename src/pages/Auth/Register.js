import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:8080/auth/register', { name, email, password, phone, address })
            if (res.data.success) {
                alert(res.data.message);
                navigate('/login')
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            alert.error("something went wrong")
        }
    }

    return (
        <Layout title={"Register"}>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>REGISTER NOW</h4>
                    <div className="mb-3">
                        <input type="text" placeholder='Enter your Name' value={name} className="form-control" id="exampleInputEmail1" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="email" placeholder='Email id' value={email} className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
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

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>

            </div>
        </Layout>
    )
}

export default Register
