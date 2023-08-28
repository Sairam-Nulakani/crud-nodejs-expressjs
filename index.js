const express = require('express');
const app = express();
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/tours', (req, res) => {
  res.status(200).json({ message: 'success', data: { tours } });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
