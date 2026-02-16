const EventSource = require('eventsource').EventSource || require('eventsource');
const fs = require('fs');
const path = require('path');

const SSE_URL = 'http://127.0.0.1:3845/sse';
const POST_URL = 'http://127.0.0.1:3845/mcp/messages';

console.log(`Connecting to SSE endpoint: ${SSE_URL}`);

const es = new EventSource(SSE_URL);
let sessionId = null;

es.onopen = () => {
    console.log('SSE connection opened');
};

es.onmessage = (event) => {
    console.log('Received message type:', event.type);
    try {
        const data = JSON.parse(event.data);
        console.log('Message data:', JSON.stringify(data, null, 2));

        if (data.method === 'tools/list') {
            // Initial handshake received, we can now send requests
            // But we need the session ID which is usually implicit or part of the endpoint in some MCP implementations
            // In this specific Figma MCP, we receive an endpoint in the headers or we just post to /messages?sessionId=...
            // However, looking at standard MCP over SSE, the client usually initiates.
            // Let's assume the server is ready.
        }
        
        // In the previous successful attempt, I just waited for the connection and then sent the POST request.
        // The sessionId is usually extracted from the 'endpoint' field in the 'initialization' message if standard MCP.
        // But for this local server, let's look at the previous success.
        
        // Wait for endpoint event? 
        // Actually, the previous successful run just worked. Let's try to send the request after a short delay to ensure connection.
    } catch (e) {
        console.error('Error parsing message:', e);
    }
};

es.onerror = (err) => {
    console.error('SSE Error:', err);
};

// Function to send JSON-RPC request
async function sendRequest() {
    // We need to wait for the session to be established. 
    // In the previous log, we saw: "Received message type: endpoint" with data: "/mcp/messages?sessionId=..."
    // So we need to capture that sessionId.
}

es.addEventListener('endpoint', (event) => {
    const endpoint = event.data;
    console.log('Received endpoint:', endpoint);
    
    // Construct the full URL
    const fullPostUrl = `http://127.0.0.1:3845${endpoint}`;
    console.log('Full POST URL:', fullPostUrl);
    
    // Now send the tool call
    callFigmaTool(fullPostUrl);
});

async function callFigmaTool(url) {
    const requestBody = {
        jsonrpc: "2.0",
        method: "tools/call",
        params: {
            name: "get_design_context",
                    arguments: {
                        nodeId: "875:3558",
                        clientLanguages: "javascript,html,css",
                        clientFrameworks: "vanilla javascript,html,tailwind css",
                        taskType: "CHANGE_ARTIFACT",
                        artifactType: "WEB_PAGE_OR_APP_SCREEN"
                    }
        },
        id: 1
    };

    try {
        console.log('Sending request...', JSON.stringify(requestBody));
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        const text = await response.text();
        console.log('Response body:', text);
        
        // Wait for the result via SSE
        console.log('Waiting for result via SSE...');
        
    } catch (error) {
        console.error('Error sending request:', error);
        es.close();
        process.exit(1);
    }
}

// Listen for messages to capture the result
es.onmessage = (event) => {
    console.log('Received message type:', event.type);
    try {
        const data = JSON.parse(event.data);
        // console.log('Message data:', JSON.stringify(data, null, 2));

        if (data.id === 1 && (data.result || data.error)) {
            console.log('Received result for request ID 1');
            fs.writeFileSync('figma_output_container.json', JSON.stringify(data.result, null, 2));
            console.log('Successfully saved to figma_output_container.json');
            es.close();
            process.exit(0);
        }
    } catch (e) {
        console.error('Error parsing message:', e);
    }
};
