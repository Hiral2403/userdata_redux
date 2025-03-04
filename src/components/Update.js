import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/UserReducer';

const Update = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users);
    const existingUser = users.find((user) => user.id == id);

    const [uname, setName] = useState(existingUser ? existingUser.name : '');
    const [uemail, setEmail] = useState(existingUser ? existingUser.email : '');
    const [image, setImage] = useState(existingUser ? existingUser.image : null);
    const [preview, setPreview] = useState(existingUser ? existingUser.image : null);

    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result);
            };
        }
    };

    const handleUpdate = (event) => {
        event.preventDefault();

        dispatch(
            updateUser({
                id: Number(id),
                name: uname,
                email: uemail,
                image: image || existingUser.image  // Use new Base64 image or keep the existing one
            })
        );

        navigate('/');
    };

    return (
        <div className='d-flex w-60 vh-50 justify-content-center align-items-center mt-5'>
            <div className='border bg-secondary text-white p-5'>
                <h3 className='text_color'>Update User</h3>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={uname}
                            className='form-control'
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={uemail}
                            className='form-control'
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='image'>Update Image:</label>
                        <input
                            type='file'
                            name='image'
                            className='form-control'
                            accept='image/*'
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Show Image Preview (Existing/New) */}
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Preview" className="img-thumbnail" width="150" />
                        </div>
                    )}

                    <br />
                    <button className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
