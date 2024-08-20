// src/components/Paging.js
import React from 'react';
import Pagination from 'react-js-pagination';

const Paging = ({ activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onPageChange }) => {
    return (
        <div className="pagination-container">
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onChange={onPageChange}
            />
        </div>
    );
};

export default Paging;
