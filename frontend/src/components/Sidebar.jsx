import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo-box">V</div>
                <div className="logo-text">
                    <span className="brand">Vault</span>
                    <span className="user">Anurag Yadav</span>
                </div>
            </div>

            <nav className="nav-menu">
                <a href="#" className="nav-item">
                    <span className="icon">⊞</span> Dashboard
                </a>
                <a href="#" className="nav-item">
                    <span className="icon">∞</span> Nexus
                </a>
                <a href="#" className="nav-item">
                    <span className="icon">▶</span> Intake
                </a>

                <div className="nav-group">
                    <div className="nav-group-title">Services</div>
                    <a href="#" className="nav-item">Pre-active</a>
                    <a href="#" className="nav-item active">Active</a>
                    <a href="#" className="nav-item">Blocked</a>
                    <a href="#" className="nav-item">Closed</a>
                </div>

                <div className="nav-group">
                    <div className="nav-group-title">Invoices</div>
                    <a href="#" className="nav-item">Proforma Invoices</a>
                    <a href="#" className="nav-item">Final Invoices</a>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
