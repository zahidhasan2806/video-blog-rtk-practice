const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tags: [],
    search: "",
    filterByAuthor: "",
    reset: false
};

const filterSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            state.tags.push(action.payload);
        },
        tagRemoved: (state, action) => {
            const indexToRemove = state.tags.indexOf(action.payload);

            if (indexToRemove !== -1) {
                state.tags.splice(indexToRemove, 1);
            }
        },
        searched: (state, action) => {
            state.search = action.payload;
            state.filterByAuthor = "";
            state.tags = [];
            state.reset = false
        },
        filterByAuthor: (state, action) => {
            state.filterByAuthor = action.payload;
            state.search = "";
            state.tags = [];
            state.reset = false
        },
        resetFilters: (state) => {
            state.reset = true
            state.filterByAuthor = "";
            state.search = "";
            state.tags = [];
        },
    },
});

export default filterSlice.reducer;
export const { tagSelected, tagRemoved, searched, filterByAuthor, resetFilters } = filterSlice.actions;
