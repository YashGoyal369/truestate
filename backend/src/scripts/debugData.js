require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');

const run = async () => {
    try {
        const uri = "mongodb+srv://Yash_Goyal:YashGoyal54321@cluster1.5m7ucrr.mongodb.net/data";
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const collection = mongoose.connection.collection('sales');
        const sample = await collection.findOne({});

        console.log("Sample Document Keys:", sample ? Object.keys(sample) : "No document found");
        console.log("Sample Document:", sample);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
};

run();
