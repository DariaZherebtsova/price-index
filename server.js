const express = require('express');
const fs = require('fs');

const app = express();

const colors = ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f', '#edc949', '#af7aa1', '#ff9da7', '#9c755f', '#bab0ab']
	
let fileContent = fs.readFileSync('./src/assets/data/data2020.csv', 'utf8');
let arrLines  = fileContent.split('\r\n');
console.log(arrLines);

let dataset = [];

for (let i = 1; i < arrLines.length - 1; i++) {
  const line = arrLines[i].split(';');
  const label = line.shift();
  const data = line;
  const borderColor = colors[i];
  dataset.push({label, data, borderColor, "backgroundColor": "transparent",});
}

const PORT = process.env.PORT || 3000;
app.use('/', function (request, response) {
  response.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
  response.send(dataset);
});

app.listen(PORT, () => {
  console.log(`Start on port ${PORT}!`);
});