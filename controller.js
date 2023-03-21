const db = require('./models/Trips');
const Trip = db.Trip;
const Station = db.Station;


module.exports = {
  addNewTrip: async function (req, res) {
    try {
      const trip = await Trip.create(req.body)
      res.status(201);
      res.json(trip);
    }
    catch (error) {
      if (error instanceof ValidationError) {
        res.status(400);
        res.json(error.errors);
      }
      else {
        res.status(500);
        res.json({ "status": "error in server", "error": error, "response": null });
      }
    };
  },

  fetchTrip: async function (req, res) {
    try {
      const trips = await Trip.findAll({
        order: [['Departure', 'DESC']],
        limit: 10
      });
      res.json(trips)
    }
    catch (error) { // if promise is reject or any other problem comes up
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    }
  },

  fetchStation: async function (req, res) {
    try {
      const stations = await Station.findAll({
        order: [['Nimi']]
      });
      res.json(stations)
    }
    catch (error) { // if promise is reject or any other problem comes up
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    }
  },

  fetchSingleStation: async function (req, res) {
    try {
      const stationName = req.params.name;
      const station = await Station.findOne({
        where: {
          Station_Name: stationName
        }
      });
      res.json(station);
    }
    catch (error) { // if promise is rejected or any other problem comes up
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    }
  },

  deleteTrip: function (req, res) {
    Trip.destroy({
      where: {
        ID: req.params.id
      }
    }).then(() => {
      res.send();
    }).catch((error) => {
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    });
  }
};
