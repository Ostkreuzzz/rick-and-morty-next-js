import { createSlice } from "@reduxjs/toolkit";

interface BookmarkState {
  value: number[];
}

// Use an empty array as the default initial state
const initialState: BookmarkState = {
  value: [],
};

const bookmarkSlice = createSlice({
  name: "bookmarkStore",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarks", JSON.stringify(state.value));
      }
    },
    remove: (state, action) => {
      state.value = state.value.filter((item) => item !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarks", JSON.stringify(state.value));
      }
    },
    deleteAll: (state) => {
      state.value = [];
      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarks", JSON.stringify(state.value));
      }
    },
  },
});

export const { add, remove, deleteAll } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
