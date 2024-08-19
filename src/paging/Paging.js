import React from "react";
import Pagination from "react-js-pagination";

const Paging = (activePage, totalItemsCount, itemsCountPerPage, handlePageChange) => {
    return (
        <div className="flex justify-center mt-6">
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                prevPageText={<span className="px-3 py-1.5 text-gray-600 bg-gray-200 rounded-l-md">{"<"}</span>}
                nextPageText={<span className="px-3 py-1.5 text-gray-600 bg-gray-200 rounded-r-md">{">"}</span>}
                onChange={handlePageChange}
                itemClass="mx-1"
                linkClass="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    );
};

export default Paging;