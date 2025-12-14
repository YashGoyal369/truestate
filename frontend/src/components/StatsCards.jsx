import './StatsCards.css';

const StatsCards = ({ data, total }) => {
    // Calculate basics on frontend for the current page/view, or these should ideally come from backend
    // Since backend returns paginated data, frontend sum is only for current page, which is potentially misleading.
    // However, the prompt says "Simple".
    // I will compute simple sums from the 'data' prop to show *something* active.
    // Ideally we would have a separate /stats endpoint.

    // Let's assume 'data' is the current page data.
    const totalUnits = data.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
    const totalAmount = data.reduce((acc, curr) => acc + (curr.finalAmount || 0), 0);
    const totalDiscount = data.reduce((acc, curr) => acc + (curr.totalAmount - curr.finalAmount || 0), 0);

    return (
        <div className="stats-row">
            <div className="stat-card">
                <div className="stat-header">
                    <span>Total units sold</span>
                    <span className="info-icon">ⓘ</span>
                </div>
                <div className="stat-value">{totalUnits} <span className="stat-sub">(Page)</span></div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <span>Total Amount</span>
                    <span className="info-icon">ⓘ</span>
                </div>
                <div className="stat-value">₹{totalAmount.toLocaleString()} <span className="stat-sub">({data.length} SRs)</span></div>
            </div>
            <div className="stat-card">
                <div className="stat-header">
                    <span>Total Discount</span>
                    <span className="info-icon">ⓘ</span>
                </div>
                <div className="stat-value">₹{totalDiscount.toLocaleString()} <span className="stat-sub">({data.length} SRs)</span></div>
            </div>
        </div>
    );
};

export default StatsCards;
