import { getVideo, increaseLikes, increaseDisLikes } from "./videoAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    video: {},
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
    const video = await getVideo(id);
    return video;
});

//async thunk for likes
export const updateTotalLikes = createAsyncThunk(
    "vidoes/updateTotalLikes",
    async ({ videoId, currentLikes }) => {
        const updatedTotalLikes = await increaseLikes(videoId, currentLikes);
        return updatedTotalLikes
    }
)

//async thunk for dislikes
export const updateTotalDisLikes = createAsyncThunk(
    "vidoes/updateTotalDisLikes",
    async ({ videoId, currentDisLikes }) => {
        const updatedTotalDisLikes = await increaseDisLikes(videoId, currentDisLikes);
        return updatedTotalDisLikes
    }
)

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.video = action.payload;
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.video = {};
                state.isError = true;
                state.error = action.error?.message;
            })
            .addCase(updateTotalLikes.fulfilled, (state) => {
                state.video.likes++
            })
            .addCase(updateTotalDisLikes.fulfilled, (state) => {
                state.video.unlikes++
            })
    },
});

export default videoSlice.reducer;
