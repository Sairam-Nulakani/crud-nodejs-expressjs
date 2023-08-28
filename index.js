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
      res.status(200).json({ message: "success", data: { tour: newTour } });
    }
  );
});

app.get("/api/tours/:id", async (req, res) => {
  const id = req.params.id * 1;

  try {
    if (id > tours.length) {
      return res.status(404).send("Tour not found");
    }
    const tour = tours.find((el) => el.id === id);
    res.status(200).json({ message: "success", tours: { tour } });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/api/tours/:id", async (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send("Tour not found");
  }
  res.status(200).json({ message: "success", tour: "Updated Tour" });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
