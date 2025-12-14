import './TransactionTable.css';

const TransactionTable = ({ data, loading, sortBy, sortOrder, onSort }) => {
    if (loading) {
        return <div className="table-loading">Loading data...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="table-empty">No transactions found.</div>;
    }

    const handleHeaderClick = (field) => {
        const newOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
        onSort(field, newOrder);
    };

    const getSortIcon = (field) => {
        if (sortBy !== field) return null;
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="table-container">
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th onClick={() => handleHeaderClick('_id')}>Transaction ID {getSortIcon('_id')}</th>
                        <th onClick={() => handleHeaderClick('date')}>Date {getSortIcon('date')}</th>
                        <th onClick={() => handleHeaderClick('customerId')}>Customer ID {getSortIcon('customerId')}</th>
                        <th onClick={() => handleHeaderClick('customerName')}>Customer Name {getSortIcon('customerName')}</th>
                        <th onClick={() => handleHeaderClick('phoneNumber')}>Phone Number {getSortIcon('phoneNumber')}</th>
                        <th onClick={() => handleHeaderClick('gender')}>Gender {getSortIcon('gender')}</th>
                        <th onClick={() => handleHeaderClick('age')}>Age {getSortIcon('age')}</th>
                        <th onClick={() => handleHeaderClick('productCategory')}>Product Category {getSortIcon('productCategory')}</th>
                        <th onClick={() => handleHeaderClick('quantity')}>Quantity {getSortIcon('quantity')}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id || Math.random()}>
                            <td className="text-secondary">#{row._id ? row._id.substring(0, 8) : 'N/A'}...</td>
                            <td>{new Date(row.date).toLocaleDateString()}</td>
                            <td className="font-medium">{row.customerId}</td>
                            <td className="font-bold">{row.customerName}</td>
                            <td className="text-secondary">{row.phoneNumber}</td>
                            <td>{row.gender}</td>
                            <td>{row.age}</td>
                            <td className="font-bold">{row.productCategory}</td>
                            <td className="text-center bold-text">{row.quantity ? row.quantity.toString().padStart(2, '0') : '00'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
