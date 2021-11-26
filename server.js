const express = require("express");
const fs = require("fs");

const app = express();

const colors = ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]
	
let fileContent = fs.readFileSync("./src/assets/data/datasetAll.csv", "utf8");
let arrLines  = fileContent.split("\r\n");

let dataset = {
  "categories": ["Мясопродукты", "Рыбопродукты", "Ткани", "Трикотажные изделия", "Макаронные и крупяные изделия", "Плодоовощная продукция, включая картофель", "Масло и жиры", "Чай, кофе, какао"],
  "colors": colors,
  "data": {
    "2020": {
      "labels": ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"],
      "byDecember": [],
      "toPreviousMonth": []
    },
    "2021": {
      "labels": ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь"],
      "byDecember": [],
      "toPreviousMonth": []
    }
  }
};

// byDecember
for (let i = 4; i < 12; i++) {
  const line = arrLines[i].split(";");
  const label = line[2];
  // 2020
  let data = line.slice(3, 15);
  const borderColor = colors[i-4];
  dataset.data["2020"].byDecember.push({label, data, borderColor, "backgroundColor": "transparent",});
  // 2021
  data = line.slice(15);
  dataset.data["2021"].byDecember.push({label, data, borderColor, "backgroundColor": "transparent",});
}

// toPreviousMonth
for (let i = 12; i < 20; i++) {
  const line = arrLines[i].split(";");
  const label = line[2];
  // 2020
  let data = line.slice(3, 15);
  const borderColor = colors[i-12];
  dataset.data["2020"].toPreviousMonth.push({label, data, borderColor, "backgroundColor": "transparent",});
  // 2021
  data = line.slice(15);
  dataset.data["2021"].toPreviousMonth.push({label, data, borderColor, "backgroundColor": "transparent",});
}

const PORT = process.env.PORT || 3000;
app.use("/", function (request, response) {
  response.header("Access-Control-Allow-Origin", "http://localhost:8080");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS");
  response.send(dataset);
});

app.listen(PORT, () => {
  console.log(`Start on port ${PORT}!`);
});