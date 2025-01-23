import { createSlice } from '@reduxjs/toolkit'

export const credFormSlice = createSlice({
    name: 'credForm',
    initialState: {
        fname: "",
        mobile: "",
        email: "",
        password: "",
        cPassword: "",
        gender: "",
        hobbies: [],
        usersData: [],
    },
    reducers: {
        setFormField: (state, action) => {
            const { field, value } = action.payload;
            if (field === "hobbies") {
                if (state.hobbies.includes(value)) {
                    // Remove hobby if already selected
                    state.hobbies = state.hobbies.filter((hobby) => hobby !== value);
                } else {
                    // Add hobby if not already selected
                    state.hobbies.push(value);
                }
            } else {
                state[field] = value;
            }
        },

        addData: (state) => {
            const { fname, mobile, email, password, gender, hobbies } = state;
            const newEntry = {
                id: Date.now(), // Generate unique ID
                fname,
                mobile,
                email,
                password,
                gender,
                hobbies
            };
            state.usersData.push(newEntry);
        },

        resetForm: (state) => {
            state.fname = '';
            state.mobile = '';
            state.email = '';
            state.password = '';
            state.cPassword = '';
            state.gender = '';
            state.hobbies = [];
        },

        deleteUserData: (state, action) => {
            state.usersData = state.usersData.filter((item) => item.id !== action.payload);
        },

        editUserData: (state, action) => {
            const { id, fname, mobile, email, password, gender, hobbies } = action.payload;
            const userIndex = state.usersData.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.usersData[userIndex] = { id, fname, mobile, email, password, gender, hobbies :hobbies || [] };
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { setFormField, addData, resetForm, deleteUserData, editUserData } = credFormSlice.actions

export default credFormSlice.reducer