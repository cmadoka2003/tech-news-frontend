import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const bookmarkSlide = createSlice({
    name: "bookmarks",

    initialState,
    reducers: {
        addArticlesToStore: (state, action) => {
            state.value.push(action.payload)
        },

        deleteArticleToStore: (state, action) => {
            state.value = state.value.filter(
                (bookmark) => bookmark.title !== action.payload
            )
        },
        removeAllBookmarks: (state, action) => {
            state.value = []
        }
    }
})

export const { addArticlesToStore, deleteArticleToStore, removeAllBookmarks } = bookmarkSlide.actions
export default bookmarkSlide.reducer