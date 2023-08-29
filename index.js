const express = require("express");
const app = express();
const fs = require("fs");
const morgan = require("morgan");

///////////MIDDLEWARES/////////////

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from Middleware");
  next();
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

//////////////ROUTE HANDLERS///////////////////
const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

/////////////////GET ALL TOURS////////////////////////////////
const getAllTours = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({
    message: "success",
    requestedTime: req.requestedTime,
    length: tours.length,
    data: { tours },
  });
};

/////////////////CREATE NEW TOUR////////////////////////////////
const createNewTour = (req, res) => {
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
};

/////////////////GET TOUR////////////////////////////////
const getTour = async (req, res) => {
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
};

/////////////////UPDATE TOUR////////////////////////////////
const updateTour = async (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send("Tour not found");
  }
  res.status(200).json({ message: "success", tour: "Updated Tour" });
};
/////////////////DELETE TOUR////////////////////////////////
const deleteTour = async (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send("Tour not found");
  }
  res.status(204).json({ message: "success", data: null });
};

/////////ROUTES////////////
app.get("/api/tours", getAllTours);

app.post("/api/tours", createNewTour);

app.get("/api/tours/:id", getTour);

app.patch("/api/tours/:id", updateTour);

app.delete("/api/tours/:id", deleteTour);

/////////SERVER/////////
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
