const https = require('https');
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3010;

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// For any other route, serve index.html (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const options = {
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`✅ HTTPS server running at https://localhost:${PORT}/`);
});
