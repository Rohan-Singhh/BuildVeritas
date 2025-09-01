const mongoose = require('mongoose');

class Database {
    static async connect() {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set');
        }

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        };

        try {
            await mongoose.connect(process.env.MONGODB_URI, options);
            console.log('✅ Connected to MongoDB');

            // Handle MongoDB connection events
            mongoose.connection.on('error', (err) => {
                console.error('❌ MongoDB connection error:', err);
                // Don't exit process here, let the application handle reconnection
            });

            mongoose.connection.on('disconnected', () => {
                console.log('MongoDB disconnected. Attempting to reconnect...');
            });

            mongoose.connection.on('reconnected', () => {
                console.log('✅ MongoDB reconnected');
            });

        } catch (error) {
            console.error('❌ Failed to connect to MongoDB:', error);
            throw error;
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('✅ Disconnected from MongoDB');
        } catch (error) {
            console.error('❌ Failed to disconnect from MongoDB:', error);
            throw error;
        }
    }
}

module.exports = Database;