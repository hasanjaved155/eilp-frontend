import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Option } = Select

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [photo, setPhoto] = useState({});


    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post("/product/upload", formData);
            //console.log(data);
            setPhoto({
                url: data.url,
                public_id: data.public_id,
            });

            console.log("Uploaded", data);
        } catch (error) {
            console.log(error.message);
        }
    };

    // get all category
    const getAllCategory = async () => {
        try {

            const { data } = await axios.get('/category/get-category')
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting category')
        }

    }

    useEffect(() => {
        getAllCategory();
    }, [])

    // create product
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/product/create-product', {
                name,
                description,
                price,
                quantity,
                photo: photo?.url,
                category,
                shipping
            }
            );
            if (data?.success) {
                toast.success(data?.message);
                navigate("/dashboard/admin/products");
            } else {
                toast.success("product created successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            toast.error("Something went wrong in creating product")
        }
    }

    return (
        <Layout title={'Create Product'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select
                                bordered={false}
                                placeholder="Select a category"
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                            >
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            {/* <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    Upload photo

                                </label>
                                <input type="file" name='photo' accept='image/*'
                                    onChange={handleImage}
                                    placeholder='upload photo'
                                />

                                {photo?.url && (
                                    <img src={photo?.url} className="img-fluid rounded"
                                        style={{ width: '7rem', height: '7rem', objectFit: 'cover' }} />
                                )}

                            </div> */}

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    name="photo"

                                    className="form-control"
                                    placeholder="Upload Image"
                                    onChange={handleImage}
                                // required
                                />
                                {photo?.url && (
                                    <img src={photo.url} className="img-thumbnail mt-3"
                                        style={{ width: '7rem', height: '7rem' }} />
                                )}
                            </div>

                            <div className="mb-3">
                                <input type="text"
                                    value={name}
                                    placeholder='Write a name'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <textarea type="text"
                                    value={description}
                                    placeholder='Write a description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={price}
                                    placeholder='Write a price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number"
                                    value={quantity}
                                    placeholder='Write a quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select
                                    bordered={false}
                                    placeholder="select shipping"
                                    size='large'
                                    showSearch
                                    className='form-select mb-3'
                                    onChange={(value) => { setShipping(value) }}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className='btn btn-primary' onClick={handleCreate}>
                                    CREATE PRODUCT
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
