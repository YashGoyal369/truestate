import './Header.css';

const Header = ({ onSearch }) => {
    return (
        <header className="header">
            <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    placeholder="Name, Phone no."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <div className="header-actions">
                {/* User profile or other icons could go here */}
            </div>
        </header>
    );
};

export default Header;
