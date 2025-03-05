import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/UserReducer";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email) {
            alert("Please fill in all fields");
            return;
        }

        dispatch(addUser({ name, email, image })); // Store Base64 image
        navigate("/");
    };

    return (
        <div className="d-flex w-60 vh-50 justify-content-center align-items-center mt-5">
            <div className="border bg-secondary text-white p-5">
                <h3 className="text_color">Create User</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            className="form-control"
                            placeholder="Enter name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Image Preview */}
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Preview" className="img-thumbnail" width="150" />
                        </div>
                    )}

                    <br />
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );
};

export default Create;
