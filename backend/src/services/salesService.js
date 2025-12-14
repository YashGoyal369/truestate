const Sale = require('../models/Sale');

const getSales = async (queryParams) => {
    const {
        search,
        customerRegion,
        gender,
        minAge,
        maxAge,
        productCategory,
        tags,
        paymentMethod,
        startDate,
        endDate,
        sortBy = 'date',
        order = 'desc',
        page = 1,
        limit = 10,
    } = queryParams;

    const matchStage = {};

    // 1. Search (Name or Phone) - DB Keys: 'Customer Name', 'Phone Number'
    if (search) {
        // Simple regex check for name.
        const searchRegex = new RegExp(search, 'i');

        // Check if search is numeric to attempt Phone Number match
        const isNumeric = !isNaN(Number(search));

        if (isNumeric) {
            matchStage.$or = [
                { 'Customer Name': searchRegex },
                { 'Phone Number': Number(search) }
            ];
        } else {
            matchStage['Customer Name'] = searchRegex;
        }
    }

    // 2. Filters
    if (customerRegion) {
        const regions = Array.isArray(customerRegion) ? customerRegion : customerRegion.split(',');
        matchStage['Customer Region'] = { $in: regions };
    }

    if (gender) {
        const genders = Array.isArray(gender) ? gender : gender.split(',');
        matchStage['Gender'] = { $in: genders };
    }

    if (productCategory) {
        const categories = Array.isArray(productCategory) ? productCategory : productCategory.split(',');
        matchStage['Product Category'] = { $in: categories };
    }

    if (tags) {
        const tagList = Array.isArray(tags) ? tags : tags.split(',');
        // Tags in DB is a comma-separated String, e.g., "organic,skincare"
        // Use regex to match ANY of the tags in the list
        const tagRegex = tagList.map(t => new RegExp(t, 'i'));
        matchStage['Tags'] = { $in: tagRegex };
    }

    if (paymentMethod) {
        const methods = Array.isArray(paymentMethod) ? paymentMethod : paymentMethod.split(',');
        matchStage['Payment Method'] = { $in: methods };
    }

    // Age Range
    if (minAge || maxAge) {
        matchStage['Age'] = {};
        if (minAge) matchStage['Age'].$gte = Number(minAge);
        if (maxAge) matchStage['Age'].$lte = Number(maxAge);
    }

    // Date Range
    if (startDate || endDate) {
        matchStage['Date'] = {};
        if (startDate) matchStage['Date'].$gte = new Date(startDate);
        if (endDate) matchStage['Date'].$lte = new Date(endDate);
    }

    // 3. Sorting
    const sortStage = {};
    const sortOrder = order === 'asc' ? 1 : -1;

    // Map frontend sort keys to DB keys
    const sortKeyMap = {
        date: 'Date',
        amount: 'Total Amount',
        customerName: 'Customer Name',
        quantity: 'Quantity'
    };
    const dbSortKey = sortKeyMap[sortBy] || sortBy;

    sortStage[dbSortKey] = sortOrder;

    if (dbSortKey !== '_id') {
        sortStage._id = 1;
    }

    // 4. Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const skip = (pageNum - 1) * limitNum;

    // 5. Execution
    const total = await Sale.countDocuments(matchStage);

    const pipeline = [
        { $match: matchStage },
        { $sort: sortStage },
        { $skip: skip },
        { $limit: limitNum },
    ];

    const salesRef = await Sale.aggregate(pipeline).allowDiskUse(true);

    // 6. Map to Frontend Model (camelCase)
    const sales = salesRef.map(s => ({
        _id: s._id,
        transactionId: s['Transaction ID'],
        date: s['Date'],
        customerId: s['Customer ID'],
        customerName: s['Customer Name'],
        phoneNumber: s['Phone Number'],
        gender: s['Gender'],
        age: s['Age'],
        customerRegion: s['Customer Region'],
        customerType: s['Customer Type'],
        productId: s['Product ID'],
        productName: s['Product Name'],
        brand: s['Brand'],
        productCategory: s['Product Category'],
        tags: s['Tags'] ? s['Tags'].split(',') : [],
        quantity: s['Quantity'],
        pricePerUnit: s['Price per Unit'],
        discountPercentage: s['Discount Percentage'],
        totalAmount: s['Total Amount'],
        finalAmount: s['Final Amount'],
        paymentMethod: s['Payment Method'],
        orderStatus: s['Order Status'],
        deliveryType: s['Delivery Type'],
        storeId: s['Store ID'],
        storeLocation: s['Store Location'],
        salespersonId: s['Salesperson ID'],
        employeeName: s['Employee Name']
    }));

    return {
        data: sales,
        pagination: {
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        },
    };
};

module.exports = {
    getSales,
};
