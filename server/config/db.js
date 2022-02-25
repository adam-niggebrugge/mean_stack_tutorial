const Sequelize = require('sequelize');
const dotenv = require("dotenv");
const result = dotenv.config();

if(result.error){
  throw result.error;
}

const db = new Sequelize(
      process.env.DB_DEV_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mssql',
        port: 51356
      }
  );



db.authenticate()
    .then(() => {
     
        console.log(`%%%%%%%%%%%%%%%%%%%%%%%%%
        %
        %Connection to local_Angular_Project has been established successfully.
        %
        %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%`);
    
    })
    .catch(err => {
        console.error('Unable to connect to local_Angular_Project', err);
});

module.exports = db;
