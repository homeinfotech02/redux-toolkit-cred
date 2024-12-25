import { createSlice } from '@reduxjs/toolkit'

export const credFormSlice = createSlice({
    name: 'credForm',
    initialState: {
        fname: "",
        mobile: "",
        email: "",
        usersData: [],
    },
    reducers: {
        setFormField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },

        addData: (state) => {
            const { fname, mobile, email } = state;
            const newEntry = {
                id: Date.now(), // Generate unique ID
                fname,
                mobile,
                email,
            };
            state.usersData.push(newEntry);
        },

        resetForm: (state) => {
            state.fname = '';
            state.mobile = '';
            state.email = '';
        },

        deleteUserData: (state, action) => {
            state.usersData = state.usersData.filter((item) => item.id !== action.payload);
        },

        editUserData: (state, action) => {
            const { id, fname, mobile, email } = action.payload;
            const userIndex = state.usersData.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.usersData[userIndex] = { id, fname, mobile, email };
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { setFormField, addData, resetForm, deleteUserData, editUserData } = credFormSlice.actions

export default credFormSlice.reducer