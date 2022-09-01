import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage } from "../../features/pagination/paginationSlice";
import PageSelected from "./PageSelected";

export default function Pagination() {
    const [videos, setVideos] = useState([]);
    const dispatch = useDispatch();

    const { pageNumber, perPageVideos } = useSelector(
        (state) => state.pagination
    );
    const handlePageChange = (number) => {
        dispatch(changePage(number))
    };

    const totalPages = Math.ceil(videos.length / perPageVideos);

    let paginationArray = [];

    for (let i = 1; i <= totalPages; i++) {
        paginationArray.push(i)
    }

    useEffect(() => {
        fetch("http://localhost:9000/videos")
            .then(res => res.json())
            .then(data => setVideos(data));
    }, [videos]);

    return (
        <section className="pt-12">
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
                {
                    paginationArray.map((currentPageNumber, index) =>
                    (<PageSelected key={index} pageNumber={pageNumber}
                        currentPageNumber={currentPageNumber}
                        handlePageChange={handlePageChange} />))
                }
            </div>
        </section>
    );
}
