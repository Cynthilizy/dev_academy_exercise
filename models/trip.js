
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('dev_academy_exercise', 'appuser', 'mypassword',{host: 'localhost', port: 3306, dialect: 'mariadb'})

async function validateConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection to database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  validateConnection();

  const Trip = require('./Trips');

  sequelize.sync({ force: true });

module.exports =  {Trip};



  
