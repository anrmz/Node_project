const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './slider/index.html'));
});


// Define a route to serve the snake.html file
app.get('/snake', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './snake/snake.html'));
});

// Define a route to serve the age.html file
app.get('/age', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', './agecalc/age.html'));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
