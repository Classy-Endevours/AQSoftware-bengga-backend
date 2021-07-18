'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize ({
	dialect: "mariadb", 
	port: 3307,
	replication: {
		read: [{
			"username": process.env.slave_db_username,
			"password": process.env.slave_db_password,
			"database": process.env.slave_db_name,
			"host": process.env.slave_db_host
		}],  
		write: {
			"username": process.env.master_db_username,
			"password": process.env.master_db_password,
			"database": process.env.master_db_name,
			"host": process.env.master_db_host,
		}
	}, 
	pool: {// If you need to rewrite the link pool,Please modify in the pool option
		maxconnections:20,  maxidletime:30000
	}
})


sequelize.authenticate()
  .then(() => console.info('Database connected'))
  .catch((error) => console.info('Failed to connect', error));

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// // Just for logging purpose
// sequelize.authenticate()
//     .then(() => console.info('Database connected'))
//     .catch((error) => console.info('Failed to connect', error));

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;