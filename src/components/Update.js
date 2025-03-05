import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../redux/UserReducer';

const Update = () => {
    const { id } = useParams();
    const users = useSelector((state) => state.users);
    const existingUser = users.find((user) => user.id == id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle case where user is not found
    useEffect(() => {
        if (!existingUser) {
            alert("User not found!");
            navigate('/');
        }
    }, [existingUser, navigate]);

    const [uname, setName] = useState(existingUser.name || '');
    const [uemail, setEmail] = useState(existingUser.email || '');
    const [image, setImage] = useState(existingUser.image || null);
    const [preview, setPreview] = useState(existingUser.image || null);

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

        if (!uname.trim() || !uemail.trim()) {
            alert("Please fill in all fields.");
            return;
        }

        dispatch(
            updateUser({
                id: Number(id),
                name: uname,
                email: uemail,
                image: image || existingUser.image  // Retain existing image if no new one is selected
            })
        );

        navigate('/');
    };

    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className='border bg-secondary text-white p-5 w-50'>
                <h3 className='text_color mb-3 text-center'>Update User</h3>
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                    <div className="mb-3">
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
                        <div className="text-center mt-3">
                            <img src={preview} alt="Preview" className="img-thumbnail" width="150" />
                        </div>
                    )}

                    <br />
                    <button className='btn btn-primary w-100'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;
