import axios from "../../utils/axios";

export const getVideos = async (tags, search, pageNumber, perPageVideos, filterByAuthor) => {
    let queryString = "";

    if (tags?.length > 0) {
        pageNumber = 1;
        queryString += tags.map((tag) => `tags_like=${tag}`).join("&");
    }

    if (search !== "") {
        pageNumber = 1;
        queryString += `&q=${search}`;
    }

    if (filterByAuthor !== '') {
        pageNumber = 1;
        queryString = `author=${filterByAuthor}`;
    }

    const response = await axios.get(`/videos/?${queryString}&_limit=${perPageVideos}&_page=${pageNumber}`);

    return response.data;
};
