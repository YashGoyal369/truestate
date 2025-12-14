import { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange }) => {
    return (
        <div className="filter-panel">
            <div className="filter-row">
                <button className="reset-btn" onClick={() => window.location.reload()}>
                    ⟳
                </button>

                <FilterDropdown
                    label="Customer Region"
                    options={['North', 'South', 'East', 'West', 'Central']}
                    selected={filters.customerRegion}
                    onChange={(val) => onFilterChange('customerRegion', val)}
                />

                <FilterDropdown
                    label="Gender"
                    options={['Male', 'Female', 'Other']}
                    selected={filters.gender}
                    onChange={(val) => onFilterChange('gender', val)}
                />

                <RangeDropdown
                    label="Age Range"
                    min={filters.minAge}
                    max={filters.maxAge}
                    onChange={(min, max) => {
                        onFilterChange('minAge', min);
                        onFilterChange('maxAge', max);
                    }}
                />

                <FilterDropdown
                    label="Product Category"
                    options={['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports']}
                    selected={filters.productCategory}
                    onChange={(val) => onFilterChange('productCategory', val)}
                />

                <FilterDropdown
                    label="Tags"
                    options={['New', 'Sale', 'Premium', 'Basic']}
                    selected={filters.tags}
                    onChange={(val) => onFilterChange('tags', val)}
                />

                <FilterDropdown
                    label="Payment Method"
                    options={['Credit Card', 'Debit Card', 'UPI', 'Cash']}
                    selected={filters.paymentMethod}
                    onChange={(val) => onFilterChange('paymentMethod', val)}
                />

                <DateDropdown
                    startDate={filters.startDate}
                    endDate={filters.endDate}
                    onChange={(start, end) => {
                        onFilterChange('startDate', start);
                        onFilterChange('endDate', end);
                    }}
                />
            </div>

            <div className="sort-row">
                {/* Sorting is handled globally or in table, but design shows 'Sort by' on right? 
              The design shows "Sort by: Customer Name (A-Z)" on top right. 
              We can put it here or better, strictly follow design.
           */}
                <div className="spacer"></div>
                <div className="sort-control">
                    <span>Sort by: </span>
                    <select
                        value={`${filters.sortBy}-${filters.order}`}
                        onChange={(e) => {
                            const [field, order] = e.target.value.split('-');
                            onFilterChange('sortBy', field);
                            onFilterChange('order', order);
                        }}
                    >
                        <option value="customerName-asc">Customer Name (A-Z)</option>
                        <option value="customerName-desc">Customer Name (Z-A)</option>
                        <option value="date-desc">Newest First</option>
                        <option value="date-asc">Oldest First</option>
                        <option value="quantity-desc">Quantity (High-Low)</option>
                        <option value="quantity-asc">Quantity (Low-High)</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

// Sub-components for dropdowns
const FilterDropdown = ({ label, options, selected, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOption = (opt) => {
        let newSelected;
        if (selected.includes(opt)) {
            newSelected = selected.filter(item => item !== opt);
        } else {
            newSelected = [...selected, opt];
        }
        onChange(newSelected);
    };

    return (
        <div className="dropdown-container">
            <button className={`dropdown-trigger ${selected.length > 0 ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {label} {selected.length > 0 && `(${selected.length})`} ▾
            </button>
            {isOpen && (
                <>
                    <div className="dropdown-backdrop" onClick={() => setIsOpen(false)}></div>
                    <div className="dropdown-menu">
                        {options.map(opt => (
                            <div key={opt} className="dropdown-item" onClick={() => toggleOption(opt)}>
                                <input type="checkbox" checked={selected.includes(opt)} readOnly />
                                <span>{opt}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const RangeDropdown = ({ label, min, max, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="dropdown-container">
            <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                {label} ▾
            </button>
            {isOpen && (
                <>
                    <div className="dropdown-backdrop" onClick={() => setIsOpen(false)}></div>
                    <div className="dropdown-menu p-2">
                        <div className="range-inputs">
                            <input
                                type="number"
                                placeholder="Min"
                                value={min}
                                onChange={(e) => onChange(e.target.value, max)}
                            />
                            <span>-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={max}
                                onChange={(e) => onChange(min, e.target.value)}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const DateDropdown = ({ startDate, endDate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="dropdown-container">
            <button className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
                Date ▾
            </button>
            {isOpen && (
                <>
                    <div className="dropdown-backdrop" onClick={() => setIsOpen(false)}></div>
                    <div className="dropdown-menu p-2" style={{ width: '240px' }}>
                        <div className="date-inputs">
                            <label>Start From</label>
                            <input type="date" value={startDate} onChange={e => onChange(e.target.value, endDate)} />
                            <label>End To</label>
                            <input type="date" value={endDate} onChange={e => onChange(startDate, e.target.value)} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default FilterPanel;
