import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    closeSidebar: (state) => {
      state.isCollapsed = true;
    },
  },
});

export const { toggleSidebar, closeSidebar } = navSlice.actions;

export default navSlice.reducer;
