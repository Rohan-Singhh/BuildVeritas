const axios = require('axios');

// Test both URLs
const BASE_URL = 'https://buildveritas.onrender.com';
const API_URL = BASE_URL;

async function testEndpoints() {
    try {
        // Test base URL without /api
        console.log('\nTesting base URL (without /api)...');
        try {
            const baseResponse = await axios.get(BASE_URL);
            console.log('✅ Base URL works:', baseResponse.data);
        } catch (error) {
            console.log('❌ Base URL error:', error.response?.data || error.message);
        }

        // Test base URL with /api
        console.log('\nTesting base URL with /api...');
        try {
            const apiResponse = await axios.get(`${BASE_URL}/api`);
            console.log('✅ API URL works:', apiResponse.data);
        } catch (error) {
            console.log('❌ API URL error:', error.response?.data || error.message);
        }

        // Test health endpoint
        console.log('\nTesting health endpoint...');
        try {
            const healthResponse = await axios.get(`${BASE_URL}/health`);
            console.log('✅ Health endpoint works:', healthResponse.data);
        } catch (error) {
            console.log('❌ Health endpoint error:', error.response?.data || error.message);
        }

        // Test login endpoint with base URL
        console.log('\nTesting login endpoint with base URL...');
        const loginData = {
            email: "test@example.com",
            password: "test123456",
            role: "client_owner"
        };

        try {
            const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, loginData);
            console.log('✅ Login endpoint works:', loginResponse.data);
        } catch (error) {
            if (error.response?.status === 404) {
                console.log('✅ Login endpoint returned expected 404 (user not found)');
            } else {
                console.log('❌ Login endpoint error:', error.response?.data || error.message);
            }
        }

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testEndpoints();
