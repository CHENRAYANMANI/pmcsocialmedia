import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "pmc",
  initialState: {
    Posts: [
      {
        id: 1,
        title: "Mani G",
        date: "0054 29, 2023 3:54:14 PM",
        body: "my father",
      },
      {
        id: 2,
        title: "Cricket 2023",
        date: "0055 29, 2023 3:55:25 PM",
        body: "Cricket WC 2023 One Day World Cup",
      },
      {
        id: 3,
        title: "ssdd",
        date: "0034 30, 2023 3:34:09 PM",
        body: "ssdvFSAD",
      },
    ],
  },
  reducers: {
    SetPosts: (state, action) => {
      state.Posts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetPosts } = userSlice.actions;

export default userSlice.reducer;
