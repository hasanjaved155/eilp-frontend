import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';

const Profile = () => {
    const [auth] = useAuth();
    return (
        <Layout title={'All Orders'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h3>{auth?.user?.name}</h3>
                        <h3>{auth?.user?.email}</h3>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
