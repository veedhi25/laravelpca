import React from 'react';

interface TablePaginationProps {
    totalEntries: number;
    entriesPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ totalEntries, entriesPerPage, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalEntries / entriesPerPage);

    return (
        <div className="flex justify-center my-4">
            <button
                className="mx-1 px-3 py-2 bg-blue-500 text-white rounded"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
                Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
                <button
                    key={idx}
                    className={`mx-1 px-3 py-2 ${idx + 1 === currentPage ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded`}
                    onClick={() => setCurrentPage(idx + 1)}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                className="mx-1 px-3 py-2 bg-blue-500 text-white rounded"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
                Next
            </button>
        </div>
    );
}

export default TablePagination;
