const {Trip} = require('./models/trip')

module.exports = {
  addNewTrip: async function (req, res) {
    try {
      const trip = await Trip.create(req.body)
      res.status(201);
      res.json(trip); // send user information that get's id from db
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
        limit: 10,
        order: [['Departure', 'DESC']]
      });
      res.json(trips)
    }
    catch (error) { // if promise is reject or any other problem comes up
      res.status(500); 
      res.json({ "status_text": "error in server: " + error }); 
    }
  },
  

  updateTrip: async function (req, res) {
    // TODO: Implement update trip
  },

  fetchSingleTrip: async function (req, res) {
    // TODO: Implement fetch single trip
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
