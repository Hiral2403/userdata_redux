import { createSlice } from "@reduxjs/toolkit";

const defaultUsers = [
    { id: 1, name: "John Doe", email: "johndoe@gmail.com", image: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: 2, name: "Jane Smith", email: "janesmith@gmail.com", image: "https://randomuser.me/api/portraits/women/1.jpg" },
    { id: 3, name: "Michael Brown", email: "michaelbrown@gmail.com", image: "https://randomuser.me/api/portraits/men/2.jpg" },
];

const initialState = JSON.parse(localStorage.getItem("users")) || defaultUsers;

const userSlice = createSlice({
    name: "users",
    initialState,      
    reducers: {
        addUser: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state)); 
        },
        updateUser: (state, action) => {
            const updatedState = state.map(user =>
                user.id == action.payload.id ? { ...user, ...action.payload } : user
            );

            localStorage.setItem("users", JSON.stringify(updatedState)); 
            return updatedState; 
        },
        deleteUser: (state, action) => {
            const updatedState = state.filter(user => user.id !== action.payload);
            localStorage.setItem("users", JSON.stringify(updatedState));
            return updatedState;
        }
    }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
