const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

app.get("/api/tours", (req, res) => {
  res
    .status(200)
    .json({ message: "success", length: tours.length, data: { tours } });
});

app.post("/api/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    "./dev-data/data/tours-simple.json",
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({ message: "success" });
    }
  );
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
