const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);

    console.log(req.query, queryObject);
    const query = Tour.find(queryObject);
    const tours = await query;
    res.status(200).json({
      length: tours.length,
      requestedAt: req.requestedTime,
      tours: { tours },
    });
  } catch (err) {
    return res.status(500).json("Failed to get Tours");
  }
};

exports.createNewTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({ status: "success", data: { tour: newTour } });
  } catch (err) {
    res.status(404).json({ status: "failed", message: err });
  }
};

exports.getTour = async (req, res) => {
  const tourId = req.params.id;
  try {
    const tour = await Tour.findById(tourId);
    const { __v, createdAt, ...tourData } = tour._doc;
    return res.status(200).json(tourData);
  } catch (err) {
    return res.status(500).json("Failed to get Tour");
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", newTour: tour });
  } catch (err) {
    return res.status(500).json("Failed to update Tour");
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
