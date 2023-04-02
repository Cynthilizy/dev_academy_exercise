const { Sequelize, DataTypes, Model, Op } = require('sequelize');

const sequelize = new Sequelize('dev_academy_exercise', 'appuser', 'mypassword', {
  host: 'localhost',
  dialect: 'mariadb'
});

const startDate = new Date(2021, 6, 1); // July 1, 2021
const endDate = new Date(2021, 7, 1); // August 1, 2021

class Trip extends Model {}
class Station extends Model{}

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
    type: DataTypes.INTEGER
  },
  Departure_Station_Name:{
    type: DataTypes.STRING(255)
  },
  Return_Station_ID:{
    type: DataTypes.INTEGER
  },
  Return_Station_Name: {
    type: DataTypes.STRING(255)
  },
  Covered_Distance_Meters:{
    type: DataTypes.INTEGER
  },
  Duration_Seconds: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize,
  modelName: 'Trip',
  timestamps: false
});

Station.init({
  Fid:{
    type: DataTypes.INTEGER
  },
  ID:{
    type: DataTypes.INTEGER
  },
  Nimi:{
    type: DataTypes.STRING(255)
  },
  Namn:{
    type: DataTypes.STRING(255)
  },
  Station_Name:{
    type: DataTypes.STRING(255)
  },
  Osoite:{
    type: DataTypes.STRING(255)
  },
  Address:{
    type: DataTypes.STRING(255)
  },
  Kaupunki: {
    type: DataTypes.STRING(255)
  },
  Stad:{
    type: DataTypes.STRING(255)
  },
  Operaattor: {
    type: DataTypes.STRING(255)
  },
  Kapasiteet: {
    type: DataTypes.INTEGER
  },
  cordinate_X: {
    type: DataTypes.DECIMAL(10,7)
  },
  cordinate_Y: {
    type: DataTypes.DECIMAL(10,7)
  }
}, {
  sequelize,
  modelName: 'stationdata',
  timestamps: false
});

const db = {
  Trip,
  Station
};
module.exports = db;
