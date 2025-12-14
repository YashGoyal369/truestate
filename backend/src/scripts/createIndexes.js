require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

const run = async () => {
    try {
        const uri = "mongodb+srv://Yash_Goyal:YashGoyal54321@cluster1.5m7ucrr.mongodb.net/data";
        await mongoose.connect(uri);
        console.log("Connected to DB for Indexing");

        const collection = mongoose.connection.collection('sales');

        console.log("Creating indexes...");

        // Date Index for Sorting & Filtering
        await collection.createIndex({ 'Date': 1 }); // Ascending
        await collection.createIndex({ 'Date': -1 }); // Descending

        // Customer Name for Search
        await collection.createIndex({ 'Customer Name': 1 });

        // Filter Fields
        await collection.createIndex({ 'Customer Region': 1 });
        await collection.createIndex({ 'Gender': 1 });
        await collection.createIndex({ 'Product Category': 1 });
        await collection.createIndex({ 'Payment Method': 1 });

        // Sort Fields (Optimization)
        await collection.createIndex({ 'Total Amount': 1 });
        await collection.createIndex({ 'Quantity': 1 });

        console.log("Indexes created successfully!");

        // List indexes to verify
        const indexes = await collection.indexes();
        console.log("Current Indexes:", indexes);

    } catch (error) {
        console.error("Error creating indexes:", error);
    } finally {
        await mongoose.disconnect();
    }
};

run();
