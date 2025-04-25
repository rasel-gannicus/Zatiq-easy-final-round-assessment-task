/* eslint-disable prefer-const */
interface PaginationProps {
    currentPage: number;
    lastPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, lastPage, onPageChange }: PaginationProps) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = 1;
        let endPage = lastPage;

        if (lastPage > maxVisiblePages) {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= lastPage) {
                startPage = lastPage - 4;
                endPage = lastPage;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 cursor-pointer py-1 mx-1 rounded ${
                        currentPage === i
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