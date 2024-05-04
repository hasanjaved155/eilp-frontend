import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import '../../styles/AuthStyles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post('http://localhost:8080/auth/login', { email, password })
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                alert(res.data.message);
                navigate('/')
            } else {
                alert(res.data.message);
            }

        } catch (error) {
            alert.error("something went wrong")
        }
    }
    return (
        <Layout title={"Login"}>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>LOGIN NOW</h4>

                    <div className="mb-3">
                        <input type="email" placeholder='Email id' value={email} className="form-control" id="exampleInputEmail1" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <input type="password" placeholder='Password' value={password} className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} />
                    </div>


                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}

export default Login
