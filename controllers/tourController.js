const fs = require("fs");

const tours = JSON.parse(fs.readFileSync("./dev-data/data/tours-simple.json"));

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({
    message: "success",
    requestedTime: req.requestedTime,
    length: tours.length,
    data: { tours },
  });
};

exports.createNewTour = (req, res) => {
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

exports.getTour = async (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);
  res.status(200).json({ message: "success", tours: { tour } });
};

exports.updateTour = async (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send("Tour not found");
  }
  res.status(200).json({ message: "success", tour: "Updated Tour" });
};

exports.deleteTour = async (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).send("Tour not found");
  }
  res.status(204).json({ message: "success", data: null });
};
