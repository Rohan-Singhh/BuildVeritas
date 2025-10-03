const axios = require('axios');

// Test the bid endpoints
async function testBidEndpoints() {
  const baseURL = 'http://localhost:5000/api';
  
  // You'll need to replace these with actual values from your database
  const testBidId = '68d9456e9b18fecb406da474'; // From your logs
  const testProjectId = '68d93785d4228fefaed697ba'; // From your logs
  
  // You'll need to get a valid JWT token
  const token = 'YOUR_JWT_TOKEN_HERE'; // Replace with actual token
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  
  console.log('Testing bid endpoints...');
  
  try {
    // Test get bid details
    console.log('\n1. Testing GET /bids/:bidId/details');
    const detailsResponse = await axios.get(`${baseURL}/bids/${testBidId}/details`, { headers });
    console.log('Details response:', detailsResponse.data);
  } catch (error) {
    console.error('Details error:', error.response?.data || error.message);
  }
  
  try {
    // Test reject bid
    console.log('\n2. Testing POST /bids/:bidId/reject/:projectId');
    const rejectResponse = await axios.post(
      `${baseURL}/bids/${testBidId}/reject/${testProjectId}`, 
      { reason: 'Test rejection' },
      { headers }
    );
    console.log('Reject response:', rejectResponse.data);
  } catch (error) {
    console.error('Reject error:', error.response?.data || error.message);
  }
  
  try {
    // Test select bid
    console.log('\n3. Testing POST /bids/:bidId/select/:projectId');
    const selectResponse = await axios.post(
      `${baseURL}/bids/${testBidId}/select/${testProjectId}`,
      {},
      { headers }
    );
    console.log('Select response:', selectResponse.data);
  } catch (error) {
    console.error('Select error:', error.response?.data || error.message);
  }
}

testBidEndpoints();
