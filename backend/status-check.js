const axios = require('axios');

const RENDER_URL = 'https://buildveritas.onrender.com';
const CHECK_INTERVAL = 5000; // 5 seconds

async function checkServiceStatus() {
    try {
        // Check root endpoint
        console.log('\nChecking service status...');
        const rootResponse = await axios.get(RENDER_URL);
        console.log('Root endpoint:', rootResponse.status === 200 ? '✅ OK' : '❌ Failed');
        console.log('Response:', rootResponse.data);

        // Check health endpoint
        const healthResponse = await axios.get(`${RENDER_URL}/health`);
        console.log('\nHealth check:', healthResponse.status === 200 ? '✅ OK' : '❌ Failed');
        console.log('Health details:');
        console.log('- Environment:', healthResponse.data.environment);
        console.log('- Database:', healthResponse.data.database?.status);
        console.log('- Memory Usage:', healthResponse.data.memory?.used);
        console.log('- Uptime:', healthResponse.data.uptime);
        
        // Test API endpoint
        const apiResponse = await axios.get(`${RENDER_URL}/api/auth`);
        console.log('\nAPI endpoint:', apiResponse.status === 404 ? '✅ OK (Expected 404)' : '❌ Failed');

    } catch (error) {
        console.error('\n❌ Service Error:');
        if (error.response) {
            // Server responded with error
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            // No response received
            console.error('No response from server. Service might be down or starting up.');
        } else {
            // Request setup error
            console.error('Error:', error.message);
        }
    }
}

// Run initial check
checkServiceStatus();

// Setup continuous monitoring
console.log(`\nMonitoring service status every ${CHECK_INTERVAL/1000} seconds...`);
console.log('Press Ctrl+C to stop');

setInterval(checkServiceStatus, CHECK_INTERVAL);
