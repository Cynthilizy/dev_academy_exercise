module.exports = {
    HOST: "localhost",
    USER: "appuser",
    PASSWORD: "mypassword",
    DB: "dev_academy_exercise",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };