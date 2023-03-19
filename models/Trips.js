const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('dev_academy_exercise', 'appuser', 'mypassword', {
  host: 'localhost',
  dialect: 'mysql'
});

class Trip extends Model {}

Trip.init({
  ID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Departure:{
    type: DataTypes.DATE
  },
  Return_time:{
    type: DataTypes.DATE
  },
  Departure_Station_ID:{
    type: DataTypes.INTEGER(11)
  },
  Departure_Station_Name:{
    type: DataTypes.STRING(255)
  },
  Return_Station_ID:{
    type: DataTypes.INTEGER(11)
  },
  Return_Station_Name: {
    type: DataTypes.STRING(255)
  },
  Covered_Distance_Meters:{
    type: DataTypes.INTEGER(11)
  },
  Duration_Seconds: {
    type: DataTypes.INTEGER(11)
  }
}, {
  sequelize,
  modelName: 'Trip',
  timestamps: false
});

// Fetch last 10 trips based on the Departure column
Trip.findAll({
  order: [['Departure', 'DESC']],
  limit: 10
})
.then(trips => {
  console.log(trips);
})
.catch(error => {
  console.error(error);
});

module.exports = Trip;
