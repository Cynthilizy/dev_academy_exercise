module.exports =


{ 
  addTrip: async function (req, res) {
      try {
        const trips = await Trips.create(req.body)
        Trips.save();
        res.status(201);
        res.json(trips); // send user information that get's id from db
      }
      catch (error) { 
        if(error instanceof ValidationError){
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
      const trips = await Trips.findAll({
      });
      res.json(trips)
    }
    catch (error) { // if promise is reject or any other problem comes up
      res.status(500); 
      res.json({ "status_text": "error in server: + " + error }); 
    }
  },

  updateTrip: async function (req, res) {
  },

  fetchSingleTrip: async function (req, res){

  },

  deleteTrip: function (req, res) {
    Trips.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.send();
    }).catch((error) => {
      res.status(500);
      res.json({ "status_text": "error in server: + " + error });
    });

  }
};
