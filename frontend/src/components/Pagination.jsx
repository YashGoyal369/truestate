import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // Simple logic to show a range of pages
    let pages = [];
    // For simplicity, just show all or a small window. 
    // Design shows: 1 2 3 4 5 6 with black active state
    // I will show max 7 pages around current
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - 3 && i > 1) ||
            (i === currentPage + 3 && i < totalPages)
        ) {
            pages.push('...');
        }
    }

    // Dedup pages
    const uniquePages = [...new Set(pages)];

    return (
        <div className="pagination-container">
            {uniquePages.map((p, idx) => (
                <button
                    key={idx}
                    className={`page-btn ${p === currentPage ? 'active' : ''}`}
                    onClick={() => typeof p === 'number' && onPageChange(p)}
                    disabled={p === '...'}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
