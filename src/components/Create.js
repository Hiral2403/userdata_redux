import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../redux/UserReducer';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null); 
    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(addUser({
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name,
            email,
            image: image ? image.name : null 
        }));

        navigate('/');
    };

    return (
        <div className='d-flex vh-50 justify-content-center align-item-center mt-5'>
            <div className='w-90 border bg-secondary text-white p-5'>
                <h3 className='text_color'>Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control form-signin' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' className='form-control form-signin' placeholder='Enter email' onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='image'>Upload Image:</label>
                        <input type='file' name='image' className='form-control' accept='image/*' onChange={handleImageChange} />
                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Preview" className="img-thumbnail" width="150" />
                        </div>
                    )}

                    <br />
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Create;
