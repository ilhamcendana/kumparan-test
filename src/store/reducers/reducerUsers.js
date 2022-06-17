import { createSlice } from '@reduxjs/toolkit';

export const Users = createSlice({
  name: 'users',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment } = Users.actions

export default Users.reducer;

// NO USE OF REDUX BUT AT LEAST I CAN SHOW YOU HOW I SET IT UP