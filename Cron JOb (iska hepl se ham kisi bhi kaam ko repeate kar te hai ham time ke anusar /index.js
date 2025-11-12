const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, 'data');
const backupDir = path.join(__dirname, 'backups');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());




// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


cron.schedule(' * * * * *', async() => {
  try {// pura code la matlab hai ki e minuyes me har baar ek folder create hoga backups folder ke ander time sath
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); // agar . ya : ye aayega usko ham - se replace karenge
    const destination = path.join(backupDir, `backup-${timestamp}`);

    await fs.promises.cp(sourceDir, destination, { recursive: true });
    console.log(`Backup created at ${destination}`);
  } catch (error) {
    console.error('Error during backup:', error);
  }
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
