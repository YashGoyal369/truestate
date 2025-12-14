const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    'Transaction ID': { type: String, unique: true },
    'Date': { type: Date, required: true },
    'Customer ID': String,
    'Customer Name': { type: String, required: true },
    'Phone Number': { type: Number, required: true },
    'Gender': String,
    'Age': Number,
    'Customer Region': String,
    'Customer Type': String,
    'Product ID': String,
    'Product Name': String,
    'Brand': String,
    'Product Category': String,
    'Tags': String,
    'Quantity': { type: Number, index: true },
    'Price per Unit': Number,
    'Discount Percentage': Number,
    'Total Amount': Number,
    'Final Amount': Number,
    'Payment Method': String,
    'Order Status': String,
    'Delivery Type': String,
    'Store ID': String,
    'Store Location': String,
    'Salesperson ID': String,
    'Employee Name': String,
}, { collection: 'sales' });

// Compound index if needed for common queries, but individual indexes are a good start
// saleSchema.index({ customerRegion: 1, date: -1 });

module.exports = mongoose.model('Sale', saleSchema);
