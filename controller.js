const { sequelize } = require('./models');
const db = require('./models/Trips');
const Trip = db.Trip;
const Station = db.Station;
const { Op } = require('sequelize');


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
        limit: 100
      });
      res.json(trips)
    }
    catch (error) {
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
    catch (error) {
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
    catch (error) {
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
  },

  fetchStationDetails: async function (req, res) {
    try {
      const stationName = req.params.name; 
      const station = await Station.findOne({
        where: {
          Station_Name: stationName
        }
      });

      const tripsFromStation = await Trip.findAll({
        where: {
          Departure_Station_Name: stationName
        }
      });
      const numTripsFromStation = tripsFromStation.length;
      const tripFrom = await Trip.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.fn('COALESCE', sequelize.col('Covered_Distance_Meters'), 0)), 'totalDistance']
        ],
        where: {
          Departure_Station_Name: stationName
        }
      });
      const sumOne = tripFrom[0].dataValues.totalDistance ;
      const avgDistanceFromStation = sumOne/numTripsFromStation;

      const tripsToStation = await Trip.findAll({
        where: {
          Return_Station_Name: stationName
        }
      });
      const numTripsToStation = tripsToStation.length;
      const tripTo = await Trip.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.fn('COALESCE', sequelize.col('Covered_Distance_Meters'), 0)), 'totalDistance']
        ],
        where: {
          Return_Station_Name: stationName
        }
      });
      const sumTwo = tripTo[0].dataValues.totalDistance;
      const avgDistanceToStation = sumTwo/numTripsToStation;

      const popularReturnStations = await Trip.findAll({
        attributes: ['Return_Station_Name', [sequelize.fn('count', sequelize.col('Return_Station_Name')), 'count']],
        where: {
          Departure_Station_Name: stationName
        },
        group: 'Return_Station_Name',
        order: [[sequelize.literal('count'), 'DESC']],
        limit: 5
      });

      const popularDepartureStations = await Trip.findAll({
        attributes: ['Departure_Station_Name', [sequelize.fn('count', sequelize.col('Departure_Station_Name')), 'count']],
        where: {
          Return_Station_Name: stationName
        },
        group: 'Departure_Station_Name',
        order: [[sequelize.literal('count'), 'DESC']],
        limit: 5
      });

      const response = {
        station,
        numTripsFromStation,
        numTripsToStation,
        avgDistanceFromStation,
        avgDistanceToStation,
        popularReturnStations,
        popularDepartureStations
      };
      res.json(response);
    }
    catch (error) {
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    }
  },

  getMonthlyData: async (req, res) => {
    try{
    const month = req.params.month;
    const stationName = req.params.name;

    const tripsFromStation = await Trip.findAll({
      where: {
        Departure_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Departure')), month)
      }
    });

    const numTripsFrom = tripsFromStation.length;
    const tripsFrom = await Trip.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.fn('COALESCE', sequelize.col('Covered_Distance_Meters'), 0)), 'totalDistance']
      ],
      where: {
        Departure_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Departure')), month)
      }
    });
    const sumOnes = tripsFrom[0].dataValues.totalDistance ;
    const avgFromStation = sumOnes/numTripsFrom;
  
    const tripsToStation = await Trip.findAll({
      where: {
        Return_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Return_time')), month)
      }
    });
    const numTripsTo = tripsToStation.length;

    const tripsTo = await Trip.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.fn('COALESCE', sequelize.col('Covered_Distance_Meters'), 0)), 'totalDistance']
      ],
      where: {
        Return_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Return_time')), month)
      }
    });
    const sumTwos = tripsTo[0].dataValues.totalDistance ;
    const avgToStation = sumTwos/numTripsTo;
    
    const popularReturnStations = await Trip.findAll({
      attributes: ['Return_Station_Name', [sequelize.fn('count', sequelize.col('Return_Station_Name')), 'count']],
      where: {
        Departure_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Departure')), month)
      },
      group: 'Return_Station_Name',
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5
    });
  
    const popularDepartureStations = await Trip.findAll({
      attributes: ['Departure_Station_Name', [sequelize.fn('count', sequelize.col('Departure_Station_Name')), 'count']],
      where: {
        Return_Station_Name: stationName,
        [Op.and]: sequelize.where(sequelize.fn('MONTH', sequelize.col('Return_time')), month)
      },
      group: 'Departure_Station_Name',
      order: [[sequelize.literal('count'), 'DESC']],
      limit: 5
    });
  
    const response = {
      numTripsFrom,
      numTripsTo,
      avgFromStation,
      avgToStation,
      popularReturnStations,
      popularDepartureStations
    }
    res.json(response);
    }
    catch (error) {
      res.status(500);
      res.json({ "status_text": "error in server: " + error });
    }
  }
};  
