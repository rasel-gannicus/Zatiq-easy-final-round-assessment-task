/* eslint-disable prefer-const */
interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
    const renderPageNumbers = () => {
        const pages = [];
        const totalPages = Math.min(5, lastPage); // Only show maximum 5 pages

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 cursor-pointer py-1 mx-1 rounded ${currentPage === i
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 cursor-pointer rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;