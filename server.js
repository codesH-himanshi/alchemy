const express = require('express');
const path = require('path');
const conversionRoutes = require('./routes/conversions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/conversions', conversionRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

console.log('Starting server...');
console.log(`Current directory: ${__dirname}`);
console.log('Static files path:', path.join(__dirname, 'public'));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});