import axios from "../../utils/axios";

export const getVideo = async (id) => {
    const response = await axios.get(`/videos/${id}`);
    return response.data;
};
export const increaseLikes = async (videoId, currentLikes) => {
    const response = await axios.patch(`/videos/${videoId}`, { likes: currentLikes + 1 }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    return response.data
}
export const increaseDisLikes = async (videoId, currentDisLikes) => {
    const response = await axios.patch(`/videos/${videoId}`, { unlikes: currentDisLikes + 1 }, {
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    return response.data
}