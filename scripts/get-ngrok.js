async function main() {
  const response = await fetch("http://127.0.0.1:4040/api/requests/http");
  const data = await response.json();
  
  console.log(`Found ${data.requests.length} requests in ngrok:`);
  for (const r of data.requests) {
    console.log(`\n----------------------------------------`);
    console.log(`ID: ${r.id}`);
    console.log(`Method: ${r.request.method}`);
    console.log(`Path: ${r.request.uri}`);
    console.log(`Status Code (Response): ${r.response?.status}`);
    
    // Decode request body
    if (r.request.body) {
      try {
        const decodedReq = Buffer.from(r.request.body, 'base64').toString('utf8');
        console.log(`Request Body:`, JSON.stringify(JSON.parse(decodedReq), null, 2));
      } catch (e) {
        console.log(`Request Body (raw):`, r.request.body);
      }
    }
    
    // Decode response body
    if (r.response?.body) {
      try {
        const decodedRes = Buffer.from(r.response.body, 'base64').toString('utf8');
        console.log(`Response Body:`, decodedRes);
      } catch (e) {
        console.log(`Response Body (raw):`, r.response.body);
      }
    }
  }
}

main().catch(console.error);
