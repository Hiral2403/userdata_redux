import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../Data"; // Import the default data

// Function to load users from localStorage or use userList
const loadUsers = () => {
    try {
        const savedUsers = localStorage.getItem("users");
        return savedUsers ? JSON.parse(savedUsers) : userList;
    } catch (error) {
        console.error("Error loading users from localStorage:", error);
        return userList;
    }
};

const initialState = loadUsers();

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const newUser = { ...action.payload, id: state.length ? state[state.length - 1].id + 1 : 1 };
            const updatedState = [...state, newUser];
            localStorage.setItem("users", JSON.stringify(updatedState));
            return updatedState;
        },
        updateUser: (state, action) => {
            const updatedState = state.map(user =>
                user.id === action.payload.id ? { ...user, ...action.payload } : user
            );
            localStorage.setItem("users", JSON.stringify(updatedState));
            return updatedState;
        },
        deleteUser: (state, action) => {
            const updatedState = state.filter(user => user.id !== action.payload);
            localStorage.setItem("users", JSON.stringify(updatedState));
            return updatedState;
        },
        resetUsers: () => {
            localStorage.setItem("users", JSON.stringify(userList));
            return userList; // Resets to initial data
        }
    }
});

export const { addUser, updateUser, deleteUser, resetUsers } = userSlice.actions;
export default userSlice.reducer;
