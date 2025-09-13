const axios = require('axios');

const API_URL = 'https://buildveritas.onrender.com';

async function testEndpoints() {
    try {
        // Test root endpoint
        console.log('\nTesting root endpoint...');
        const rootResponse = await axios.get(API_URL);
        console.log('Root endpoint response:', rootResponse.data);

        // Test health endpoint
        console.log('\nTesting health endpoint...');
        const healthResponse = await axios.get(`${API_URL}/health`);
        console.log('Health endpoint response:', healthResponse.data);

        // Test login endpoint
        console.log('\nTesting login endpoint...');
        const loginData = {
            email: "test@example.com",
            password: "test123456",
            role: "client_owner"
        };
        try {
            const loginResponse = await axios.post(`${API_URL}/api/auth/login`, loginData);
            console.log('Login endpoint response:', loginResponse.data);
        } catch (error) {
            console.log('Login endpoint error response:', error.response?.data || error.message);
        }

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testEndpoints();
