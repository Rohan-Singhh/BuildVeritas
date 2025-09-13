const axios = require('axios');

const BASE_URL = 'https://buildveritas.onrender.com';
const TEST_ORIGINS = [
    'https://build-veritas.vercel.app',
    'https://buildveritas.vercel.app',
    'http://localhost:5173'
];

async function testCORS() {
    console.log('🔍 Testing CORS Configuration...\n');

    for (const origin of TEST_ORIGINS) {
        console.log(`\nTesting requests from origin: ${origin}`);
        
        try {
            // Test OPTIONS (preflight) request
            console.log('\n1. Testing OPTIONS preflight request...');
            const optionsResponse = await axios({
                method: 'OPTIONS',
                url: `${BASE_URL}/api/auth/login`,
                headers: {
                    'Origin': origin,
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type,Authorization'
                }
            });
            console.log('✅ OPTIONS request successful');
            console.log('CORS Headers received:', {
                allowOrigin: optionsResponse.headers['access-control-allow-origin'],
                allowMethods: optionsResponse.headers['access-control-allow-methods'],
                allowHeaders: optionsResponse.headers['access-control-allow-headers']
            });
        } catch (error) {
            console.log('❌ OPTIONS request failed:', error.message);
            if (error.response?.headers) {
                console.log('Headers received:', error.response.headers);
            }
        }

        try {
            // Test actual request
            console.log('\n2. Testing POST request...');
            const response = await axios.post(
                `${BASE_URL}/api/auth/login`,
                {
                    email: "test@example.com",
                    password: "test123",
                    role: "client_owner"
                },
                {
                    headers: {
                        'Origin': origin,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('✅ POST request successful');
            console.log('CORS Headers received:', {
                allowOrigin: response.headers['access-control-allow-origin']
            });
        } catch (error) {
            if (error.response?.status === 404) {
                console.log('✅ POST request reached server (expected 404 for test credentials)');
                console.log('CORS Headers received:', {
                    allowOrigin: error.response.headers['access-control-allow-origin']
                });
            } else {
                console.log('❌ POST request failed:', error.message);
                if (error.response?.headers) {
                    console.log('Headers received:', error.response.headers);
                }
            }
        }

        // Test health endpoint
        try {
            console.log('\n3. Testing GET health endpoint...');
            const healthResponse = await axios.get(
                `${BASE_URL}/health`,
                {
                    headers: {
                        'Origin': origin
                    }
                }
            );
            console.log('✅ Health check successful');
            console.log('CORS Headers received:', {
                allowOrigin: healthResponse.headers['access-control-allow-origin']
            });
        } catch (error) {
            console.log('❌ Health check failed:', error.message);
            if (error.response?.headers) {
                console.log('Headers received:', error.response.headers);
            }
        }
    }
}

// Run the tests
console.log('🚀 Starting CORS tests...\n');
testCORS().then(() => {
    console.log('\n✨ CORS tests completed');
});
