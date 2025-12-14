import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import StatsCards from '../components/StatsCards';
import TransactionTable from '../components/TransactionTable';
import Pagination from '../components/Pagination';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    // Helper to get initial state from URL
    const getInitialFilters = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            search: params.get('search') || '',
            customerRegion: params.get('customerRegion') ? params.get('customerRegion').split(',') : [],
            gender: params.get('gender') ? params.get('gender').split(',') : [],
            minAge: params.get('minAge') || '',
            maxAge: params.get('maxAge') || '',
            productCategory: params.get('productCategory') ? params.get('productCategory').split(',') : [],
            tags: params.get('tags') ? params.get('tags').split(',') : [],
            paymentMethod: params.get('paymentMethod') ? params.get('paymentMethod').split(',') : [],
            startDate: params.get('startDate') || '',
            endDate: params.get('endDate') || '',
            sortBy: params.get('sortBy') || 'date',
            order: params.get('order') || 'desc',
        };
    };

    const [filters, setFilters] = useState(getInitialFilters);

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.customerRegion.length) params.set('customerRegion', filters.customerRegion.join(','));
        if (filters.gender.length) params.set('gender', filters.gender.join(','));
        if (filters.minAge) params.set('minAge', filters.minAge);
        if (filters.maxAge) params.set('maxAge', filters.maxAge);
        if (filters.productCategory.length) params.set('productCategory', filters.productCategory.join(','));
        if (filters.tags.length) params.set('tags', filters.tags.join(','));
        if (filters.paymentMethod.length) params.set('paymentMethod', filters.paymentMethod.join(','));
        if (filters.startDate) params.set('startDate', filters.startDate);
        if (filters.endDate) params.set('endDate', filters.endDate);
        params.set('sortBy', filters.sortBy);
        params.set('order', filters.order);
        params.set('page', pagination.page);

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    }, [filters, pagination.page]);

    const fetchSales = async () => {
        setLoading(true);
        try {
            const params = {
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
                // Arrays are already joined in the state-to-url logic but Axios needs them handled too.
                // If we pass an array to Axios params, it serializes differently (bracket format []).
                // Our backend expects comma separated strings or multiple keys?
                // Service code: `const regions = Array.isArray(customerRegion) ? customerRegion : customerRegion.split(',');`
                // So it handles both.
                customerRegion: filters.customerRegion.join(','),
                gender: filters.gender.join(','),
                productCategory: filters.productCategory.join(','),
                tags: filters.tags.join(','),
                paymentMethod: filters.paymentMethod.join(','),
            };

            const response = await api.get('/sales', { params });
            setSalesData(response.data.data);
            setPagination(response.data.pagination);
        } catch (error) {
            console.error('Error fetching sales:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSales();
        // Debounce search could be added here or in the SearchBar component
    }, [filters, pagination.page]);

    // Handlers for state updates...
    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 on filter change
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <Header onSearch={(val) => handleFilterChange('search', val)} />
                <div className="dashboard-content">
                    <div className="title-row">
                        <h1>Sales Management System</h1>
                    </div>

                    <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

                    <StatsCards data={salesData} total={pagination.total} /> {/* Aggregate frontend or fetch separate stats if provided */}

                    <TransactionTable
                        data={salesData}
                        loading={loading}
                        sortBy={filters.sortBy}
                        sortOrder={filters.order}
                        onSort={(field, order) => {
                            setFilters(prev => ({ ...prev, sortBy: field, order: order }));
                        }}
                    />

                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
